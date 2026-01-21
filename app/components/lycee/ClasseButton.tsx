/**
 * Composant ClasseButton pour le lycée
 * 
 * Bouton de sélection de classe avec thème bleu pour le lycée.
 * Identique au composant du collège mais avec les couleurs bleues.
 * 
 * Props:
 * - classe: Objet contenant id et label de la classe
 * - isSelected: Indique si ce bouton est actuellement sélectionné
 * - onClick: Callback appelé lors du clic
 */

"use client";

import React, { useState, CSSProperties } from 'react';
import { Classe } from '@/app/utils/lycee/types';
import { getLyceeButtonStyle, getLyceeButtonHoverStyle } from '@/app/utils/ui/lyceeStyles';

type ClasseButtonProps = {
  classe: Classe;
  isSelected: boolean;
  onClick: () => void;
};

export const LyceeClasseButton: React.FC<ClasseButtonProps> = ({ 
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
  const baseStyle = getLyceeButtonStyle(isSelected);
  const hoverStyle = getLyceeButtonHoverStyle();
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