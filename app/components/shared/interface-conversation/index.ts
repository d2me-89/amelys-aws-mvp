/**
 * Module interface-conversation
 * 
 * Ce module fournit tous les composants et hooks nécessaires
 * pour créer une interface de conversation avec Amélys.
 * 
 * @example
 * ```tsx
 * import { ConversationLayout, ContentConfig, ContentInfo } from '@/app/components/interface-conversation';
 * 
 * const config: ContentConfig = {
 *   cycle: 'college',
 *   matiere: 'mathematiques',
 *   niveau: 'sixieme',
 *   chapitre: 1,
 *   type: 'cours',
 * };
 * 
 * const contentInfo: ContentInfo = {
 *   titre: 'Chapitre 1 : Les nombres entiers et décimaux',
 *   emoji: '📐',
 *   description: 'Bienvenue dans ce cours interactif !',
 * };
 * 
 * export default function Page() {
 *   return (
 *     <AppLayout>
 *       <ConversationLayout
 *         config={config}
 *         contentInfo={contentInfo}
 *         headerTitle="Ch 1. Les nombres entiers et décimaux - Cours interactif"
 *       />
 *     </AppLayout>
 *   );
 * }
 * ```
 */

// ============================================
// 📦 TYPES
// ============================================
export type {
  Message,
  ContentConfig,
  ContentInfo,
  ContentInfoFromAPI,
  StartConversationResponse,
  SendMessageResponse,
  GetConversationResponse,
  ConversationState,
  ConversationActions,
  UseConversationReturn,
  ConversationHeaderProps,
  HeaderMenuItem,
  StartScreenProps,
  ChatInputProps,
  MessageBubbleProps,
  MessageActionsProps,
  ConversationLayoutProps,
} from './types';

// ============================================
// 🔗 API
// ============================================
export {
  buildContentPath,
  buildStorageKey,
  startConversation,
  sendMessage,
  getConversation,
  saveConversationId,
  getStoredConversationId,
  removeStoredConversationId,
  saveUserId,
  getStoredUserId,
  generateTempUserId,
} from './api';

// ============================================
// 🪝 HOOKS
// ============================================
export {
  useConversation,
  useStreamText,
  useClickOutside,
} from './hooks';

// ============================================
// 🎨 COMPOSANTS
// ============================================
export {
  ConversationLayout,
  ConversationHeader,
  MessageList,
  MessageBubble,
  MessageActions,
  ChatInput,
  StartScreen,
  TypingIndicator,
  LoadingIndicator,
} from './components';

// ============================================
// 🎨 STYLES
// ============================================
export {
  conversationAnimations,
  COLORS,
  BORDERS,
  SPACING,
  FONT_SIZES,
  SHADOWS,
  TRANSITIONS,
} from './styles/animations';
