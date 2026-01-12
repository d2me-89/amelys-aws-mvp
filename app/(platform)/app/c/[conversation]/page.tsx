"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function storageKey(conversationId: string) {
  return `amelys:conv:${conversationId}`;
}

function draftKey(conversationId: string) {
  return `amelys:draft:${conversationId}`;
}

export default function ConversationPage() {
  const params = useParams();

  const conversationId =
    typeof params.conversation === "string" ? params.conversation : "unknown";

  const prompt = useMemo(() => {
    const parts = conversationId.split("-");
    if (parts.length >= 2) return parts.slice(-2).join("-");
    return "unknown";
  }, [conversationId]);

  const [messages, setMessages] = useState<ChatMsg[]>([]);
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

  // ✅ 1) Chargement initial depuis localStorage (messages + draft)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(conversationId));
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMsg[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setMessages([
            {
              id: uid(),
              role: "assistant",
              content:
                "(MVP) Je suis Amélys. Tu peux m’écrire ci-dessous : je réponds en mode simulation. Prochaine étape : brancher Bedrock Claude.",
            },
            {
              id: uid(),
              role: "assistant",
              content: `Conversation dédiée au prompt : ${prompt}. Reste dans le cadre du module et de l’activité.`,
            },
          ]);
        }
      } else {
        setMessages([
          {
            id: uid(),
            role: "assistant",
            content:
              "(MVP) Je suis Amélys. Tu peux m’écrire ci-dessous : je réponds en mode simulation. Prochaine étape : brancher Bedrock Claude.",
          },
          {
            id: uid(),
            role: "assistant",
            content: `Conversation dédiée au prompt : ${prompt}. Reste dans le cadre du module et de l’activité.`,
          },
        ]);
      }

      const draft = localStorage.getItem(draftKey(conversationId));
      if (draft) setInput(draft);
    } catch {
      // si localStorage bloqué ou JSON cassé, on repart proprement
      setMessages([
        {
          id: uid(),
          role: "assistant",
          content:
            "(MVP) Je suis Amélys. Tu peux m’écrire ci-dessous : je réponds en mode simulation.",
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  // ✅ 2) Sauvegarde automatique (messages) dans localStorage
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    try {
      localStorage.setItem(storageKey(conversationId), JSON.stringify(messages));
    } catch {
      // ignore (quota, privacy mode, etc.)
    }
  }, [messages, conversationId]);

  // ✅ 3) Sauvegarde du brouillon (input) par conversation
  useEffect(() => {
    try {
      localStorage.setItem(draftKey(conversationId), input);
    } catch {
      // ignore
    }
  }, [input, conversationId]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isThinking) return;

    setInput("");
    addMessage("user", text);
    setIsThinking(true);
    scrollToBottom();

    // Mock: réponse Amélys après 700ms
    await new Promise((r) => setTimeout(r, 700));

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

  function clearConversation() {
    if (!confirm("Effacer l’historique de cette conversation ?")) return;
    try {
      localStorage.removeItem(storageKey(conversationId));
      localStorage.removeItem(draftKey(conversationId));
    } catch {
      // ignore
    }
    setInput("");
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content:
          "(MVP) Historique effacé. Repars sur une question et je réponds en simulation.",
      },
      {
        id: uid(),
        role: "assistant",
        content: `Conversation dédiée au prompt : ${prompt}.`,
      },
    ]);
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 980 }}>
      <div style={{ marginBottom: "1rem", display: "flex", gap: 12 }}>
        <Link href="/app">← Retour /app</Link>
        <button
          onClick={clearConversation}
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
            color: "inherit",
            borderRadius: 10,
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          Effacer
        </button>
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
        ✔️ Messages persistés en local (par conversationId). Prochaine étape :
        brancher une API streaming vers Bedrock + persister côté DB.
      </div>
    </main>
  );
}
