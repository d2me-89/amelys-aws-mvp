import Link from "next/link";
import { notFound } from "next/navigation";

const moduleSlug = "module-01-definition-et-caracteres-du-droit";

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

export default function PromptLandingPage({
  params,
}: {
  params: { promptSlug: string };
}) {
  const promptSlug = params.promptSlug;
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

      <h1>{title}</h1>
      <p style={{ opacity: 0.8 }}>{intro}</p>

      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          padding: 16,
          marginTop: 16,
        }}
      >
        <strong>Amélys</strong>

        <p>
          Bonjour 👋 Quand tu es prêt, clique sur <b>Lancer</b>. Je génère le
          contenu, puis tu peux discuter avec moi.
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          <Link href={`/app/c/${conversationId}`}>Lancer</Link>
          <Link href={`/app/c/${conversationId}`}>Reprendre</Link>
        </div>
      </div>
    </main>
  );
}
