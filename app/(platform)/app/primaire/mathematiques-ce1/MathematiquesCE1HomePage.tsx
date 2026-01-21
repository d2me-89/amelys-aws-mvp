"use client";

import { useMemo, useState } from "react";
import AppLayout from "@/app/components/sidebar/AppLayout";
import { 
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
  LuMessageSquare,
  LuPlay,
  LuBrain,
  LuSparkles
} from "react-icons/lu";
import Link from "next/link";

import chapitresData from "@/app/documents/primaire/ce1/mathematiques-ce1/ce1-maths-structure-HR.json";
import mathsCE1IntroRaw from "@/app/documents/primaire/ce1/mathematiques-ce1/maths-ce1-introduction.json";
import faqCoursInteractifRaw from "@/app/documents/faq/faq-cours-interactif.json";
import faqExerciceBinomeRaw from "@/app/documents/faq/faq-exercice-en-binome.json";
import faqCompetencesClesRaw from "@/app/documents/faq/faq-competences-cles.json";
import faqControleEvalueRaw from "@/app/documents/faq/faq-controle-evalue.json";
import faqSessionLibreRaw from "@/app/documents/faq/faq-session-libre.json";

const PRIMAIRE_COLORS = {
  gradient: "linear-gradient(135deg, #FB923C 0%, #F97316 50%, #EA580C 100%)",
  gradientHover: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
  light: "#FDBA74",
  bg: "linear-gradient(135deg, #FED7AA 0%, #FED7AA 100%)",
  main: "#F97316",
  buttonBg: "rgba(251, 146, 60, 0.2)",
  buttonBorder: "rgba(251, 146, 60, 0.4)",
  buttonText: "#FDBA74",
  buttonBgHover: "rgba(251, 146, 60, 0.3)",
  buttonBorderHover: "rgba(251, 146, 60, 0.6)",
};

