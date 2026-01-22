/**
 * Hook useConversation
 * 
 * Hook principal pour gérer l'état et la logique d'une conversation Amélys.
 * Centralise la gestion des messages, le démarrage de conversation, 
 * et la persistance via localStorage.
 */

"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Message,
  ContentConfig,
  UseConversationReturn,
} from '../types';
import {
  startConversation as apiStartConversation,
  sendMessage as apiSendMessage,
  getConversation as apiGetConversation,
  buildStorageKey,
  saveConversationId,
  getStoredConversationId,
  removeStoredConversationId,
  saveUserId,
  getStoredUserId,
  generateTempUserId,
} from '../api';
import { useStreamText } from './useStreamText';

interface UseConversationOptions {
  /** Configuration du contenu (matière, chapitre, etc.) */
  config: ContentConfig;
  /** Délai avant de démarrer le streaming (défaut: 300ms) */
  streamDelay?: number;
  /** Vitesse du streaming en ms par mot (défaut: 30ms) */
  streamSpeed?: number;
}

export function useConversation(options: UseConversationOptions): UseConversationReturn {
  const { config, streamDelay = 300, streamSpeed = 30 } = options;
  
  // Clé de stockage unique pour ce contenu
  const storageKey = buildStorageKey(config);

  // ============================================
  // 📊 ÉTAT
  // ============================================
  
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  
  // Ref pour le texte complet en cours de streaming
  const fullTextRef = useRef<string>('');

  // ============================================
  // 🌊 STREAMING
  // ============================================

  const { startStreaming, stopStreaming } = useStreamText({
    speed: streamSpeed,
    onUpdate: (text, isComplete) => {
      setMessages(prev => prev.map(msg => 
        msg.id === streamingMessageId 
          ? { ...msg, content: text, isStreaming: !isComplete }
          : msg
      ));
    },
    onComplete: () => {
      setStreamingMessageId(null);
    },
  });

  // ============================================
  // 💾 CHARGEMENT INITIAL
  // ============================================

  useEffect(() => {
    const loadExistingConversation = async () => {
      const savedConversationId = getStoredConversationId(storageKey);
      
      if (!savedConversationId) {
        setIsLoadingConversation(false);
        return;
      }

      console.log('[LOAD] Tentative de chargement:', savedConversationId);

      try {
        const savedUserId = getStoredUserId();
        
        if (!savedUserId) {
          console.log('[LOAD] Pas de userId sauvegardé');
          removeStoredConversationId(storageKey);
          setIsLoadingConversation(false);
          return;
        }

        const response = await apiGetConversation(savedConversationId, savedUserId);
        
        if (response.success && response.conversation) {
          const conv = response.conversation;
          
          console.log('[LOAD] Conversation chargée:', conv.messageCount, 'messages');
          
          setConversationId(conv.conversationId);
          
          // Convertir les messages (filtrer le message initial automatique)
          const loadedMessages: Message[] = conv.messages
            .filter((msg) => !(msg.role === 'user' && msg.id === 'init'))
            .map((msg) => ({
              id: msg.id,
              role: msg.role,
              content: msg.content,
              isLatestAssistant: false,
              isStreaming: false,
            }));

          // Marquer le dernier message assistant
          for (let i = loadedMessages.length - 1; i >= 0; i--) {
            if (loadedMessages[i].role === 'assistant') {
              loadedMessages[i].isLatestAssistant = true;
              break;
            }
          }

          setMessages(loadedMessages);
        }
        
      } catch (err) {
        console.error('[LOAD] Erreur:', err);
        removeStoredConversationId(storageKey);
      } finally {
        setIsLoadingConversation(false);
      }
    };

    loadExistingConversation();
  }, [storageKey]);

  // ============================================
  // 🚀 DÉMARRER UNE CONVERSATION
  // ============================================

  const startConversation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Générer ou récupérer userId
      let userId = getStoredUserId();
      if (!userId) {
        userId = generateTempUserId();
        saveUserId(userId);
      }
      
      console.log('[START] Démarrage de la conversation...');
      const response = await apiStartConversation(config, userId);
      
      console.log('[START] Conversation démarrée:', response.conversationId);
      
      setConversationId(response.conversationId);
      
      // Sauvegarder dans localStorage
      saveConversationId(storageKey, response.conversationId);
      console.log('[SAVE] Conversation sauvegardée dans localStorage');
      
      // Créer le message assistant vide pour le streaming
      const assistantMsgId = 'welcome';
      fullTextRef.current = response.message;
      
      setMessages([{
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        isLatestAssistant: true,
        isStreaming: true,
      }]);

      setStreamingMessageId(assistantMsgId);
      
      // Démarrer le streaming après un délai
      setTimeout(() => {
        startStreaming(response.message);
      }, streamDelay);
      
    } catch (err) {
      console.error('[START] Erreur:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  }, [config, storageKey, streamDelay, startStreaming]);

  // ============================================
  // 💬 ENVOYER UN MESSAGE
  // ============================================

  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || !conversationId) return;
    
    setError(null);
    
    // Retirer le flag isLatestAssistant des messages existants
    setMessages(prev => prev.map(msg => ({
      ...msg,
      isLatestAssistant: false,
    })));
    
    // Ajouter le message utilisateur immédiatement
    const userMsgId = `user_${Date.now()}`;
    setMessages(prev => [...prev, { 
      id: userMsgId, 
      role: 'user', 
      content: messageText,
    }]);
    
    setIsLoading(true);
    
    try {
      console.log('[SEND] Envoi du message...');
      const response = await apiSendMessage(conversationId, messageText);
      
      console.log('[SEND] Réponse reçue:', response.messageId);
      
      // Ajouter le message assistant vide pour le streaming
      const assistantMsgId = response.messageId;
      fullTextRef.current = response.message;
      
      setMessages(prev => [...prev, { 
        id: assistantMsgId,
        role: 'assistant', 
        content: '',
        isLatestAssistant: true,
        isStreaming: true,
      }]);

      setStreamingMessageId(assistantMsgId);
      setIsLoading(false);
      
      // Démarrer le streaming
      setTimeout(() => {
        startStreaming(response.message);
      }, streamDelay);
      
    } catch (err) {
      console.error('[SEND] Erreur:', err);
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi du message");
      
      // Retirer le message utilisateur en cas d'erreur
      setMessages(prev => prev.filter(m => m.id !== userMsgId));
      setIsLoading(false);
    }
  }, [conversationId, streamDelay, startStreaming]);

  // ============================================
  // 🔄 RÉINITIALISER
  // ============================================

  const resetConversation = useCallback(() => {
    stopStreaming();
    removeStoredConversationId(storageKey);
    setConversationId(null);
    setMessages([]);
    setStreamingMessageId(null);
    setError(null);
    console.log('[RESET] Conversation réinitialisée');
  }, [storageKey, stopStreaming]);

  // ============================================
  // 🧹 CLEAR ERROR
  // ============================================

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // ============================================
  // 📤 RETOUR
  // ============================================

  return {
    // État
    conversationId,
    messages,
    isLoading,
    isLoadingConversation,
    error,
    streamingMessageId,
    
    // Actions
    startConversation,
    sendMessage,
    resetConversation,
    clearError,
  };
}

export default useConversation;
