/**
 * Types pour l'interface de conversation Amélys
 * 
 * Ce fichier centralise tous les types utilisés dans le module conversation.
 */

// ============================================
// 📝 TYPES DE BASE
// ============================================

/**
 * Représente un message dans la conversation
 */
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isLatestAssistant?: boolean;
  isStreaming?: boolean;
}

/**
 * Configuration d'un contenu pédagogique (cours, exercice, etc.)
 */
export interface ContentConfig {
  cycle: 'primaire' | 'college' | 'lycee';
  matiere: string;
  niveau: string;
  chapitre: number;
  type: 'cours' | 'exercice' | 'binome' | 'controle' | 'session-libre';
  exerciceId?: number;
}

/**
 * Métadonnées d'un contenu pour l'affichage
 */
export interface ContentInfo {
  titre: string;
  sousTitre?: string;
  emoji: string;
  description?: string;
}

/**
 * Informations retournées par l'API sur le contenu
 */
export interface ContentInfoFromAPI {
  niveau: string;
  matiere: string;
  chapitreTitre: string;
  themeTitre: string;
}

// ============================================
// 🔗 TYPES API
// ============================================

/**
 * Réponse de l'API lors du démarrage d'une conversation
 */
export interface StartConversationResponse {
  success: boolean;
  conversationId: string;
  message: string;
  isExisting: boolean;
  messageCount?: number;
  contentInfo: ContentInfoFromAPI;
}

/**
 * Réponse de l'API lors de l'envoi d'un message
 */
export interface SendMessageResponse {
  success: boolean;
  message: string;
  messageId: string;
  userMessageId: string;
  tokenUsage?: {
    cacheCreation: number;
    cacheRead: number;
    input: number;
    output: number;
  };
}

/**
 * Réponse de l'API lors de la récupération d'une conversation
 */
export interface GetConversationResponse {
  success: boolean;
  conversation: {
    conversationId: string;
    userId: string;
    type: string;
    status: string;
    messages: Array<{
      id: string;
      role: 'user' | 'assistant';
      content: string;
      timestamp: string;
    }>;
    messageCount: number;
    createdAt: string;
    updatedAt: string;
  };
}

// ============================================
// 🎛️ TYPES POUR LES HOOKS
// ============================================

/**
 * État de la conversation géré par useConversation
 */
export interface ConversationState {
  conversationId: string | null;
  messages: Message[];
  isLoading: boolean;
  isLoadingConversation: boolean;
  error: string | null;
  streamingMessageId: string | null;
}

/**
 * Actions disponibles via useConversation
 */
export interface ConversationActions {
  startConversation: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  resetConversation: () => void;
  clearError: () => void;
}

/**
 * Retour du hook useConversation
 */
export interface UseConversationReturn extends ConversationState, ConversationActions {}

// ============================================
// 🎨 TYPES POUR LES COMPOSANTS
// ============================================

/**
 * Props pour le header de conversation
 */
export interface ConversationHeaderProps {
  title: string;
  onReset?: () => void;
}

/**
 * Item du menu header
 */
export interface HeaderMenuItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

/**
 * Props pour l'écran de démarrage
 */
export interface StartScreenProps {
  contentInfo: ContentInfo;
  isLoading: boolean;
  error: string | null;
  onStart: () => void;
}

/**
 * Props pour la zone de saisie
 */
export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  error?: string | null;
}

/**
 * Props pour une bulle de message
 */
export interface MessageBubbleProps {
  message: Message;
}

/**
 * Props pour les actions sur un message
 */
export interface MessageActionsProps {
  message: Message;
  visible: boolean;
  onCopy: () => void;
  onRegenerate?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
}

/**
 * Props pour le layout principal de conversation
 */
export interface ConversationLayoutProps {
  config: ContentConfig;
  contentInfo: ContentInfo;
  children?: React.ReactNode;
}
