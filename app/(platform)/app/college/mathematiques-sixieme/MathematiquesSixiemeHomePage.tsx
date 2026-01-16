"use client";

import Link from "next/link";
import AppLayout from "@/app/components/AppLayout";
import { useState, useMemo } from "react";
import { LuPlay, LuBrain, LuSparkles, LuCalculator, LuChevronDown, LuChevronUp, LuCircleHelp, LuSchool, LuBookOpen, LuUsers, LuTarget, LuClipboardCheck, LuMessageSquare, LuChevronRight } from "react-icons/lu";
import chapitresData from "@/app/documents/college/sixieme/mathematiques-6eme/6eme-maths-architecture-HR.json";

export default function MathematiquesSixiemeHomePage() {
  const [hoveredButton, setHoveredButton] = useState(false);
  const [isPlanCoursOpen, setIsPlanCoursOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [isMathsSixiemeOpen, setIsMathsSixiemeOpen] = useState(false);
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  const [openCompetences, setOpenCompetences] = useState<Record<string, boolean>>({});

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
  const nombreContenusPedagogiques = chapitres.reduce((total: number, ch: any) => total + ch.nombreExercices, 0);

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
            href="/app/college/mathematiques-sixieme/premier-cours"
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
            onClick={() => setIsMathsSixiemeOpen(!isMathsSixiemeOpen)}
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
                <LuSchool size={22} />
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
              <p style={{
                margin: "1.5rem 0",
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.7)",
                fontStyle: "italic"
              }}>
                🏫 Contenu "Les mathématiques en sixième" à venir...
              </p>
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
            onClick={() => setIsFAQOpen(!isFAQOpen)}
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
              <p style={{
                margin: "1.5rem 0",
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.7)",
                fontStyle: "italic"
              }}>
                ❓ Contenu FAQ à venir...
              </p>
            </div>
          )}
        </div>

        {/* Section Contenu du cours (anciennement Plan du cours) */}
        <div style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "16px",
          overflow: "visible",
          marginBottom: "1.5rem",
          marginLeft: "0",
          maxWidth: "780px"
        }}>
          {/* En-tête cliquable */}
          <button
            onClick={() => setIsPlanCoursOpen(!isPlanCoursOpen)}
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
                Contenu du cours
              </span>
            </div>

            {/* Droite : Icône chevron */}
            <div style={{ color: "rgba(255,255,255,0.6)" }}>
              {isPlanCoursOpen ? <LuChevronUp size={24} /> : <LuChevronDown size={24} />}
            </div>
          </button>

          {/* Contenu déroulant : Liste des chapitres */}
          {isPlanCoursOpen && (
            <div style={{
              padding: "0 2rem 1.5rem 2rem",
              borderTop: "1px solid rgba(255,255,255,0.1)"
            }}>
              {chapitres.map((chapitre, index) => (
                <div key={chapitre.id} style={{ marginTop: "1rem" }}>
                  {/* Bouton chapitre */}
                  <button
                    onClick={() => toggleChapter(chapitre.id)}
                    style={{
                      width: "100%",
                      padding: "0.8rem 1.5rem",
                      background: openChapters[chapitre.id] 
                        ? "rgba(159, 122, 234, 0.1)" 
                        : "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "1rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      if (!openChapters[chapitre.id]) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!openChapters[chapitre.id]) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      }
                    }}
                  >
                    {/* Chevron à gauche */}
                    <div style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0 }}>
                      {openChapters[chapitre.id] ? <LuChevronUp size={20} /> : <LuChevronDown size={20} />}
                    </div>

                    {/* Titre du chapitre uniquement */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "1.15rem",
                        color: "#fff",
                        fontWeight: 600
                      }}>
                        Chapitre {index + 1}. {chapitre.titre}
                      </div>
                    </div>
                  </button>

                  {/* Sous-menu : 5 liens */}
                  {openChapters[chapitre.id] && (
                    <div style={{
                      marginTop: "0.5rem",
                      padding: "0.75rem",
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "12px",
                      border: "1px solid rgba(159, 122, 234, 0.2)",
                      position: "relative",
                      zIndex: 1
                    }}>
                      {/* 1. Cours interactif */}
                      <Link
                        href={`/app/college/mathematiques-sixieme/chapitre-${index + 1}/cours`}
                        style={{ textDecoration: "none" }}
                      >
                        <div style={{
                          padding: "0.65rem 0.85rem",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.7rem",
                          cursor: "pointer",
                          transition: "background 0.2s ease",
                          marginBottom: "0.4rem"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <LuBookOpen size={18} style={{ color: "#B794F6" }} />
                          <span style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 500 }}>
                            Cours interactif
                          </span>
                        </div>
                      </Link>

                      {/* 2. Exercice en binôme */}
                      <Link
                        href={`/app/college/mathematiques-sixieme/chapitre-${index + 1}/binome`}
                        style={{ textDecoration: "none" }}
                      >
                        <div style={{
                          padding: "0.65rem 0.85rem",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.7rem",
                          cursor: "pointer",
                          transition: "background 0.2s ease",
                          marginBottom: "0.4rem"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <LuUsers size={18} style={{ color: "#B794F6" }} />
                          <span style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 500 }}>
                            Exercice en binôme
                          </span>
                        </div>
                      </Link>

                      {/* 3. Compétences clés (avec sous-menu déroulant) */}
                      <div style={{ marginBottom: "0.4rem", position: "relative" }}>
                        <div
                          onClick={() => toggleCompetences(chapitre.id)}
                          style={{
                            padding: "0.65rem 0.85rem",
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
                          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                            <LuTarget size={18} style={{ color: "#B794F6" }} />
                            <span style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 500 }}>
                              Compétences clés
                            </span>
                          </div>
                          <LuChevronRight 
                            size={16} 
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
                            padding: "0.75rem",
                            background: "rgba(15,15,25,0.98)",
                            borderRadius: "12px",
                            border: "1px solid rgba(159, 122, 234, 0.4)",
                            maxHeight: "500px",
                            overflowY: "auto",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                            zIndex: 9999
                          }}>
                            {/* Titre du sous-menu */}
                            <div style={{
                              fontSize: "1rem",
                              fontWeight: 600,
                              color: "#B794F6",
                              marginBottom: "0.75rem",
                              paddingBottom: "0.5rem",
                              borderBottom: "1px solid rgba(159, 122, 234, 0.2)"
                            }}>
                              {chapitre.nombreExercices} exercices
                            </div>

                            {/* Liste des exercices du JSON */}
                            {chapitresData[index].exercices.L.map((exercice: any, exIndex: number) => (
                              <Link
                                key={exIndex}
                                href={`/app/college/mathematiques-sixieme/chapitre-${index + 1}/exercice-${exIndex + 1}`}
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
                        )}
                      </div>

                      {/* 4. Contrôle du chapitre */}
                      <Link
                        href={`/app/college/mathematiques-sixieme/chapitre-${index + 1}/controle`}
                        style={{ textDecoration: "none" }}
                      >
                        <div style={{
                          padding: "0.65rem 0.85rem",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.7rem",
                          cursor: "pointer",
                          transition: "background 0.2s ease",
                          marginBottom: "0.4rem"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <LuClipboardCheck size={18} style={{ color: "#B794F6" }} />
                          <span style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 500 }}>
                            Contrôle du chapitre
                          </span>
                        </div>
                      </Link>

                      {/* 5. Session libre */}
                      <Link
                        href={`/app/college/mathematiques-sixieme/chapitre-${index + 1}/session-libre`}
                        style={{ textDecoration: "none" }}
                      >
                        <div style={{
                          padding: "0.65rem 0.85rem",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.7rem",
                          cursor: "pointer",
                          transition: "background 0.2s ease"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <LuMessageSquare size={18} style={{ color: "#B794F6" }} />
                          <span style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 500 }}>
                            Session libre
                          </span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </AppLayout>
  );
}