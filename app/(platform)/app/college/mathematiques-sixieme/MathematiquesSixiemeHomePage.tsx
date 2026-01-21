/**
 * MathematiquesSixiemeHomePage - VERSION MODULAIRE
 * Utilise cycle="college" partout
 */

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

import chapitresData from "@/app/documents/college/sixieme/mathematiques-6eme/6eme-maths-architecture-HR.json";
import mathsSixiemeIntroRaw from "@/app/documents/college/sixieme/mathematiques-6eme/maths-sixieme-introduction.json";
import { 
  faqCoursInteractif, 
  faqExerciceBinome,
  faqCompetencesCles,
  faqControleEvalue,
  faqSessionLibre 
} from '@/app/documents/faq';

const COLLEGE_COLORS = {
  gradient: "linear-gradient(135deg, #9F7AEA 0%, #805AD5 50%, #6B46C1 100%)",
  gradientHover: "linear-gradient(135deg, #805AD5 0%, #6B46C1 100%)",
  light: "#B794F6",
  bg: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
  main: "#805AD5",
  buttonBg: "rgba(159, 122, 234, 0.2)",
  buttonBorder: "rgba(159, 122, 234, 0.4)",
  buttonText: "#B794F6",
  buttonBgHover: "rgba(159, 122, 234, 0.3)",
  buttonBorderHover: "rgba(159, 122, 234, 0.6)",
};

export default function MathematiquesSixiemeHomePage() {
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

      {/* Hero */}
      <div style={{
        background: COLLEGE_COLORS.gradient,
        padding: "2rem 4rem",
        position: "relative",
        minHeight: "180px",
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
            onClick={() => window.location.href = '/app/college'}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            }}
            >
              SIXIÈME
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
            <Link href="/app/college/mathematiques-sixieme/chapitre1-cours" style={{ textDecoration: "none" }}>
              <button
                onMouseEnter={() => setHoveredButton(true)}
                onMouseLeave={() => setHoveredButton(false)}
                style={{
                  width: "100%",
                  padding: "1.15rem 1.75rem",
                  background: hoveredButton ? COLLEGE_COLORS.gradientHover : COLLEGE_COLORS.gradient,
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: hoveredButton
                    ? "0 8px 20px rgba(128, 90, 213, 0.4)"
                    : "0 4px 12px rgba(159, 122, 234, 0.3)",
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
                background: COLLEGE_COLORS.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLLEGE_COLORS.main
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
                background: COLLEGE_COLORS.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLLEGE_COLORS.main
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
            title="Les mathématiques en sixième"
            isOpen={isIntroOpen}
            onToggle={() => setIsIntroOpen(!isIntroOpen)}
            cycle="college"
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
                    color: COLLEGE_COLORS.light,
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
            cycle="college"
          >
            <FAQMenuItem
              icon={<LuBookOpen size={20} />}
              data={faqCoursInteractifRaw as any}
              isOpen={faqToggle.isOpen('cours-interactif')}
              onToggle={() => faqToggle.toggle('cours-interactif')}
              cycle="college"
            />
            
            <FAQMenuItem
              icon={<LuUsers size={20} />}
              data={faqExerciceBinomeRaw as any}
              isOpen={faqToggle.isOpen('exercice-binome')}
              onToggle={() => faqToggle.toggle('exercice-binome')}
              cycle="college"
            />
            
            <FAQMenuItem
              icon={<LuTarget size={20} />}
              data={faqCompetencesClesRaw as any}
              isOpen={faqToggle.isOpen('competences-cles')}
              onToggle={() => faqToggle.toggle('competences-cles')}
              cycle="college"
            />
            
            <FAQMenuItem
              icon={<LuClipboardCheck size={20} />}
              data={faqControleEvalueRaw as any}
              isOpen={faqToggle.isOpen('controle-evalue')}
              onToggle={() => faqToggle.toggle('controle-evalue')}
              cycle="college"
            />
            
            <FAQMenuItem
              icon={<LuMessageSquare size={20} />}
              data={faqSessionLibreRaw as any}
              isOpen={faqToggle.isOpen('session-libre')}
              onToggle={() => faqToggle.toggle('session-libre')}
              cycle="college"
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
                background: COLLEGE_COLORS.buttonBg,
                border: `1px solid ${COLLEGE_COLORS.buttonBorder}`,
                borderRadius: "8px",
                color: COLLEGE_COLORS.buttonText,
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLLEGE_COLORS.buttonBgHover;
                e.currentTarget.style.borderColor = COLLEGE_COLORS.buttonBorderHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLLEGE_COLORS.buttonBg;
                e.currentTarget.style.borderColor = COLLEGE_COLORS.buttonBorder;
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
              baseRoute="/app/college/mathematiques-sixieme"
              cycle="college"
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}