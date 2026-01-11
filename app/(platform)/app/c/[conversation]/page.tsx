import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ConversationPage({ params }: { params: any }) {
  // ✅ Amplify-safe: selon le build, le param peut arriver sous un autre nom
  const conversationId: string =
    params?.conversationId ?? params?.conversationid ?? params?.id ?? "";

  const safeId = conversationId || "unknown";

  // MVP mock : on essaie d’inférer le promptSlug (si format: intro-droit-...-<prompt>)
  const parts = safeId.split("-");
  const promptSlug = parts.length >= 2 ? parts[parts.length - 1] : "unknown";

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 900 }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/app">← Retour /app</Link>
      </div>

      <h1 style={{ marginBottom: 6 }}>Conversation Amélys</h1>

      <div style={{ opacity: 0.75, fontSize: 13, marginBottom: 18 }}>
        Conversation ID : <code>{safeId}</code>
        <br />
        Prompt : <code>{promptSlug}</code>
        {conversationId === "" && (
          <>
            <br />
            <span style={{ opacity: 0.85 }}>
              ⚠️ Le paramètre de route n’a pas été reçu sous{" "}
              <code>conversationId</code>. (On l’a sécurisé pour éviter les erreurs
              serveur.)
            </span>
          </>
        )}
      </div>

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
            (MVP) Ici, on affichera :
            <ul style={{ marginTop: 8, marginBottom: 0 }}>
              <li>la génération initiale du prompt (au clic “Lancer”)</li>
              <li>puis la discussion dédiée à ce prompt</li>
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: 0 }}>
          <div style={{ fontWeight: 700 }}>Amélys</div>
          <div style={{ opacity: 0.95 }}>
            Pour l’instant, c’est un mock. Prochaine étape : input actif + API route
            qui appelle Bedrock Claude (streaming).
          </div>
        </div>
      </div>

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
        Prochaine micro-étape : rendre l’input actif + enregistrer les messages
        (même en mémoire), puis brancher une route API.
      </div>
    </main>
  );
}
