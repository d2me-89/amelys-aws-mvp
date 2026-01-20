"use client";

import React, { useState, useRef, useEffect } from "react";
import AppLayout from "@/app/components/AppLayout";
import ReactMarkdown from 'react-markdown';
import { 
  LuSend, 
  LuChevronDown,
  LuStar,
  LuCheck,
  LuRefreshCw,
  LuCopy,
  LuThumbsUp,
  LuThumbsDown,
  LuEllipsis,
  LuBot
} from "react-icons/lu";

// ============================================
// 🔗 APPELS API
// ============================================

const API_URL = "https://5gty3ykr4d.execute-api.eu-west-1.amazonaws.com/prod";

async function startCourse(userId: string) {
  const response = await fetch(
    `${API_URL}/college/mathematiques-sixieme/chapitre1-cours`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors du démarrage du cours');
  }

  return response.json();
}

async function sendMessage(conversationId: string, message: string) {
  const response = await fetch(
    `${API_URL}/conversation/${conversationId}/message`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de l\'envoi du message');
  }

  return response.json();
}

// =============================================
// 🎨 COMPOSANT PRINCIPAL
// =============================================

export default function MathematiquesSixiemeChapitre1CoursPage() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{
    id: string, 
    role: 'user' | 'assistant', 
    content: string,
    isLatestAssistant?: boolean,
    isStreaming?: boolean  // Pour savoir si le message est en cours de streaming
  }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  
  const headerMenuRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);

  // Scroll vers le dernier message
  useEffect(() => {
    if (lastUserMessageRef.current) {
      setTimeout(() => {
        lastUserMessageRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50);
    }
  }, [messages]);

  // Fermer le menu header
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerMenuRef.current && !headerMenuRef.current.contains(event.target as Node)) {
        setShowHeaderMenu(false);
      }
    };

    if (showHeaderMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHeaderMenu]);

  // ============================================
  // 🌊 FONCTION DE STREAMING (AFFICHAGE PROGRESSIF)
  // ============================================

  const streamText = (fullText: string, messageId: string) => {
    const words = fullText.split(' ');
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < words.length) {
        const displayText = words.slice(0, currentIndex + 1).join(' ');
        
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: displayText, isStreaming: true }
            : msg
        ));
        
        currentIndex++;
      } else {
        // Streaming terminé
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, isStreaming: false }
            : msg
        ));
        setStreamingMessageId(null);
        clearInterval(intervalId);
      }
    }, 30); // Vitesse : 30ms par mot (ajustable)

    return intervalId;
  };

  // ============================================
  // 🚀 DÉMARRER LE COURS (APPEL API RÉEL)
  // ============================================

  const handleStartCourse = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Remplacer par le vrai userId depuis l'authentification
      const userId = "user_demo_" + Date.now();
      
      console.log('[START] Démarrage du cours...');
      const response = await startCourse(userId);
      
      console.log('[START] Cours démarré:', response.conversationId);
      
      setConversationId(response.conversationId);
      
      // Ajouter UNIQUEMENT le message de l'assistant (pas le message utilisateur initial)
      setMessages([]);

      // Ajouter un message vide pour l'assistant qui va être streamé
      const assistantMsgId = 'welcome';
      setMessages([{
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        isLatestAssistant: true,
        isStreaming: true
      }]);

      setStreamingMessageId(assistantMsgId);
      
      // Démarrer le streaming du texte
      setTimeout(() => {
        streamText(response.message, assistantMsgId);
      }, 300); // Petit délai avant de commencer
      
    } catch (err) {
      console.error('[START] Erreur:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // 💬 ENVOYER UN MESSAGE (APPEL API RÉEL)
  // ============================================

  const handleSend = async () => {
    if (!inputValue.trim() || !conversationId) return;
    
    const userMessage = inputValue;
    setInputValue("");
    setError(null);
    
    // Retirer le flag isLatestAssistant
    setMessages(prev => prev.map(msg => ({
      ...msg,
      isLatestAssistant: false
    })));
    
    // Ajouter le message utilisateur immédiatement
    const userMsgId = 'user_' + Date.now();
    setMessages(prev => [...prev, { 
      id: userMsgId, 
      role: 'user', 
      content: userMessage
    }]);
    
    setIsLoading(true);
    
    try {
      console.log('[SEND] Envoi du message...');
      const response = await sendMessage(conversationId, userMessage);
      
      console.log('[SEND] Réponse reçue:', response.messageId);
      
      // Ajouter un message vide pour l'assistant qui va être streamé
      const assistantMsgId = response.messageId;
      setMessages(prev => [...prev, { 
        id: assistantMsgId,
        role: 'assistant', 
        content: '',
        isLatestAssistant: true,
        isStreaming: true
      }]);

      setStreamingMessageId(assistantMsgId);
      setIsLoading(false);
      
      // Démarrer le streaming du texte
      setTimeout(() => {
        streamText(response.message, assistantMsgId);
      }, 300);
      
    } catch (err) {
      console.error('[SEND] Erreur:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi du message');
      
      // Retirer le message utilisateur en cas d'erreur
      setMessages(prev => prev.filter(m => m.id !== userMsgId));
      setIsLoading(false);
    }
  };

  const headerMenuItems = [
    { icon: <LuStar size={16} />, label: "Ajouter aux favoris" },
    { icon: <LuCheck size={16} />, label: "Marquer comme complet" },
    { icon: <LuRefreshCw size={16} />, label: "Régénérer conversation" }
  ];

  return (
    <AppLayout>
      <div style={{ 
        display: "flex", 
        height: "calc(100vh - 70px)",
        background: "var(--background)"
      }}>
        {/* Zone principale */}
        <div style={{ 
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}>
          {/* Header */}
          <header style={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            background: "var(--background)",
            flexShrink: 0
          }}>
            <div 
              ref={headerMenuRef}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", position: "relative" }}
            >
              <h1 style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                margin: 0,
                color: "#fff"
              }}>
                Ch 1. Les nombres entiers et décimaux - Cours interactif
              </h1>
              
              <button
                onClick={() => setShowHeaderMenu(!showHeaderMenu)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  padding: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,1)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
              >
                <LuChevronDown size={18} />
              </button>

              {/* Menu déroulant */}
              {showHeaderMenu && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "0.5rem",
                  background: "rgba(30, 30, 35, 0.98)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px",
                  padding: "0.5rem",
                  minWidth: "220px",
                  zIndex: 1000,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                }}>
                  {headerMenuItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setShowHeaderMenu(false)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.65rem 0.75rem",
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        borderRadius: "6px",
                        transition: "background 0.2s ease",
                        textAlign: "left"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Zone de messages */}
          <div 
            ref={chatContainerRef}
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              display: "flex",
              justifyContent: "center",
              padding: "2rem 1rem",
              scrollBehavior: "smooth"
            }}>
            <div style={{
              width: "100%",
              maxWidth: "800px",
              display: "flex",
              flexDirection: "column",
              gap: "3rem"
            }}>
              {/* ============================================ */}
              {/* 🎯 ÉCRAN DE DÉMARRAGE */}
              {/* ============================================ */}
              {messages.length === 0 ? (
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  gap: "1.5rem"
                }}>
                  <div style={{
                    fontSize: "3rem",
                    marginBottom: "1rem"
                  }}>
                    📐
                  </div>
                  <h2 style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#fff",
                    margin: 0
                  }}>
                    Chapitre 1 : Les nombres entiers et décimaux
                  </h2>
                  <p style={{
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.6)",
                    textAlign: "center",
                    maxWidth: "600px",
                    lineHeight: "1.6",
                    margin: 0
                  }}>
                    Bienvenue dans ce cours interactif ! Amélys va t'accompagner pas à pas 
                    pour maîtriser les nombres entiers et décimaux.
                  </p>

                  {/* ============================================ */}
                  {/* 🚀 BOUTON COMMENCER LE COURS */}
                  {/* ============================================ */}
                  <button
                    onClick={handleStartCourse}
                    disabled={isLoading}
                    style={{
                      marginTop: "1rem",
                      padding: "1rem 2rem",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#fff",
                      background: isLoading 
                        ? "rgba(159, 122, 234, 0.5)" 
                        : "linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)",
                      border: "none",
                      borderRadius: "12px",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      boxShadow: "0 4px 12px rgba(159, 122, 234, 0.3)"
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 6px 16px rgba(159, 122, 234, 0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(159, 122, 234, 0.3)";
                    }}
                  >
                    {isLoading ? (
                      <>
                        <LuRefreshCw size={20} style={{ animation: "spin 1s linear infinite" }} />
                        Démarrage en cours...
                      </>
                    ) : (
                      "Commencer le cours"
                    )}
                  </button>

                  {/* Affichage des erreurs */}
                  {error && (
                    <div style={{
                      padding: "1rem",
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "8px",
                      color: "#FCA5A5",
                      fontSize: "0.9rem",
                      maxWidth: "600px",
                      textAlign: "center"
                    }}>
                      ⚠️ {error}
                    </div>
                  )}
                </div>
              ) : (
                /* ============================================ */
                /* 💬 MESSAGES */
                /* ============================================ */
                <>
                  {messages.map((msg, index) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      ref={msg.role === 'user' && index === messages.length - 1 ? lastUserMessageRef : null}
                    />
                  ))}

                  {/* Indicateur de chargement */}
                  {isLoading && !streamingMessageId && (
                    <div style={{
                      display: "flex",
                      gap: "1rem",
                      maxWidth: "800px"
                    }}>
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <LuBot size={20} style={{ color: "#fff" }} />
                      </div>
                      <div style={{
                        background: "rgba(255,255,255,0.05)",
                        padding: "1rem 1.25rem",
                        borderRadius: "12px",
                        display: "flex",
                        gap: "0.5rem"
                      }}>
                        <div style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#9F7AEA",
                          animation: "typing 1.4s infinite ease-in-out"
                        }} />
                        <div style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#9F7AEA",
                          animation: "typing 1.4s infinite ease-in-out 0.2s"
                        }} />
                        <div style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#9F7AEA",
                          animation: "typing 1.4s infinite ease-in-out 0.4s"
                        }} />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ============================================ */}
          {/* ⌨️ ZONE DE SAISIE */}
          {/* ============================================ */}
          {conversationId && (
            <div style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              background: "var(--background)",
              flexShrink: 0
            }}>
              <div style={{
                maxWidth: "800px",
                margin: "0 auto",
                display: "flex",
                alignItems: "flex-end",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.05)",
                border: `2px solid ${isInputFocused ? '#9F7AEA' : 'rgba(255,255,255,0.15)'}`,
                borderRadius: "12px",
                transition: "border-color 0.2s ease"
              }}>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Message Amélys..."
                  disabled={isLoading || !!streamingMessageId}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    fontSize: "1.125rem",
                    resize: "none",
                    outline: "none",
                    minHeight: "20px",
                    maxHeight: "150px",
                    fontFamily: "inherit",
                    lineHeight: "1.5"
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading || !!streamingMessageId}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: (inputValue.trim() && !isLoading && !streamingMessageId)
                      ? "linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)"
                      : "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "#fff",
                    cursor: (inputValue.trim() && !isLoading && !streamingMessageId) ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                    opacity: (inputValue.trim() && !isLoading && !streamingMessageId) ? 1 : 0.5
                  }}
                >
                  {isLoading || streamingMessageId ? (
                    <LuRefreshCw size={18} style={{ animation: "spin 1s linear infinite" }} />
                  ) : (
                    <LuSend size={18} />
                  )}
                </button>
              </div>

              {/* Affichage des erreurs dans la zone de saisie */}
              {error && (
                <div style={{
                  maxWidth: "800px",
                  margin: "0.5rem auto 0",
                  padding: "0.75rem 1rem",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "8px",
                  color: "#FCA5A5",
                  fontSize: "0.875rem"
                }}>
                  ⚠️ {error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </AppLayout>
  );
}

// ============================================
// 💬 COMPOSANT MESSAGE BUBBLE
// ============================================

interface MessageBubbleProps {
  message: { 
    id: string, 
    role: 'user' | 'assistant', 
    content: string,
    isLatestAssistant?: boolean 
  };
}

const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ message }, ref) => {
    const isUser = message.role === 'user';
    const [showActions, setShowActions] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(message.content);
    };

    return (
      <div
        ref={ref}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        style={{
          display: "flex",
          gap: "1rem",
          maxWidth: "800px",
          marginLeft: isUser ? "auto" : "0",
          flexDirection: isUser ? "row-reverse" : "row",
          position: "relative",
          scrollMarginTop: "20px",
          minHeight: message.isLatestAssistant ? "calc(100vh - 250px)" : "auto"
        }}
      >
        {/* Avatar */}
        {!isUser && (
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "#fff"
          }}>
            <LuBot size={20} />
          </div>
        )}

        <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {/* Bulle */}
          <div 
            className="message-content"
            style={{
              background: isUser 
                ? "#2f2f2f"
                : "rgba(255,255,255,0.05)",
              padding: "1rem 1.25rem",
              borderRadius: "12px",
              color: "#fff",
              lineHeight: "1.6",
              fontSize: "1.125rem"
            }}>
            {isUser ? (
              <div style={{ whiteSpace: "pre-wrap" }}>{message.content}</div>
            ) : (
              <ReactMarkdown
                components={{
                  // Titres
                  h1: ({node, ...props}) => <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem', marginBottom: '0.5rem' }} {...props} />,
                  h2: ({node, ...props}) => <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '1rem', marginBottom: '0.5rem' }} {...props} />,
                  h3: ({node, ...props}) => <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.75rem', marginBottom: '0.5rem' }} {...props} />,
                  h4: ({node, ...props}) => <h4 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '0.75rem', marginBottom: '0.5rem' }} {...props} />,
                  
                  // Gras et italique
                  strong: ({node, ...props}) => <strong style={{ fontWeight: 700, color: '#fff' }} {...props} />,
                  em: ({node, ...props}) => <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }} {...props} />,
                  
                  // Listes
                  ul: ({node, ...props}) => <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }} {...props} />,
                  ol: ({node, ...props}) => <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }} {...props} />,
                  li: ({node, ...props}) => <li style={{ marginBottom: '0.25rem' }} {...props} />,
                  
                  // Paragraphes
                  p: ({node, ...props}) => <p style={{ marginBottom: '0.75rem' }} {...props} />,
                  
                  // Code
                  code: ({node, inline, ...props}: any) => 
                    inline ? (
                      <code style={{ 
                        background: 'rgba(159, 122, 234, 0.2)', 
                        padding: '0.15rem 0.4rem', 
                        borderRadius: '4px',
                        fontSize: '0.95em',
                        fontFamily: 'monospace'
                      }} {...props} />
                    ) : (
                      <code style={{ 
                        display: 'block',
                        background: 'rgba(0,0,0,0.3)', 
                        padding: '1rem', 
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        fontFamily: 'monospace',
                        overflowX: 'auto',
                        marginTop: '0.5rem',
                        marginBottom: '0.5rem'
                      }} {...props} />
                    ),
                  
                  // Séparateurs
                  hr: ({node, ...props}) => <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)', margin: '1rem 0' }} {...props} />,
                  
                  // Blockquotes
                  blockquote: ({node, ...props}) => (
                    <blockquote style={{ 
                      borderLeft: '3px solid #9F7AEA', 
                      paddingLeft: '1rem', 
                      marginLeft: 0,
                      fontStyle: 'italic',
                      color: 'rgba(255,255,255,0.8)'
                    }} {...props} />
                  )
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>

          {/* Actions */}
          {!isUser && (
            <div style={{
              display: "flex",
              gap: "0.5rem",
              opacity: showActions ? 1 : 0,
              visibility: showActions ? "visible" : "hidden",
              transition: "opacity 0.2s ease, visibility 0.2s ease"
            }}>
              <ActionButton icon={<LuCopy size={14} />} onClick={handleCopy} />
              <ActionButton icon={<LuRefreshCw size={14} />} onClick={() => {}} />
              <ActionButton icon={<LuThumbsUp size={14} />} onClick={() => {}} />
              <ActionButton icon={<LuThumbsDown size={14} />} onClick={() => {}} />
              <ActionButton icon={<LuEllipsis size={14} />} onClick={() => {}} />
            </div>
          )}
        </div>
      </div>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';

// Action Button
function ActionButton({ icon, onClick }: { icon: React.ReactNode; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "6px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.6)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(159, 122, 234, 0.15)";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.color = "rgba(255,255,255,0.6)";
      }}
    >
      {icon}
    </button>
  );
}