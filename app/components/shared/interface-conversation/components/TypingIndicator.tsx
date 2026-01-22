/**
 * TypingIndicator
 * 
 * Animation "..." qui s'affiche pendant que l'assistant génère sa réponse.
 */

"use client";

import React from 'react';
import { LuBot } from 'react-icons/lu';
import { COLORS } from '../styles/animations';

interface TypingIndicatorProps {
  /** Afficher ou non l'indicateur */
  visible?: boolean;
}

export function TypingIndicator({ visible = true }: TypingIndicatorProps) {
  if (!visible) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        maxWidth: '800px',
      }}
    >
      {/* Avatar */}
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
        }}
      >
        <LuBot size={20} style={{ color: '#fff' }} />
      </div>

      {/* Bulle avec animation */}
      <div
        style={{
          background: COLORS.surface,
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <TypingDot delay={0} />
        <TypingDot delay={0.2} />
        <TypingDot delay={0.4} />
      </div>
    </div>
  );
}

/**
 * Un point animé de l'indicateur de frappe
 */
function TypingDot({ delay }: { delay: number }) {
  return (
    <div
      style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: COLORS.primary,
        animation: `typing 1.4s infinite ease-in-out ${delay}s`,
      }}
    />
  );
}

export default TypingIndicator;