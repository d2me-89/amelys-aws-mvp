/**
 * Page principale du Collège (version refactorisée)
 * 
 * Cette page affiche :
 * - Sélecteur de classes (6ème à 3ème + Brevet)
 * - Grille de matières selon la classe sélectionnée
 * - Grille des épreuves du brevet
 * - Message pour les classes non implémentées
 * 
 * Changements par rapport à l'original :
 * ✅ Données extraites dans utils/college/data.ts
 * ✅ Logique métier dans utils/college/helpers.ts
 * ✅ Styles dans utils/ui/styles.ts
 * ✅ Composants réutilisables créés
 * ✅ Code réduit de ~500 lignes à ~150 lignes
 * ✅ Plus maintenable et testable
 */

"use client";

import { useState } from "react";
import AppLayout from "@/app/components/AppLayout";
import { ClasseButton, MatiereGrid } from "@/app/components/college";
import { 
  CLASSES, 
  EPREUVES_BREVET, 
  getMatieresParClasse,
  getTitreClasse,
  getDescriptionClasse,
  isBrevetClasse,
  isRegularClasse,
  getLabelClasse,
} from "@/app/utils/college";

export default function CollegePage() {
  const [selectedClass, setSelectedClass] = useState<string>("sixieme");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Récupération des données selon la classe sélectionnée
  const matieres = getMatieresParClasse(selectedClass);
  const showMatieres = isRegularClasse(selectedClass);
  const showBrevet = isBrevetClasse(selectedClass);

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
            Collège
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
            <ClasseButton
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

            <MatiereGrid
              matieres={matieres}
              hoveredCard={hoveredCard}
              onHoverChange={setHoveredCard}
            />
          </section>
        )}

        {/* Affichage des épreuves du Brevet */}
        {showBrevet && (
          <section style={{ marginTop: "2rem" }}>
            <h2 style={{
              fontSize: "1.8rem",
              marginBottom: "0.5rem",
              fontWeight: 700
            }}>
              Épreuves du Brevet
            </h2>

            <p style={{
              fontSize: "0.95rem",
              opacity: 0.8,
              marginBottom: "1.5rem"
            }}>
              {getDescriptionClasse(selectedClass)}
            </p>

            <MatiereGrid
              matieres={EPREUVES_BREVET}
              hoveredCard={hoveredCard}
              onHoverChange={setHoveredCard}
            />
          </section>
        )}

        {/* Message pour les classes non encore implémentées */}
        {selectedClass && !showMatieres && !showBrevet && (
          <div style={{
            textAlign: "center",
            padding: "3rem 2rem",
            background: "rgba(183,148,246,0.1)",
            borderRadius: "12px",
            border: "1px solid rgba(183,148,246,0.3)",
            marginTop: "3rem"
          }}>
            <p style={{
              margin: 0,
              fontSize: "1.1rem",
              opacity: 0.9
            }}>
              🚧 Les matières pour{" "}
              <strong>{getLabelClasse(selectedClass)}</strong>{" "}
              arrivent bientôt !
            </p>
          </div>
        )}
      </main>
    </AppLayout>
  );
}