/**
 * Composant MatiereCard pour le lycée
 * 
 * Carte individuelle avec thème bleu pour les matières et épreuves du lycée.
 * Réutilise les styles communs et applique les couleurs bleues spécifiques.
 * 
 * Props:
 * - matiere: Objet contenant les infos de la matière
 * - isHovered: État du hover géré par le parent
 * - onHoverChange: Callback pour notifier le changement de hover
 */

"use client";

import React from 'react';
import Link from 'next/link';
import { Matiere } from '@/app/utils/lycee/types';
import {
  getCardStyle,
  getCardTitleStyle,
  getCardBodyStyle,
  getProgressPlaceholderStyle,
} from '@/app/utils/ui/styles';
import {
  getLyceeCardHeaderStyle,
  getLyceeIconContainerStyle,
  getLyceeGlowEffectStyle,
  getLyceeBadgeStyle,
} from '@/app/utils/ui/lyceeStyles';

type MatiereCardProps = {
  matiere: Matiere;
  isHovered: boolean;
  onHoverChange: (id: string | null) => void;
};

export const LyceeMatiereCard: React.FC<MatiereCardProps> = ({ 
  matiere, 
  isHovered, 
  onHoverChange 
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
        {/* En-tête avec gradient bleu */}
        <div style={getLyceeCardHeaderStyle()}>
          {/* Effet de brillance bleue */}
          <div style={getLyceeGlowEffectStyle()} />

          {/* Icône avec effet lumineux bleu au hover */}
          <div style={getLyceeIconContainerStyle(isHovered)}>
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
          {/* Badge du nombre de séances (bleu) */}
          <div style={getLyceeBadgeStyle()}>
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