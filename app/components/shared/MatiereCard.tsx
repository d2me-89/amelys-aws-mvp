/**
 * Composant MatiereCard unifié pour collège et lycée
 * 
 * Ce composant remplace les deux versions séparées.
 * Il s'adapte automatiquement au cycle (collège/lycée) grâce au système de thèmes.
 * 
 * Props:
 * - matiere: Objet contenant les infos de la matière
 * - isHovered: État du hover géré par le parent
 * - onHoverChange: Callback pour notifier le changement de hover
 * - cycle: 'college' ou 'lycee' pour déterminer le thème de couleurs
 */

"use client";

import React from 'react';
import Link from 'next/link';
import { Matiere, Cycle } from '@/app/utils/shared/types';
import {
  getCardStyle,
  getCardHeaderStyle,
  getIconContainerStyle,
  getGlowEffectStyle,
  getBadgeStyle,
  getCardTitleStyle,
  getCardBodyStyle,
  getProgressPlaceholderStyle,
} from '@/app/utils/ui/theme';

type MatiereCardProps = {
  matiere: Matiere;
  isHovered: boolean;
  onHoverChange: (id: string | null) => void;
  cycle: Cycle;  // 👈 Cette prop détermine le thème (violet ou bleu)
};

export const MatiereCard: React.FC<MatiereCardProps> = ({ 
  matiere, 
  isHovered, 
  onHoverChange,
  cycle  // 👈 On reçoit le cycle en props
}) => {
  return (
    <Link
      href={matiere.path}
      style={{ 
        textDecoration: "none", 
        color: "inherit", 
        display: "block" 
      }}
      onMouseEnter={() => onHoverChange(matiere.id)}
      onMouseLeave={() => onHoverChange(null)}
      aria-label={`Accéder à ${matiere.nom}`}
    >
      <div style={getCardStyle(isHovered)}>
        {/* En-tête avec gradient (couleur selon le cycle) */}
        <div style={getCardHeaderStyle(cycle)}>
          {/* Effet de brillance (couleur selon le cycle) */}
          <div style={getGlowEffectStyle(cycle)} />

          {/* Icône avec effet lumineux au hover (couleur selon le cycle) */}
          <div style={getIconContainerStyle(isHovered, cycle)}>
            <span 
              style={{ fontSize: "1.87rem" }}
              aria-hidden="true"
            >
              {matiere.emoji}
            </span>
          </div>
        </div>

        {/* Corps de la carte */}
        <div style={getCardBodyStyle()}>
          {/* Badge du nombre de séances (couleur selon le cycle) */}
          <div style={getBadgeStyle(cycle)}>
            {matiere.seances} séances
          </div>

          {/* Titre de la matière */}
          <h3 style={getCardTitleStyle()}>
            {matiere.nom}
          </h3>

          {/* Espace réservé pour la progression future */}
          <div style={getProgressPlaceholderStyle()}>
            {/* Futur : % terminé, barre de progression, nombre d'étapes */}
          </div>
        </div>
      </div>
    </Link>
  );
};
