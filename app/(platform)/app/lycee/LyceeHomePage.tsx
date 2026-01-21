/**
 * Page d'accueil du Lycée
 * 
 * Affiche les matières disponibles pour chaque classe du lycée.
 * Utilise les composants unifiés avec le thème bleu (cycle="lycee").
 */

"use client";

import { useState } from 'react';
import AppLayout from '@/app/components/sidebar/AppLayout';

// ✅ Imports depuis les fichiers unifiés
import { ClasseButton, MatiereGrid } from '@/app/components/shared/interface-cycle';
import { 
  Classe, 
  Matiere,
  Epreuve,
  getMatieresParClasse, 
  getEpreuves,
  getTitreClasse,
  getDescriptionClasse,
  isExamenClasse,
  CycleData 
} from '@/app/utils/shared';
import { CLASSES, MATIERES_PAR_CLASSE, EPREUVES_BACCALAUREAT } from '@/app/utils/lycee';

export default function LyceeHomePage() {
  // État pour la classe sélectionnée
  const [selectedClasse, setSelectedClasse] = useState<string>("seconde");
  
  // État pour la carte survolée
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Créer l'objet cycleData pour les helpers
  const lyceeData: CycleData = {
    classes: CLASSES,
    matieresParClasse: MATIERES_PAR_CLASSE,
    epreuves: EPREUVES_BACCALAUREAT
  };

  // Récupérer les matières ou épreuves selon la classe sélectionnée
  const isExamen = isExamenClasse(selectedClasse);
  const matieres: Matiere[] | Epreuve[] = isExamen
    ? getEpreuves(lyceeData)
    : getMatieresParClasse(selectedClasse, lyceeData);

  // Générer le titre et la description
  const titre = getTitreClasse(selectedClasse, isExamen);
  const description = getDescriptionClasse(selectedClasse, lyceeData);

  return (
    <AppLayout>
      <div
        style={{
          minHeight: "100vh",
          padding: "3rem 2rem",
        }}
      >
      {/* En-tête */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Lycée
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Prépare ton avenir avec Amélys
        </p>
      </div>

      {/* Sélecteur de classes */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "3rem",
          flexWrap: "wrap",
        }}
      >
        {CLASSES.map((classe) => (
          <ClasseButton
            key={classe.id}
            classe={classe}
            isSelected={selectedClasse === classe.id}
            onClick={() => setSelectedClasse(classe.id)}
            cycle="lycee"  // 👈 Thème bleu pour le lycée
          />
        ))}
      </div>

      {/* Titre et description de la section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "2.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "0.5rem",
          }}
        >
          {titre}
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {description}
        </p>
      </div>

      {/* Grille de matières */}
      <MatiereGrid
        matieres={matieres}
        hoveredCard={hoveredCard}
        onHoverChange={setHoveredCard}
        cycle="lycee"  // 👈 Thème bleu pour le lycée
      />
    </div>
    </AppLayout>
  );
}