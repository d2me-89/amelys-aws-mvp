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
      seances: 13,
      path: "/app/college/mathematiques-sixieme"
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
    seances: number;
    path: string;
  };

  const epreuvesBrevet: Epreuve[] = [
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 10,
      path: "/app/college/brevet/epreuves/francais"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 10,
      path: "/app/college/brevet/epreuves/mathematiques"
    },
    {
      id: "histoire-geo-emc",
      nom: "Histoire-Géographie + EMC",
      emoji: "🏛️",
      seances: 10,
      path: "/app/college/brevet/epreuves/histoire-geo-emc"
    },
    {
      id: "sciences",
      nom: "Sciences",
      emoji: "🔬",
      seances: 10,
      path: "/app/college/brevet/epreuves/sciences"
    },
    {
      id: "oral",
      nom: "Oral du brevet",
      emoji: "📣",
      seances: 10,
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
                  ? "linear-gradient(135deg, #B794F6 0%, #9F7AEA 50%, #805AD5 100%)"
                  : "rgba(255,255,255,0.1)",
                border: selectedClass === cls.id 
                  ? "2px solid rgba(183,148,246,0.5)"
                  : "2px solid rgba(255,255,255,0.2)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (selectedClass !== cls.id) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.borderColor = "rgba(183,148,246,0.4)";
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
                    {/* Partie haute avec dégradé - RÉDUITE de 15% */}
                    <div style={{
                      background: "linear-gradient(135deg, #E8E0FF 0%, #D4C5FF 50%, #C4B5FE 100%)",
                      padding: "1.7rem 1.3rem",
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
                        background: "radial-gradient(circle, rgba(183,148,246,0.15) 0%, transparent 70%)",
                        pointerEvents: "none"
                      }} />

                      {/* Conteneur de l'icône avec illumination - RÉDUIT de 15% */}
                      <div style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "15px",
                        background: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 1,
                        boxShadow: hoveredCard === matiere.id
                          ? "0 0 0 4px rgba(183,148,246,0.5), 0 0 30px rgba(183,148,246,0.5), 0 0 50px rgba(183,148,246,0.3)"
                          : "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease"
                      }}>
                        {/* Emoji - RÉDUIT de 15% */}
                        <span style={{ fontSize: "1.87rem" }}>
                          {matiere.emoji}
                        </span>
                      </div>
                    </div>

                    {/* Partie basse avec espace pour avancement futur - RÉDUITE de 15% */}
                    <div style={{
                      padding: "1.28rem",
                      background: "rgba(255,255,255,0.03)",
                      minHeight: "102px"
                    }}>
                      {/* Badge séances - AGRANDI de 20% */}
                      <div style={{
                        display: "inline-block",
                        padding: "0.31rem 0.82rem",
                        borderRadius: "17px",
                        background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(40,40,40,0.6) 100%)",
                        border: "1px solid rgba(183,148,246,0.3)",
                        fontSize: "0.77rem",
                        fontWeight: 600,
                        color: "#B794F6",
                        marginBottom: "0.85rem"
                      }}>
                        {matiere.seances} séances
                      </div>

                      {/* Titre - Hauteur fixe pour uniformité */}
                      <h3 style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        margin: "0 0 0.85rem 0",
                        color: "#fff",
                        lineHeight: "1.3",
                        minHeight: "3.1rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {matiere.nom}
                      </h3>

                      {/* Espace réservé pour avancement (à remplir plus tard) - RÉDUIT de 15% */}
                      <div style={{
                        minHeight: "34px",
                        opacity: 0.3,
                        borderTop: "1px dashed rgba(255,255,255,0.1)",
                        paddingTop: "0.64rem",
                        fontSize: "0.6rem",
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
                    {/* Partie haute avec dégradé - RÉDUITE de 15% */}
                    <div style={{
                      background: "linear-gradient(135deg, #E8E0FF 0%, #D4C5FF 50%, #C4B5FE 100%)",
                      padding: "1.7rem 1.3rem",
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
                        background: "radial-gradient(circle, rgba(183,148,246,0.15) 0%, transparent 70%)",
                        pointerEvents: "none"
                      }} />

                      {/* Conteneur de l'icône avec illumination - RÉDUIT de 15% */}
                      <div style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "15px",
                        background: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 1,
                        boxShadow: hoveredCard === epreuve.id
                          ? "0 0 0 4px rgba(183,148,246,0.5), 0 0 30px rgba(183,148,246,0.5), 0 0 50px rgba(183,148,246,0.3)"
                          : "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease"
                      }}>
                        {/* Emoji - RÉDUIT de 15% */}
                        <span style={{ fontSize: "1.87rem" }}>
                          {epreuve.emoji}
                        </span>
                      </div>
                    </div>

                    {/* Partie basse - IDENTIQUE aux matières */}
                    <div style={{
                      padding: "1.28rem",
                      background: "rgba(255,255,255,0.03)",
                      minHeight: "102px"
                    }}>
                      {/* Badge séances - AGRANDI de 20% */}
                      <div style={{
                        display: "inline-block",
                        padding: "0.31rem 0.82rem",
                        borderRadius: "17px",
                        background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(40,40,40,0.6) 100%)",
                        border: "1px solid rgba(183,148,246,0.3)",
                        fontSize: "0.77rem",
                        fontWeight: 600,
                        color: "#B794F6",
                        marginBottom: "0.85rem"
                      }}>
                        {epreuve.seances} séances
                      </div>

                      {/* Titre - Hauteur fixe pour uniformité */}
                      <h3 style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        margin: "0 0 0.85rem 0",
                        color: "#fff",
                        lineHeight: "1.3",
                        minHeight: "3.1rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {epreuve.nom}
                      </h3>

                      {/* Espace réservé pour avancement */}
                      <div style={{
                        minHeight: "34px",
                        opacity: 0.3,
                        borderTop: "1px dashed rgba(255,255,255,0.1)",
                        paddingTop: "0.64rem",
                        fontSize: "0.6rem",
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

        {/* Message pour les autres classes */}
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
              🚧 Les matières pour <strong>{classes.find(c => c.id === selectedClass)?.label}</strong> arrivent bientôt !
            </p>
          </div>
        )}
      </main>
    </AppLayout>
  );
}