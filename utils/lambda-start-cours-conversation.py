"""
Lambda: amelys-start-cours-conversation
Rôle: Démarrer une nouvelle conversation de COURS INTERACTIF uniquement
Auteur: Amélys Platform

URL Pattern: /{cycle}/{matiere}-{niveau}/chapitre{N}-cours
Exemples:
  - /primaire/mathematiques-cp/chapitre3-cours
  - /college/mathematiques-sixieme/chapitre3-cours
  - /lycee/mathematiques-seconde/chapitre12-cours
"""

import json
import boto3
import uuid
import re
from datetime import datetime

# Clients AWS
dynamodb = boto3.resource('dynamodb')
bedrock_runtime = boto3.client(
    service_name='bedrock-runtime',
    region_name='eu-west-1'
)

# Tables DynamoDB
TABLE_PROMPTS = 'amelys-prompts'
TABLE_CONTENT_DATA = 'amelys-content-data'
TABLE_CONVERSATIONS = 'amelys-conversations'

# Type de prompt (fixe pour cette Lambda)
PROMPT_TYPE = 'COURS-INTERACTIF'

# Mapping des niveaux scolaires
NIVEAU_MAPPING = {
    'cp': 'CP',
    'ce1': 'CE1',
    'ce2': 'CE2',
    'cm1': 'CM1',
    'cm2': 'CM2',
    'sixieme': 'SIXIEME',
    'cinquieme': 'CINQUIEME',
    'quatrieme': 'QUATRIEME',
    'troisieme': 'TROISIEME',
    'seconde': 'SECONDE',
    'premiere': 'PREMIERE',
    'terminale': 'TERMINALE'
}

# Mapping des matières
MATIERE_MAPPING = {
    'mathematiques': 'MATHEMATIQUES',
    'mathsc': 'MATHEMATIQUES-COMPLEMENTAIRES',
    'mathse': 'MATHEMATIQUES-EXPERTES',
    'francais': 'FRANCAIS',
    'philosophie': 'PHILOSOPHIE',
    'histoire': 'HISTOIRE',
    'geographie': 'GEOGRAPHIE',
    'emc': 'ENSEIGNEMENT-MORAL-CIVIQUE',
    'ses': 'SCIENCES-ECONOMIQUES-SOCIALES',
    'hggsp': 'HISTOIRE-GEOGRAPHIE-GEOPOLITIQUE-SCIENCES-POLITIQUES',
    'hlp': 'HUMANITES-LITTERATURE-PHILOSOPHIE',
    'llcea': 'LANGUES-LITTERATURES-CIVILISATIONS-ETRANGERES-ANGLAIS',
    'sciences': 'SCIENCES',
    'es': 'ENSEIGNEMENT-SCIENTIFIQUE',
    'physique-chimie': 'PHYSIQUE-CHIMIE',
    'svt': 'SCIENCES-VIE-TERRE',
    'technologie': 'TECHNOLOGIE',
    'nsi': 'NUMERIQUE-SCIENCES-INFORMATIQUES',
    'sciences-ingenieur': 'SCIENCES-INGENIEUR',
    'anglais': 'ANGLAIS',
    'espagnol': 'ESPAGNOL',
    'allemand': 'ALLEMAND'
}


def fix_encoding(text):
    """Corrige l'encodage UTF-8 mal interprété"""
    if not text or not isinstance(text, str):
        return text
    try:
        return text.encode('latin1').decode('utf-8')
    except (UnicodeDecodeError, UnicodeEncodeError):
        return text


