"use client";

import Link from "next/link";
import AppLayout from "@/app/components/AppLayout";
import { useState, useMemo } from "react";
import { LuPlay, LuBrain, LuSparkles, LuCalculator, LuChevronDown, LuChevronUp, LuCircleHelp, LuSchool, LuBookOpen, LuUsers, LuTarget, LuClipboardCheck, LuMessageSquare, LuChevronRight } from "react-icons/lu";
import chapitresData from "@/app/documents/college/sixieme/mathematiques-6eme/6eme-maths-architecture-HR.json";
import faqCoursInteractifRaw from "@/app/documents/faq/faq-cours-interactif.json";
import faqExerciceBinomeRaw from "@/app/documents/faq/faq-exercice-en-binome.json";
import faqCompetencesClesRaw from "@/app/documents/faq/faq-competences-cles.json";
import faqControleEvalueRaw from "@/app/documents/faq/faq-controle-evalue.json";
import faqSessionLibreRaw from "@/app/documents/faq/faq-session-libre.json";
import mathsSixiemeIntroRaw from "@/app/documents/college/sixieme/mathematiques-6eme/maths-sixieme-introduction.json";

// Type pour les sections FAQ
type FAQSection = {
  titre: string;
  contenu: string | string[];
  type: string;
};

type FAQData = {
  titre: string;
  sections: FAQSection[];
};

// Typage pour les données FAQ
const faqCoursInteractifData = faqCoursInteractifRaw as unknown as FAQData;
const faqExerciceBinomeData = faqExerciceBinomeRaw as unknown as FAQData;
const faqCompetencesClesData = faqCompetencesClesRaw as unknown as FAQData;
const faqControleEvalueData = faqControleEvalueRaw as unknown as FAQData;
const faqSessionLibreData = faqSessionLibreRaw as unknown as FAQData;
const mathsSixiemeIntroData = mathsSixiemeIntroRaw as unknown as FAQData;

