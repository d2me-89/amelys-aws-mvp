"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: isOpen ? "240px" : "70px",
        background: "linear-gradient(180deg, rgba(20,20,35,0.98) 0%, rgba(15,15,25,0.98) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        transition: "width 0.3s ease",
        overflow: "hidden",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header avec bouton toggle */}
      <div
        style={{
          padding: "1.5rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "70px",
        }}
      >
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
          }}
          aria-label={isOpen ? "Réduire le menu" : "Étendre le menu"}
        >
          ☰
        </button>

        {isOpen && (
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.3rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginLeft: "0.5rem",
            }}
          >
            Amélys
          </div>
        )}
      </div>

      {/* Navigation principale */}
      <nav
        style={{
          flex: "1 1 auto",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "1rem 0",
        }}
      >
        <SidebarLink
          href="/app"
          icon="📊"
          label="Tableau de bord"
          isOpen={isOpen}
          isActive={pathname === "/app"}
        />
        <SidebarLink
          href="/app/matieres/introduction-au-droit"
          icon="📚"
          label="Catalogue de cours"
          isOpen={isOpen}
          isActive={pathname.startsWith("/app/matieres")}
        />
        <SidebarLink
          href="/app/entrainements"
          icon="💪"
          label="Entraînements"
          isOpen={isOpen}
          isActive={pathname === "/app/entrainements"}
        />
        <SidebarLink
          href="/app/amelysask"
          icon="🤖"
          label="AmélysAsk"
          isOpen={isOpen}
          isActive={pathname === "/app/amelysask"}
        />
        <SidebarLink
          href="/app/parcours"
          icon="🎯"
          label="Parcours"
          isOpen={isOpen}
          isActive={pathname === "/app/parcours"}
        />
        <SidebarLink
          href="/app/cours-telechargables"
          icon="📥"
          label="Cours téléchargeables"
          isOpen={isOpen}
          isActive={pathname === "/app/cours-telechargables"}
        />
        <SidebarLink
          href="/app/profs-en-ligne"
          icon="👨‍🏫"
          label="Profs en ligne"
          isOpen={isOpen}
          isActive={pathname === "/app/profs-en-ligne"}
        />

        {/* Section Nos formules */}
        {isOpen && (
          <div
            style={{
              margin: "1.5rem 0.75rem 0.5rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "1rem",
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                opacity: 0.5,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.5rem",
                paddingLeft: "0.5rem",
                fontWeight: 600,
              }}
            >
              Nos formules
            </div>
          </div>
        )}
        <SidebarLink
          href="/app/formules"
          icon="🎓"
          label="Découvrir"
          isOpen={isOpen}
          isActive={pathname === "/app/formules"}
        />
      </nav>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "1rem 0",
        }}
      >
        <SidebarLink
          href="/app/profil"
          icon="👤"
          label="Profil"
          isOpen={isOpen}
          isActive={pathname === "/app/profil"}
        />
        <SidebarLink
          href="/app/parametres"
          icon="⚙️"
          label="Paramètres"
          isOpen={isOpen}
          isActive={pathname === "/app/parametres"}
        />
      </div>
    </aside>
  );
}

// Composant SidebarLink
interface SidebarLinkProps {
  href: string;
  icon: string;
  label: string;
  isOpen: boolean;
  isActive: boolean;
}

function SidebarLink({ href, icon, label, isOpen, isActive }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: isOpen ? "0.75rem 1rem" : "0.75rem",
        margin: "0.25rem 0.5rem",
        borderRadius: "8px",
        textDecoration: "none",
        color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
        transition: "all 0.2s ease",
        fontSize: "0.95rem",
        background: isActive ? "rgba(255,193,7,0.25)" : "transparent",
        justifyContent: isOpen ? "flex-start" : "center",
        position: "relative",
        fontWeight: isActive ? 600 : 400,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "rgba(255,193,7,0.1)";
          e.currentTarget.style.color = "rgba(255,255,255,1)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "rgba(255,255,255,0.7)";
        }
      }}
    >
      <span
        style={{
          fontSize: "1.3rem",
          minWidth: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </span>
      {isOpen && <span style={{ whiteSpace: "nowrap" }}>{label}</span>}
    </Link>
  );
}