def parse_url_path(path):
    """
    Parse le path de l'URL pour extraire matiere, niveau, chapitre
    
    Exemples:
      /primaire/mathematiques-cp/chapitre3-cours
      → cycle='primaire', matiere='mathematiques', niveau='cp', chapitre='CHAPITRE03'
      
      /college/mathematiques-sixieme/chapitre3-cours
      → cycle='college', matiere='mathematiques', niveau='sixieme', chapitre='CHAPITRE03'
      
      /lycee/mathematiques-seconde/chapitre12-cours
      → cycle='lycee', matiere='mathematiques', niveau='seconde', chapitre='CHAPITRE12'
    
    Returns:
      dict: {cycle, matiere, niveau, chapitre}
    """
    # Pattern: /{cycle}/{matiere}-{niveau}/chapitre{N}-cours
    # cycle peut être: primaire, college, lycee
    pattern = r'/(primaire|college|lycee)/([a-z-]+)-([a-z]+)/chapitre(\d+)-cours'
    
    match = re.match(pattern, path)
    if not match:
        raise ValueError(f"Format d'URL invalide: {path}. Attendu: /{cycle}/{matiere}-{niveau}/chapitre{N}-cours")
    
    cycle = match.group(1)         # 'primaire', 'college', 'lycee'
    matiere_raw = match.group(2)   # 'mathematiques', 'physique-chimie', etc.
    niveau_raw = match.group(3)    # 'sixieme', 'cp', 'seconde', etc.
    chapitre_num = match.group(4)  # '3', '12', etc.
    
    # Convertir le numéro de chapitre en format CHAPITRE01, CHAPITRE02, etc.
    chapitre_code = f"CHAPITRE{int(chapitre_num):02d}"  # 3 → CHAPITRE03, 12 → CHAPITRE12
    
    return {
        'cycle': cycle,
        'matiere': matiere_raw,
        'niveau': niveau_raw,
        'chapitre': chapitre_code
    }


