/**
 * Page d'accueil du Primaire
 * 
 * Affiche les matières disponibles pour chaque classe du primaire.
 * Utilise les composants unifiés avec le thème orange (cycle="primaire").
 */

"use client";

import { useState } from 'react';
import AppLayout from '@/app/components/AppLayout';

// ✅ Imports depuis les fichiers unifiés
import { ClasseButton, MatiereGrid } from '@/app/components/shared';
import { 
  Classe, 
  Matiere,
  getMatieresParClasse, 
  getTitreClasse,
  getDescriptionClasse,
  CycleData 
} from '@/app/utils/shared';
import { CLASSES, MATIERES_PAR_CLASSE } from '@/app/utils/primaire';

export default function PrimaireHomePage() {
  // État pour la classe sélectionnée
  const [selectedClasse, setSelectedClasse] = useState<string>("cp");
  
  // État pour la carte survolée
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Créer l'objet cycleData pour les helpers
  // Note : pas d'épreuves pour le primaire, donc on ne passe pas le champ epreuves
  const primaireData: CycleData = {
    classes: CLASSES,
    matieresParClasse: MATIERES_PAR_CLASSE,
    // epreuves n'est pas défini car le primaire n'a pas d'épreuves
  };

  // Récupérer les matières pour la classe sélectionnée
  // Le primaire n'a jamais d'examens, donc isExamen est toujours false
  const matieres: Matiere[] = getMatieresParClasse(selectedClasse, primaireData);

  // Générer le titre et la description
  const titre = getTitreClasse(selectedClasse, false);
  const description = getDescriptionClasse(selectedClasse, primaireData);

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
              background: "linear-gradient(135deg, #FB923C 0%, #F97316 50%, #EA580C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Primaire
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Découvre et apprends avec Amélys
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
              cycle="primaire"  // 👈 Thème orange pour le primaire
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
          cycle="primaire"  // 👈 Thème orange pour le primaire
        />
      </div>
    </AppLayout>
  );
}
