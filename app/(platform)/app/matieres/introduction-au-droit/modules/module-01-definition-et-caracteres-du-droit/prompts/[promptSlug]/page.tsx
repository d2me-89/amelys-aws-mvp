"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Clés localStorage (par conversation)
const convKey = (id: string) => `amelys:conv:${id}`;
const draftKey = (id: string) => `amelys:draft:${id}`;
const doneKey = (id: string) => `amelys:done:${id}`;

// ✅ Récupération robuste de l'id conversation (params OU URL)
function getConversationIdFromRuntime(params: any): string {
  // 1) App Router param (ton dossier s'appelle [conversation])
  const p1 = params?.conversation;
  if (typeof p1 === "string" && p1.length > 0) return p1;

  // 2) Au cas où (si un jour tu renomme le dossier)
  const p2 = params?.conversationId;
  if (typeof p2 === "string" && p2.length > 0) return p2;

  // 3) Fallback inratable: parse depuis l’URL
  if (typeof window !== "undefined") {
    const path = window.location.pathname; // ex: /app/c/intro-droit-...-cours-01
    const marker = "/app/c/";
    const idx = path.indexOf(marker);
    if (idx >= 0) {
      const rest = path.slice(idx + marker.length);
      if (rest) return decodeURIComponent(rest);
    }
  }

  return "";
}

export default function ConversationPage() {
  const params = useParams();

  // On stocke conversationId en state pour le rendre stable après montage
  const [conversationId, setConversationId] = useState<string>("");

  // États UI
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isDone, setIsDone] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);

  // Pour ce MVP: retour vers le module 1
  const modulePath =
    "/app/matieres/introduction-au-droit/modules/module-01-definition-et-caracteres-du-droit";

  // ✅ Déduire promptSlug (cours-01, etc.) depuis l’id
  const promptSlug = useMemo(() => {
    if (!conversationId) return "unknown";
    const parts = conversationId.split("-");
    return parts.length >= 2 ? parts.slice(-2).join("-") : "unknown";
  }, [conversationId]);

  // 1) Récupérer conversationId au montage + quand params changent
  useEffect(() => {
    const id = getConversationIdFromRuntime(params);
    setConversationId(id);
  }, [params]);

  // 2) Charger depuis localStorage (seulement si conversationId valide)
  useEffect(() => {
    if (!conversationId) {
      // État clair si l’ID n’est pas disponible
      setIsDone(false);
      setInput("");
      setMessages([
        {
          role: "assistant",
          content:
            "Erreur : identifiant de conversation introuvable. Reviens au module et relance l’activité.",
        },
      ]);
      return;
    }

    try {
      const rawMsgs = localStorage.getItem(convKey(conversationId));
      if (rawMsgs) {
        setMessages(JSON.parse(rawMsgs));
      } else {
        // ✅ Seed mock si pas d’historique
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

      const rawDraft = localStorage.getItem(draftKey(conversationId));
      setInput(rawDraft ?? "");

      const rawDone = localStorage.getItem(doneKey(conversationId));
      setIsDone(rawDone === "true");
    } catch {
      setIsDone(false);
      setInput("");
      setMessages([
        {
          role: "assistant",
          content: `Conversation dédiée au prompt : ${promptSlug}.`,
        },
      ]);
    }
  }, [conversationId, promptSlug]);

  // 3) Persister messages (seulement si conversationId valide)
  useEffect(() => {
    if (!conversationId) return;
    try {
      localStorage.setItem(convKey(conversationId), JSON.stringify(messages));
    } catch {}
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, conversationId]);

  // 4) Persister draft
  useEffect(() => {
    if (!conversationId) return;
    try {
      localStorage.setItem(draftKey(conversationId), input);
    } catch {}
  }, [input, conversationId]);

  // 5) Persister done
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
          "(MVP) Tu peux reprendre et je réponds en simulation. Prochaine étape : IA réelle.",
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

          {/* ✅ Badge UNIQUEMENT si conversationId valide + isDone true */}
          {conversationId && isDone && (
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
              disabled={!conversationId}
              style={{
                padding: "8px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.25)",
                background: "transparent",
                color: "inherit",
                fontWeight: 700,
                cursor: conversationId ? "pointer" : "not-allowed",
                opacity: conversationId ? 1 : 0.5,
              }}
            >
              {isDone ? "Reprendre" : "Marquer comme terminée"}
            </button>

            <button
              onClick={resetConversation}
              disabled={!conversationId}
              style={{
                padding: "8px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "transparent",
                color: "inherit",
                cursor: conversationId ? "pointer" : "not-allowed",
                opacity: conversationId ? 0.9 : 0.5,
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
            <b>ID</b> : {conversationId || "—"}
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
          disabled={!conversationId}
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "transparent",
            color: "inherit",
            opacity: conversationId ? 1 : 0.6,
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!conversationId || input.trim().length === 0}
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "transparent",
            color: "inherit",
            fontWeight: 700,
            cursor: !conversationId ? "not-allowed" : "pointer",
            opacity: !conversationId || input.trim().length === 0 ? 0.5 : 1,
          }}
        >
          Envoyer
        </button>
      </div>
    </main>
  );
}