def lambda_handler(event, context):
    """
    Lambda handler pour démarrer une conversation
    
    Input (API Gateway):
    - path: /college/mathematiques-sixieme/chapitre3-cours
    - body: {"userId": "user123"}
    
    Output:
    {
        "success": true,
        "conversationId": "conv_xyz123",
        "message": "Message d'accueil de Claude"
    }
    """
    
    try:
        # ÉTAPE 1 : PARSER LA REQUÊTE
        path = event.get('path', event.get('rawPath', ''))
        print(f"[START] Path reçu: {path}")
        
        body = json.loads(event.get('body', '{}'))
        user_id = body.get('userId')
        
        if not user_id:
            return error_response(400, 'Paramètre manquant: userId requis')
        
        # Parser l'URL et extraire les paramètres
        try:
            url_params = parse_url_path(path)
            cycle = url_params['cycle']
            matiere_raw = url_params['matiere']
            niveau_raw = url_params['niveau']
            chapitre_code = url_params['chapitre']
        except ValueError as e:
            return error_response(400, str(e))
        
        print(f"[PARSE] Cycle: {cycle}, Matière: {matiere_raw}, Niveau: {niveau_raw}, Chapitre: {chapitre_code}")
        
        # Mapper vers les codes DynamoDB
        niveau_code = NIVEAU_MAPPING.get(niveau_raw.lower())
        if not niveau_code:
            return error_response(400, f"Niveau inconnu: {niveau_raw}")
        
        matiere_code = MATIERE_MAPPING.get(matiere_raw.lower())
        if not matiere_code:
            return error_response(400, f"Matière inconnue: {matiere_raw}")
        
        print(f"[MAPPED] Niveau: {niveau_code}, Matière: {matiere_code}, Type: {PROMPT_TYPE}")
        
        # ÉTAPE 2 : CHARGER LE TEMPLATE DE PROMPT
        prompt_table = dynamodb.Table(TABLE_PROMPTS)
        
        prompt_key = f"PROMPT#{PROMPT_TYPE}"
        print(f"[PROMPT] Chargement: {prompt_key}")
        
        prompt_response = prompt_table.get_item(
            Key={'PK': prompt_key, 'SK': 'v1'}
        )
        
        if 'Item' not in prompt_response:
            return error_response(404, f'Template de prompt introuvable: {prompt_key}')
        
        prompt_template = prompt_response['Item']
        print(f"[PROMPT] Template chargé")
        
        # ÉTAPE 3 : CHARGER LES DONNÉES DU CHAPITRE
        content_data_table = dynamodb.Table(TABLE_CONTENT_DATA)
        
        # Construire la clé: "SIXIEME#MATHEMATIQUES#CHAPITRE03"
        content_key = f"{niveau_code}#{matiere_code}#{chapitre_code}"
        
        print(f"[CONTENT] Chargement: {content_key}")
        
        content_response = content_data_table.get_item(
            Key={'PK': content_key, 'SK': 'META'}
        )
        
        if 'Item' not in content_response:
            return error_response(404, f'Chapitre introuvable: {content_key}')
        
        content_data = content_response['Item']
        print(f"[CONTENT] Chapitre chargé: {content_data.get('chapitreTitre')}")
        
        # ÉTAPE 4 : CONSTRUIRE LE PROMPT COMPLET
        print(f"[BUILD] Construction du prompt")
        
        final_prompt = build_full_prompt(prompt_template, content_data)
        
        print(f"[BUILD] Prompt construit: {len(final_prompt)} caractères")
        
        # ÉTAPE 5 : APPELER CLAUDE VIA BEDROCK
        print(f"[CLAUDE] Appel à Claude Sonnet 4.5")
        
        claude_request = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2000,
            "system": [
                {
                    "type": "text",
                    "text": final_prompt,
                    "cache_control": {"type": "ephemeral"}
                }
            ],
            "messages": [
                {
                    "role": "user",
                    "content": "Bonjour ! Je suis prêt à commencer."
                }
            ]
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
        
        print(f"[CACHE] Création: {cache_creation} tokens, Lecture: {cache_read} tokens")
        print(f"[CLAUDE] Réponse reçue: {len(claude_message)} caractères")
        
        # ÉTAPE 6 : SAUVEGARDER LA CONVERSATION
        conversation_id = f"conv_{uuid.uuid4().hex[:12]}"
        conversations_table = dynamodb.Table(TABLE_CONVERSATIONS)
        
        timestamp = datetime.utcnow().isoformat() + 'Z'
        
        conversation_item = {
            'PK': f"USER#{user_id}",
            'SK': f"CONV#{conversation_id}",
            'conversationId': conversation_id,
            'userId': user_id,
            'type': PROMPT_TYPE,
            'contentKey': content_key,
            'systemPrompt': final_prompt,
            'status': 'active',
            'createdAt': timestamp,
            'updatedAt': timestamp,
            'messages': [
                {
                    'id': 'msg_init',
                    'role': 'user',
                    'content': 'Bonjour ! Je suis prêt à commencer.',
                    'timestamp': timestamp
                },
                {
                    'id': f"msg_{uuid.uuid4().hex[:8]}",
                    'role': 'assistant',
                    'content': claude_message,
                    'timestamp': timestamp
                }
            ],
            'messageCount': 2,
            'metadata': {
                'formatChoisi': None,
                'qcmCompleted': False,
                'qcmScore': None
            }
        }
        
        conversations_table.put_item(Item=conversation_item)
        
        print(f"[CONV] Conversation sauvegardée: {conversation_id}")
        
        # ÉTAPE 7 : RETOURNER LA RÉPONSE
        return success_response({
            'conversationId': conversation_id,
            'message': claude_message,
            'contentInfo': {
                'niveau': fix_encoding(content_data.get('niveau', '')),
                'matiere': fix_encoding(content_data.get('matiere', '')),
                'chapitreTitre': fix_encoding(content_data.get('chapitreTitre', '')),
                'themeTitre': fix_encoding(content_data.get('themeTitre', ''))
            }
        })
        
    except Exception as e:
        print(f"[ERROR] {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(500, str(e))


def build_full_prompt(prompt_template, content_data):
    """Construit le prompt COMPLET en injectant les variables"""
    
    niveau = fix_encoding(content_data.get('niveau', 'Niveau inconnu'))
    matiere = fix_encoding(content_data.get('matiere', 'Matière inconnue'))
    chapitre_titre = fix_encoding(content_data.get('chapitreTitre', 'Chapitre'))
    theme_titre = fix_encoding(content_data.get('themeTitre', 'Thème'))
    
    lines = []
    
    # SECTION 1
    lines.append("=" * 80)
    lines.append("🎓 IDENTITÉ ET MISSION")
    lines.append("=" * 80)
    lines.append("")
    lines.append(f"Tu es {prompt_template['identite']['nom']}, {prompt_template['identite']['role']}.")
    lines.append("")
    mission = prompt_template['identite']['mission'].replace('{{chapitreTitre}}', chapitre_titre)
    lines.append(f"**Mission :** {mission}")
    lines.append("")
    
    # SECTION 2
    lines.append("=" * 80)
    lines.append("📚 CONTEXTE DE LA SESSION")
    lines.append("=" * 80)
    lines.append("")
    contexte = (prompt_template['contexte_mission']
        .replace('{{chapitreTitre}}', chapitre_titre)
        .replace('{{themeTitre}}', theme_titre)
        .replace('{{matiere}}', matiere)
        .replace('{{niveau}}', niveau))
    lines.append(contexte)
    lines.append("")
    
    # SECTION 3
    lines.append("=" * 80)
    lines.append("⏱️ FORMATS DE COURS DISPONIBLES")
    lines.append("=" * 80)
    lines.append("")
    for key, fmt in prompt_template['formats_disponibles'].items():
        lines.append(f"**{fmt['code']}. {fmt['label']} ({fmt['duree']}) - {fmt['description']}**")
        lines.append("")
        lines.append("Caractéristiques :")
        for carac in fmt['caracteristiques']:
            lines.append(f"  • {carac}")
        lines.append("")
        lines.append(f"Pédagogie : {fmt['pedagogie']}")
        lines.append("")
    
    # SECTION 4
    lines.append("=" * 80)
    lines.append("🎯 DÉROULEMENT PÉDAGOGIQUE (5 ÉTAPES)")
    lines.append("=" * 80)
    lines.append("")
    
    for etape_key in sorted(prompt_template['deroulement_pedagogique'].keys()):
        etape = prompt_template['deroulement_pedagogique'][etape_key]
        lines.append(f"**📍 ÉTAPE {etape['ordre']} : {etape['titre']}**")
        lines.append(f"Objectif : {etape['objectif']}")
        lines.append("")
        
        if 'duree' in etape:
            lines.append("Durées selon format :")
            for fmt, duree in etape['duree'].items():
                lines.append(f"  • {fmt.capitalize()} : {duree}")
            lines.append("")
        
        if 'contenu' in etape:
            for item in etape['contenu']:
                lines.append(f"  • {item}")
            lines.append("")
        
        if 'methode_pedagogique' in etape:
            lines.append("Méthode pédagogique :")
            for item in etape['methode_pedagogique']:
                lines.append(f"  • {item}")
            lines.append("")
        
        if 'types_de_pauses' in etape:
            lines.append("Types de pauses :")
            for pause in etape['types_de_pauses']:
                lines.append(f"  • {pause}")
            lines.append("")
        
        if 'frequence' in etape:
            lines.append("Fréquence :")
            for fmt, freq in etape['frequence'].items():
                lines.append(f"  • {fmt.capitalize()} : {freq}")
            lines.append("")
        
        if 'methode' in etape:
            lines.append("Méthode :")
            for item in etape['methode']:
                lines.append(f"  • {item}")
            lines.append("")
        
        if 'ton' in etape:
            lines.append(f"Ton : {etape['ton']}")
            lines.append("")
        
        if 'equilibre' in etape:
            lines.append(f"⚖️ {etape['equilibre']}")
            lines.append("")
        
        if 'posture' in etape:
            lines.append(f"👤 Posture : {etape['posture']}")
            lines.append("")
    
    # SECTION 5
    lines.append("=" * 80)
    lines.append("✅ CONDITIONS DE VALIDATION DU STATUT 'COMPLET'")
    lines.append("=" * 80)
    lines.append("")
    lines.append(prompt_template['conditions_validation_statut_complet']['introduction'])
    lines.append("")
    
    cond1 = prompt_template['conditions_validation_statut_complet']['condition1']
    lines.append(f"**📋 CONDITION 1 : {cond1['titre']}**")
    lines.append("Critères d'exigence :")
    for crit in cond1['criteres']:
        lines.append(f"  • {crit}")
    lines.append("")
    lines.append(f"⚠️ {cond1['exclusion_explicite']}")
    lines.append(f"Raison : {cond1['raison']}")
    lines.append("")
    
    cond2 = prompt_template['conditions_validation_statut_complet']['condition2']
    lines.append(f"**📋 CONDITION 2 : {cond2['titre']}**")
    lines.append("Modalités du QCM :")
    for key, val in cond2['modalites_qcm'].items():
        lines.append(f"  • {key.replace('_', ' ').capitalize()} : {val}")
    lines.append("")
    lines.append("Processus post-QCM :")
    for proc in cond2['processus_post_qcm']:
        lines.append(f"  • {proc}")
    lines.append("")
    
    # SECTION 6
    lines.append("=" * 80)
    lines.append("⚖️ RÈGLE DE DÉCISION FINALE")
    lines.append("=" * 80)
    lines.append("")
    
    regle = prompt_template['regle_decision_finale']
    lines.append(regle['introduction'])
    lines.append("")
    
    lines.append(f"✅ **{regle['cas_validation_accordee']['condition']} :**")
    lines.append(f'"{regle["cas_validation_accordee"]["message_type"]}"')
    lines.append("")
    
    lines.append(f"❌ **{regle['cas_validation_refusee']['condition']} :**")
    lines.append(f'"{regle["cas_validation_refusee"]["message_type"]}"')
    lines.append("")
    lines.append(f"Ton : {regle['cas_validation_refusee']['ton']}")
    lines.append("")
    
    # SECTION 7
    lines.append("=" * 80)
    lines.append("✍️ STYLE ET REGISTRE DE LANGAGE")
    lines.append("=" * 80)
    lines.append("")
    
    style = prompt_template['style_et_registre']
    desc = style['description'].replace('{{niveau}}', niveau)
    lines.append(desc)
    lines.append("")
    lines.append("Caractéristiques stylistiques :")
    for carac in style['caracteristiques_stylistiques']:
        lines.append(f"  • {carac}")
    lines.append("")
    lines.append("Tournures privilégiées :")
    for tournure in style['tournures_privilegiees']:
        lines.append(f"  • {tournure}")
    lines.append("")
    
    # SECTION 8
    lines.append("=" * 80)
    lines.append("⚠️ CONSIGNES OPÉRATIONNELLES IMPÉRATIVES")
    lines.append("=" * 80)
    lines.append("")
    
    consignes = prompt_template['consignes_operationnelles_imperatives']
    lines.append(consignes['introduction'])
    lines.append("")
    
    for regle in consignes['regles']:
        lines.append(f"**{regle['numero']}. {regle['titre']}**")
        for detail in regle['details']:
            lines.append(f"   • {detail}")
        lines.append("")
    
    # SECTION 9
    lines.append("=" * 80)
    lines.append("🚀 PROTOCOLE DE DÉMARRAGE DE L'INTERACTION")
    lines.append("=" * 80)
    lines.append("")
    
    proto = prompt_template['protocole_demarrage']
    lines.append(proto['introduction'])
    lines.append("")
    
    for phase_key in ['phase1', 'phase2', 'phase3', 'phase4']:
        phase = proto[phase_key]
        lines.append(f"**{phase['titre']}**")
        if 'objectif' in phase:
            lines.append(f"Objectif : {phase['objectif']}")
        
        if 'exemple_formulation' in phase:
            formulation = (phase['exemple_formulation']
                .replace('{{matiere}}', matiere)
                .replace('{{chapitreTitre}}', chapitre_titre)
                .replace('{{themeTitre}}', theme_titre))
            lines.append(f'Exemple : "{formulation}"')
        
        if 'regle_absolue' in phase:
            lines.append(phase['regle_absolue'])
        
        if 'posture' in phase:
            lines.append(f"Posture : {phase['posture']}")
        
        lines.append("")
    
    # SECTION 10
    lines.append("=" * 80)
    lines.append("🎓 DERNIÈRE INSTRUCTION")
    lines.append("=" * 80)
    lines.append("")
    
    derniere = prompt_template['derniere_instruction']
    lines.append(derniere['message'])
    lines.append("")
    lines.append("Commence dès maintenant par :")
    for action in derniere['actions_immediates']:
        lines.append(f"  • {action}")
    lines.append("")
    lines.append(derniere['conclusion'])
    
    final_prompt = "\n".join(lines)
    
    print(f"[PROMPT] Construit: {len(final_prompt)} caractères")
    
    return final_prompt


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