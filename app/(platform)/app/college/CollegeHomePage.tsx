"use client";

import Link from "next/link";
import AppLayout from "@/app/components/AppLayout";
import { useState } from "react";

// Import des icônes Lucide React - ICÔNES UNIVERSELLES
import { 
  Calculator,      // Mathématiques
  BookOpen,        // Français
  Globe,           // Anglais
  Languages,       // Allemand
  Landmark,        // Histoire
  Map,             // Géographie
  Atom,            // Sciences (remplace Flask)
  Scale            // EMC
} from "lucide-react";

type Matiere = {
  id: string;
  nom: string;
  Icon: any;
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
  ];

  const matieresSixieme: Matiere[] = [
    {
      id: "mathematiques",
      nom: "Mathématiques 6ème",
      Icon: Calculator,
      seances: 12,
      path: "/app/college/sixieme/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français 6ème",
      Icon: BookOpen,
      seances: 15,
      path: "/app/college/sixieme/matieres/francais"
    },
    {
      id: "anglais",
      nom: "Anglais 6ème",
      Icon: Globe,
      seances: 10,
      path: "/app/college/sixieme/matieres/anglais"
    },
    {
      id: "allemand",
      nom: "Allemand 6ème",
      Icon: Languages,
      seances: 10,
      path: "/app/college/sixieme/matieres/allemand"
    },
    {
      id: "histoire",
      nom: "Histoire 6ème",
      Icon: Landmark,
      seances: 11,
      path: "/app/college/sixieme/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie 6ème",
      Icon: Map,
      seances: 9,
      path: "/app/college/sixieme/matieres/geographie"
    },
    {
      id: "sciences",
      nom: "Sciences 6ème",
      Icon: Atom,  // Changé de Flask à Atom
      seances: 13,
      path: "/app/college/sixieme/matieres/sciences"
    },
    {
      id: "emc",
      nom: "Enseignement Moral et Civique 6ème",
      Icon: Scale,
      seances: 8,
      path: "/app/college/sixieme/matieres/emc"
    }
  ];

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

        {/* Matières de Sixième */}
        {selectedClass === "sixieme" && (
          <div style={{ marginTop: "2rem" }}>
            <h2 style={{ 
              fontSize: "1.8rem", 
              marginBottom: "0.5rem",
              fontWeight: 700
            }}>
              Matières de Sixième
            </h2>
            
            <p style={{ 
              fontSize: "0.95rem", 
              opacity: 0.8,
              marginBottom: "1.5rem"
            }}>
              8 matières • Des centaines de modules • Des milliers d'activités
            </p>

            {/* Grille de matières */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
              maxWidth: "1300px",
              margin: "0 auto"
            }}>
              {matieresSixieme.map((matiere) => {
                const IconComponent = matiere.Icon;
                
                return (
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
                          {/* Icône Lucide React avec couleur */}
                          <IconComponent 
                            size={36} 
                            strokeWidth={2}
                            style={{
                              color: "#2d2d2d"
                            }}
                          />
                        </div>
                      </div>

                      {/* Partie basse */}
                      <div style={{
                        padding: "1rem",
                        background: "rgba(255,255,255,0.03)"
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
                          marginBottom: "0.75rem"
                        }}>
                          {matiere.seances} séances
                        </div>

                        {/* Titre */}
                        <h3 style={{
                          fontSize: "1rem",
                          fontWeight: 700,
                          margin: "0",
                          color: "#fff",
                          lineHeight: "1.3"
                        }}>
                          {matiere.nom}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Message pour les autres classes */}
        {selectedClass && selectedClass !== "sixieme" && (
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