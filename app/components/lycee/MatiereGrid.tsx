/**
 * Composant MatiereGrid pour le lycée
 * 
 * Grille responsive affichant les cartes de matières du lycée.
 * Identique au composant du collège, réutilisable.
 * 
 * Props:
 * - matieres: Tableau de matières à afficher
 * - hoveredCard: ID de la carte actuellement survolée
 * - onHoverChange: Callback pour gérer le changement de hover
 */

"use client";

import React from 'react';
import { Matiere } from '@/app/utils/lycee/types';
import { LyceeMatiereCard } from './MatiereCard';

type MatiereGridProps = {
  matieres: Matiere[];
  hoveredCard: string | null;
  onHoverChange: (id: string | null) => void;
};

export const LyceeMatiereGrid: React.FC<MatiereGridProps> = ({ 
  matieres, 
  hoveredCard, 
  onHoverChange 
}) => {
  if (matieres.length === 0) {
    return null;
  }

  return (
    <div 
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1.5rem",
        maxWidth: "1300px",
        margin: "0 auto"
      }}
      role="list"
    >
      {matieres.map((matiere) => (
        <div key={matiere.id} role="listitem">
          <LyceeMatiereCard
            matiere={matiere}
            isHovered={hoveredCard === matiere.id}
            onHoverChange={onHoverChange}
          />
        </div>
      ))}
    </div>
  );
};