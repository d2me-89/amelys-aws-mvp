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

type Epreuve = {
  id: string;
  nom: string;
  emoji: string;
  seances: number;
  path: string;
};

export default function LyceePage() {
  const [selectedClass, setSelectedClass] = useState<string>("seconde");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const classes = [
    { id: "seconde", label: "Seconde" },
    { id: "premiere", label: "Première" },
    { id: "terminale", label: "Terminale" },
    { id: "baccalaureat", label: "Baccalauréat" },
  ];

  const matieresSeconde: Matiere[] = [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 12,
      path: "/app/lycee/seconde/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 15,
      path: "/app/lycee/seconde/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/lycee/seconde/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/lycee/seconde/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/lycee/seconde/matieres/emc"
    },
    {
      id: "ses",
      nom: "SES",
      emoji: "💼",
      seances: 10,
      path: "/app/lycee/seconde/matieres/ses"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/lycee/seconde/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/lycee/seconde/matieres/svt"
    },
    {
      id: "nsi",
      nom: "Numérique et sciences informatiques",
      emoji: "💻",
      seances: 10,
      path: "/app/lycee/seconde/matieres/nsi"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/lycee/seconde/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/lycee/seconde/matieres/espagnol"
    }
  ];

  const matieresPremiere: Matiere[] = [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 12,
      path: "/app/lycee/premiere/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 15,
      path: "/app/lycee/premiere/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/lycee/premiere/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/lycee/premiere/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/lycee/premiere/matieres/emc"
    },
    {
      id: "ses",
      nom: "SES",
      emoji: "💼",
      seances: 10,
      path: "/app/lycee/premiere/matieres/ses"
    },
    {
      id: "enseignement-scientifique",
      nom: "Enseignement scientifique",
      emoji: "🔬",
      seances: 10,
      path: "/app/lycee/premiere/matieres/enseignement-scientifique"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/lycee/premiere/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/lycee/premiere/matieres/svt"
    },
    {
      id: "nsi",
      nom: "Numérique et sciences informatiques",
      emoji: "💻",
      seances: 10,
      path: "/app/lycee/premiere/matieres/nsi"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/lycee/premiere/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/lycee/premiere/matieres/espagnol"
    },
    {
      id: "hggsp",
      nom: "Histoire-géographie, géopolitique et sciences politiques",
      emoji: "🌐",
      seances: 10,
      path: "/app/lycee/premiere/matieres/hggsp"
    },
    {
      id: "hlp",
      nom: "Humanités, littérature et philosophie",
      emoji: "📖",
      seances: 10,
      path: "/app/lycee/premiere/matieres/hlp"
    },
    {
      id: "llce-anglais",
      nom: "LLCE Anglais",
      emoji: "🎭",
      seances: 10,
      path: "/app/lycee/premiere/matieres/llce-anglais"
    },
    {
      id: "sciences-ingenieur",
      nom: "Sciences de l'ingénieur",
      emoji: "⚙️",
      seances: 10,
      path: "/app/lycee/premiere/matieres/sciences-ingenieur"
    }
  ];

  const matieresTerminale: Matiere[] = [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 12,
      path: "/app/lycee/terminale/matieres/mathematiques"
    },
    {
      id: "philosophie",
      nom: "Philosophie",
      emoji: "🤔",
      seances: 12,
      path: "/app/lycee/terminale/matieres/philosophie"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/lycee/terminale/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/lycee/terminale/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/lycee/terminale/matieres/emc"
    },
    {
      id: "ses",
      nom: "SES",
      emoji: "💼",
      seances: 10,
      path: "/app/lycee/terminale/matieres/ses"
    },
    {
      id: "enseignement-scientifique",
      nom: "Enseignement scientifique",
      emoji: "🔬",
      seances: 10,
      path: "/app/lycee/terminale/matieres/enseignement-scientifique"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/lycee/terminale/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/lycee/terminale/matieres/svt"
    },
    {
      id: "nsi",
      nom: "Numérique et sciences informatiques",
      emoji: "💻",
      seances: 10,
      path: "/app/lycee/terminale/matieres/nsi"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/lycee/terminale/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/lycee/terminale/matieres/espagnol"
    },
    {
      id: "hggsp",
      nom: "Histoire-géographie, géopolitique et sciences politiques",
      emoji: "🌐",
      seances: 10,
      path: "/app/lycee/terminale/matieres/hggsp"
    },
    {
      id: "hlp",
      nom: "Humanités, littérature et philosophie",
      emoji: "📖",
      seances: 10,
      path: "/app/lycee/terminale/matieres/hlp"
    },
    {
      id: "llce-anglais",
      nom: "LLCE Anglais",
      emoji: "🎭",
      seances: 10,
      path: "/app/lycee/terminale/matieres/llce-anglais"
    },
    {
      id: "sciences-ingenieur",
      nom: "Sciences de l'ingénieur",
      emoji: "⚙️",
      seances: 10,
      path: "/app/lycee/terminale/matieres/sciences-ingenieur"
    },
    {
      id: "maths-complementaires",
      nom: "Mathématiques complémentaires",
      emoji: "📊",
      seances: 10,
      path: "/app/lycee/terminale/matieres/maths-complementaires"
    }
  ];

  const epreuvesBaccalaureat: Epreuve[] = [
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/francais"
    },
    {
      id: "philosophie",
      nom: "Philosophie",
      emoji: "🤔",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/philosophie"
    },
    {
      id: "ses",
      nom: "SES",
      emoji: "💼",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/ses"
    },
    {
      id: "enseignement-scientifique",
      nom: "Enseignement scientifique",
      emoji: "🔬",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/enseignement-scientifique"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/mathematiques"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/svt"
    },
    {
      id: "nsi",
      nom: "Numérique et sciences informatiques",
      emoji: "💻",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/nsi"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/espagnol"
    },
    {
      id: "hggsp",
      nom: "Histoire-géographie, géopolitique et sciences politiques",
      emoji: "🌐",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/hggsp"
    },
    {
      id: "hlp",
      nom: "Humanités, littérature et philosophie",
      emoji: "📖",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/hlp"
    },
    {
      id: "llce-anglais",
      nom: "LLCE Anglais",
      emoji: "🎭",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/llce-anglais"
    },
    {
      id: "sciences-ingenieur",
      nom: "Sciences de l'ingénieur",
      emoji: "⚙️",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/sciences-ingenieur"
    },
    {
      id: "grand-oral",
      nom: "Grand oral",
      emoji: "📣",
      seances: 10,
      path: "/app/lycee/baccalaureat/epreuves/grand-oral"
    }
  ];

  // Fonction pour obtenir les matières selon la classe sélectionnée
  const getMatieres = () => {
    switch(selectedClass) {
      case "seconde": return matieresSeconde;
      case "premiere": return matieresPremiere;
      case "terminale": return matieresTerminale;
      default: return [];
    }
  };

  // Fonction pour obtenir le titre selon la classe
  const getTitre = () => {
    switch(selectedClass) {
      case "seconde": return "Matières de Seconde";
      case "premiere": return "Matières de Première";
      case "terminale": return "Matières de Terminale";
      case "baccalaureat": return "Épreuves du Baccalauréat";
      default: return "";
    }
  };

  // Fonction pour obtenir le nombre de matières
  const getNombreMatieres = () => {
    switch(selectedClass) {
      case "seconde": return 11;
      case "premiere": return 16;
      case "terminale": return 17;
      case "baccalaureat": return 15;
      default: return 0;
    }
  };

  const matieres = getMatieres();
  const epreuves = selectedClass === "baccalaureat" ? epreuvesBaccalaureat : [];
  const showMatieres = ["seconde", "premiere", "terminale"].includes(selectedClass);
  const showBaccalaureat = selectedClass === "baccalaureat";

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
          Lycée
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

        {/* Affichage des matières (Seconde, Première, Terminale) */}
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
                      background: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)",
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
                        background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
                        pointerEvents: "none"
                      }} />

                      {/* Conteneur de l'icône avec illumination */}
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
                          ? "0 0 0 4px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.5), 0 0 50px rgba(255,215,0,0.3)"
                          : "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease"
                      }}>
                        {/* Emoji */}
                        <span style={{ fontSize: "1.87rem" }}>
                          {matiere.emoji}
                        </span>
                      </div>
                    </div>

                    {/* Partie basse avec espace pour avancement futur */}
                    <div style={{
                      padding: "1.28rem",
                      background: "rgba(255,255,255,0.03)",
                      minHeight: "102px"
                    }}>
                      {/* Badge séances */}
                      <div style={{
                        display: "inline-block",
                        padding: "0.31rem 0.82rem",
                        borderRadius: "17px",
                        background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(40,40,40,0.6) 100%)",
                        border: "1px solid rgba(255,215,0,0.3)",
                        fontSize: "0.77rem",
                        fontWeight: 600,
                        color: "#FFD700",
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

        {/* Affichage des épreuves du Baccalauréat */}
        {showBaccalaureat && (
          <div style={{ marginTop: "2rem" }}>
            <h2 style={{ 
              fontSize: "1.8rem", 
              marginBottom: "0.5rem",
              fontWeight: 700
            }}>
              Épreuves du Baccalauréat
            </h2>
            
            <p style={{ 
              fontSize: "0.95rem", 
              opacity: 0.8,
              marginBottom: "1.5rem"
            }}>
              15 épreuves • Des dizaines de bacs blancs • Des centaines d'exercices pratiques
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
                      background: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)",
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
                        background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
                        pointerEvents: "none"
                      }} />

                      {/* Conteneur de l'icône avec illumination */}
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
                          ? "0 0 0 4px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.5), 0 0 50px rgba(255,215,0,0.3)"
                          : "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease"
                      }}>
                        {/* Emoji */}
                        <span style={{ fontSize: "1.87rem" }}>
                          {epreuve.emoji}
                        </span>
                      </div>
                    </div>

                    {/* Partie basse */}
                    <div style={{
                      padding: "1.28rem",
                      background: "rgba(255,255,255,0.03)",
                      minHeight: "102px"
                    }}>
                      {/* Badge séances */}
                      <div style={{
                        display: "inline-block",
                        padding: "0.31rem 0.82rem",
                        borderRadius: "17px",
                        background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(40,40,40,0.6) 100%)",
                        border: "1px solid rgba(255,215,0,0.3)",
                        fontSize: "0.77rem",
                        fontWeight: 600,
                        color: "#FFD700",
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
      </main>
    </AppLayout>
  );
}