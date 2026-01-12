"use client";

import Link from "next/link";
import { useSidebar } from "./SidebarContext";

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
      {/* Bouton hamburger (visible quand fermée) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            zIndex: 1000,
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.8)",
            color: "white",
            cursor: "pointer",
            fontSize: "1.25rem",
          }}
          aria-label="Ouvrir le menu"
        >
          ☰
        </button>
      )}

      {/* Overlay (fond sombre sur mobile) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 998,
            display: window.innerWidth < 768 ? "block" : "none",
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isOpen ? "240px" : "0",
          background: "linear-gradient(180deg, rgba(20,20,35,0.98) 0%, rgba(15,15,25,0.98) 100%)",
          borderRight: isOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
          transition: "width 0.3s ease",
          overflow: "hidden",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          boxShadow: isOpen ? "2px 0 10px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem 1rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ 
            fontWeight: 700, 
            fontSize: "1.3rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Amélys
          </div>
          <button
            onClick={toggleSidebar}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: "1.5rem",
              padding: "0.25rem",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
            aria-label="Fermer le menu"
          >
            ×
          </button>
        </div>

        {/* Navigation principale */}
        <nav style={{ 
          flex: "1 1 auto", 
          overflowY: "auto", 
          padding: "1rem 0",
          scrollbarWidth: "thin",
        }}>
          <SidebarLink href="/app" icon="🏠" label="Tableau de bord" />
          <SidebarLink href="/app/matieres/introduction-au-droit" icon="📚" label="Catalogue de cours" />
          <SidebarLink href="/app/entrainements" icon="💪" label="Entraînements" />
          <SidebarLink href="/app/jurisask" icon="🤖" label="AmélysAsk" />
          <SidebarLink href="/app/parcours" icon="🎯" label="Parcours de pré-rentrée" />
          <SidebarLink href="/app/cours-telechargables" icon="📥" label="Cours téléchargeables" />
          <SidebarLink href="/app/profs-en-ligne" icon="👨‍🏫" label="Profs en ligne" />
          
          {/* Section Nos formules */}
          <div style={{ 
            margin: "1.5rem 0.75rem 0.5rem", 
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "1rem" 
          }}>
            <div style={{ 
              fontSize: "0.7rem", 
              opacity: 0.5, 
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.5rem",
              paddingLeft: "0.5rem",
              fontWeight: 600,
            }}>
              Nos formules
            </div>
            <SidebarLink href="/app/formules" icon="🎓" label="Découvrir" />
          </div>
        </nav>

        {/* Footer */}
        <div style={{ 
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "1rem"
        }}>
          <SidebarLink href="/app/profil" icon="👤" label="Profil" />
          <SidebarLink href="/app/parametres" icon="⚙️" label="Paramètres" />
        </div>
      </aside>
    </>
  );
}

// Composant SidebarLink
function SidebarLink({ 
  href, 
  icon, 
  label 
}: { 
  href: string; 
  icon: string; 
  label: string; 
}) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        margin: "0.25rem 0.5rem",
        borderRadius: "8px",
        textDecoration: "none",
        color: "rgba(255,255,255,0.85)",
        transition: "all 0.2s ease",
        fontSize: "0.95rem",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(102, 126, 234, 0.15)";
        e.currentTarget.style.color = "rgba(255,255,255,1)";
        e.currentTarget.style.transform = "translateX(4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "rgba(255,255,255,0.85)";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      <span style={{ fontSize: "1.2rem", minWidth: "1.5rem" }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
