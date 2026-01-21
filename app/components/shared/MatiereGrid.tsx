/**
 * Composant MatiereGrid unifié pour collège et lycée
 * 
 * Ce composant remplace les deux versions séparées.
 * Il s'adapte automatiquement au cycle (collège/lycée) en transmettant le cycle aux cartes.
 * 
 * Props:
 * - matieres: Tableau de matières à afficher
 * - hoveredCard: ID de la carte actuellement survolée
 * - onHoverChange: Callback pour gérer le changement de hover
 * - cycle: 'college' ou 'lycee' pour déterminer le thème de couleurs
 */

"use client";

import React from 'react';
import { Matiere, Cycle } from '@/app/utils/shared/types';
import { MatiereCard } from './MatiereCard';

type MatiereGridProps = {
  matieres: Matiere[];
  hoveredCard: string | null;
  onHoverChange: (id: string | null) => void;
  cycle: Cycle;  // 👈 Cette prop détermine le thème (violet ou bleu)
};

export const MatiereGrid: React.FC<MatiereGridProps> = ({ 
  matieres, 
  hoveredCard, 
  onHoverChange,
  cycle  // 👈 On reçoit le cycle en props
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
          <MatiereCard
            matiere={matiere}
            isHovered={hoveredCard === matiere.id}
            onHoverChange={onHoverChange}
            cycle={cycle}  // 👈 On transmet le cycle à chaque carte
          />
        </div>
      ))}
    </div>
  );
};
