import Link from "next/link";

export default function ConversationPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const conversationId = params.conversationId;

  // MVP : on déduit le prompt depuis l’ID (convention actuelle)
  // ex: intro-droit-module-01-...-cours-01
  const parts = conversationId.split("-");
  const prompt = parts.slice(-2).join("-"); // cours-01, faq, etc.

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 900 }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/app">← Retour /app</Link>
      </div>

      <h1 style={{ marginBottom: 8 }}>Conversation Amélys</h1>

      <div style={{ opacity: 0.75, marginBottom: 16 }}>
        <div>
          <b>Conversation ID :</b> {conversationId}
        </div>
        <div>
          <b>Prompt :</b> {prompt}
        </div>
      </div>

      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          padding: 16,
          marginTop: 16,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Amélys</div>

        <p>
          (MVP) Ici, on affichera :
          <br />
          – la génération initiale du prompt (au clic <b>“Lancer”</b>)
          <br />
          – puis la discussion dédiée à ce prompt
        </p>

        <p style={{ opacity: 0.8 }}>
          Pour l’instant, c’est un mock. Prochaine étape : input actif + API route
          qui appelle Bedrock Claude (streaming).
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <input
          disabled
          placeholder="Écris ta question… (mock pour l’instant)"
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "inherit",
          }}
        />

        <button
          disabled
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "transparent",
            color: "inherit",
            fontWeight: 700,
          }}
        >
          Envoyer
        </button>
      </div>

      <p style={{ fontSize: 12, opacity: 0.6, marginTop: 12 }}>
        Prochaine micro-étape : rendre l’input actif + stocker les messages (même
        en mémoire), puis brancher une route API.
      </p>
    </main>
  );
}
