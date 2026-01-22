/**
 * StartScreen
 * 
 * Écran affiché avant le démarrage d'une conversation.
 * Présente le contenu et propose un bouton pour commencer.
 */

"use client";

import React, { useState } from 'react';
import { LuRefreshCw } from 'react-icons/lu';
import { ContentInfo } from '../types';
import { COLORS, BORDERS, FONT_SIZES, SHADOWS, TRANSITIONS } from '../styles/animations';

interface StartScreenProps {
  /** Informations sur le contenu à afficher */
  contentInfo: ContentInfo;
  /** État de chargement */
  isLoading: boolean;
  /** Message d'erreur éventuel */
  error: string | null;
  /** Callback lors du clic sur "Commencer" */
  onStart: () => void;
  /** Texte du bouton (défaut: "Commencer le cours") */
  buttonText?: string;
}

export function StartScreen({
  contentInfo,
  isLoading,
  error,
  onStart,
  buttonText = 'Commencer le cours',
}: StartScreenProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: '1.5rem',
      }}
    >
      {/* Emoji */}
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        {contentInfo.emoji}
      </div>

      {/* Titre */}
      <h2
        style={{
          fontSize: FONT_SIZES.xxl,
          fontWeight: 600,
          color: COLORS.text,
          margin: 0,
          textAlign: 'center',
        }}
      >
        {contentInfo.titre}
      </h2>

      {/* Sous-titre */}
      {contentInfo.sousTitre && (
        <p
          style={{
            fontSize: FONT_SIZES.lg,
            color: COLORS.textMuted,
            margin: 0,
            textAlign: 'center',
          }}
        >
          {contentInfo.sousTitre}
        </p>
      )}

      {/* Description */}
      {contentInfo.description && (
        <p
          style={{
            fontSize: FONT_SIZES.base,
            color: COLORS.textMuted,
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: '1.6',
            margin: 0,
          }}
        >
          {contentInfo.description}
        </p>
      )}

      {/* Bouton Commencer */}
      <button
        onClick={onStart}
        disabled={isLoading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          marginTop: '1rem',
          padding: '1rem 2rem',
          fontSize: FONT_SIZES.lg,
          fontWeight: 600,
          color: '#fff',
          background: isLoading 
            ? 'rgba(159, 122, 234, 0.5)' 
            : `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
          border: 'none',
          borderRadius: BORDERS.radiusLg,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: `all ${TRANSITIONS.default}`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: SHADOWS.glow,
          transform: isHovered && !isLoading ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        {isLoading ? (
          <>
            <LuRefreshCw size={20} style={{ animation: 'spin 1s linear infinite' }} />
            Démarrage en cours...
          </>
        ) : (
          buttonText
        )}
      </button>

      {/* Erreur */}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

/**
 * Composant d'affichage d'erreur
 */
function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      style={{
        padding: '1rem',
        background: COLORS.errorBg,
        border: `1px solid ${COLORS.errorBorder}`,
        borderRadius: BORDERS.radiusMd,
        color: COLORS.errorText,
        fontSize: FONT_SIZES.sm,
        maxWidth: '600px',
        textAlign: 'center',
      }}
    >
      ⚠️ {message}
    </div>
  );
}

export default StartScreen;