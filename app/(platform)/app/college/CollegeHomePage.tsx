"use client";

import Link from "next/link";
import AppLayout from "@/app/components/AppLayout";
import { useState } from "react";

type Matiere = {
  id: string;
  nom: string;
  emoji: string;
  seances: number;
  path: string;
};

export default function CollegePage() {
  const [selectedClass, setSelectedClass] = useState<string>("sixieme");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const classes = [
    { id: "sixieme", label: "Sixième" },
    { id: "cinquieme", label: "Cinquième" },
    { id: "quatrieme", label: "Quatrième" },
    { id: "troisieme", label: "Troisième" },
    { id: "brevet", label: "Brevet" },
  ];

  const matieresSixieme: Matiere[] = [
    {
      id: "mathematiques",
      nom: "Mathématiques 6ème",
      emoji: "📐",
      seances: 12,
      path: "/app/college/sixieme/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français 6ème",
      emoji: "📚",
      seances: 15,
      path: "/app/college/sixieme/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire 6ème",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/sixieme/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie 6ème",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/sixieme/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC 6ème",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/sixieme/matieres/emc"
    },
    {
      id: "sciences",
      nom: "Sciences 6ème",
      emoji: "🔬",
      seances: 13,
      path: "/app/college/sixieme/matieres/sciences"
    },
    {
      id: "anglais",
      nom: "Anglais 6ème",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/sixieme/matieres/anglais"
    }
  ];

  const matieresCinquieme: Matiere[] = [
    {
      id: "mathematiques",
      nom: "Mathématiques 5ème",
      emoji: "📐",
      seances: 12,
      path: "/app/college/cinquieme/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français 5ème",
      emoji: "📚",
      seances: 15,
      path: "/app/college/cinquieme/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire 5ème",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/cinquieme/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie 5ème",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/cinquieme/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC 5ème",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/cinquieme/matieres/emc"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie 5ème",
      emoji: "⚛️",
      seances: 10,
      path: "/app/college/cinquieme/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT 5ème",
      emoji: "🧬",
      seances: 10,
      path: "/app/college/cinquieme/matieres/svt"
    },
    {
      id: "technologie",
      nom: "Technologie 5ème",
      emoji: "⚙️",
      seances: 10,
      path: "/app/college/cinquieme/matieres/technologie"
    },
    {
      id: "anglais",
      nom: "Anglais 5ème",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/cinquieme/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol 5ème",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/college/cinquieme/matieres/espagnol"
    }
  ];

  const matieresQuatrieme: Matiere[] = [
    {
      id: "mathematiques",
      nom: "Mathématiques 4ème",
      emoji: "📐",
      seances: 12,
      path: "/app/college/quatrieme/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français 4ème",
      emoji: "📚",
      seances: 15,
      path: "/app/college/quatrieme/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire 4ème",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/quatrieme/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie 4ème",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/quatrieme/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC 4ème",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/quatrieme/matieres/emc"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie 4ème",
      emoji: "⚛️",
      seances: 10,
      path: "/app/college/quatrieme/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT 4ème",
      emoji: "🧬",
      seances: 10,
      path: "/app/college/quatrieme/matieres/svt"
    },
    {
      id: "technologie",
      nom: "Technologie 4ème",
      emoji: "⚙️",
      seances: 10,
      path: "/app/college/quatrieme/matieres/technologie"
    },
    {
      id: "anglais",
      nom: "Anglais 4ème",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/quatrieme/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol 4ème",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/college/quatrieme/matieres/espagnol"
    }
  ];

  const matieresTroisieme: Matiere[] = [
    {
      id: "mathematiques",
      nom: "Mathématiques 3ème",
      emoji: "📐",
      seances: 12,
      path: "/app/college/troisieme/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français 3ème",
      emoji: "📚",
      seances: 15,
      path: "/app/college/troisieme/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire 3ème",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/troisieme/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie 3ème",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/troisieme/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC 3ème",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/troisieme/matieres/emc"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie 3ème",
      emoji: "⚛️",
      seances: 10,
      path: "/app/college/troisieme/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT 3ème",
      emoji: "🧬",
      seances: 10,
      path: "/app/college/troisieme/matieres/svt"
    },
    {
      id: "technologie",
      nom: "Technologie 3ème",
      emoji: "⚙️",
      seances: 10,
      path: "/app/college/troisieme/matieres/technologie"
    },
    {
      id: "anglais",
      nom: "Anglais 3ème",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/troisieme/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol 3ème",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/college/troisieme/matieres/espagnol"
    }
  ];

  type Epreuve = {
    id: string;
    nom: string;
    emoji: string;
    description: string;
    path: string;
  };

  const epreuvesBrevet: Epreuve[] = [
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      description: "Écrit sur 3 heures (compréhension, dictée, rédaction, grammaire) • Coefficient 2",
      path: "/app/college/brevet/epreuves/francais"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "➕",
      description: "Épreuve écrite (environ 2 heures) • Coefficient 2",
      path: "/app/college/brevet/epreuves/mathematiques"
    },
    {
      id: "histoire-geo-emc",
      nom: "Histoire-Géographie + EMC",
      emoji: "🏛️",
      description: "Épreuve écrite (≈2 heures) • Histoire-Géographie (coef 1,5) + EMC (coef 0,5)",
      path: "/app/college/brevet/epreuves/histoire-geo-emc"
    },
    {
      id: "sciences",
      nom: "Sciences",
      emoji: "🔬",
      description: "Épreuve écrite d'1 heure, portant sur deux disciplines scientifiques tirées au sort parmi : Physique-Chimie, SVT, Technologie • Coefficient 2",
      path: "/app/college/brevet/epreuves/sciences"
    },
    {
      id: "oral",
      nom: "Oral du brevet",
      emoji: "📣",
      description: "Présentation d'un projet réalisé en cours (par exemple histoire des arts, projet interdisciplinaire) • Coefficient 2",
      path: "/app/college/brevet/epreuves/oral"
    }
  ];

  // Fonction pour obtenir les matières selon la classe sélectionnée
  const getMatieres = () => {
    switch(selectedClass) {
      case "sixieme": return matieresSixieme;
      case "cinquieme": return matieresCinquieme;
      case "quatrieme": return matieresQuatrieme;
      case "troisieme": return matieresTroisieme;
      default: return [];
    }
  };

  // Fonction pour obtenir le titre selon la classe
  const getTitre = () => {
    switch(selectedClass) {
      case "sixieme": return "Matières de Sixième";
      case "cinquieme": return "Matières de Cinquième";
      case "quatrieme": return "Matières de Quatrième";
      case "troisieme": return "Matières de Troisième";
      default: return "";
    }
  };

  // Fonction pour obtenir le nombre de matières
  const getNombreMatieres = () => {
    switch(selectedClass) {
      case "sixieme": return 7;
      case "cinquieme": return 10;
      case "quatrieme": return 10;
      case "troisieme": return 10;
      case "brevet": return 5; // 5 épreuves
      default: return 0;
    }
  };

  const matieres = getMatieres();
  const epreuves = selectedClass === "brevet" ? epreuvesBrevet : [];
  const showMatieres = ["sixieme", "cinquieme", "quatrieme", "troisieme"].includes(selectedClass);
  const showBrevet = selectedClass === "brevet";

  return (
    <AppLayout>
      <main style={{ 
        padding: "1.5rem 3rem", 
        fontFamily: "sans-serif",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {/* En-tête */}
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

        {/* 4 boutons de classes */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginBottom: "2.5rem"
        }}>
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              style={{
                padding: "1rem 2.5rem",
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: "50px",
                color: selectedClass === cls.id ? "#fff" : "rgba(255,255,255,0.9)",
                background: selectedClass === cls.id 
                  ? "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)"
                  : "rgba(255,255,255,0.1)",
                border: selectedClass === cls.id 
                  ? "2px solid rgba(255,215,0,0.5)"
                  : "2px solid rgba(255,255,255,0.2)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (selectedClass !== cls.id) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.borderColor = "rgba(255,215,0,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedClass !== cls.id) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }
              }}
            >
              {cls.label}
            </button>
          ))}
        </div>

        {/* Affichage des matières (Sixième ou Cinquième) */}
        {showMatieres && (
          <div style={{ marginTop: "2rem" }}>
            <h2 style={{ 
              fontSize: "1.8rem", 
              marginBottom: "0.5rem",
              fontWeight: 700
            }}>
              {getTitre()}
            </h2>
            
            <p style={{ 
              fontSize: "0.95rem", 
              opacity: 0.8,
              marginBottom: "1.5rem"
            }}>
              {getNombreMatieres()} matières • Des centaines de modules • Des milliers d'activités
            </p>

            {/* Grille de matières */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
              maxWidth: "1300px",
              margin: "0 auto"
            }}>
              {matieres.map((matiere) => (
                <Link
                  key={matiere.id}
                  href={matiere.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block"
                  }}
                  onMouseEnter={() => setHoveredCard(matiere.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.05)",
                    border: hoveredCard === matiere.id 
                      ? "1px solid rgba(255,255,255,0.3)"
                      : "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.3s ease",
                    transform: hoveredCard === matiere.id 
                      ? "translateY(-8px)" 
                      : "translateY(0)",
                    boxShadow: hoveredCard === matiere.id
                      ? "0 12px 24px rgba(0,0,0,0.3)"
                      : "0 4px 8px rgba(0,0,0,0.2)",
                  }}>
                    {/* Partie haute avec dégradé */}
                    <div style={{
                      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #3d3d3d 100%)",
                      padding: "2rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden"
                    }}>
                      {/* Effet brillance doré */}
                      <div style={{
                        position: "absolute",
                        top: "-50%",
                        left: "-50%",
                        width: "200%",
                        height: "200%",
                        background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
                        pointerEvents: "none"
                      }} />

                      {/* Conteneur de l'icône avec illumination */}
                      <div style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "18px",
                        background: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 1,
                        boxShadow: hoveredCard === matiere.id
                          ? "0 0 0 4px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.5), 0 0 50px rgba(255,215,0,0.3)"
                          : "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease"
                      }}>
                        {/* Emoji */}
                        <span style={{ fontSize: "2.2rem" }}>
                          {matiere.emoji}
                        </span>
                      </div>
                    </div>

                    {/* Partie basse avec espace pour avancement futur */}
                    <div style={{
                      padding: "1.5rem",
                      background: "rgba(255,255,255,0.03)",
                      minHeight: "120px"
                    }}>
                      {/* Badge séances */}
                      <div style={{
                        display: "inline-block",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(40,40,40,0.6) 100%)",
                        border: "1px solid rgba(255,215,0,0.3)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#FFD700",
                        marginBottom: "1rem"
                      }}>
                        {matiere.seances} séances
                      </div>

                      {/* Titre */}
                      <h3 style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        margin: "0 0 1rem 0",
                        color: "#fff",
                        lineHeight: "1.3"
                      }}>
                        {matiere.nom}
                      </h3>

                      {/* Espace réservé pour avancement (à remplir plus tard) */}
                      <div style={{
                        minHeight: "40px",
                        opacity: 0.3,
                        borderTop: "1px dashed rgba(255,255,255,0.1)",
                        paddingTop: "0.75rem",
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.5)"
                      }}>
                        {/* Espace pour : % terminé, barre de progression, nombre d'étapes */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Affichage des épreuves du Brevet */}
        {showBrevet && (
          <div style={{ marginTop: "2rem" }}>
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
              5 épreuves • Des dizaines de brevets blancs • Des centaines d'exercices pratiques
            </p>

            {/* Grille des épreuves */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
              maxWidth: "1300px",
              margin: "0 auto"
            }}>
              {epreuves.map((epreuve) => (
                <Link
                  key={epreuve.id}
                  href={epreuve.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block"
                  }}
                  onMouseEnter={() => setHoveredCard(epreuve.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.05)",
                    border: hoveredCard === epreuve.id 
                      ? "1px solid rgba(255,255,255,0.3)"
                      : "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.3s ease",
                    transform: hoveredCard === epreuve.id 
                      ? "translateY(-8px)" 
                      : "translateY(0)",
                    boxShadow: hoveredCard === epreuve.id
                      ? "0 12px 24px rgba(0,0,0,0.3)"
                      : "0 4px 8px rgba(0,0,0,0.2)",
                  }}>
                    {/* Partie haute avec dégradé */}
                    <div style={{
                      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #3d3d3d 100%)",
                      padding: "2rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden"
                    }}>
                      {/* Effet brillance doré */}
                      <div style={{
                        position: "absolute",
                        top: "-50%",
                        left: "-50%",
                        width: "200%",
                        height: "200%",
                        background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
                        pointerEvents: "none"
                      }} />

                      {/* Conteneur de l'icône avec illumination */}
                      <div style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "18px",
                        background: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 1,
                        boxShadow: hoveredCard === epreuve.id
                          ? "0 0 0 4px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.5), 0 0 50px rgba(255,215,0,0.3)"
                          : "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease"
                      }}>
                        {/* Emoji */}
                        <span style={{ fontSize: "2.2rem" }}>
                          {epreuve.emoji}
                        </span>
                      </div>
                    </div>

                    {/* Partie basse */}
                    <div style={{
                      padding: "1.5rem",
                      background: "rgba(255,255,255,0.03)",
                      minHeight: "140px"
                    }}>
                      {/* Titre */}
                      <h3 style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        margin: "0 0 0.75rem 0",
                        color: "#fff",
                        lineHeight: "1.3"
                      }}>
                        {epreuve.nom}
                      </h3>

                      {/* Description */}
                      <p style={{
                        fontSize: "0.8rem",
                        margin: 0,
                        color: "rgba(255,255,255,0.75)",
                        lineHeight: "1.4"
                      }}>
                        {epreuve.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Message pour les autres classes */}
        {selectedClass && !showMatieres && !showBrevet && (
          <div style={{
            textAlign: "center",
            padding: "3rem 2rem",
            background: "rgba(255,193,7,0.1)",
            borderRadius: "12px",
            border: "1px solid rgba(255,193,7,0.3)",
            marginTop: "3rem"
          }}>
            <p style={{ 
              margin: 0, 
              fontSize: "1.1rem",
              opacity: 0.9 
            }}>
              🚧 Les matières pour <strong>{classes.find(c => c.id === selectedClass)?.label}</strong> arrivent bientôt !
            </p>
          </div>
        )}
      </main>
    </AppLayout>
  );
}