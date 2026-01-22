/**
 * ChatInput
 * 
 * Zone de saisie de message avec textarea auto-resize et bouton d'envoi.
 */

"use client";

import React, { useState } from 'react';
import { LuSend, LuRefreshCw } from 'react-icons/lu';
import { COLORS, BORDERS, FONT_SIZES, TRANSITIONS } from '../styles/animations';

interface ChatInputProps {
  /** Valeur actuelle du textarea */
  value: string;
  /** Callback lors du changement de valeur */
  onChange: (value: string) => void;
  /** Callback lors de l'envoi */
  onSend: () => void;
  /** Désactive la saisie */
  disabled?: boolean;
  /** En cours de chargement (affiche spinner) */
  isLoading?: boolean;
  /** Placeholder du textarea */
  placeholder?: string;
  /** Message d'erreur à afficher */
  error?: string | null;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  isLoading = false,
  placeholder = 'Message Amélys...',
  error,
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const canSend = value.trim() && !disabled && !isLoading;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (canSend) {
        onSend();
      }
    }
  };

  return (
    <div
      style={{
        padding: '1rem 1.5rem',
        borderTop: `1px solid ${COLORS.border}`,
        background: COLORS.background,
        flexShrink: 0,
        position: 'fixed',
        bottom: '2vh',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '800px',
      }}
    >
      {/* Container principal */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          background: COLORS.surface,
          border: `2px solid ${isFocused ? COLORS.borderFocus : COLORS.border}`,
          borderRadius: BORDERS.radiusLg,
          transition: `border-color ${TRANSITIONS.default}`,
        }}
      >
        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: COLORS.text,
            fontSize: FONT_SIZES.lg,
            resize: 'none',
            outline: 'none',
            minHeight: '20px',
            maxHeight: '150px',
            fontFamily: 'inherit',
            lineHeight: '1.5',
          }}
        />

        {/* Bouton envoi */}
        <button
          onClick={onSend}
          disabled={!canSend}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: BORDERS.radiusMd,
            background: canSend
              ? `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`
              : 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            cursor: canSend ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: `all ${TRANSITIONS.default}`,
            flexShrink: 0,
            opacity: canSend ? 1 : 0.5,
          }}
        >
          {isLoading ? (
            <LuRefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <LuSend size={18} />
          )}
        </button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div
          style={{
            maxWidth: '800px',
            margin: '0.5rem auto 0',
            padding: '0.75rem 1rem',
            background: COLORS.errorBg,
            border: `1px solid ${COLORS.errorBorder}`,
            borderRadius: BORDERS.radiusMd,
            color: COLORS.errorText,
            fontSize: FONT_SIZES.sm,
          }}
        >
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

export default ChatInput;