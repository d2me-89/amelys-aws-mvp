import Link from "next/link";
import AppLayout from "../../../../components/AppLayout";

export default function SixiemePage() {
  return (
    <AppLayout>
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Sixième</h1>
        <p>MVP — Matières</p>

        <div style={{ marginTop: "1rem" }}>
          <Link href="/app">← Retour /app</Link>
        </div>

        <hr style={{ margin: "1.5rem 0" }} />

        <Link
          href="/app/college/sixieme/matieres/mathematiques"
          style={{
            display: "inline-block",
            padding: "0.75rem 1rem",
            background: "rgba(102, 126, 234, 0.15)",
            borderRadius: "8px",
            textDecoration: "none",
            color: "inherit",
            border: "1px solid rgba(102, 126, 234, 0.3)",
          }}
        >
          Mathématiques
        </Link>
      </main>
    </AppLayout>
  );
}