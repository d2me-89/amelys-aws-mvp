import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ConversationPage({ params }: { params: any }) {
  // Amplify-safe: certains builds peuvent exposer le param sous un nom différent
  const conversationId: string =
    params?.conversationId ??
    params?.conversationid ??
    params?.id ??
    params?.slug ??
    "";

  const safeId = conversationId || "unknown";

  // On évite tout crash: split sur une string sûre
  const parts = safeId.split("-");
  const prompt =
    parts.length >= 2 ? parts.slice(-2).join("-") : safeId || "unknown";

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 900 }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/app">← Retour /app</Link>
      </div>

      <h1 style={{ marginBottom: 8 }}>Conversation Amélys</h1>

      <div style={{ opacity: 0.75, marginBottom: 16 }}>
        <div>
          <b>Conversation ID :</b> {safeId}
        </div>
        <div>
          <b>Prompt :</b> {prompt}
        </div>
        {conversationId === "" && (
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.85 }}>
            ⚠️ Le paramètre de route n’a pas été reçu (nom différent au build). La page
            est sécurisée pour éviter les erreurs serveur.
          </div>
        )}
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

        <p style={{ marginTop: 0 }}>
          (MVP) Ici, on affichera :
          <br />– la génération initiale du prompt (au clic <b>“Lancer”</b>)
          <br />– puis la discussion dédiée à ce prompt
        </p>

        <p style={{ opacity: 0.8, marginBottom: 0 }}>
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
    </main>
  );
}
