import Link from "next/link";
import { notFound } from "next/navigation";

const moduleSlug = "module-01-definition-et-caracteres-du-droit";

function titleFromSlug(s: string) {
  if (s.startsWith("cours-")) return `Cours ${s.split("-")[1]}`;
  if (s === "points-cles") return "Points-clés";
  if (s === "faq") return "FAQ";
  if (s.startsWith("cas-pratique-")) return `Cas pratique ${s.split("-")[2]}`;
  if (s.startsWith("commentaire-")) return `Commentaire ${s.split("-")[1]}`;
  if (s.startsWith("dissertation-")) return `Dissertation ${s.split("-")[1]}`;
  if (s === "note-de-synthese") return "Note de synthèse";
  if (s === "td") return "TD";
  return "Activité";
}

function introFromSlug(s: string) {
  if (s.startsWith("cours-"))
    return "Je te présente la leçon, puis tu peux lancer la génération du cours. Ensuite, on discute et je t’aide à réviser.";
  if (s === "points-cles")
    return "On va extraire l’essentiel à retenir sous forme de points-clés, puis tu pourras me poser toutes tes questions.";
  if (s === "faq")
    return "Pose-moi tes questions fréquentes : je réponds clairement, avec méthode et exemples.";
  if (s.startsWith("cas-pratique-"))
    return "Je te propose un cas pratique. Tu peux tenter une réponse, puis je corrige et j’explique la méthode.";
  if (s.startsWith("commentaire-"))
    return "On travaille la méthode du commentaire : problématique, plan, rédaction et points d’attention.";
  if (s.startsWith("dissertation-"))
    return "On travaille la dissertation : analyse du sujet, problématique, plan, puis rédaction guidée.";
  if (s === "note-de-synthese")
    return "On s’entraîne à la note de synthèse : méthode, organisation, reformulation et neutralité.";
  if (s === "td")
    return "On fait un TD guidé : questions, corrections, et explications.";
  return "Activité du module.";
}

export default function PromptLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const promptSlug = params?.slug;
  if (!promptSlug) notFound();

  const title = titleFromSlug(promptSlug);
  const intro = introFromSlug(promptSlug);

  const conversationId = `intro-droit-${moduleSlug}-${promptSlug}`;

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 900 }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href={`/app/matieres/introduction-au-droit/modules/${moduleSlug}`}>
          ← Retour Module 1
        </Link>
      </div>

      <h1 style={{ marginBottom: 8 }}>{title}</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>{intro}</p>

      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          padding: 16,
          marginTop: 16,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Amélys</div>

        <div style={{ opacity: 0.95 }}>
          Bonjour 👋 Quand tu es prêt, clique sur <b>“Lancer”</b>. Je générerai le
          contenu (MVP : simulation), puis tu pourras discuter avec moi dans un espace
          dédié.
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
      </div>
    </main>
  );
}
