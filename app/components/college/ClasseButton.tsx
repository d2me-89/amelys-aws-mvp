/**
 * Composant ClasseButton
 * 
 * Bouton de sélection de classe avec effet hover et état sélectionné.
 * 
 * Props:
 * - classe: Objet contenant id et label de la classe
 * - isSelected: Indique si ce bouton est actuellement sélectionné
 * - onClick: Callback appelé lors du clic
 * 
 * Avantage : Composant réutilisable, logique d'hover encapsulée
 */

"use client";

import React, { useState, CSSProperties } from 'react';
import { Classe } from '@/app/utils/college/types';
import { getButtonStyle, getButtonHoverStyle } from '@/app/utils/ui/styles';

type ClasseButtonProps = {
  classe: Classe;
  isSelected: boolean;
  onClick: () => void;
};

export const ClasseButton: React.FC<ClasseButtonProps> = ({ 
  classe, 
  isSelected, 
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!isSelected) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isSelected) {
      setIsHovered(false);
    }
  };

  // Calcul du style final
  const baseStyle = getButtonStyle(isSelected);
  const hoverStyle = getButtonHoverStyle();
  const finalStyle: CSSProperties = isHovered && !isSelected
    ? { ...baseStyle, ...hoverStyle }
    : baseStyle;

  return (
    <button
      onClick={onClick}
      style={finalStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-pressed={isSelected}
      aria-label={`Sélectionner la classe de ${classe.label}`}
    >
      {classe.label}
    </button>
  );
};