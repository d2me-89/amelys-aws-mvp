"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function convKey(conversationId: string) {
  return `amelys:conv:${conversationId}`;
}
function draftKey(conversationId: string) {
  return `amelys:draft:${conversationId}`;
}
function doneKey(conversationId: string) {
  return `amelys:done:${conversationId}`;
}

export default function ConversationPage() {
  const params = useParams<{ conversation: string }>();
  const conversationId = params?.conversation ?? "unknown";

  const promptSlug = useMemo(() => {
    const parts = conversationId.split("-");
    return parts.length >= 2 ? parts.slice(-2).join("-") : "unknown";
  }, [conversationId]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isDone, setIsDone] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // ⬇️ Charger (messages + draft + done) depuis localStorage
  useEffect(() => {
    try {
      const rawMsgs = localStorage.getItem(convKey(conversationId));
      if (rawMsgs) {
        setMessages(JSON.parse(rawMsgs));
      } else {
        setMessages([
          {
            role: "assistant",
            content: `Conversation dédiée au prompt : ${promptSlug}. Reste dans le cadre du module et de l’activité.`,
          },
        ]);
      }

      const rawDraft = localStorage.getItem(draftKey(conversationId));
      if (rawDraft) setInput(rawDraft);

      const rawDone = localStorage.getItem(doneKey(conversationId));
      setIsDone(rawDone === "true");
    } catch {
      setMessages([
        {
          role: "assistant",
          content: `Conversation dédiée au prompt : ${promptSlug}.`,
        },
      ]);
      setInput("");
      setIsDone(false);
    }
  }, [conversationId, promptSlug]);

  // ⬇️ Sauvegarder messages
  useEffect(() => {
    try {
      localStorage.setItem(convKey(conversationId), JSON.stringify(messages));
    } catch {}
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, conversationId]);

  // ⬇️ Sauvegarder draft
  useEffect(() => {
    try {
      localStorage.setItem(draftKey(conversationId), input);
    } catch {}
  }, [input, conversationId]);

  // ⬇️ Sauvegarder done
  useEffect(() => {
    try {
      localStorage.setItem(doneKey(conversationId), String(isDone));
    } catch {}
  }, [isDone, conversationId]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMessage: Message = { role: "user", content: text };

    const assistantMock: Message = {
      role: "assistant",
      content: `Réponse (mock) sur ${promptSlug} :

1) Reformulation : ${text}
2) Point clé : …
3) Exemple (droit) : …

Pose-moi une question plus précise (définition, exemple, méthode, mini-cas).`,
    };

    setMessages((prev) => [...prev, userMessage, assistantMock]);
    setInput("");
  }

  function resetConversation() {
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
      {
        role: "assistant",
        content: `Conversation réinitialisée. Activité : ${promptSlug}. Pose ta question et je réponds (mock).`,
      },
    ]);
  }

  function toggleDone() {
    setIsDone((v) => !v);
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
      <div
        style={{
          flex: "0 0 auto",
          maxWidth: 980,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/app">← Retour /app</Link>

          {/* Badge Terminée */}
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
            <b>Conversation ID</b> : {conversationId}
          </div>
          <div>
            <b>Activité</b> : {promptSlug}
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
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "transparent",
            color: "inherit",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Envoyer
        </button>
      </div>

      <div
        style={{
          maxWidth: 980,
          margin: "8px auto 0",
          fontSize: 12,
          opacity: 0.6,
        }}
      >
        ✔️ Messages + statut “Terminée” persistés en local (par conversationId).
      </div>
    </main>
  );
}
