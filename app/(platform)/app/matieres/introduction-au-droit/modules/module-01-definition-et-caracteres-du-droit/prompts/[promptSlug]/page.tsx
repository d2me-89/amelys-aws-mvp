import Link from "next/link";

const moduleSlug = "module-01-definition-et-caracteres-du-droit";

// Liste blanche des 22 slugs (évite les “activite”)
const allowedPromptSlugs = new Set<string>([
  ...Array.from({ length: 10 }).map((_, i) => `cours-${String(i + 1).padStart(2, "0")}`),
  "points-cles",
  "faq",
  "cas-pratique-01",
  "cas-pratique-02",
  "commentaire-01",
  "commentaire-02",
  "commentaire-03",
  "dissertation-01",
  "dissertation-02",
  "dissertation-03",
  "note-de-synthese",
  "td",
]);

function titleFromSlug(slug: string) {
  if (slug.startsWith("cours-")) return `Cours ${slug.split("-")[1]}`;
  if (slug === "points-cles") return "Points-clés";
  if (slug === "faq") return "FAQ";
  if (slug.startsWith("cas-pratique-")) return `Cas pratique ${slug.split("-")[2]}`;
  if (slug.startsWith("commentaire-")) return `Commentaire ${slug.split("-")[1]}`;
  if (slug.startsWith("dissertation-")) return `Dissertation ${slug.split("-")[1]}`;
  if (slug === "note-de-synthese") return "Note de synthèse";
  if (slug === "td") return "TD";
  return "Activité";
}

function introFromSlug(slug: string) {
  if (slug.startsWith("cours-"))
    return "Je te présente la leçon, puis tu peux lancer la génération du cours. Ensuite, on discute et je t’aide à réviser.";
  if (slug === "points-cles")
    return "On va extraire l’essentiel à retenir sous forme de points-clés, puis tu pourras me poser toutes tes questions.";
  if (slug === "faq")
    return "Pose-moi tes questions fréquentes : je réponds clairement, avec méthode et exemples.";
  if (slug.startsWith("cas-pratique-"))
    return "Je te propose un cas pratique. Tu peux tenter une réponse, puis je corrige et j’explique la méthode.";
  if (slug.startsWith("commentaire-"))
    return "On travaille la méthode du commentaire : problématique, plan, rédaction et points d’attention.";
  if (slug.startsWith("dissertation-"))
    return "On travaille la dissertation : analyse du sujet, problématique, plan, puis rédaction guidée.";
  if (slug === "note-de-synthese")
    return "On s’entraîne à la note de synthèse : méthode, organisation, reformulation et neutralité.";
  if (slug === "td")
    return "On fait un TD guidé : questions, corrections, et explications.";
  return "Activité du module.";
}

export default function PromptLandingPage({ params }: { params: any }) {
  // Amplify-safe: on accepte plusieurs noms possibles du param
  const promptSlug: string =
    params?.promptSlug ?? params?.slug ?? params?.promptslug ?? "";

  const isValid = allowedPromptSlugs.has(promptSlug);

  // ✅ IMPORTANT : pas de fallback “activite” pour le conversationId
  const conversationId = isValid
    ? `intro-droit-${moduleSlug}-${promptSlug}`
    : "";

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 900 }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href={`/app/matieres/introduction-au-droit/modules/${moduleSlug}`}>
          ← Retour Module 1
        </Link>
      </div>

      <h1 style={{ marginBottom: 8 }}>
        {isValid ? titleFromSlug(promptSlug) : "Prompt introuvable"}
      </h1>

      <p style={{ marginTop: 0, opacity: 0.8 }}>
        {isValid
          ? introFromSlug(promptSlug)
          : "Ce prompt n’existe pas (ou le paramètre de route n’a pas été transmis correctement)."}
      </p>

      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          padding: 16,
          marginTop: 16,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Amélys</div>

        {isValid ? (
          <>
            <div style={{ opacity: 0.95 }}>
              Quand tu es prêt, clique sur <b>Lancer</b>. Cette conversation est
              dédiée à <code>{promptSlug}</code>.
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Link
                href={`/app/c/${conversationId}`}
                style={{
                  display: "inline-block",
                  borderRadius: 12,
                  padding: "10px 14px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: 700,
                }}
              >
                Lancer
              </Link>

              <Link
                href={`/app/c/${conversationId}`}
                style={{
                  display: "inline-block",
                  borderRadius: 12,
                  padding: "10px 14px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Reprendre
              </Link>
            </div>
          </>
        ) : (
          <div style={{ opacity: 0.95 }}>
            ⚠️ Impossible de lancer : slug reçu = <code>{promptSlug || "vide"}</code>.
          </div>
        )}
      </div>
    </main>
  );
}