export default function MathematiquesSixiemeHomePage() {
  const [hoveredButton, setHoveredButton] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [isMathsSixiemeOpen, setIsMathsSixiemeOpen] = useState(false);
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  const [openCompetences, setOpenCompetences] = useState<Record<string, boolean>>({});
  const [openFAQMenus, setOpenFAQMenus] = useState<Record<string, boolean>>({});

  // Extraire les données des chapitres du JSON
  const chapitres = useMemo(() => {
    return chapitresData.map((chapitre: any, index: number) => ({
      id: `C${index + 1}`,
      theme: chapitre.themeTitre.S,
      titre: chapitre.chapitreTitre.S,
      nombreExercices: chapitre.exercices.L.length
    }));
  }, []);

  // Calculer les totaux dynamiquement
  const nombreSeances = chapitres.length;
  // Chaque chapitre a 4 contenus fixes (cours + binôme + contrôle + session) + nombre variable d'exercices
  const nombreContenusPedagogiques = chapitres.reduce((total: number, ch: any) => {
    return total + 4 + ch.nombreExercices; // 4 contenus fixes + exercices de compétences
  }, 0);

  const toggleChapter = (chapterId: string) => {
    setOpenChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const toggleCompetences = (chapterId: string) => {
    setOpenCompetences(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  return (
    <AppLayout>
      {/* Bande pour icônes et recherche (à venir) */}
      <div style={{
        background: "var(--background)",
        height: "70px",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        {/* Espace réservé pour icônes et moteur de recherche */}
      </div>

      {/* Bandeau supérieur avec dégradé violet */}
      <div style={{
        background: "linear-gradient(135deg, #9F7AEA 0%, #805AD5 50%, #6B46C1 100%)",
        padding: "3rem 4rem",
        position: "relative",
        minHeight: "240px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
      }}>
        {/* Conteneur centré avec largeur max */}
        <div style={{
          width: "100%",
          maxWidth: "1350px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          position: "relative"
        }}>
        {/* Partie gauche : Niveau + Titre */}
        <div style={{ flex: 1 }}>
          {/* Badge Sixième - cliquable */}
          <Link
            href="/app/college"
            style={{
              textDecoration: "none"
            }}
          >
            <div style={{
              display: "inline-block",
              padding: "0.65rem 1.6rem",
              background: "#fff",
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
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            }}
            >
              Sixième
            </div>
          </Link>

          {/* Titre du cours */}
          <h1 style={{
            fontSize: "2.8rem",
            fontWeight: 800,
            color: "#fff",
            margin: 0,
            lineHeight: 1.2,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)"
          }}>
            Mathématiques
          </h1>
        </div>

        {/* Partie droite : Carte blanche avec CTA - Positionnée pour chevaucher */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "2.5rem",
          minWidth: "360px",
          maxWidth: "360px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          position: "absolute",
          right: "0",
          top: "50%",
          transform: "translateY(-20%)"
        }}>
          {/* Bouton principal */}
          <Link
            href="/app/college/mathematiques-sixieme/chapitre1-cours"}
            style={{
              textDecoration: "none",
              display: "block"
            }}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
          >
            <button style={{
              width: "100%",
              padding: "1.2rem 1.5rem",
              background: hoveredButton
                ? "linear-gradient(135deg, #805AD5 0%, #6B46C1 100%)"
                : "linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)",
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

          {/* Séparateur */}
          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
            margin: "1.5rem 0"
          }} />

          {/* Infos : Chapitres */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            marginBottom: "1.1rem"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#805AD5"
            }}>
              <LuBrain size={22} />
            </div>
            <span style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "#2D3748"
            }}>
              {nombreSeances} Chapitres
            </span>
          </div>

          {/* Infos : Contenus interactifs */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#805AD5"
            }}>
              <LuSparkles size={22} />
            </div>
            <span style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "#2D3748"
            }}>
              {nombreContenusPedagogiques} Contenus interactifs
            </span>
          </div>
        </div>
        </div>
      </div>

      {/* Contenu principal : Plan du cours */}
      <div style={{
        padding: "4rem 4rem 3rem 4rem",
        maxWidth: "100%",
        margin: "0",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{ width: "100%", maxWidth: "1350px" }}>
        {/* Section Les mathématiques en sixième - EN PREMIER */}
        <div style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "1.5rem",
          marginLeft: "0",
          maxWidth: "780px"
        }}>
          {/* En-tête cliquable */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsMathsSixiemeOpen(!isMathsSixiemeOpen);
            }}
            style={{
              width: "100%",
              padding: "1.2rem 1.5rem",
              background: "transparent",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "background 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {/* Gauche : Icône + Titre */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem"
            }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "11px",
                background: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#805AD5"
              }}>
                <LuCalculator size={22} />
              </div>
              <span style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#fff"
              }}>
                Les mathématiques en sixième
              </span>
            </div>

            {/* Droite : Icône chevron */}
            <div style={{ color: "rgba(255,255,255,0.6)" }}>
              {isMathsSixiemeOpen ? <LuChevronUp size={24} /> : <LuChevronDown size={24} />}
            </div>
          </button>

          {/* Contenu déroulant */}
          {isMathsSixiemeOpen && (
            <div style={{
              padding: "0 1.5rem 1.5rem 1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.1)"
            }}>
              <div style={{
                padding: "1rem 1.5rem",
                background: "rgba(0,0,0,0.2)",
                borderRadius: "8px",
                marginTop: "1rem"
              }}>
                {mathsSixiemeIntroData.sections.map((section, index) => (
                  <div key={index} style={{ marginBottom: index < mathsSixiemeIntroData.sections.length - 1 ? "1.5rem" : "0" }}>
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
            </div>
          )}
        </div>

        {/* Section FAQ - EN 2ÈME POSITION */}
        <div style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "1.5rem",
          marginLeft: "0",
          maxWidth: "780px"
        }}>
          {/* En-tête cliquable FAQ */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsFAQOpen(!isFAQOpen);
            }}
            style={{
              width: "100%",
              padding: "1.2rem 1.5rem",
              background: "transparent",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "background 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {/* Gauche : Icône + Titre */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem"
            }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "11px",
                background: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#805AD5"
              }}>
                <LuCircleHelp size={22} />
              </div>
              <span style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#fff"
              }}>
                FAQ
              </span>
            </div>

            {/* Droite : Icône chevron */}
            <div style={{ color: "rgba(255,255,255,0.6)" }}>
              {isFAQOpen ? <LuChevronUp size={24} /> : <LuChevronDown size={24} />}
            </div>
          </button>

          {/* Contenu déroulant : FAQ */}
          {isFAQOpen && (
            <div style={{
              padding: "0 1.5rem 1.5rem 1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.1)"
            }}>
              {/* Menu déroulant Cours interactif */}
              <FAQMenuItem
                id="cours-interactif"
                icon={<LuBookOpen size={20} style={{ color: "#B794F6" }} />}
                data={faqCoursInteractifData}
                isOpen={openFAQMenus['cours-interactif'] || false}
                onToggle={() => setOpenFAQMenus(prev => ({ ...prev, 'cours-interactif': !prev['cours-interactif'] }))}
              />

              {/* Menu déroulant Exercice en binôme */}
              <FAQMenuItem
                id="exercice-binome"
                icon={<LuUsers size={20} style={{ color: "#B794F6" }} />}
                data={faqExerciceBinomeData}
                isOpen={openFAQMenus['exercice-binome'] || false}
                onToggle={() => setOpenFAQMenus(prev => ({ ...prev, 'exercice-binome': !prev['exercice-binome'] }))}
              />

              {/* Menu déroulant Compétences clés */}
              <FAQMenuItem
                id="competences-cles"
                icon={<LuTarget size={20} style={{ color: "#B794F6" }} />}
                data={faqCompetencesClesData}
                isOpen={openFAQMenus['competences-cles'] || false}
                onToggle={() => setOpenFAQMenus(prev => ({ ...prev, 'competences-cles': !prev['competences-cles'] }))}
              />

              {/* Menu déroulant Contrôle évalué */}
              <FAQMenuItem
                id="controle-evalue"
                icon={<LuClipboardCheck size={20} style={{ color: "#B794F6" }} />}
                data={faqControleEvalueData}
                isOpen={openFAQMenus['controle-evalue'] || false}
                onToggle={() => setOpenFAQMenus(prev => ({ ...prev, 'controle-evalue': !prev['controle-evalue'] }))}
              />

              {/* Menu déroulant Session libre */}
              <FAQMenuItem
                id="session-libre"
                icon={<LuMessageSquare size={20} style={{ color: "#B794F6" }} />}
                data={faqSessionLibreData}
                isOpen={openFAQMenus['session-libre'] || false}
                onToggle={() => setOpenFAQMenus(prev => ({ ...prev, 'session-libre': !prev['session-libre'] }))}
              />
            </div>
          )}
        </div>

        {/* Titre "Contenu du cours" avec bouton Tout afficher/cacher */}
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
            onClick={() => {
              const allOpen = Object.keys(openChapters).length === chapitres.length && 
                             Object.values(openChapters).every(v => v === true);
              
              if (allOpen) {
                // Tout fermer
                setOpenChapters({});
              } else {
                // Tout ouvrir
                const newState: Record<string, boolean> = {};
                chapitres.forEach(ch => {
                  newState[ch.id] = true;
                });
                setOpenChapters(newState);
              }
            }}
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
            {Object.keys(openChapters).length === chapitres.length && 
             Object.values(openChapters).every(v => v === true)
              ? "Tout cacher"
              : "Tout afficher"}
          </button>
        </div>

        {/* 13 menus de chapitres indépendants */}
        {chapitres.map((chapitre, index) => (
          <div key={chapitre.id} style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "16px",
            overflow: "visible",
            marginBottom: "1.5rem",
            marginLeft: "0",
            maxWidth: "780px"
          }}>
            {/* En-tête cliquable du chapitre */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleChapter(chapitre.id);
              }}
              style={{
                width: "100%",
                padding: "1.2rem 1.5rem",
                background: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "background 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Gauche : Icône numéro + Titre */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem"
              }}>
                {/* Icône avec le numéro du chapitre */}
                <div style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "11px",
                  background: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#805AD5",
                  fontSize: "1.3rem",
                  fontWeight: 700
                }}>
                  {index + 1}
                </div>
                <span style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#fff"
                }}>
                  {chapitre.titre}
                </span>
              </div>

              {/* Droite : Icône chevron */}
              <div style={{ color: "rgba(255,255,255,0.6)" }}>
                {openChapters[chapitre.id] ? <LuChevronUp size={24} /> : <LuChevronDown size={24} />}
              </div>
            </button>

            {/* Contenu déroulant : 5 liens */}
            {openChapters[chapitre.id] && (
              <div style={{
                padding: "0 2rem 1.5rem 2rem",
                borderTop: "1px solid rgba(255,255,255,0.1)"
              }}>
                {/* 1. Cours interactif */}
                <Link
                  href={'/app/college/mathematiques-sixieme/chapitre' + (index + 1) + '-cours'}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    marginTop: "1rem",
                    marginBottom: "0.4rem"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <LuBookOpen size={20} style={{ color: "#B794F6" }} />
                    <span style={{ fontSize: "1.05rem", color: "#fff", fontWeight: 500 }}>
                      Cours interactif
                    </span>
                  </div>
                </Link>

                {/* 2. Exercice en binôme */}
                <Link
                  href={'/app/college/mathematiques-sixieme/chapitre' + (index + 1) + '-binome'}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    marginBottom: "0.4rem"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <LuUsers size={20} style={{ color: "#B794F6" }} />
                    <span style={{ fontSize: "1.05rem", color: "#fff", fontWeight: 500 }}>
                      Exercice en binôme
                    </span>
                  </div>
                </Link>

                {/* 3. Compétences clés (avec sous-menu déroulant) */}
                <div style={{ marginBottom: "0.4rem", position: "relative" }}>
                  <div
                    onClick={() => toggleCompetences(chapitre.id)}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                      background: openCompetences[chapitre.id] ? "rgba(159, 122, 234, 0.15)" : "transparent"
                    }}
                    onMouseEnter={(e) => {
                      if (!openCompetences[chapitre.id]) {
                        e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!openCompetences[chapitre.id]) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                      <LuTarget size={20} style={{ color: "#B794F6" }} />
                      <span style={{ fontSize: "1.05rem", color: "#fff", fontWeight: 500 }}>
                        Compétences clés
                      </span>
                    </div>
                    <LuChevronRight 
                      size={18} 
                      style={{ 
                        color: "rgba(255,255,255,0.5)",
                        transform: openCompetences[chapitre.id] ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease"
                      }} 
                    />
                  </div>

                  {/* Sous-menu des exercices - POSITIONNÉ À DROITE */}
                  {openCompetences[chapitre.id] && (
                    <div style={{
                      position: "absolute",
                      left: "105%",
                      top: 0,
                      width: "420px",
                      background: "rgba(15,15,25,0.98)",
                      borderRadius: "12px",
                      border: "1px solid rgba(159, 122, 234, 0.4)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                      zIndex: 9999,
                      overflow: "hidden"
                    }}>
                      {/* Titre du sous-menu - FIXE */}
                      <div style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#B794F6",
                        padding: "0.75rem 0.75rem 0.5rem 0.75rem",
                        borderBottom: "1px solid rgba(159, 122, 234, 0.2)",
                        background: "rgba(15,15,25,0.98)"
                      }}>
                        {chapitre.nombreExercices} exercices
                      </div>

                      {/* Liste des exercices - SCROLLABLE */}
                      <div style={{
                        maxHeight: "450px",
                        overflowY: "auto",
                        padding: "0.75rem"
                      }}>
                        {chapitresData[index].exercices.L.map((exercice: any, exIndex: number) => (
                          <Link
                            key={exIndex}
                            href={'/app/college/mathematiques-sixieme/chapitre' + (index + 1) + '-exercice' + (exIndex + 1)}
                            style={{ textDecoration: "none" }}
                          >
                            <div style={{
                              padding: "0.65rem 0.85rem",
                              borderRadius: "8px",
                              marginBottom: "0.4rem",
                              cursor: "pointer",
                              transition: "background 0.2s ease",
                              border: "1px solid transparent"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(159, 122, 234, 0.2)";
                              e.currentTarget.style.borderColor = "rgba(159, 122, 234, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.borderColor = "transparent";
                            }}
                            >
                              <div style={{ display: "flex", gap: "0.5rem" }}>
                                <span style={{ 
                                  fontSize: "0.95rem", 
                                  color: "#B794F6",
                                  fontWeight: 600,
                                  minWidth: "35px"
                                }}>
                                  E{(exIndex + 1).toString().padStart(2, '0')}.
                                </span>
                                <span style={{ 
                                  fontSize: "0.95rem", 
                                  color: "#fff",
                                  lineHeight: "1.4"
                                }}>
                                  {exercice.M.titre.S}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Contrôle du chapitre */}
                <Link
                  href={'/app/college/mathematiques-sixieme/chapitre' + (index + 1) + '-controle'}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    marginBottom: "0.4rem"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <LuClipboardCheck size={20} style={{ color: "#B794F6" }} />
                    <span style={{ fontSize: "1.05rem", color: "#fff", fontWeight: 500 }}>
                      Contrôle du chapitre
                    </span>
                  </div>
                </Link>

                {/* 5. Session libre */}
                <Link
                  href={'/app/college/mathematiques-sixieme/chapitre' + (index + 1) + '-session-libre'}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    cursor: "pointer",
                    transition: "background 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <LuMessageSquare size={20} style={{ color: "#B794F6" }} />
                    <span style={{ fontSize: "1.05rem", color: "#fff", fontWeight: 500 }}>
                      Session libre
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    </AppLayout>
  );
}

// Composant réutilisable pour les menus FAQ
interface FAQMenuItemProps {
  id: string;
  icon: React.ReactNode;
  data: FAQData;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQMenuItem({ id, icon, data, isOpen, onToggle }: FAQMenuItemProps) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <div
        onClick={onToggle}
        style={{
          padding: "0.75rem 1rem",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          transition: "background 0.2s ease",
          background: isOpen ? "rgba(159, 122, 234, 0.15)" : "transparent"
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          {icon}
          <span style={{ fontSize: "1.05rem", color: "#fff", fontWeight: 500 }}>
            {data.titre}
          </span>
        </div>
        <LuChevronRight 
          size={18} 
          style={{ 
            color: "rgba(255,255,255,0.5)",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease"
          }} 
        />
      </div>

      {/* Contenu déroulant */}
      {isOpen && (
        <div style={{
          padding: "1rem 1.5rem",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "8px",
          marginTop: "0.5rem"
        }}>
          {data.sections.map((section, index) => (
            <div key={index} style={{ marginBottom: index < data.sections.length - 1 ? "1.5rem" : "0" }}>
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
              
              {section.type === "liste-ordonnee" && Array.isArray(section.contenu) && (
                <ol style={{
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: "1.6",
                  margin: 0,
                  paddingLeft: "1.5rem"
                }}>
                  {section.contenu.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: idx < section.contenu.length - 1 ? "0.5rem" : "0" }}>
                      {item}
                    </li>
                  ))}
                </ol>
              )}
              
              {section.type === "liste-puces" && Array.isArray(section.contenu) && (
                <ul style={{
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: "1.6",
                  margin: 0,
                  paddingLeft: "1.5rem",
                  listStyle: "disc"
                }}>
                  {section.contenu.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: idx < section.contenu.length - 1 ? "0.5rem" : "0" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}