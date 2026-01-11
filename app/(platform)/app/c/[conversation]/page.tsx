import Link from "next/link";

export default function ConversationPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const conversationId = params.conversationId;

  // MVP mock : on déduit le "promptSlug" depuis l'ID, si présent
  // Format actuel: intro-droit-<moduleSlug>-<promptSlug>
  const parts = conversationId.split("-");
  const promptSlug = parts.length >= 2 ? parts[parts.length - 1] : "unknown";

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 900 }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/app">← Retour /app</Link>
      </div>

      <h1 style={{ marginBottom: 6 }}>Conversation Amélys</h1>
      <div style={{ opacity: 0.75, fontSize: 13, marginBottom: 18 }}>
        Conversation ID : <code>{conversationId}</code>
        <br />
        Prompt : <code>{promptSlug}</code>
      </div>

      {/* Zone messages (mock) */}
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          padding: 16,
          marginBottom: 14,
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700 }}>Amélys</div>
          <div style={{ opacity: 0.95 }}>
            (MVP) Ici, je vais d’abord générer le contenu initial du prompt quand tu
            cliques “Lancer” sur la page précédente. Ensuite, tu peux me poser des
            questions et je te réponds dans ce fil dédié.
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700 }}>Amélys</div>
          <div style={{ opacity: 0.95 }}>
            Pour l’instant, cette conversation est en mode “mock”. La prochaine étape
            sera de brancher une API (Lambda) puis Bedrock Claude.
          </div>
        </div>
      </div>

      {/* Barre d’input (mock) */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          disabled
          placeholder="Écris ta question… (mock pour l’instant)"
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
            color: "inherit",
          }}
        />
        <button
          disabled
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
            color: "inherit",
            cursor: "not-allowed",
          }}
        >
          Envoyer
        </button>
      </div>

      <div style={{ marginTop: 14, fontSize: 12, opacity: 0.7 }}>
        Prochaine étape : rendre l’input actif + envoyer vers une route API Next
        (`/api/chat`) qui appellera Bedrock Claude en streaming.
      </div>
    </main>
  );
}
