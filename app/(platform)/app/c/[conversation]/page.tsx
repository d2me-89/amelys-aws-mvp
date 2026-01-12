"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ConversationPage() {
  const params = useParams();

  const conversationId =
    typeof params.conversation === "string" ? params.conversation : "unknown";

  // Extrait un prompt comme "cours-01" depuis la fin de l’ID
  const prompt = useMemo(() => {
    const parts = conversationId.split("-");
    if (parts.length >= 2) return parts.slice(-2).join("-");
    return "unknown";
  }, [conversationId]);

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: uid(),
      role: "assistant",
      content:
        "(MVP) Je suis Amélys. Tu peux m’écrire ci-dessous : je réponds en mode simulation. Prochaine étape : brancher Bedrock Claude.",
    },
    {
      id: uid(),
      role: "assistant",
      content:
        `Conversation dédiée au prompt : ${prompt}. Reste dans le cadre du module et de l’activité.`,
    },
  ]);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }

  function addMessage(role: ChatMsg["role"], content: string) {
    setMessages((prev) => [...prev, { id: uid(), role, content }]);
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || isThinking) return;

    setInput("");
    addMessage("user", text);
    setIsThinking(true);
    scrollToBottom();

    // Mock: réponse Amélys après 700ms
    await new Promise((r) => setTimeout(r, 700));

    // Réponse mock cadrée (simple)
    const reply =
      `Réponse (mock) sur ${prompt} :\n\n` +
      `1) Reformulation : ${text}\n` +
      `2) Point clé : …\n` +
      `3) Exemple (droit) : …\n\n` +
      `Pose-moi une question plus précise (définition, exemple, méthode, mini-cas).`;

    addMessage("assistant", reply);
    setIsThinking(false);
    scrollToBottom();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 980 }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/app">← Retour /app</Link>
      </div>

      <h1 style={{ marginBottom: 6 }}>Conversation Amélys</h1>

      <div style={{ opacity: 0.8, marginBottom: 16 }}>
        <div>
          <b>Conversation ID :</b> {conversationId}
        </div>
        <div>
          <b>Prompt :</b> {prompt}
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          padding: 16,
          height: 420,
          overflowY: "auto",
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              marginBottom: 14,
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                whiteSpace: "pre-wrap",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: "10px 12px",
                opacity: 0.98,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 13 }}>
                {m.role === "user" ? "Toi" : "Amélys"}
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.4 }}>{m.content}</div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                maxWidth: "80%",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: "10px 12px",
                opacity: 0.85,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 13 }}>
                Amélys
              </div>
              <div>…</div>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Écris ta question… (Enter pour envoyer)"
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
            color: "inherit",
          }}
          disabled={isThinking}
        />
        <button
          onClick={handleSend}
          disabled={isThinking || input.trim().length === 0}
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "inherit",
            fontWeight: 700,
            cursor:
              isThinking || input.trim().length === 0 ? "not-allowed" : "pointer",
            opacity: isThinking || input.trim().length === 0 ? 0.5 : 1,
          }}
        >
          Envoyer
        </button>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
        Prochaine étape : remplacer la réponse mock par un appel API streaming
        vers Bedrock Claude, et persister les messages par conversation.
      </div>
    </main>
  );
}
