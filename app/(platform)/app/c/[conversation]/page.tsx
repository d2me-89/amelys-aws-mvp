"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// mêmes clés que le module
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
  // ✅ version stable : useParams() sans générique + extraction manuelle
  const params = useParams();
  const conversationId =
    typeof (params as any)?.conversation === "string"
      ? (params as any).conversation
      : "";

  // Si jamais l’URL est malformée, on évite de polluer localStorage avec "unknown"
  const safeConversationId = conversationId || "invalid-conversation";

  // ✅ extraction stable du promptSlug (cours-01, etc.)
  const promptSlug = useMemo(() => {
    if (!conversationId) return "unknown";
    const parts = conversationId.split("-");
    return parts.length >= 2 ? parts.slice(-2).join("-") : "unknown";
  }, [conversationId]);

  // retour module (fixe pour MVP)
  const modulePath =
    "/app/matieres/introduction-au-droit/modules/module-01-definition-et-caracteres-du-droit";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isDone, setIsDone] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // ✅ Load depuis localStorage (messages + draft + done)
  useEffect(() => {
    // si conversationId absent, on affiche juste un état neutre
    if (!conversationId) {
      setMessages([
        {
          role: "assistant",
          content:
            "Erreur : identifiant de conversation manquant dans l’URL. Reviens au module et relance.",
        },
      ]);
      setInput("");
      setIsDone(false);
      return;
    }

    try {
      const rawMsgs = localStorage.getItem(convKey(safeConversationId));
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

      const rawDraft = localStorage.getItem(draftKey(safeConversationId));
      setInput(rawDraft ?? "");

      const rawDone = localStorage.getItem(doneKey(safeConversationId));
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
  }, [conversationId, safeConversationId, promptSlug]);

  // ✅ Persist messages (uniquement si conversationId valide)
  useEffect(() => {
    if (!conversationId) return;
    try {
      localStorage.setItem(convKey(safeConversationId), JSON.stringify(messages));
    } catch {}
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, conversationId, safeConversationId]);

  // ✅ Persist draft
  useEffect(() => {
    if (!conversationId) return;
    try {
      localStorage.setItem(draftKey(safeConversationId), input);
    } catch {}
  }, [input, conversationId, safeConversationId]);

  // ✅ Persist done
  useEffect(() => {
    if (!conversationId) return;
    try {
      localStorage.setItem(doneKey(safeConversationId), String(isDone));
    } catch {}
  }, [isDone, conversationId, safeConversationId]);

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
      localStorage.removeItem(convKey(safeConversationId));
      localStorage.removeItem(draftKey(safeConversationId));
      localStorage.removeItem(doneKey(safeConversationId));
    } catch {}

    setIsDone(false);
    setInput("");
    setMessages([
      {
        role: "assistant",
        content: `Conversation réinitialisée. Activité : ${promptSlug}.`,
      },
    ]);
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

          {/* ✅ pastille UNIQUEMENT si isDone === true */}
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
    </main>
  );
}
