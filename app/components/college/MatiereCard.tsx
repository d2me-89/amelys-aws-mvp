/**
 * Composant MatiereCard
 * 
 * Carte individuelle représentant une matière ou une épreuve.
 * Inclut :
 * - Icône avec effet de brillance au hover
 * - Badge du nombre de séances
 * - Titre de la matière
 * - Espace réservé pour la progression future
 * 
 * Props:
 * - matiere: Objet contenant les infos de la matière
 * - isHovered: État du hover géré par le parent
 * - onHoverChange: Callback pour notifier le changement de hover
 * 
 * Avantage : Composant réutilisable pour matières ET épreuves du brevet
 */

"use client";

import React from 'react';
import Link from 'next/link';
import { Matiere } from '@/app/utils/college/types';
import {
  getCardStyle,
  getCardHeaderStyle,
  getIconContainerStyle,
  getGlowEffectStyle,
  getBadgeStyle,
  getCardTitleStyle,
  getCardBodyStyle,
  getProgressPlaceholderStyle,
} from '@/app/utils/ui/styles';

type MatiereCardProps = {
  matiere: Matiere;
  isHovered: boolean;
  onHoverChange: (id: string | null) => void;
};

export const MatiereCard: React.FC<MatiereCardProps> = ({ 
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
        {/* En-tête avec gradient */}
        <div style={getCardHeaderStyle()}>
          {/* Effet de brillance */}
          <div style={getGlowEffectStyle()} />

          {/* Icône avec effet lumineux au hover */}
          <div style={getIconContainerStyle(isHovered)}>
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
          {/* Badge du nombre de séances */}
          <div style={getBadgeStyle()}>
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