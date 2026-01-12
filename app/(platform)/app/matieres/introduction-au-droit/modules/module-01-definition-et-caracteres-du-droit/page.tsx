"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

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
// Slug du module + liste des 22 activités
// -----------------------------------------------------------------------------
const moduleSlug = "module-01-definition-et-caracteres-du-droit";

const prompts: Prompt[] = [
  ...Array.from({ length: 10 }).map((_, i) => ({
    slug: `cours-${String(i + 1).padStart(2, "0")}`,
    label: `Cours ${i + 1}`,
    kind: "cours" as const,
  })),
  { slug: "points-cles", label: "Points-clés", kind: "points-cles" },
  { slug: "faq", label: "FAQ", kind: "faq" },
  ...Array.from({ length: 2 }).map((_, i) => ({
    slug: `cas-pratique-${String(i + 1).padStart(2, "0")}`,
    label: `Cas pratique ${i + 1}`,
    kind: "cas-pratique" as const,
  })),
  ...Array.from({ length: 3 }).map((_, i) => ({
    slug: `commentaire-${String(i + 1).padStart(2, "0")}`,
    label: `Commentaire ${i + 1}`,
    kind: "commentaire" as const,
  })),
  ...Array.from({ length: 3 }).map((_, i) => ({
    slug: `dissertation-${String(i + 1).padStart(2, "0")}`,
    label: `Dissertation ${i + 1}`,
    kind: "dissertation" as const,
  })),
  { slug: "note-de-synthese", label: "Note de synthèse", kind: "note-synthese" },
  { slug: "td", label: "TD", kind: "td" },
];

// -----------------------------------------------------------------------------
// Convention de conversationId (doit matcher celle de la conversation page)
// -----------------------------------------------------------------------------
function conversationIdFor(promptSlug: string) {
  return `intro-droit-${moduleSlug}-${promptSlug}`;
}

// Clé localStorage du statut "Terminée" (doit matcher celle de la conversation page)
function doneKey(conversationId: string) {
  return `amelys:done:${conversationId}`;
}

export default function Module1Page() {
  // Map { promptSlug -> bool }
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});

  const basePath = useMemo(
    () => `/app/matieres/introduction-au-droit/modules/${moduleSlug}`,
    []
  );

  // ---------------------------------------------------------------------------
  // Fonction centralisée: relire tous les statuts depuis localStorage
  // (utile au montage + quand on revient sur la page)
  // ---------------------------------------------------------------------------
  const reloadDoneMap = useCallback(() => {
    const nextMap: Record<string, boolean> = {};

    for (const p of prompts) {
      const convId = conversationIdFor(p.slug);
      try {
        nextMap[p.slug] = localStorage.getItem(doneKey(convId)) === "true";
      } catch {
        nextMap[p.slug] = false;
      }
    }

    setDoneMap(nextMap);
  }, []);

  // ---------------------------------------------------------------------------
  // 1) Lecture initiale au montage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    reloadDoneMap();
  }, [reloadDoneMap]);

  // ---------------------------------------------------------------------------
  // 2) Rechargement quand on revient sur l’onglet / la page (retour depuis conversation)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const onFocus = () => reloadDoneMap();
    const onVisibility = () => {
      if (document.visibilityState === "visible") reloadDoneMap();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reloadDoneMap]);

  // ---------------------------------------------------------------------------
  // 3) Si changement depuis un AUTRE onglet: event "storage"
  // (ne se déclenche pas dans le même onglet, mais utile quand même)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith("amelys:done:")) {
        reloadDoneMap();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [reloadDoneMap]);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: "1rem", display: "flex", gap: 12 }}>
        <Link href="/app/matieres/introduction-au-droit">
          ← Retour Introduction au droit
        </Link>

        {/* Petit bouton utile en MVP (facultatif) */}
        <button
          onClick={reloadDoneMap}
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
            color: "inherit",
            borderRadius: 10,
            padding: "6px 10px",
            cursor: "pointer",
            opacity: 0.9,
          }}
        >
          Rafraîchir
        </button>
      </div>

      <h1 style={{ marginBottom: "0.25rem" }}>
        Module 1 — Définition et caractères du droit
      </h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        22 activités guidées : 10 cours, points-clés, FAQ, 2 cas pratiques, 3
        commentaires, 3 dissertations, note de synthèse, TD.
      </p>

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

              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>
                {p.kind}
              </div>

              <div style={{ fontWeight: 700 }}>{p.label}</div>

              <div style={{ fontSize: 12, opacity: 0.65, marginTop: 8 }}>
                Ouvrir la conversation dédiée
              </div>
            </Link>
          );
        })}
      </div>

      <div style={{ marginTop: 14, fontSize: 12, opacity: 0.65 }}>
        Les pastilles “Terminée” se mettent à jour automatiquement quand tu reviens
        sur cette page (focus/visibilité). Le bouton “Rafraîchir” est un filet de
        sécurité MVP.
      </div>
    </main>
  );
}
