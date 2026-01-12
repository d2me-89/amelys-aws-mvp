"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

// localStorage keys (scopées par conversationId)
const convKey = (id: string) => `amelys:conv:${id}`;
const draftKey = (id: string) => `amelys:draft:${id}`;
const doneKey = (id: string) => `amelys:done:${id}`;

// module path (MVP fixe)
const modulePath =
  "/app/matieres/introduction-au-droit/modules/module-01-definition-et-caracteres-du-droit";

// liste blanche des slugs (pour extraire proprement l’activité)
const allowedPromptSlugs: string[] = [
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
];

function extractPromptSlug(conversationId: string): string {
  for (const slug of allowedPromptSlugs) {
    if (conversationId === slug) return slug;
    if (conversationId.endsWith(`-${slug}`)) return slug;
  }
  return "unknown";
}

export default function ConversationPage() {
  // ✅ Source officielle Next.js : /app/c/[conversation] => params.conversation
  const params = useParams();

  // conversationId doit venir de Next. On ne met PAS "unknown" ici.
  const conversationId =
    typeof (params as any)?.conversation === "string"
      ? (params as any).conversation
      : "";

  const promptSlug = useMemo(() => {
    if (!conversationId) return "unknown";
    return extractPromptSlug(conversationId);
  }, [conversationId]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isDone, setIsDone] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // ✅ Charger depuis localStorage uniquement quand l’ID est dispo
  useEffect(() => {
    if (!conversationId) return;

    try {
      const rawMsgs = localStorage.getItem(convKey(conversationId));
      if (rawMsgs) {
        setMessages(JSON.parse(rawMsgs));
      } else {
        // Seed mock (si aucune conversation enregistrée)
        setMessages([
          {
            role: "assistant",
            content:
              "(MVP) Je suis Amélys. Tu peux m’écrire ci-dessous : je réponds en mode simulation. Prochaine étape : brancher Bedrock Claude.",
          },
          {
            role: "assistant",
            content: `Conversation dédiée au prompt : ${promptSlug}. Reste dans le cadre du module et de l’activité.`,
          },
        ]);
      }

      setInput(localStorage.getItem(draftKey(conversationId)) ?? "");
      setIsDone(localStorage.getItem(doneKey(conversationId)) === "true");
    } catch {
      setMessages([
        {
          role: "assistant",
          content: "(MVP) Erreur localStorage. Recharge la page.",
        },
      ]);
      setInput("");
      setIsDone(false);
    }
  }, [conversationId, promptSlug]);

  // ✅ Persistance messages (uniquement si l’ID est dispo)
  useEffect(() => {
    if (!conversationId) return;
    try {
      localStorage.setItem(convKey(conversationId), JSON.stringify(messages));
    } catch {}
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, conversationId]);

  // ✅ Persistance draft
  useEffect(() => {
    if (!conversationId) return;
    try {
      localStorage.setItem(draftKey(conversationId), input);
    } catch {}
  }, [input, conversationId]);

  // ✅ Persistance done
  useEffect(() => {
    if (!conversationId) return;
    try {
      localStorage.setItem(doneKey(conversationId), String(isDone));
    } catch {}
  }, [isDone, conversationId]);

  function sendMessage() {
    const text = input.trim();
    if (!text || !conversationId) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      {
        role: "assistant",
        content: `Réponse (mock) sur ${promptSlug} :

1) Reformulation : ${text}
2) Point clé : …
3) Exemple (droit) : …

Pose-moi une question plus précise (définition, exemple, méthode, mini-cas).`,
      },
    ]);
    setInput("");
  }

  function toggleDone() {
    if (!conversationId) return;
    setIsDone((v) => !v);
  }

  function resetConversation() {
    if (!conversationId) return;

    const ok = confirm(
      "Réinitialiser cette conversation ?\n\nCela efface : messages, brouillon et statut “Terminée”."
    );
    if (!ok) return;

    try {
      localStorage.removeItem(convKey(conversationId));
      localStorage.removeItem(draftKey(conversationId));
      localStorage.removeItem(doneKey(conversationId));
    } catch {}

    setIsDone(false);
    setInput("");
    setMessages([
      { role: "assistant", content: `Conversation réinitialisée. Activité : ${promptSlug}.` },
      { role: "assistant", content: "(MVP) Tu peux reprendre et je réponds en simulation." },
    ]);
  }

  // ✅ Tant que Next n’a pas injecté le param, on montre un écran neutre
  if (!conversationId) {
    return (
      <main style={{ padding: 16, fontFamily: "sans-serif" }}>
        <Link href={modulePath}>← Retour au module</Link>
        <div style={{ marginTop: 16, opacity: 0.8 }}>Chargement…</div>
      </main>
    );
  }

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        padding: 16,
      }}
    >
      {/* HEADER */}
      <div style={{ flex: "0 0 auto", maxWidth: 980, width: "100%", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href={modulePath}>← Retour au module</Link>

          {/* badge uniquement si done=true pour CETTE conversationId */}
          {isDone && (
            <span
              style={{
                marginLeft: 8,
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

          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button
              onClick={toggleDone}
              style={{
                padding: "8px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.25)",
                background: "transparent",
                color: "inherit",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {isDone ? "Reprendre" : "Marquer comme terminée"}
            </button>

            <button
              onClick={resetConversation}
              style={{
                padding: "8px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "transparent",
                color: "inherit",
                cursor: "pointer",
                opacity: 0.9,
              }}
            >
              Réinitialiser
            </button>
          </div>
        </div>

        <h1 style={{ marginTop: 12, marginBottom: 6 }}>Conversation Amélys</h1>
        <div style={{ opacity: 0.75, fontSize: 14 }}>
          <div>
            <b>Activité</b> : {promptSlug}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            <b>ID</b> : {conversationId}
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div
        style={{
          flex: "1 1 auto",
          width: "100%",
          maxWidth: 980,
          margin: "16px auto 0",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          padding: 16,
          overflowY: "auto",
          minHeight: 0,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 16,
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "75%",
                padding: 12,
                borderRadius: 12,
                background:
                  m.role === "user"
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(255,255,255,0.06)",
                whiteSpace: "pre-wrap",
              }}
            >
              <b>{m.role === "user" ? "Toi" : "Amélys"}</b>
              <div>{m.content}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* INPUT */}
      <div
        style={{
          flex: "0 0 auto",
          width: "100%",
          maxWidth: 980,
          margin: "12px auto 0",
          display: "flex",
          gap: 8,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Écris ta question… (Enter pour envoyer)"
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "transparent",
            color: "inherit",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={input.trim().length === 0}
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "transparent",
            color: "inherit",
            fontWeight: 700,
            cursor: input.trim().length === 0 ? "not-allowed" : "pointer",
            opacity: input.trim().length === 0 ? 0.5 : 1,
          }}
        >
          Envoyer
        </button>
      </div>
    </main>
  );
}
