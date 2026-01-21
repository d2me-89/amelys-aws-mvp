"""
Lambda: amelys-send-message
Rôle: Envoyer un message dans une conversation existante
Auteur: Amélys Platform

Endpoint: POST /conversation/{conversationId}/message
Body: {"message": "texte du message"}
"""

import json
import boto3
import uuid
from datetime import datetime

# Clients AWS
dynamodb = boto3.resource('dynamodb')
bedrock_runtime = boto3.client(
    service_name='bedrock-runtime',
    region_name='eu-west-1'
)

# Tables DynamoDB
TABLE_CONVERSATIONS = 'amelys-conversations'


def lambda_handler(event, context):
    """
    Lambda handler pour envoyer un message dans une conversation
    
    Input (API Gateway):
    - pathParameters: {"conversationId": "conv_xyz123"}
    - body: {"message": "Peux-tu m'expliquer les nombres décimaux ?"}
    
    Output:
    {
        "success": true,
        "message": "Réponse de Claude",
        "messageId": "msg_abc456"
    }
    """
    
    try:
        # ========================================
        # ÉTAPE 1 : PARSER LA REQUÊTE
        # ========================================
        
        # Extraire conversationId depuis pathParameters ou body
        path_params = event.get('pathParameters', {})
        conversation_id = path_params.get('conversationId')
        
        # Si pas dans pathParameters, chercher dans le body (pour les tests)
        if not conversation_id:
            body = json.loads(event.get('body', '{}'))
            conversation_id = body.get('conversationId')
        
        if not conversation_id:
            return error_response(400, 'Paramètre manquant: conversationId requis')
        
        # Parser le body pour récupérer le message
        body = json.loads(event.get('body', '{}'))
        user_message = body.get('message')
        
        if not user_message:
            return error_response(400, 'Paramètre manquant: message requis')
        
        print(f"[START] ConversationId: {conversation_id}")
        print(f"[MESSAGE] User: {user_message[:100]}...")
        
        # ========================================
        # ÉTAPE 2 : CHARGER LA CONVERSATION
        # ========================================
        conversations_table = dynamodb.Table(TABLE_CONVERSATIONS)
        
        # Scanner pour trouver la conversation (car on ne connaît pas le userId)
        # NOTE: En production, il faudrait passer le userId ou utiliser un GSI
        response = conversations_table.scan(
            FilterExpression='conversationId = :cid',
            ExpressionAttributeValues={':cid': conversation_id}
        )
        
        if not response.get('Items'):
            return error_response(404, f'Conversation introuvable: {conversation_id}')
        
        conversation = response['Items'][0]
        
        print(f"[CONV] Chargée: {conversation['type']}, {len(conversation.get('messages', []))} messages")
        
        # Vérifier que la conversation est active
        if conversation.get('status') != 'active':
            return error_response(400, f"Conversation non active: {conversation.get('status')}")
        
        # ========================================
        # ÉTAPE 3 : CONSTRUIRE L'HISTORIQUE
        # ========================================
        
        # Récupérer le system prompt et l'historique
        system_prompt = conversation.get('systemPrompt', '')
        messages_history = conversation.get('messages', [])
        
        # Construire le tableau de messages pour Claude
        # Format Claude: [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]
        claude_messages = []
        
        for msg in messages_history:
            if msg['role'] in ['user', 'assistant']:
                claude_messages.append({
                    'role': msg['role'],
                    'content': msg['content']
                })
        
        # Ajouter le nouveau message de l'utilisateur
        claude_messages.append({
            'role': 'user',
            'content': user_message
        })
        
        print(f"[HISTORY] {len(claude_messages)} messages dans l'historique")
        
        # ========================================
        # ÉTAPE 4 : APPELER CLAUDE VIA BEDROCK
        # ========================================
        print(f"[CLAUDE] Appel à Claude Sonnet 4.5")
        
        claude_request = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 4096,
            # ✅ PROMPT CACHING : Le system prompt est mis en cache
            "system": [
                {
                    "type": "text",
                    "text": system_prompt,
                    "cache_control": {"type": "ephemeral"}
                }
            ],
            "messages": claude_messages
        }
        
        bedrock_response = bedrock_runtime.invoke_model(
            modelId='global.anthropic.claude-sonnet-4-5-20250929-v1:0',
            body=json.dumps(claude_request)
        )
        
        response_body = json.loads(bedrock_response['body'].read())
        claude_message = response_body['content'][0]['text']
        
        # Logging des métriques de cache
        usage = response_body.get('usage', {})
        cache_creation = usage.get('cache_creation_input_tokens', 0)
        cache_read = usage.get('cache_read_input_tokens', 0)
        input_tokens = usage.get('input_tokens', 0)
        output_tokens = usage.get('output_tokens', 0)
        
        print(f"[CACHE] Création: {cache_creation} tokens, Lecture: {cache_read} tokens")
        print(f"[TOKENS] Input: {input_tokens}, Output: {output_tokens}")
        print(f"[CLAUDE] Réponse reçue: {len(claude_message)} caractères")
        
        # ========================================
        # ÉTAPE 5 : SAUVEGARDER LES NOUVEAUX MESSAGES
        # ========================================
        
        timestamp = datetime.utcnow().isoformat() + 'Z'
        
        # Créer les IDs des nouveaux messages
        user_message_id = f"msg_{uuid.uuid4().hex[:8]}"
        assistant_message_id = f"msg_{uuid.uuid4().hex[:8]}"
        
        # Ajouter les nouveaux messages à l'historique
        new_user_message = {
            'id': user_message_id,
            'role': 'user',
            'content': user_message,
            'timestamp': timestamp
        }
        
        new_assistant_message = {
            'id': assistant_message_id,
            'role': 'assistant',
            'content': claude_message,
            'timestamp': timestamp
        }
        
        # Mettre à jour la conversation dans DynamoDB
        conversations_table.update_item(
            Key={
                'PK': conversation['PK'],
                'SK': conversation['SK']
            },
            UpdateExpression='SET messages = list_append(messages, :new_messages), messageCount = messageCount + :inc, updatedAt = :updated',
            ExpressionAttributeValues={
                ':new_messages': [new_user_message, new_assistant_message],
                ':inc': 2,
                ':updated': timestamp
            }
        )
        
        print(f"[CONV] Messages sauvegardés: {user_message_id}, {assistant_message_id}")
        
        # ========================================
        # ÉTAPE 6 : RETOURNER LA RÉPONSE
        # ========================================
        return success_response({
            'message': claude_message,
            'messageId': assistant_message_id,
            'userMessageId': user_message_id,
            'tokenUsage': {
                'cacheCreation': cache_creation,
                'cacheRead': cache_read,
                'input': input_tokens,
                'output': output_tokens
            }
        })
        
    except Exception as e:
        print(f"[ERROR] {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(500, str(e))


def success_response(data):
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        'body': json.dumps({'success': True, **data}, ensure_ascii=False)
    }


def error_response(status_code, error_message):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        'body': json.dumps({'success': False, 'error': error_message}, ensure_ascii=False)
    }