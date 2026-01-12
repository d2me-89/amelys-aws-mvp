import Link from "next/link";

export default function IntroDroitPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Introduction au droit</h1>
      <p>MVP — matière</p>

      <div style={{ marginTop: "1rem" }}>
        <Link href="/app">← Retour /app</Link>
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      <Link
        href="/app/matieres/introduction-au-droit/modules/module-01-definition-et-caracteres-du-droit"
      >
        Ouvrir le Module 1 — Définition et caractères du Droit
      </Link>
    </main>
  );
}
