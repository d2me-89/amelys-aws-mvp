// types/chat.ts

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  conversationId: string;
  messages: Message[];
  status: 'active' | 'completed';
}

export interface StartCourseResponse {
  success: boolean;
  conversationId: string;
  message: string;
  contentInfo?: {
    niveau: string;
    matiere: string;
    chapitreTitre: string;
    themeTitre: string;
  };
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  messageId: string;
  userMessageId?: string;
  tokenUsage?: {
    cacheCreation: number;
    cacheRead: number;
    input: number;
    output: number;
  };
}

export interface ApiError {
  success: false;
  error: string;
}
