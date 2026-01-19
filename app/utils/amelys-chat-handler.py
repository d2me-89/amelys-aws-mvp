import json
import boto3

# Initialiser le client Bedrock
bedrock_runtime = boto3.client(
    service_name='bedrock-runtime',
    region_name='eu-west-1'  # Votre région (Europe Irlande)
)

def lambda_handler(event, context):
    """
    Lambda handler pour tester la connexion à Claude via Bedrock
    """
    
    try:
        # Message de test simple
        prompt = "Réponds juste 'Connexion réussie !' si tu me reçois."
        
        # Configuration de la requête pour Claude Sonnet 4.5
        request_body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1000,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
        
        # Appel à Bedrock avec Claude Sonnet 4.5
        response = bedrock_runtime.invoke_model(
            modelId='global.anthropic.claude-sonnet-4-5-20250929-v1:0',
            body=json.dumps(request_body)
        )
        
        # Lire et parser la réponse
        response_body = json.loads(response['body'].read())
        
        # Extraire le texte de la réponse
        assistant_message = response_body['content'][0]['text']
        
        # Retourner le succès
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
            }, ensure_ascii=False)
        }
        
    except Exception as e:
        # En cas d'erreur
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
            }, ensure_ascii=False)
        }