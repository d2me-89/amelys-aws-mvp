"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

// --- Clés localStorage (par conversationId) ---
const convKey = (id: string) => `amelys:conv:${id}`;
const draftKey = (id: string) => `amelys:draft:${id}`;
const doneKey = (id: string) => `amelys:done:${id}`;

// --- Extraction robuste de l'id depuis l'URL ---
// URL attendue : /app/c/<conversationId>
function readConversationIdFromPathname(): string {
  if (typeof window === "undefined") return "";
  const path = window.location.pathname; // ex: /app/c/intro-droit-...-cours-01
  const marker = "/app/c/";
  const idx = path.indexOf(marker);
  if (idx < 0) return "";
  const rest = path.slice(idx + marker.length);
  return rest ? decodeURIComponent(rest) : "";
}

export default function ConversationPage() {
  const modulePath =
    "/app/matieres/introduction-au-droit/modules/module-01-definition-et-caracteres-du-droit";

  // conversationId est lu depuis l'URL (source de vérité)
  const [conversationId, setConversationId] = useState<string>("");

  // UI state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isDone, setIsDone] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Déduit le promptSlug depuis la fin de l'id (cours-01, faq, etc.)
  const promptSlug = useMemo(() => {
    if (!conversationId) return "";
    const parts = conversationId.split("-");
    return parts.length >= 2 ? parts.slice(-2).join("-") : "";
  }, [conversationId]);

  // 1) Lire l'id au montage (et si l'URL change)
  useEffect(() => {
    const id = readConversationIdFromPathname();
    setConversationId(id);
  }, []);

  // 2) Charger depuis localStorage (SEULEMENT si conversationId valide)
  useEffect(() => {
    if (!conversationId) return;

    try {
      const raw = localStorage.getItem(convKey(conversationId));
      if (raw) {
        setMessages(JSON.parse(raw));
      } else {
        // Seed mock
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
          content: "(MVP) Erreur de lecture localStorage. Recharge la page.",
        },
      ]);
      setInput("");
      setIsDone(false);
    }
  }, [conversationId, promptSlug]);

  // 3) Persist messages (SEULEMENT si conversationId valide)
  useEffect(() => {
    if (!conversationId) return;
    try {
      localStorage.setItem(convKey(conversationId), JSON.stringify(messages));
    } catch {}
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, conversationId]);

  // 4) Persist draft
  useEffect(() => {
    if (!conversationId) return;
    try {
      localStorage.setItem(draftKey(conversationId), input);
    } catch {}
  }, [input, conversationId]);

  // 5) Persist done
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
      {
        role: "assistant",
        content: `Conversation réinitialisée. Activité : ${promptSlug}.`,
      },
      {
        role: "assistant",
        content:
          "(MVP) Tu peux reprendre et je réponds en simulation.",
      },
    ]);
  }

  // Écran neutre tant que l'id n'est pas lu
  if (!conversationId) {
    return (
      <main style={{ padding: 16, fontFamily: "sans-serif" }}>
        <Link href={modulePath}>← Retour au module</Link>
        <div style={{ marginTop: 16, opacity: 0.8 }}>
          Chargement de la conversation…
        </div>
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
      {/* Header */}
      <div style={{ flex: "0 0 auto", maxWidth: 980, width: "100%", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href={modulePath}>← Retour au module</Link>

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
            <b>Activité</b> : {promptSlug || "—"}
          </div>
        </div>
      </div>

      {/* Messages */}
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

      {/* Input */}
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
