/**
 * MessageActions
 * 
 * Boutons d'action qui apparaissent sous les messages de l'assistant.
 * Permet de copier, régénérer, liker/disliker un message.
 */

"use client";

import React from 'react';
import {
  LuCopy,
  LuRefreshCw,
  LuThumbsUp,
  LuThumbsDown,
  LuEllipsis,
} from 'react-icons/lu';
import { COLORS, BORDERS, TRANSITIONS } from '../styles/animations';

// ============================================
// 🔘 ACTION BUTTON
// ============================================

interface ActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  title?: string;
}

function ActionButton({ icon, onClick, title }: ActionButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button 
      onClick={onClick}
      title={title}
      style={{
        width: '28px',
        height: '28px',
        borderRadius: BORDERS.radiusSm,
        background: isHovered ? COLORS.primaryLight : COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        color: isHovered ? COLORS.text : COLORS.textMuted,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: `all ${TRANSITIONS.default}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </button>
  );
}

// ============================================
// 📋 MESSAGE ACTIONS
// ============================================

interface MessageActionsProps {
  /** Visibilité des actions */
  visible: boolean;
  /** Callback pour copier le message */
  onCopy: () => void;
  /** Callback pour régénérer la réponse */
  onRegenerate?: () => void;
  /** Callback pour liker */
  onLike?: () => void;
  /** Callback pour disliker */
  onDislike?: () => void;
  /** Callback pour le menu "plus" */
  onMore?: () => void;
}

export function MessageActions({
  visible,
  onCopy,
  onRegenerate,
  onLike,
  onDislike,
  onMore,
}: MessageActionsProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        transition: `opacity ${TRANSITIONS.default}, visibility ${TRANSITIONS.default}`,
      }}
    >
      <ActionButton 
        icon={<LuCopy size={14} />} 
        onClick={onCopy} 
        title="Copier"
      />
      {onRegenerate && (
        <ActionButton 
          icon={<LuRefreshCw size={14} />} 
          onClick={onRegenerate} 
          title="Régénérer"
        />
      )}
      {onLike && (
        <ActionButton 
          icon={<LuThumbsUp size={14} />} 
          onClick={onLike} 
          title="J'aime"
        />
      )}
      {onDislike && (
        <ActionButton 
          icon={<LuThumbsDown size={14} />} 
          onClick={onDislike} 
          title="Je n'aime pas"
        />
      )}
      {onMore && (
        <ActionButton 
          icon={<LuEllipsis size={14} />} 
          onClick={onMore} 
          title="Plus d'options"
        />
      )}
    </div>
  );
}

export default MessageActions;