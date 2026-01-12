"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ConversationPage() {
  const params = useParams<{ conversation: string }>();
  const conversationId = params?.conversation ?? "unknown";

  // promptSlug dérivé (simple MVP)
  const promptSlug =
    conversationId.split("-").slice(-2).join("-") || "unknown";

  const storageKey = `conversation:${conversationId}`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // 🔹 Charger depuis localStorage
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        setMessages(JSON.parse(raw));
      } catch {
        setMessages([]);
      }
    } else {
      setMessages([
        {
          role: "assistant",
          content: `Conversation dédiée au prompt : ${promptSlug}. Reste dans le cadre du module et de l’activité.`,
        },
      ]);
    }
  }, [storageKey, promptSlug]);

  // 🔹 Sauvegarder
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, storageKey]);

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    const assistantMock: Message = {
      role: "assistant",
      content: `Réponse (mock) sur ${promptSlug} :

1) Reformulation : ${input}
2) Point clé : …
3) Exemple (droit) : …

Pose-moi une question plus précise (définition, exemple, méthode, mini-cas).`,
    };

    setMessages((prev) => [...prev, userMessage, assistantMock]);
    setInput("");
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
        <Link href="/app">← Retour /app</Link>

        <h1 style={{ marginTop: 12 }}>Conversation Amélys</h1>
        <div style={{ opacity: 0.75, fontSize: 14 }}>
          <div>
            <b>Conversation ID</b> : {conversationId}
          </div>
          <div>
            <b>Prompt</b> : {promptSlug}
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
              justifyContent:
                m.role === "user" ? "flex-end" : "flex-start",
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
        Prochaine étape : remplacer la réponse mock par un appel API streaming
        vers Bedrock Claude, et persister les messages côté backend.
      </div>
    </main>
  );
}
