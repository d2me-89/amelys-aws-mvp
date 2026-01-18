"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
  LuCopy,
  LuThumbsUp,
  LuThumbsDown,
  LuEllipsis,
  LuBot
} from "react-icons/lu";

export default function MathematiquesSixiemeChapitre1CoursPage() {
  const [messages, setMessages] = useState<Array<{
    id: number, 
    role: 'user' | 'assistant', 
    content: string,
    isLatestAssistant?: boolean // Pour suivre le dernier message assistant
  }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  const headerMenuRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);

  // Scroll vers le dernier message utilisateur quand il est ajouté
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

  // Fermer le menu header quand on clique à l'extérieur
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

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    const messageId = Date.now();
    setInputValue("");
    
    // Retirer le flag isLatestAssistant des anciens messages
    setMessages(prev => prev.map(msg => ({
      ...msg,
      isLatestAssistant: false
    })));
    
    // Ajouter le message utilisateur
    setMessages(prev => [...prev, { 
      id: messageId, 
      role: 'user', 
      content: userMessage
    }]);
    
    // Simuler une réponse de l'assistant
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now(),
        role: 'assistant', 
        content: "Je suis Amélys, ton assistant d'apprentissage en mathématiques. Comment puis-je t'aider avec ce chapitre sur les nombres entiers et décimaux ?",
        isLatestAssistant: true // Le dernier message assistant aura le minHeight
      }]);
    }, 1500);
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
        {/* Zone principale de conversation */}
        <div style={{ 
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}>
          {/* Header fixe */}
          <header style={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            background: "var(--background)",
            flexShrink: 0
          }}>
            {/* Gauche : Titre + Menu déroulant */}
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

              {/* Menu déroulant header */}
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

          {          /* Zone de messages avec scroll */}
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
                {/* Messages dans l'ordre chronologique */}
                {messages.map((msg, index) => {
                  const isLastUserMessage = msg.role === 'user' && 
                    index === messages.findLastIndex(m => m.role === 'user');
                  
                  return (
                    <MessageBubble 
                      key={msg.id} 
                      message={msg}
                      ref={isLastUserMessage ? lastUserMessageRef : undefined}
                      isLatestAssistant={msg.isLatestAssistant}
                    />
                  );
                })}
                
                {/* Indicateur de frappe avec minHeight */}
                {isTyping && (
                  <div style={{
                    display: "flex",
                    gap: "1rem",
                    maxWidth: "800px",
                    minHeight: "calc(100vh - 250px)",
                    alignItems: "flex-start" // Aligner en haut
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
                      color: "#fff"
                    }}>
                      <LuBot size={20} />
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
              </>
            )}
            </div>
          </div>

          {/* Input en bas */}
          <div style={{
            padding: "0.125rem 1.5rem",
            background: "var(--background)",
            flexShrink: 0
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
                marginBottom: "1.25rem",
                position: "relative"
              }}>
                <ToolButton icon={<LuBrain size={18} />} tooltip="Réflexion approfondie" />
                <ToolButton icon={<LuPaperclip size={18} />} tooltip="Ajouter fichiers" />
                <ToolButton icon={<LuCamera size={18} />} tooltip="Ajouter photos" />
                <ToolButton icon={<LuFolderPlus size={18} />} tooltip="Ajouter au Projet" />
                <ToolButton icon={<LuSearch size={18} />} tooltip="Recherche" />
                <ToolButton icon={<LuGlobe size={18} />} tooltip="Recherche Web" />
                <ToolButton icon={<LuPenTool size={18} />} tooltip="Utiliser style" />
                <ToolButton icon={<LuPlug size={18} />} tooltip="Ajouter connecteurs" />
              </div>

              {/* Zone de saisie */}
              <div style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-end",
                background: "rgba(255,255,255,0.05)",
                border: isInputFocused 
                  ? "1px solid #9F7AEA"
                  : "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                padding: "0.75rem 0.75rem",
                boxShadow: isInputFocused 
                  ? "0 0 0 3px rgba(159, 122, 234, 0.2)"
                  : "none",
                transition: "all 0.2s ease"
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
                  disabled={!inputValue.trim()}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
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
                    flexShrink: 0,
                    opacity: inputValue.trim() ? 1 : 0.5
                  }}
                >
                  <LuSend size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation typing dots */}
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
      `}</style>
    </AppLayout>
  );
}

// Composant MessageBubble
interface MessageBubbleProps {
  message: { 
    id: number, 
    role: 'user' | 'assistant', 
    content: string,
    isLatestAssistant?: boolean 
  };
  isLatestAssistant?: boolean;
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
          // TECHNIQUE CLÉ : minHeight sur le dernier message ASSISTANT
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

        <div style={{ flex: 1, position: "relative" }}>
          {/* Bulle de message */}
          <div style={{
            background: isUser 
              ? "#2f2f2f"
              : "rgba(255,255,255,0.05)",
            padding: "1rem 1.25rem",
            borderRadius: "12px",
            color: "#fff",
            lineHeight: "1.6",
            fontSize: "1.125rem"
          }}>
            {message.content}
          </div>

          {/* Actions (hover) */}
          {!isUser && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "0.5rem",
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

// Composant ActionButton
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

// Composant ToolButton avec tooltip
function ToolButton({ icon, tooltip }: { icon: React.ReactNode; tooltip: string }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(159, 122, 234, 0.1)";
          e.currentTarget.style.borderColor = "#9F7AEA";
          setShowTooltip(true);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          setShowTooltip(false);
        }}
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
      >
        {icon}
      </button>
      
      {/* Tooltip */}
      <div style={{
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: "0.5rem",
        padding: "0.5rem 0.75rem",
        background: "rgba(30, 30, 35, 0.98)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "6px",
        color: "#fff",
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        opacity: showTooltip ? 1 : 0,
        pointerEvents: "none",
        transition: "opacity 0.2s ease",
        zIndex: 1001
      }}>
        {tooltip}
      </div>
    </div>
  );
}