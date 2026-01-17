"use client";

import { useState, useRef, useEffect } from "react";
import AppLayout from "@/app/components/AppLayout";
import { 
  LuSend, 
  LuBrain, 
  LuPlus, 
  LuPaperclip, 
  LuCamera, 
  LuFolderPlus, 
  LuSearch, 
  LuGlobe, 
  LuPenTool, 
  LuPlug,
  LuChevronDown,
  LuStar,
  LuCheck,
  LuRefreshCw,
  LuPanelRight,
  LuCopy,
  LuThumbsUp,
  LuThumbsDown,
  LuMoreVertical
} from "react-icons/lu";

export default function MathematiquesSixiemeChapitre1CoursPage() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Ajouter le message utilisateur
    setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
    setInputValue("");
    
    // Simuler la réponse de l'assistant
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Bonjour ! Je suis Amélys, ton assistant IA pour les mathématiques de sixième. Comment puis-je t'aider avec le chapitre sur les nombres entiers et décimaux ?" 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const plusMenuItems = [
    { icon: <LuPaperclip size={18} />, label: "Ajouter des fichiers et des photos" },
    { icon: <LuCamera size={18} />, label: "Prendre une capture d'écran" },
    { icon: <LuFolderPlus size={18} />, label: "Ajouter au Projet" },
    { icon: <LuSearch size={18} />, label: "Recherche" },
    { icon: <LuGlobe size={18} />, label: "Recherche Web" },
    { icon: <LuPenTool size={18} />, label: "Utiliser le style" },
    { icon: <LuPlug size={18} />, label: "Ajouter des connecteurs" },
  ];

  const headerMenuItems = [
    { icon: <LuStar size={16} />, label: "Ajouter aux favoris" },
    { icon: <LuCheck size={16} />, label: "Marquer comme complet" },
    { icon: <LuRefreshCw size={16} />, label: "Régénérer la conversation" },
  ];

  return (
    <AppLayout>
      <div style={{
        display: "flex",
        height: "100vh",
        background: "var(--background)",
        position: "relative"
      }}>
        {/* Zone de conversation centrale */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: isSidebarOpen ? "calc(100% - 400px)" : "100%",
          transition: "max-width 0.3s ease"
        }}>
          {/* Header */}
          <header style={{
            height: "60px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            background: "var(--background)"
          }}>
            {/* Gauche : Titre + Menu déroulant */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", position: "relative" }}>
              <h1 style={{
                fontSize: "1rem",
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

              {/* Menu déroulant header */}
              {showHeaderMenu && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
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

            {/* Droite : Ouvrir sidebar */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              <LuPanelRight size={18} />
              {isSidebarOpen ? "Fermer" : "Ouvrir"} la barre latérale
            </button>
          </header>

          {/* Zone de messages */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "2rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}>
            {messages.length === 0 ? (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "1rem"
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
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: "500px",
                  textAlign: "center",
                  lineHeight: "1.6"
                }}>
                  Commence ton cours interactif avec Amélys. Pose tes questions, demande des explications, et progresse à ton rythme !
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <MessageBubble key={idx} message={msg} />
                ))}
                
                {isTyping && (
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
                      flexShrink: 0,
                      fontSize: "1.2rem"
                    }}>
                      🤖
                    </div>
                    <div style={{
                      background: "rgba(255,255,255,0.05)",
                      padding: "1rem 1.25rem",
                      borderRadius: "12px",
                      display: "flex",
                      gap: "0.3rem"
                    }}>
                      <span className="typing-dot" style={{ 
                        width: "8px", 
                        height: "8px", 
                        borderRadius: "50%", 
                        background: "#9F7AEA",
                        animation: "typing 1.4s infinite"
                      }} />
                      <span className="typing-dot" style={{ 
                        width: "8px", 
                        height: "8px", 
                        borderRadius: "50%", 
                        background: "#9F7AEA",
                        animation: "typing 1.4s infinite 0.2s"
                      }} />
                      <span className="typing-dot" style={{ 
                        width: "8px", 
                        height: "8px", 
                        borderRadius: "50%", 
                        background: "#9F7AEA",
                        animation: "typing 1.4s infinite 0.4s"
                      }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input en bas */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "1.5rem",
            background: "var(--background)"
          }}>
            <div style={{
              maxWidth: "800px",
              margin: "0 auto",
              position: "relative"
            }}>
              {/* Barre d'outils au-dessus de l'input */}
              <div style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "0.75rem",
                position: "relative"
              }}>
                {/* Bouton Réflexion approfondie */}
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(159, 122, 234, 0.1)";
                    e.currentTarget.style.borderColor = "#9F7AEA";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  }}
                >
                  <LuBrain size={16} />
                  Réflexion approfondie
                </button>

                {/* Bouton + avec menu */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setShowPlusMenu(!showPlusMenu)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "36px",
                      height: "36px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "8px",
                      color: "#fff",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(159, 122, 234, 0.1)";
                      e.currentTarget.style.borderColor = "#9F7AEA";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                    }}
                  >
                    <LuPlus size={18} />
                  </button>

                  {/* Menu déroulant + */}
                  {showPlusMenu && (
                    <div style={{
                      position: "absolute",
                      bottom: "100%",
                      left: 0,
                      marginBottom: "0.5rem",
                      background: "rgba(30, 30, 35, 0.98)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "8px",
                      padding: "0.5rem",
                      minWidth: "280px",
                      zIndex: 1000,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                    }}>
                      {plusMenuItems.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setShowPlusMenu(false)}
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
              </div>

              {/* Zone d'input */}
              <div style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-end"
              }}>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Pose une question sur le chapitre..."
                  style={{
                    flex: 1,
                    padding: "1rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "0.95rem",
                    resize: "none",
                    minHeight: "52px",
                    maxHeight: "200px",
                    fontFamily: "inherit",
                    outline: "none",
                    transition: "border-color 0.2s ease"
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#9F7AEA"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
                />
                
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    background: inputValue.trim() 
                      ? "linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)" 
                      : "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "#fff",
                    cursor: inputValue.trim() ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    opacity: inputValue.trim() ? 1 : 0.5
                  }}
                  onMouseEnter={(e) => {
                    if (inputValue.trim()) {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(159, 122, 234, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <LuSend size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Barre latérale droite (optionnelle) */}
        {isSidebarOpen && (
          <div style={{
            width: "400px",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            background: "var(--background)",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{
              padding: "1rem 1.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <h3 style={{
                margin: 0,
                fontSize: "1rem",
                fontWeight: 600,
                color: "#fff"
              }}>
                Artifacts
              </h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  fontSize: "1.2rem"
                }}
              >
                ✕
              </button>
            </div>
            <div style={{
              flex: 1,
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.5)"
            }}>
              Aucun artifact pour le moment
            </div>
          </div>
        )}
      </div>

      {/* Animation CSS pour les points de typing */}
      <style jsx global>{`
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
      `}</style>
    </AppLayout>
  );
}

