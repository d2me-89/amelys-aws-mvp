import Link from "next/link";
import AppLayout from "../../components/AppLayout"; 

export default function AppHome() {
  return (
    <AppLayout>
      <div style={{ 
        padding: "2rem", 
        fontFamily: "sans-serif",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <h1>Amélys — Plateforme d'apprentissage de l'enseignement secondaire</h1>
        
        <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
          Réussis ta scolarité de façon interactive avec une IA scolaire dédiée.
        </p>

        <hr style={{ margin: "2rem 0", opacity: 0.3 }} />

        <h2>Niveau</h2>

        <div style={{
          display: "grid",
          gap: "1rem",
          marginTop: "1rem"
        }}>
          <Link 
            href="/app/college"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              padding: "1.5rem",
              textDecoration: "none",
              color: "inherit",
              display: "block"
            }}
          >
            <h3 style={{ marginTop: 0 }}>📚 Collège</h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              8 matieres • Des centaines de modules • Des milliers d'activités
            </p>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}