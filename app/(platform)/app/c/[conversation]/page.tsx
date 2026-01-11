import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ConversationPage({ params }: { params: any }) {
  // ✅ Anti-crash : si le param n'arrive pas, on ne casse pas le SSR
  const conversationId: string =
    params?.conversation ??
    params?.conversationId ??
    params?.conversationid ??
    params?.id ??
    params?.slug ??
    "";

  const safeId = conversationId || "unknown";

  // ✅ split uniquement sur une string sûre
  const parts = safeId.split("-");
  const prompt =
    parts.length >= 2 ? parts.slice(-2).join("-") : safeId || "unknown";

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 900 }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/app">← Retour /app</Link>
      </div>

      <h1 style={{ marginBottom: 8 }}>Conversation Amélys</h1>

      <div style={{ opacity: 0.8, marginBottom: 16 }}>
        <div>
          <b>Conversation ID :</b> {safeId}
        </div>
        <div>
          <b>Prompt :</b> {prompt}
        </div>

        {conversationId === "" && (
          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
            ⚠️ Le paramètre de route n’a pas été reçu sous <code>conversation</code>.
            La page est sécurisée pour éviter les crashs SSR.
          </div>
        )}
      </div>

      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          padding: 16,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Amélys</div>
        <div style={{ opacity: 0.95 }}>
          (MVP) Ici on affichera :
          <br />— la génération initiale du prompt (au clic “Lancer”)
          <br />— puis la discussion dédiée à ce prompt
        </div>
      </div>
    </main>
  );
}
