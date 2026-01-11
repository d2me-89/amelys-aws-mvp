import Link from "next/link";
 
export default function ConversationPage({
  params,
}: {
  params: { conversation: string };
}) {
  const conversationId = params.conversation;

  const parts = conversationId.split("-");
  const prompt = parts.slice(-2).join("-");

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 900 }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/app">← Retour /app</Link>
      </div>

      <h1>Conversation Amélys</h1>

      <div style={{ opacity: 0.8, marginBottom: 16 }}>
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
        }}
      >
        <b>Amélys</b>
        <p style={{ marginTop: 8 }}>
          (MVP) Ici apparaîtront :
          <br />– la génération initiale du prompt
          <br />– puis la discussion dédiée
        </p>
      </div>
    </main>
  );
}
