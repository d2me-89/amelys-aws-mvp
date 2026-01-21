"""
Lambda: amelys-get-conversation
Rôle: Récupérer une conversation existante par son ID
Auteur: Amélys Platform

Route API: GET /conversation/{conversationId}?userId={userId}
"""

import json
import boto3
from datetime import datetime
from decimal import Decimal

# Clients AWS
dynamodb = boto3.resource('dynamodb')

# Tables DynamoDB
TABLE_CONVERSATIONS = 'amelys-conversations'


def decimal_to_number(obj):
    """Convertit les Decimal en int ou float pour la sérialisation JSON"""
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    raise TypeError


def lambda_handler(event, context):
    """
    Lambda handler pour récupérer une conversation
    
    Input (API Gateway):
    - pathParameters: {"conversationId": "conv_abc123"}
    - queryStringParameters: {"userId": "user123"}
    
    Output:
    {
        "success": true,
        "conversation": {
            "conversationId": "conv_abc123",
            "messages": [...],
            "status": "active",
            ...
        }
    }
    """
    
    try:
        # ÉTAPE 1 : EXTRAIRE LES PARAMÈTRES
        path_params = event.get('pathParameters', {})
        conversation_id = path_params.get('conversationId')
        
        query_params = event.get('queryStringParameters') or {}
        user_id = query_params.get('userId')
        
        if not conversation_id:
            return error_response(400, 'conversationId manquant')
        
        if not user_id:
            return error_response(400, 'userId manquant dans les query parameters')
        
        print(f"[GET] Récupération conversation: {conversation_id} pour user: {user_id}")
        
        # ÉTAPE 2 : CHARGER LA CONVERSATION DEPUIS DYNAMODB
        conversations_table = dynamodb.Table(TABLE_CONVERSATIONS)
        
        response = conversations_table.get_item(
            Key={
                'PK': f"USER#{user_id}",
                'SK': f"CONV#{conversation_id}"
            }
        )
        
        if 'Item' not in response:
            return error_response(404, f'Conversation {conversation_id} introuvable pour cet utilisateur')
        
        conversation = response['Item']
        
        print(f"[GET] Conversation chargée: {len(conversation.get('messages', []))} messages")
        
        # ÉTAPE 3 : RETOURNER LA CONVERSATION
        return success_response({
            'conversation': {
                'conversationId': conversation['conversationId'],
                'userId': conversation['userId'],
                'type': conversation.get('type'),
                'contentKey': conversation.get('contentKey'),
                'status': conversation.get('status'),
                'messages': conversation.get('messages', []),
                'messageCount': conversation.get('messageCount', 0),
                'createdAt': conversation.get('createdAt'),
                'updatedAt': conversation.get('updatedAt'),
                'metadata': conversation.get('metadata', {})
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
            'Access-Control-Allow-Methods': 'GET, OPTIONS'
        },
        'body': json.dumps({'success': True, **data}, ensure_ascii=False, default=decimal_to_number)
    }


def error_response(status_code, error_message):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, OPTIONS'
        },
        'body': json.dumps({'success': False, 'error': error_message}, ensure_ascii=False)
    }