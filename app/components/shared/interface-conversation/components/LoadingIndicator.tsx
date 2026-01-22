/**
 * LoadingIndicator
 * 
 * Indicateur de chargement générique avec spinner.
 * Utilisé lors du chargement initial de la conversation.
 */

"use client";

import React from 'react';
import { LuRefreshCw } from 'react-icons/lu';
import { COLORS, FONT_SIZES } from '../styles/animations';

interface LoadingIndicatorProps {
  /** Texte à afficher sous le spinner */
  text?: string;
  /** Taille de l'icône */
  size?: number;
}

export function LoadingIndicator({ 
  text = 'Chargement...', 
  size = 48 
}: LoadingIndicatorProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: '1rem',
      }}
    >
      <LuRefreshCw
        size={size}
        style={{ 
          color: COLORS.primary,
          animation: 'spin 1s linear infinite',
        }}
      />
      {text && (
        <p
          style={{
            fontSize: FONT_SIZES.base,
            color: COLORS.textMuted,
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export default LoadingIndicator;