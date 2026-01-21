/**
 * ============================================
 * FICHIER: app/(platform)/app/lycee/mathematiques-seconde/MathematiquesSecondeHomePage.tsx
 * ============================================
 * 
 * DESCRIPTION:
 * Page d'accueil pour Mathématiques Seconde (Lycée).
 * Utilise les composants GÉNÉRIQUES de subject-home avec le thème BLEU.
 * 
 * ARCHITECTURE:
 * - Identique à MathematiquesSixiemeHomePage
 * - DIFFÉRENCE: cycle="lycee" (thème bleu) au lieu de cycle="college" (thème violet)
 * - Logique déléguée aux composants réutilisables
 * 
 * COMPOSANTS UTILISÉS:
 * - HeroSection: Bandeau supérieur
 * - CTACard: Carte d'action
 * - CollapsibleSection: Sections dépliables (intro, FAQ)
 * - FAQMenuItem: Items de FAQ
 * - ChapterItem: Items de chapitres
 * - Hooks: useChapterToggle, useFAQToggle
 * 
 * DONNÉES:
 * - Chapitres depuis JSON (2nde-maths-architecture-HR.json)
 * - FAQ depuis fichiers JSON dédiés
 * - Introduction depuis JSON (maths-seconde-introduction.json)
 */

"use client";

import { useMemo, useState } from "react";
import AppLayout from "@/app/components/sidebar/AppLayout";
import { 
  HeroSection, 
  CTACard, 
  CollapsibleSection,
  FAQMenuItem,
  ChapterItem,
  useChapterToggle,
  useFAQToggle,
  type Chapitre 
} from "@/app/components/shared/interface-matiere";
import { 
  LuCalculator, 
  LuCircleHelp, 
  LuBookOpen, 
  LuUsers, 
  LuTarget, 
  LuClipboardCheck, 
  LuMessageSquare 
} from "react-icons/lu";

// ============================================
// IMPORTS DES DONNÉES JSON
// ============================================

