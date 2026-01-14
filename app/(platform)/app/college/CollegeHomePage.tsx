import Link from "next/link";
import AppLayout from "@/app/components/AppLayout";

export default function CollegePage() {
  return (
    <AppLayout>
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Collège</h1>
        <p>MVP — Années</p>

        <div style={{ marginTop: "1rem" }}>
          <Link href="/app">← Retour /app</Link>
        </div>

        <hr style={{ margin: "1.5rem 0" }} />

        <Link
          href="/app/college/Sixième"
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
          Sixième
        </Link>
        <Link
          href="/app/college/Cinquième"
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
          Cinquième
        </Link>
        <Link
          href="/app/college/Quatrième"
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
          Quatrième
        </Link>
        <Link
          href="/app/college/Troisième"
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
          Troisième
        </Link>
      </main>
    </AppLayout>
  );
}