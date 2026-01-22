/**
 * Fonctions d'appel API pour les conversations Amélys
 * 
 * Ce fichier centralise tous les appels vers le backend AWS.
 */

import {
  ContentConfig,
  StartConversationResponse,
  SendMessageResponse,
  GetConversationResponse,
} from './types';

// ============================================
// 🔧 CONFIGURATION
// ============================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://5gty3ykr4d.execute-api.eu-west-1.amazonaws.com/prod";

// ============================================
// 🛠️ HELPERS
// ============================================

/**
 * Construit le chemin d'URL pour un contenu donné
 */
export function buildContentPath(config: ContentConfig): string {
  const { cycle, matiere, niveau, chapitre, type, exerciceId } = config;
  
  // Format: /{cycle}/{matiere}-{niveau}/chapitre{N}-{type}
  let path = `/${cycle}/${matiere}-${niveau}/chapitre${chapitre}-${type}`;
  
  // Ajouter l'ID d'exercice si présent
  if (type === 'exercice' && exerciceId) {
    path = `/${cycle}/${matiere}-${niveau}/chapitre${chapitre}-exercice${exerciceId}`;
  }
  
  return path;
}

/**
 * Construit la clé de stockage local pour une conversation
 */
export function buildStorageKey(config: ContentConfig): string {
  const { cycle, matiere, niveau, chapitre, type, exerciceId } = config;
  
  let key = `amelys_conv_${cycle}_${matiere}_${niveau}_chapitre${chapitre}_${type}`;
  
  if (type === 'exercice' && exerciceId) {
    key = `amelys_conv_${cycle}_${matiere}_${niveau}_chapitre${chapitre}_exercice${exerciceId}`;
  }
  
  return key;
}

// ============================================
// 📡 FONCTIONS API
// ============================================

/**
 * Démarre une nouvelle conversation ou récupère une existante
 * 
 * @param config - Configuration du contenu (matière, chapitre, etc.)
 * @param userId - ID de l'utilisateur
 * @returns Réponse avec l'ID de conversation et le message initial
 */
export async function startConversation(
  config: ContentConfig,
  userId: string
): Promise<StartConversationResponse> {
  const path = buildContentPath(config);
  
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors du démarrage de la conversation');
  }

  return response.json();
}

/**
 * Envoie un message dans une conversation existante
 * 
 * @param conversationId - ID de la conversation
 * @param message - Contenu du message
 * @returns Réponse avec le message de l'assistant
 */
export async function sendMessage(
  conversationId: string,
  message: string
): Promise<SendMessageResponse> {
  const response = await fetch(
    `${API_URL}/conversation/${conversationId}/message`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erreur lors de l'envoi du message");
  }

  return response.json();
}

/**
 * Récupère une conversation existante
 * 
 * @param conversationId - ID de la conversation
 * @param userId - ID de l'utilisateur
 * @returns Conversation avec tous les messages
 */
export async function getConversation(
  conversationId: string,
  userId: string
): Promise<GetConversationResponse> {
  const response = await fetch(
    `${API_URL}/conversation/${conversationId}?userId=${userId}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de la récupération de la conversation');
  }

  return response.json();
}

// ============================================
// 💾 FONCTIONS LOCALSTORAGE
// ============================================

/**
 * Sauvegarde l'ID de conversation dans localStorage
 */
export function saveConversationId(storageKey: string, conversationId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(storageKey, conversationId);
  }
}

/**
 * Récupère l'ID de conversation depuis localStorage
 */
export function getStoredConversationId(storageKey: string): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(storageKey);
  }
  return null;
}

/**
 * Supprime l'ID de conversation du localStorage
 */
export function removeStoredConversationId(storageKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(storageKey);
  }
}

/**
 * Sauvegarde l'ID utilisateur dans localStorage
 */
export function saveUserId(userId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('amelys_userId', userId);
  }
}

/**
 * Récupère l'ID utilisateur depuis localStorage
 */
export function getStoredUserId(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('amelys_userId');
  }
  return null;
}

/**
 * Génère un ID utilisateur temporaire (pour le développement)
 * TODO: Remplacer par Cognito en production
 */
export function generateTempUserId(): string {
  return `user_demo_${Date.now()}`;
}
