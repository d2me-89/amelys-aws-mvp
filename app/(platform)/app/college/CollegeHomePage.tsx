/**
 * Page d'accueil du Collège
 * 
 * Affiche les matières disponibles pour chaque classe du collège.
 * Utilise les composants unifiés avec le thème violet (cycle="college").
 */

"use client";

import { useState } from 'react';

// ✅ Imports depuis les fichiers unifiés
import { ClasseButton, MatiereGrid } from '@/app/components/shared';
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
import { CLASSES, MATIERES_PAR_CLASSE, EPREUVES_BREVET } from '@/app/utils/college';

export default function CollegeHomePage() {
  // État pour la classe sélectionnée
  const [selectedClasse, setSelectedClasse] = useState<string>("sixieme");
  
  // État pour la carte survolée
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Créer l'objet cycleData pour les helpers
  const collegeData: CycleData = {
    classes: CLASSES,
    matieresParClasse: MATIERES_PAR_CLASSE,
    epreuves: EPREUVES_BREVET
  };

  // Récupérer les matières ou épreuves selon la classe sélectionnée
  const isExamen = isExamenClasse(selectedClasse);
  const matieres: Matiere[] | Epreuve[] = isExamen
    ? getEpreuves(collegeData)
    : getMatieresParClasse(selectedClasse, collegeData);

  // Générer le titre et la description
  const titre = getTitreClasse(selectedClasse, isExamen);
  const description = getDescriptionClasse(selectedClasse, collegeData);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
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
            background: "linear-gradient(135deg, #B794F6 0%, #9F7AEA 50%, #805AD5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Collège
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Construis tes bases avec Amélys
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
            cycle="college"  // 👈 Thème violet pour le collège
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
        cycle="college"  // 👈 Thème violet pour le collège
      />
    </div>
  );
}