import chapitresData from "@/app/documents/lycee/seconde/mathematiques-2nde/2nde-maths-architecture-HR.json";
import mathsSecondeIntroRaw from "@/app/documents/lycee/seconde/mathematiques-2nde/maths-seconde-introduction.json";
import faqCoursInteractifRaw from "@/app/documents/faq/faq-cours-interactif.json";
import faqExerciceBinomeRaw from "@/app/documents/faq/faq-exercice-en-binome.json";
import faqCompetencesClesRaw from "@/app/documents/faq/faq-competences-cles.json";
import faqControleEvalueRaw from "@/app/documents/faq/faq-controle-evalue.json";
import faqSessionLibreRaw from "@/app/documents/faq/faq-session-libre.json";

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export default function MathematiquesSecondeHomePage() {
  // État pour les sections dépliables
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  
  // Hooks personnalisés pour gérer les états
  const faqToggle = useFAQToggle();
  const chapterToggle = useChapterToggle();

  // ============================================
  // TRANSFORMATION DES DONNÉES
  // ============================================

  // Transformation des chapitres en format typé
  const chapitres: Chapitre[] = useMemo(() => {
    return chapitresData.map((chapitre: any, index: number) => ({
      id: `C${index + 1}`,
      theme: chapitre.themeTitre.S,
      titre: chapitre.chapitreTitre.S,
      nombreExercices: chapitre.exercices.L.length
    }));
  }, []);

  // Calcul des statistiques
  const stats = useMemo(() => ({
    nombreSeances: chapitres.length,
    nombreContenusPedagogiques: chapitres.reduce(
      (total, ch) => total + 4 + ch.nombreExercices, 
      0
    )
  }), [chapitres]);

  // IDs des chapitres pour le toggle global
  const chaptersIds = useMemo(() => chapitres.map(ch => ch.id), [chapitres]);

  // ============================================
  // RENDER
  // ============================================

  return (
    <AppLayout>
      {/* Bande supérieure (espace pour icônes et recherche) */}
      <div style={{
        background: "var(--background)",
        height: "70px",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }} />

      {/* Hero avec CTA */}
      <HeroSection 
        level="Seconde" 
        levelRoute="/app/lycee"
        subjectTitle="Mathématiques"
      >
        <CTACard 
          nombreSeances={stats.nombreSeances}
          nombreContenusPedagogiques={stats.nombreContenusPedagogiques}
          startLink="/app/lycee/mathematiques-seconde/chapitre1-cours"
        />
      </HeroSection>

      {/* Contenu principal */}
      <div style={{
        padding: "4rem 4rem 3rem 4rem",
        maxWidth: "100%",
        margin: "0",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{ width: "100%", maxWidth: "1350px" }}>
          
          {/* ============================================ */}
          {/* SECTION 1: INTRODUCTION */}
          {/* ============================================ */}
          <CollapsibleSection
            icon={<LuCalculator size={22} />}
            title="Les mathématiques en seconde"
            isOpen={isIntroOpen}
            onToggle={() => setIsIntroOpen(!isIntroOpen)}
          >
            <div style={{
              padding: "1rem 1.5rem",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "8px",
              marginTop: "1rem"
            }}>
              {mathsSecondeIntroRaw.sections.map((section: any, index: number) => (
                <div key={index} style={{ 
                  marginBottom: index < mathsSecondeIntroRaw.sections.length - 1 ? 
                    "1.5rem" : "0" 
                }}>
                  <h3 style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#38BDF8",  /* 🔵 BLEU LYCÉE au lieu de violet */
                    marginBottom: "0.5rem"
                  }}>
                    {section.titre}
                  </h3>
                  
                  {section.type === "paragraphe" && typeof section.contenu === "string" && (
                    <p style={{
                      fontSize: "0.95rem",
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: "1.6",
                      margin: 0
                    }}>
                      {section.contenu}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* ============================================ */}
          {/* SECTION 2: FAQ */}
          {/* ============================================ */}
          <CollapsibleSection
            icon={<LuCircleHelp size={22} />}
            title="FAQ"
            isOpen={isFAQOpen}
            onToggle={() => setIsFAQOpen(!isFAQOpen)}
          >
            <FAQMenuItem
              icon={<LuBookOpen size={20} style={{ color: "#38BDF8" }} />}  /* 🔵 BLEU */
              data={faqCoursInteractifRaw as any}
              isOpen={faqToggle.isOpen('cours-interactif')}
              onToggle={() => faqToggle.toggle('cours-interactif')}
            />
            
            <FAQMenuItem
              icon={<LuUsers size={20} style={{ color: "#38BDF8" }} />}  /* 🔵 BLEU */
              data={faqExerciceBinomeRaw as any}
              isOpen={faqToggle.isOpen('exercice-binome')}
              onToggle={() => faqToggle.toggle('exercice-binome')}
            />
            
            <FAQMenuItem
              icon={<LuTarget size={20} style={{ color: "#38BDF8" }} />}  /* 🔵 BLEU */
              data={faqCompetencesClesRaw as any}
              isOpen={faqToggle.isOpen('competences-cles')}
              onToggle={() => faqToggle.toggle('competences-cles')}
            />
            
            <FAQMenuItem
              icon={<LuClipboardCheck size={20} style={{ color: "#38BDF8" }} />}  /* 🔵 BLEU */
              data={faqControleEvalueRaw as any}
              isOpen={faqToggle.isOpen('controle-evalue')}
              onToggle={() => faqToggle.toggle('controle-evalue')}
            />
            
            <FAQMenuItem
              icon={<LuMessageSquare size={20} style={{ color: "#38BDF8" }} />}  /* 🔵 BLEU */
              data={faqSessionLibreRaw as any}
              isOpen={faqToggle.isOpen('session-libre')}
              onToggle={() => faqToggle.toggle('session-libre')}
            />
          </CollapsibleSection>

          {/* ============================================ */}
          {/* SECTION 3: CONTENU DU COURS */}
          {/* ============================================ */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "3rem",
            marginBottom: "1.5rem"
          }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#fff",
              margin: 0
            }}>
              Contenu du cours
            </h2>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => chapterToggle.expandAll(chaptersIds)}
                style={{
                  padding: "0.75rem 2rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: "50px",
                  color: "#fff",
                  background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%)",  /* 🔵 GRADIENT BLEU */
                  border: "2px solid rgba(56,189,248,0.5)",  /* 🔵 BORDURE BLEUE */
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 0 25px rgba(56,189,248,0.4)";  /* 🔵 GLOW BLEU */
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Tout déplier
              </button>

              <button
                onClick={() => chapterToggle.collapseAll(chaptersIds)}
                style={{
                  padding: "0.75rem 2rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: "50px",
                  color: "rgba(255,255,255,0.9)",
                  background: "rgba(255,255,255,0.1)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
              >
                Tout replier
              </button>
            </div>
          </div>

          {/* Liste des chapitres */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {chapitres.map((chapitre) => (
              <ChapterItem
                key={chapitre.id}
                chapitre={chapitre}
                isOpen={chapterToggle.isOpen(chapitre.id)}
                onToggle={() => chapterToggle.toggle(chapitre.id)}
                baseRoute="/app/lycee/mathematiques-seconde"  /* 🔵 ROUTE LYCÉE */
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}