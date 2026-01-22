/**
 * MessageList
 * 
 * Conteneur scrollable qui affiche la liste des messages
 * et gère le scroll automatique.
 */

"use client";

import React, { useRef, useEffect } from 'react';
import { Message, ContentInfo } from '../types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { LoadingIndicator } from './LoadingIndicator';
import { StartScreen } from './StartScreen';
import { COLORS } from '../styles/animations';

interface MessageListProps {
  /** Liste des messages à afficher */
  messages: Message[];
  /** ID de conversation (null si pas encore démarrée) */
  conversationId: string | null;
  /** Chargement initial de la conversation */
  isLoadingConversation: boolean;
  /** Chargement d'une réponse */
  isLoading: boolean;
  /** ID du message en cours de streaming */
  streamingMessageId: string | null;
  /** Message d'erreur */
  error: string | null;
  /** Informations sur le contenu */
  contentInfo: ContentInfo;
  /** Callback pour démarrer la conversation */
  onStart: () => void;
  /** Texte du bouton de démarrage */
  startButtonText?: string;
}

export function MessageList({
  messages,
  conversationId,
  isLoadingConversation,
  isLoading,
  streamingMessageId,
  error,
  contentInfo,
  onStart,
  startButtonText,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);

  // Scroll vers le dernier message utilisateur
  useEffect(() => {
    if (lastUserMessageRef.current) {
      setTimeout(() => {
        lastUserMessageRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 50);
    }
  }, [messages]);

  // Scroll instantané vers le bas lors du chargement initial
  useEffect(() => {
    if (!isLoadingConversation && containerRef.current && messages.length > 0) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [isLoadingConversation, messages.length]);

  // Déterminer quoi afficher
  const showStartScreen = messages.length === 0 && !conversationId;
  const showLoadingIndicator = isLoadingConversation;
  const showMessages = !showStartScreen && !showLoadingIndicator;

  return (
    <div 
      ref={containerRef}
      style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '2rem 1rem',
        scrollBehavior: 'smooth',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
          marginBottom: '50px',
        }}
      >
        {/* Loader initial */}
        {showLoadingIndicator && (
          <LoadingIndicator text="Chargement de la conversation..." />
        )}

        {/* Écran de démarrage */}
        {showStartScreen && !showLoadingIndicator && (
          <StartScreen
            contentInfo={contentInfo}
            isLoading={isLoading}
            error={error}
            onStart={onStart}
            buttonText={startButtonText}
          />
        )}

        {/* Messages */}
        {showMessages && (
          <>
            {messages.map((msg, index) => {
              const isLastUserMessage = 
                msg.role === 'user' && index === messages.length - 1;
              
              return (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  ref={isLastUserMessage ? lastUserMessageRef : null}
                />
              );
            })}

            {/* Indicateur de frappe */}
            {isLoading && !streamingMessageId && (
              <TypingIndicator />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MessageList;