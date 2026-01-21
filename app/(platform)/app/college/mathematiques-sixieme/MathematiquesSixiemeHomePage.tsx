/**
 * ============================================
 * FICHIER: app/(platform)/app/college/mathematiques-sixieme/MathematiquesSixiemeHomePage.tsx
 * ============================================
 * 
 * DESCRIPTION:
 * Page d'accueil SIMPLIFIÉE pour Mathématiques 6ème.
 * Utilise les composants GÉNÉRIQUES de subject-home.
 * 
 * ARCHITECTURE:
 * - ~800 lignes AVANT refactorisation
 * - ~150 lignes APRÈS refactorisation
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
 * - Chapitres depuis JSON
 * - FAQ depuis fichiers JSON dédiés
 * - Introduction depuis JSON
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

import chapitresData from "@/app/documents/college/sixieme/mathematiques-6eme/6eme-maths-architecture-HR.json";
import mathsSixiemeIntroRaw from "@/app/documents/college/sixieme/mathematiques-6eme/maths-sixieme-introduction.json";
import faqCoursInteractifRaw from "@/app/documents/faq/faq-cours-interactif.json";
import faqExerciceBinomeRaw from "@/app/documents/faq/faq-exercice-en-binome.json";
import faqCompetencesClesRaw from "@/app/documents/faq/faq-competences-cles.json";
import faqControleEvalueRaw from "@/app/documents/faq/faq-controle-evalue.json";
import faqSessionLibreRaw from "@/app/documents/faq/faq-session-libre.json";

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export default function MathematiquesSixiemeHomePage() {
  // État pour les sections dépliables
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  
  // Hooks personnalisés pour gérer les états
  const faqToggle = useFAQToggle();
  const chapterToggle = useChapterToggle(chapitresData.length);

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
        level="Sixième" 
        levelRoute="/app/college"
        subjectTitle="Mathématiques"
      >
        <CTACard 
          nombreSeances={stats.nombreSeances}
          nombreContenusPedagogiques={stats.nombreContenusPedagogiques}
          startLink="/app/college/mathematiques-sixieme/chapitre1-cours"
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
            title="Les mathématiques en sixième"
            isOpen={isIntroOpen}
            onToggle={() => setIsIntroOpen(!isIntroOpen)}
          >
            <div style={{
              padding: "1rem 1.5rem",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "8px",
              marginTop: "1rem"
            }}>
              {mathsSixiemeIntroRaw.sections.map((section: any, index: number) => (
                <div key={index} style={{ 
                  marginBottom: index < mathsSixiemeIntroRaw.sections.length - 1 ? "1.5rem" : "0" 
                }}>
                  <h3 style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#B794F6",
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
              icon={<LuBookOpen size={20} style={{ color: "#B794F6" }} />}
              data={faqCoursInteractifRaw as any}
              isOpen={faqToggle.isOpen('cours-interactif')}
              onToggle={() => faqToggle.toggle('cours-interactif')}
            />
            
            <FAQMenuItem
              icon={<LuUsers size={20} style={{ color: "#B794F6" }} />}
              data={faqExerciceBinomeRaw as any}
              isOpen={faqToggle.isOpen('exercice-binome')}
              onToggle={() => faqToggle.toggle('exercice-binome')}
            />
            
            <FAQMenuItem
              icon={<LuTarget size={20} style={{ color: "#B794F6" }} />}
              data={faqCompetencesClesRaw as any}
              isOpen={faqToggle.isOpen('competences-cles')}
              onToggle={() => faqToggle.toggle('competences-cles')}
            />
            
            <FAQMenuItem
              icon={<LuClipboardCheck size={20} style={{ color: "#B794F6" }} />}
              data={faqControleEvalueRaw as any}
              isOpen={faqToggle.isOpen('controle-evalue')}
              onToggle={() => faqToggle.toggle('controle-evalue')}
            />
            
            <FAQMenuItem
              icon={<LuMessageSquare size={20} style={{ color: "#B794F6" }} />}
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
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            marginTop: "3.5rem",
            maxWidth: "780px"
          }}>
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#fff",
              margin: 0
            }}>
              Contenu du cours
            </h2>

            {/* Bouton Tout afficher/cacher */}
            <button
              onClick={() => chapterToggle.toggleAll(chaptersIds)}
              style={{
                padding: "0.6rem 1.2rem",
                background: "rgba(159, 122, 234, 0.2)",
                border: "1px solid rgba(159, 122, 234, 0.4)",
                borderRadius: "8px",
                color: "#B794F6",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(159, 122, 234, 0.3)";
                e.currentTarget.style.borderColor = "rgba(159, 122, 234, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(159, 122, 234, 0.2)";
                e.currentTarget.style.borderColor = "rgba(159, 122, 234, 0.4)";
              }}
            >
              {chapterToggle.areAllOpen(chaptersIds) ? "Tout cacher" : "Tout afficher"}
            </button>
          </div>

          {/* Liste des chapitres */}
          {chapitres.map((chapitre, index) => (
            <ChapterItem
              key={chapitre.id}
              chapitre={chapitre}
              index={index}
              isOpen={chapterToggle.openChapters[chapitre.id] || false}
              onToggle={() => chapterToggle.toggleChapter(chapitre.id)}
              exercices={chapitresData[index].exercices.L}
              baseRoute="/app/college/mathematiques-sixieme"
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}