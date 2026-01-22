/**
 * MessageBubble
 * 
 * Affiche un message dans la conversation avec un style différent
 * selon qu'il s'agit d'un message utilisateur ou assistant.
 * Supporte le rendu Markdown pour les messages de l'assistant.
 */

"use client";

import React, { useState, forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { LuBot } from 'react-icons/lu';
import { Message } from '../types';
import { MessageActions } from './MessageActions';
import { COLORS, BORDERS, FONT_SIZES } from '../styles/animations';

// ============================================
// 🎨 MARKDOWN COMPONENTS
// ============================================

const markdownComponents = {
  h1: ({ node, ...props }: any) => (
    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem', marginBottom: '0.5rem' }} {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '1rem', marginBottom: '0.5rem' }} {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.75rem', marginBottom: '0.5rem' }} {...props} />
  ),
  h4: ({ node, ...props }: any) => (
    <h4 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '0.75rem', marginBottom: '0.5rem' }} {...props} />
  ),
  strong: ({ node, ...props }: any) => (
    <strong style={{ fontWeight: 700, color: '#fff' }} {...props} />
  ),
  em: ({ node, ...props }: any) => (
    <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }} {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }} {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }} {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li style={{ marginBottom: '0.25rem' }} {...props} />
  ),
  p: ({ node, ...props }: any) => (
    <p style={{ marginBottom: '0.75rem' }} {...props} />
  ),
  code: ({ node, inline, ...props }: any) => 
    inline ? (
      <code style={{ 
        background: 'rgba(159, 122, 234, 0.2)', 
        padding: '0.15rem 0.4rem', 
        borderRadius: '4px',
        fontSize: '0.95em',
        fontFamily: 'monospace'
      }} {...props} />
    ) : (
      <code style={{ 
        display: 'block',
        background: 'rgba(0,0,0,0.3)', 
        padding: '1rem', 
        borderRadius: '8px',
        fontSize: '0.95em',
        fontFamily: 'monospace',
        overflowX: 'auto',
        marginTop: '0.5rem',
        marginBottom: '0.5rem'
      }} {...props} />
    ),
  hr: ({ node, ...props }: any) => (
    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)', margin: '1rem 0' }} {...props} />
  ),
  blockquote: ({ node, ...props }: any) => (
    <blockquote style={{ 
      borderLeft: `3px solid ${COLORS.primary}`, 
      paddingLeft: '1rem', 
      marginLeft: 0,
      fontStyle: 'italic',
      color: 'rgba(255,255,255,0.8)'
    }} {...props} />
  ),
};

// ============================================
// 💬 MESSAGE BUBBLE
// ============================================

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ message }, ref) => {
    const isUser = message.role === 'user';
    const [showActions, setShowActions] = useState(false);

    const handleCopy = () => {
      const messageElement = document.querySelector(`[data-message-id="${message.id}"] .message-content`);
      if (messageElement) {
        navigator.clipboard.writeText((messageElement as HTMLElement).innerText);
      } else {
        navigator.clipboard.writeText(message.content);
      }
    };

    return (
      <div
        ref={ref}
        data-message-id={message.id}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        style={{
          display: 'flex',
          gap: '1rem',
          maxWidth: '800px',
          marginLeft: isUser ? 'auto' : '0',
          flexDirection: isUser ? 'row-reverse' : 'row',
          position: 'relative',
          scrollMarginTop: '20px',
          minHeight: message.isLatestAssistant ? 'calc(100vh - 250px)' : 'auto',
        }}
      >
        {/* Avatar assistant */}
        {!isUser && (
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: '#fff',
            }}
          >
            <LuBot size={20} />
          </div>
        )}

        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* Bulle de message */}
          <div 
            className="message-content"
            style={{
              background: isUser ? COLORS.userBubble : COLORS.assistantBubble,
              padding: '1rem 1.25rem',
              borderRadius: BORDERS.radiusLg,
              color: COLORS.text,
              lineHeight: '1.6',
              fontSize: FONT_SIZES.lg,
            }}
          >
            {isUser ? (
              <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
            ) : (
              <ReactMarkdown components={markdownComponents}>
                {message.content}
              </ReactMarkdown>
            )}
          </div>

          {/* Actions (uniquement pour l'assistant) */}
          {!isUser && (
            <MessageActions
              visible={showActions}
              alwaysShow={message.isLatestAssistant}
              onCopy={handleCopy}
              onRegenerate={() => {}}
              onLike={() => {}}
              onDislike={() => {}}
              onMore={() => {}}
            />
          )}
        </div>
      </div>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';

export default MessageBubble;