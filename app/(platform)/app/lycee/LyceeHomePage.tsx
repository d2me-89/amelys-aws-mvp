/**
 * Page principale du Lycée (version refactorisée)
 * 
 * Cette page affiche :
 * - Sélecteur de classes (Seconde, Première, Terminale, Baccalauréat)
 * - Grille de matières selon la classe sélectionnée
 * - Grille des épreuves du baccalauréat
 * 
 * Changements par rapport à l'original :
 * ✅ Données extraites dans utils/lycee/data.ts
 * ✅ Logique métier dans utils/lycee/helpers.ts
 * ✅ Styles bleus dans utils/ui/lyceeStyles.ts
 * ✅ Composants réutilisables créés
 * ✅ Code réduit de ~600 lignes à ~150 lignes
 * ✅ Architecture identique au collège pour cohérence
 */

"use client";

import { useState } from "react";
import AppLayout from "@/app/components/AppLayout";
import { LyceeClasseButton } from "@/app/components/lycee";
import { LyceeMatiereGrid } from "@/app/components/lycee";
import { CLASSES, EPREUVES_BACCALAUREAT } from "@/app/utils/lycee";
import {
  getMatieresParClasse,
  getTitreClasse,
  getDescriptionClasse,
  isBaccalaureatClasse,
  isRegularClasse,
  getLabelClasse,
} from "@/utils/lycee";

export default function LyceePage() {
  const [selectedClass, setSelectedClass] = useState<string>("seconde");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Récupération des données selon la classe sélectionnée
  const matieres = getMatieresParClasse(selectedClass);
  const showMatieres = isRegularClasse(selectedClass);
  const showBaccalaureat = isBaccalaureatClasse(selectedClass);

  return (
    <AppLayout>
      <main style={{
        padding: "1.5rem 3rem",
        fontFamily: "sans-serif",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {/* En-tête de la page */}
        <header>
          <h1 style={{
            fontSize: "2.5rem",
            marginBottom: "0.5rem",
            fontWeight: 700
          }}>
            Lycée
          </h1>

          <p style={{
            fontSize: "1.1rem",
            opacity: 0.8,
            marginBottom: "2rem"
          }}>
            Sélectionne ta classe pour accéder à tes matières
          </p>
        </header>

        {/* Sélecteur de classes */}
        <nav 
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem"
          }}
          aria-label="Sélection de classe"
        >
          {CLASSES.map((cls) => (
            <LyceeClasseButton
              key={cls.id}
              classe={cls}
              isSelected={selectedClass === cls.id}
              onClick={() => setSelectedClass(cls.id)}
            />
          ))}
        </nav>

        {/* Affichage des matières pour les classes régulières */}
        {showMatieres && (
          <section style={{ marginTop: "2rem" }}>
            <h2 style={{
              fontSize: "1.8rem",
              marginBottom: "0.5rem",
              fontWeight: 700
            }}>
              {getTitreClasse(selectedClass)}
            </h2>

            <p style={{
              fontSize: "0.95rem",
              opacity: 0.8,
              marginBottom: "1.5rem"
            }}>
              {getDescriptionClasse(selectedClass)}
            </p>

            <LyceeMatiereGrid
              matieres={matieres}
              hoveredCard={hoveredCard}
              onHoverChange={setHoveredCard}
            />
          </section>
        )}

        {/* Affichage des épreuves du Baccalauréat */}
        {showBaccalaureat && (
          <section style={{ marginTop: "2rem" }}>
            <h2 style={{
              fontSize: "1.8rem",
              marginBottom: "0.5rem",
              fontWeight: 700
            }}>
              {getTitreClasse(selectedClass)}
            </h2>

            <p style={{
              fontSize: "0.95rem",
              opacity: 0.8,
              marginBottom: "1.5rem"
            }}>
              {getDescriptionClasse(selectedClass)}
            </p>

            <LyceeMatiereGrid
              matieres={EPREUVES_BACCALAUREAT}
              hoveredCard={hoveredCard}
              onHoverChange={setHoveredCard}
            />
          </section>
        )}
      </main>
    </AppLayout>
  );
}