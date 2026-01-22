/**
 * ConversationHeader
 * 
 * Header de la conversation avec titre et menu déroulant d'actions.
 */

"use client";

import React, { useState, useRef } from 'react';
import { 
  LuChevronDown, 
  LuStar, 
  LuCheck, 
  LuRefreshCw 
} from 'react-icons/lu';
import { useClickOutside } from '../hooks/useClickOutside';
import { HeaderMenuItem } from '../types';
import { COLORS, BORDERS, FONT_SIZES, SHADOWS, TRANSITIONS } from '../styles/animations';

interface ConversationHeaderProps {
  /** Titre affiché dans le header */
  title: string;
  /** Callback pour réinitialiser la conversation */
  onReset?: () => void;
  /** Callback pour ajouter aux favoris */
  onFavorite?: () => void;
  /** Callback pour marquer comme complet */
  onMarkComplete?: () => void;
  /** Items personnalisés du menu */
  customMenuItems?: HeaderMenuItem[];
}

export function ConversationHeader({
  title,
  onReset,
  onFavorite,
  onMarkComplete,
  customMenuItems,
}: ConversationHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu au clic extérieur
  useClickOutside(menuRef, () => setShowMenu(false), showMenu);

  // Items du menu par défaut
  const defaultMenuItems: HeaderMenuItem[] = [
    { 
      icon: <LuStar size={16} />, 
      label: 'Ajouter aux favoris',
      onClick: () => {
        onFavorite?.();
        setShowMenu(false);
      },
    },
    { 
      icon: <LuCheck size={16} />, 
      label: 'Marquer comme complet',
      onClick: () => {
        onMarkComplete?.();
        setShowMenu(false);
      },
    },
    { 
      icon: <LuRefreshCw size={16} />, 
      label: 'Nouvelle conversation',
      onClick: () => {
        onReset?.();
        setShowMenu(false);
      },
    },
  ];

  const menuItems = customMenuItems || defaultMenuItems;

  return (
    <header
      style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        background: COLORS.background,
        flexShrink: 0,
      }}
    >
      <div 
        ref={menuRef}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          position: 'relative',
        }}
      >
        {/* Titre */}
        <h1
          style={{
            fontSize: FONT_SIZES.lg,
            fontWeight: 600,
            margin: 0,
            color: COLORS.text,
          }}
        >
          {title}
        </h1>
        
        {/* Bouton menu */}
        <MenuButton 
          isOpen={showMenu} 
          onClick={() => setShowMenu(!showMenu)} 
        />

        {/* Menu déroulant */}
        {showMenu && (
          <DropdownMenu items={menuItems} />
        )}
      </div>
    </header>
  );
}

/**
 * Bouton pour ouvrir/fermer le menu
 */
function MenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'transparent',
        border: 'none',
        color: isHovered ? COLORS.text : COLORS.textMuted,
        cursor: 'pointer',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        transition: `color ${TRANSITIONS.default}`,
      }}
    >
      <LuChevronDown 
        size={18} 
        style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: `transform ${TRANSITIONS.default}`,
        }} 
      />
    </button>
  );
}

/**
 * Menu déroulant
 */
function DropdownMenu({ items }: { items: HeaderMenuItem[] }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        right: 0,
        marginTop: '0.5rem',
        background: 'rgba(30, 30, 35, 0.98)',
        border: `1px solid ${COLORS.border}`,
        borderRadius: BORDERS.radiusMd,
        padding: '0.5rem',
        minWidth: '220px',
        zIndex: 1000,
        boxShadow: SHADOWS.lg,
      }}
    >
      {items.map((item, idx) => (
        <MenuItem key={idx} item={item} />
      ))}
    </div>
  );
}

/**
 * Item du menu
 */
function MenuItem({ item }: { item: HeaderMenuItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={item.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.65rem 0.75rem',
        background: isHovered ? COLORS.primaryLight : 'transparent',
        border: 'none',
        color: COLORS.text,
        fontSize: FONT_SIZES.sm,
        cursor: 'pointer',
        borderRadius: BORDERS.radiusSm,
        transition: `background ${TRANSITIONS.default}`,
        textAlign: 'left',
      }}
    >
      {item.icon}
      {item.label}
    </button>
  );
}

export default ConversationHeader;