export default function MathematiquesCE1HomePage() {
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  
  const faqToggle = useFAQToggle();
  const chapterToggle = useChapterToggle();

  const chapitres: Chapitre[] = useMemo(() => {
    return chapitresData.map((chapitre: any, index: number) => ({
      id: `C${index + 1}`,
      theme: chapitre.themeTitre.S,
      titre: chapitre.chapitreTitre.S,
      nombreExercices: chapitre.exercices.L.length
    }));
  }, []);

  const stats = useMemo(() => ({
    nombreSeances: chapitres.length,
    nombreContenusPedagogiques: chapitres.reduce(
      (total, ch) => total + 4 + ch.nombreExercices, 
      0
    )
  }), [chapitres]);

  const chaptersIds = useMemo(() => chapitres.map(ch => ch.id), [chapitres]);

  return (
    <AppLayout>
      <div style={{
        background: "var(--background)",
        height: "70px",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }} />

      {/* Hero Orange */}
      <div style={{
        background: PRIMAIRE_COLORS.gradient,
        padding: "1.5rem 4rem",
        position: "relative",
        minHeight: "100px",
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
          <div style={{ flex: 1 }}>
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
            onClick={() => window.location.href = '/app/primaire'}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            }}
            >
              CE1
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
          
          <div style={{
            width: "360px",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
          }}>
            <Link href="/app/primaire/mathematiques-ce1/chapitre1-cours" style={{ textDecoration: "none" }}>
              <button
                onMouseEnter={() => setHoveredButton(true)}
                onMouseLeave={() => setHoveredButton(false)}
                style={{
                  width: "100%",
                  padding: "1.15rem 1.75rem",
                  background: hoveredButton ? PRIMAIRE_COLORS.gradientHover : PRIMAIRE_COLORS.gradient,
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: hoveredButton
                    ? "0 8px 20px rgba(249, 115, 22, 0.4)"
                    : "0 4px 12px rgba(251, 146, 60, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem"
                }}>
                <LuPlay size={22} />
                Lancer l'IA
              </button>
            </Link>

            <div style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
              margin: "1.5rem 0"
            }} />

            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.1rem" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: PRIMAIRE_COLORS.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: PRIMAIRE_COLORS.main
              }}>
                <LuBrain size={22} />
              </div>
              <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "#2D3748" }}>
                {stats.nombreSeances} Chapitres
              </span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: PRIMAIRE_COLORS.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: PRIMAIRE_COLORS.main
              }}>
                <LuSparkles size={22} />
              </div>
              <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "#2D3748" }}>
                {stats.nombreContenusPedagogiques} Contenus interactifs
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        padding: "2rem 4rem 3rem 4rem",
        maxWidth: "100%",
        margin: "0",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{ width: "100%", maxWidth: "1350px" }}>
          
          <CollapsibleSection
            icon={<LuCalculator size={22} />}
            title="Les mathématiques en CE1"
            isOpen={isIntroOpen}
            onToggle={() => setIsIntroOpen(!isIntroOpen)}
            cycle="primaire"
          >
            <div style={{
              padding: "1rem 1.5rem",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "8px",
              marginTop: "1rem"
            }}>
              {mathsCE1IntroRaw.sections.map((section: any, index: number) => (
                <div key={index} style={{ 
                  marginBottom: index < mathsCE1IntroRaw.sections.length - 1 ? "1.5rem" : "0" 
                }}>
                  <h3 style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: PRIMAIRE_COLORS.light,
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

          <CollapsibleSection
            icon={<LuCircleHelp size={22} />}
            title="FAQ"
            isOpen={isFAQOpen}
            onToggle={() => setIsFAQOpen(!isFAQOpen)}
            cycle="primaire"
          >
            <FAQMenuItem
              icon={<LuBookOpen size={20} />}
              data={faqCoursInteractifRaw as any}
              isOpen={faqToggle.isOpen('cours-interactif')}
              onToggle={() => faqToggle.toggle('cours-interactif')}
              cycle="primaire"
            />
            
            <FAQMenuItem
              icon={<LuUsers size={20} />}
              data={faqExerciceBinomeRaw as any}
              isOpen={faqToggle.isOpen('exercice-binome')}
              onToggle={() => faqToggle.toggle('exercice-binome')}
              cycle="primaire"
            />
            
            <FAQMenuItem
              icon={<LuTarget size={20} />}
              data={faqCompetencesClesRaw as any}
              isOpen={faqToggle.isOpen('competences-cles')}
              onToggle={() => faqToggle.toggle('competences-cles')}
              cycle="primaire"
            />
            
            <FAQMenuItem
              icon={<LuClipboardCheck size={20} />}
              data={faqControleEvalueRaw as any}
              isOpen={faqToggle.isOpen('controle-evalue')}
              onToggle={() => faqToggle.toggle('controle-evalue')}
              cycle="primaire"
            />
            
            <FAQMenuItem
              icon={<LuMessageSquare size={20} />}
              data={faqSessionLibreRaw as any}
              isOpen={faqToggle.isOpen('session-libre')}
              onToggle={() => faqToggle.toggle('session-libre')}
              cycle="primaire"
            />
          </CollapsibleSection>

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

            <button
              onClick={() => chapterToggle.toggleAll(chaptersIds)}
              style={{
                padding: "0.6rem 1.2rem",
                background: PRIMAIRE_COLORS.buttonBg,
                border: `1px solid ${PRIMAIRE_COLORS.buttonBorder}`,
                borderRadius: "8px",
                color: PRIMAIRE_COLORS.buttonText,
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = PRIMAIRE_COLORS.buttonBgHover;
                e.currentTarget.style.borderColor = PRIMAIRE_COLORS.buttonBorderHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = PRIMAIRE_COLORS.buttonBg;
                e.currentTarget.style.borderColor = PRIMAIRE_COLORS.buttonBorder;
              }}
            >
              {chapterToggle.areAllOpen(chaptersIds) ? "Tout cacher" : "Tout afficher"}
            </button>
          </div>

          {chapitres.map((chapitre, index) => (
            <ChapterItem
              key={chapitre.id}
              chapitre={chapitre}
              index={index}
              isOpen={chapterToggle.openChapters[chapitre.id] || false}
              onToggle={() => chapterToggle.toggleChapter(chapitre.id)}
              exercices={chapitresData[index].exercices.L}
              baseRoute="/app/primaire/mathematiques-ce1"
              cycle="primaire"
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
