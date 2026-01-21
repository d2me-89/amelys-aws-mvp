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

      {/* Hero avec CTA - THÈME BLEU LYCÉE */}
      <div style={{
        background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%)",  // 🔵 GRADIENT BLEU
        padding: "3rem 4rem",
        position: "relative",
        minHeight: "240px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "1350px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          position: "relative"
        }}>
          {/* Partie gauche: Badge niveau + Titre matière */}
          <div style={{ flex: 1 }}>
            {/* Badge Seconde */}
            <div style={{
              display: "inline-block",
              padding: "0.65rem 1.6rem",
              background: "#ffffff",
              borderRadius: "50px",
              fontSize: "1rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#1a1a1a",
              marginBottom: "1.2rem",
              border: "2px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onClick={() => window.location.href = '/app/lycee'}
            >
              SECONDE
            </div>
            
            <h1 style={{
              fontSize: "2.8rem",
              fontWeight: 800,
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.2,
              textShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}>
              Mathématiques
            </h1>
          </div>
          
          {/* Partie droite: CTA Card */}
          <CTACard 
            nombreSeances={stats.nombreSeances}
            nombreContenusPedagogiques={stats.nombreContenusPedagogiques}
            startLink="/app/lycee/mathematiques-seconde/chapitre1-cours"
          />
        </div>
      </div>

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
            marginBottom: "2rem"  // 🔵 Augmenté de 1.5rem à 2rem
          }}>
            <h2 style={{
              fontSize: "2rem",  // 🔵 Comme la version 6ème
              fontWeight: 800,
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
                background: "rgba(56, 189, 248, 0.2)",  /* 🔵 BG BLEU */
                border: "1px solid rgba(56, 189, 248, 0.4)",  /* 🔵 BORDURE BLEUE */
                borderRadius: "8px",
                color: "#38BDF8",  /* 🔵 TEXTE BLEU */
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(56, 189, 248, 0.3)";
                e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(56, 189, 248, 0.2)";
                e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
              }}
            >
              {chapterToggle.areAllOpen(chaptersIds) ? "Tout cacher" : "Tout afficher"}
            </button>
          </div>

          {/* Liste des chapitres */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {chapitres.map((chapitre, index) => (
              <ChapterItem
                key={chapitre.id}
                chapitre={chapitre}
                index={index}
                isOpen={chapterToggle.openChapters[chapitre.id] || false}
                onToggle={() => chapterToggle.toggleChapter(chapitre.id)}
                exercices={chapitresData[index].exercices.L}
                baseRoute="/app/lycee/mathematiques-seconde"
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}