"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

// -----------------------------------------------------------------------------
// Constantes métier (slug du module + liste des 22 activités)
// -----------------------------------------------------------------------------
const moduleSlug = "module-01-definition-et-caracteres-du-droit";

const prompts: Prompt[] = [
  // 10 cours
  ...Array.from({ length: 10 }).map((_, i) => ({
    slug: `cours-${String(i + 1).padStart(2, "0")}`,
    label: `Cours ${i + 1}`,
    kind: "cours" as const,
  })),
  { slug: "points-cles", label: "Points-clés", kind: "points-cles" },
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
  { slug: "note-de-synthese", label: "Note de synthèse", kind: "note-synthese" },
  { slug: "td", label: "TD", kind: "td" },
];

// -----------------------------------------------------------------------------
// Convention d'ID : la conversation est unique par (matière + module + prompt)
// -> exactement la même convention que sur la page prompt et la page conversation
// -----------------------------------------------------------------------------
function conversationIdFor(promptSlug: string) {
  return `intro-droit-${moduleSlug}-${promptSlug}`;
}

// Clé localStorage utilisée pour le statut "Terminée" (identique à la page chat)
function doneKey(conversationId: string) {
  return `amelys:done:${conversationId}`;
}

export default function Module1Page() {
  // -----------------------------------------------------------------------------
  // État local : map { promptSlug -> true/false } pour savoir si chaque activité est terminée
  // -----------------------------------------------------------------------------
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});

  // -----------------------------------------------------------------------------
  // Chargement : on lit localStorage pour chaque prompt
  // (au montage de la page, puis on pourra recharger si besoin)
  // -----------------------------------------------------------------------------
  useEffect(() => {
    const nextMap: Record<string, boolean> = {};

    for (const p of prompts) {
      const convId = conversationIdFor(p.slug);

      try {
        // "true" => terminé ; sinon pas terminé
        nextMap[p.slug] = localStorage.getItem(doneKey(convId)) === "true";
      } catch {
        // si localStorage est indispo, on considère "non terminé"
        nextMap[p.slug] = false;
      }
    }

    setDoneMap(nextMap);
  }, []);

  // -----------------------------------------------------------------------------
  // Pour éviter de recalculer 100 fois des strings d'URL à chaque rendu
  // -----------------------------------------------------------------------------
  const basePath = useMemo(() => {
    return `/app/matieres/introduction-au-droit/modules/${moduleSlug}`;
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {/* Navigation */}
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/app/matieres/introduction-au-droit">
          ← Retour Introduction au droit
        </Link>
      </div>

      {/* Titre module */}
      <h1 style={{ marginBottom: "0.25rem" }}>
        Module 1 — Définition et caractères du droit
      </h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        22 activités guidées : 10 cours, points-clés, FAQ, 2 cas pratiques, 3 commentaires,
        3 dissertations, note de synthèse, TD.
      </p>

      {/* Grille des 22 boutons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "12px",
          marginTop: "1.25rem",
        }}
      >
        {prompts.map((p) => {
          const isDone = doneMap[p.slug] === true;

          return (
            <Link
              key={p.slug}
              href={`${basePath}/prompts/${p.slug}`}
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 14,
                padding: 14,
                textDecoration: "none",
                color: "inherit",
                position: "relative",
              }}
            >
              {/* Pastille "Terminée" (verte) */}
              {isDone && (
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    fontSize: 12,
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(0, 255, 150, 0.4)",
                    background: "rgba(0, 255, 150, 0.12)",
                  }}
                >
                  ✅ Terminée
                </span>
              )}

              {/* Type (cours / faq / etc.) */}
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>
                {p.kind}
              </div>

              {/* Libellé */}
              <div style={{ fontWeight: 700 }}>{p.label}</div>

              {/* Micro-indication (optionnelle) */}
              <div style={{ fontSize: 12, opacity: 0.65, marginTop: 8 }}>
                Ouvrir la conversation dédiée
              </div>
            </Link>
          );
        })}
      </div>

      {/* Note : si tu veux une mise à jour "live" sans refresh :
          on pourra ajouter un bouton "Rafraîchir" ou un event listener "storage". */}
      <div style={{ marginTop: 14, fontSize: 12, opacity: 0.65 }}>
        Astuce : si tu marques une activité “Terminée” dans un autre onglet, un refresh
        de cette page mettra à jour les pastilles.
      </div>
    </main>
  );
}
