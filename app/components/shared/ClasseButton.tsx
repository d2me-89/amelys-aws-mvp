/**
 * Composant ClasseButton unifié pour collège et lycée
 * 
 * Ce composant remplace les deux versions séparées.
 * Il s'adapte automatiquement au cycle (collège/lycée) grâce au système de thèmes.
 * 
 * Props:
 * - classe: Objet contenant id et label de la classe
 * - isSelected: Indique si ce bouton est actuellement sélectionné
 * - onClick: Callback appelé lors du clic
 * - cycle: 'college' ou 'lycee' pour déterminer le thème de couleurs
 */

"use client";

import React, { useState, CSSProperties } from 'react';
import { Classe, Cycle } from '@/app/utils/shared/types';
import { getButtonStyle, getButtonHoverStyle } from '@/app/utils/ui/theme';

type ClasseButtonProps = {
  classe: Classe;
  isSelected: boolean;
  onClick: () => void;
  cycle: Cycle;  // 👈 Cette prop détermine le thème (violet ou bleu)
};

export const ClasseButton: React.FC<ClasseButtonProps> = ({ 
  classe, 
  isSelected, 
  onClick,
  cycle  // 👈 On reçoit le cycle en props
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

  // 👇 On passe le cycle à la fonction de style
  const baseStyle = getButtonStyle(isSelected, cycle);
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
