export default function AppHome() {
  return (
    <main style={{ 
      padding: "2rem", 
      fontFamily: "sans-serif",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>
      <h1>Amélys — Plateforme d'enseignement du droit</h1>
      
      <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
        Apprends le droit de façon interactive avec une IA juridique dédiée.
      </p>

      <hr style={{ margin: "2rem 0", opacity: 0.3 }} />

      <h2>Matières disponibles</h2>

      <div style={{
        display: "grid",
        gap: "1rem",
        marginTop: "1rem"
      }}>
        <Link 
          href="/app/matieres/introduction-au-droit"
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "12px",
            padding: "1.5rem",
            textDecoration: "none",
            color: "inherit",
            display: "block"
          }}
        >
          <h3 style={{ marginTop: 0 }}>📚 Introduction au droit</h3>
          <p style={{ margin: 0, opacity: 0.8 }}>
            5 parties • 25 modules • 550 activités
          </p>
        </Link>
      </div>
    </main>
  );
}