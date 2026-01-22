/**
 * ConversationLayout
 * 
 * Layout principal pour une interface de conversation.
 * Combine tous les composants (header, messages, input) en une interface cohérente.
 */

"use client";

import React, { useState } from 'react';
import { ContentConfig, ContentInfo } from '../types';
import { useConversation } from '../hooks/useConversation';
import { ConversationHeader } from './ConversationHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { conversationAnimations, COLORS } from '../styles/animations';

interface ConversationLayoutProps {
  /** Configuration du contenu (matière, chapitre, etc.) */
  config: ContentConfig;
  /** Informations d'affichage du contenu */
  contentInfo: ContentInfo;
  /** Titre affiché dans le header */
  headerTitle: string;
  /** Texte du bouton de démarrage */
  startButtonText?: string;
  /** Placeholder de la zone de saisie */
  inputPlaceholder?: string;
}

export function ConversationLayout({
  config,
  contentInfo,
  headerTitle,
  startButtonText = 'Commencer le cours',
  inputPlaceholder = 'Message Amélys...',
}: ConversationLayoutProps) {
  const [inputValue, setInputValue] = useState('');

  // Hook de conversation
  const {
    conversationId,
    messages,
    isLoading,
    isLoadingConversation,
    error,
    streamingMessageId,
    startConversation,
    sendMessage,
    resetConversation,
  } = useConversation({ config });

  // Envoi de message
  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const message = inputValue;
    setInputValue('');
    await sendMessage(message);
  };

  return (
    <>
      <div
        style={{ 
          display: 'flex', 
          height: '100vh',
          background: COLORS.background,
        }}
      >
        {/* Zone principale */}
        <div
          style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <ConversationHeader
            title={headerTitle}
            onReset={resetConversation}
          />

          {/* Liste des messages */}
          <MessageList
            messages={messages}
            conversationId={conversationId}
            isLoadingConversation={isLoadingConversation}
            isLoading={isLoading}
            streamingMessageId={streamingMessageId}
            error={error}
            contentInfo={contentInfo}
            onStart={startConversation}
            startButtonText={startButtonText}
          />

          {/* Zone de saisie (uniquement si conversation active) */}
          {conversationId && (
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              disabled={!!streamingMessageId}
              isLoading={isLoading && !streamingMessageId}
              placeholder={inputPlaceholder}
              error={conversationId ? error : null}
            />
          )}
        </div>
      </div>

      {/* Animations globales */}
      <style jsx global>{conversationAnimations}</style>
    </>
  );
}

export default ConversationLayout;