import json
import boto3

bedrock_runtime = boto3.client(
    service_name='bedrock-runtime',
    region_name='eu-west-1'
)

def lambda_handler(event, context):
    """
    Lambda handler avec support de l'historique de conversation
    """
    
    try:
        # Récupérer les messages de la conversation
        body = json.loads(event.get('body', '{}'))
        messages = body.get('messages', [])
        
        if not messages:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': 'Aucun message fourni'
                })
            }
        
        # Configuration de la requête pour Claude avec historique
        request_body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2000,
            "messages": messages  # ← Tout l'historique
        }
        
        # Appel à Bedrock
        response = bedrock_runtime.invoke_model(
            modelId='global.anthropic.claude-sonnet-4-5-20250929-v1:0',
            body=json.dumps(request_body)
        )
        
        # Lire la réponse
        response_body = json.loads(response['body'].read())
        assistant_message = response_body['content'][0]['text']
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': assistant_message,
                'model': 'claude-sonnet-4.5'
            })
        }
        
    except Exception as e:
        print(f"Erreur: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }