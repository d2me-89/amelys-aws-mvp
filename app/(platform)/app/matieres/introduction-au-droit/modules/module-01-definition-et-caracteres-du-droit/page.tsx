import Link from "next/link";

type Prompt = {
  slug: string;
  label: string;
  kind:
    | "cours"
    | "points-cles"
    | "faq"
    | "cas-pratique"
    | "commentaire"
    | "dissertation"
    | "note-synthese"
    | "td";
};

const moduleSlug = "module-01-definition-et-caracteres-du-droit";

const prompts: Prompt[] = [
  // 10 cours
  ...Array.from({ length: 10 }).map((_, i) => ({
    slug: `cours-${String(i + 1).padStart(2, "0")}`,
    label: `Cours ${i + 1}`,
    kind: "cours" as const,
  })),
  // 1 points-clés
  { slug: "points-cles", label: "Points-clés", kind: "points-cles" },
  // 1 faq
  { slug: "faq", label: "FAQ", kind: "faq" },
  // 2 cas pratiques
  ...Array.from({ length: 2 }).map((_, i) => ({
    slug: `cas-pratique-${String(i + 1).padStart(2, "0")}`,
    label: `Cas pratique ${i + 1}`,
    kind: "cas-pratique" as const,
  })),
  // 3 commentaires
  ...Array.from({ length: 3 }).map((_, i) => ({
    slug: `commentaire-${String(i + 1).padStart(2, "0")}`,
    label: `Commentaire ${i + 1}`,
    kind: "commentaire" as const,
  })),
  // 3 dissertations
  ...Array.from({ length: 3 }).map((_, i) => ({
    slug: `dissertation-${String(i + 1).padStart(2, "0")}`,
    label: `Dissertation ${i + 1}`,
    kind: "dissertation" as const,
  })),
  // 1 note de synthèse
  { slug: "note-de-synthese", label: "Note de synthèse", kind: "note-synthese" },
  // 1 TD
  { slug: "td", label: "TD", kind: "td" },
];

export default function Module1Page() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/app/matieres/introduction-au-droit">
          ← Retour Introduction au droit
        </Link>
      </div>

      <h1 style={{ marginBottom: "0.25rem" }}>
        Module 1 — Définition et caractères du droit
      </h1>

      <p style={{ marginTop: 0, opacity: 0.8 }}>
        22 activités guidées : 10 cours, points-clés, FAQ, 2 cas pratiques,
        3 commentaires, 3 dissertations, note de synthèse, TD.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
          marginTop: "1.25rem",
        }}
      >
        {prompts.map((p) => (
          <Link
            key={p.slug}
            href={`/app/matieres/introduction-au-droit/modules/${moduleSlug}/prompts/${p.slug}`}
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 14,
              padding: 14,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>
              {p.kind}
            </div>
            <div style={{ fontWeight: 600 }}>{p.label}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