// Composant MessageBubble
interface MessageBubbleProps {
  message: { role: 'user' | 'assistant', content: string };
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      style={{
        display: "flex",
        gap: "1rem",
        maxWidth: "800px",
        marginLeft: isUser ? "auto" : "0",
        flexDirection: isUser ? "row-reverse" : "row"
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
          fontSize: "1.2rem"
        }}>
          🤖
        </div>
      )}

      <div style={{ flex: 1 }}>
        {/* Bulle de message */}
        <div style={{
          background: isUser 
            ? "linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)" 
            : "rgba(255,255,255,0.05)",
          padding: "1rem 1.25rem",
          borderRadius: "12px",
          color: "#fff",
          lineHeight: "1.6",
          fontSize: "0.95rem"
        }}>
          {message.content}
        </div>

        {/* Actions (hover) */}
        {showActions && !isUser && (
          <div style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "0.5rem",
            opacity: showActions ? 1 : 0,
            transition: "opacity 0.2s ease"
          }}>
            <ActionButton icon={<LuCopy size={14} />} />
            <ActionButton icon={<LuRefreshCw size={14} />} />
            <ActionButton icon={<LuThumbsUp size={14} />} />
            <ActionButton icon={<LuThumbsDown size={14} />} />
            <ActionButton icon={<LuMoreVertical size={14} />} />
          </div>
        )}
      </div>
    </div>
  );
}

// Composant ActionButton
function ActionButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button style={{
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
      e.currentTarget.style.borderColor = "#9F7AEA";
      e.currentTarget.style.color = "#fff";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
    }}
    >
      {icon}
    </button>
  );
}