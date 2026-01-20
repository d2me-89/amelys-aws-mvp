// lib/api.ts

import { StartCourseResponse, SendMessageResponse, ApiError } from '@/types/chat';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in environment variables');
}

/**
 * Démarre une nouvelle conversation de cours
 */
export async function startCourse(
  cycle: 'primaire' | 'college' | 'lycee',
  matiere: string,
  niveau: string,
  chapitre: number,
  userId: string
): Promise<StartCourseResponse> {
  const url = `${API_URL}/${cycle}/${matiere}-${niveau}/chapitre${chapitre}-cours`;
  
  console.log('[API] Starting course:', { cycle, matiere, niveau, chapitre, userId });
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || 'Failed to start course');
  }

  const data: StartCourseResponse = await response.json();
  console.log('[API] Course started:', data.conversationId);
  
  return data;
}

/**
 * Envoie un message dans une conversation existante
 */
export async function sendMessage(
  conversationId: string,
  message: string
): Promise<SendMessageResponse> {
  const url = `${API_URL}/conversation/${conversationId}/message`;
  
  console.log('[API] Sending message:', { conversationId, messageLength: message.length });
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || 'Failed to send message');
  }

  const data: SendMessageResponse = await response.json();
  console.log('[API] Message sent:', data.messageId);
  
  return data;
}

/**
 * Démarre une conversation d'exercice
 */
export async function startExercice(
  cycle: 'primaire' | 'college' | 'lycee',
  matiere: string,
  niveau: string,
  chapitre: number,
  exerciceNum: number,
  userId: string
): Promise<StartCourseResponse> {
  const url = `${API_URL}/${cycle}/${matiere}-${niveau}/chapitre${chapitre}-exercice${exerciceNum}`;
  
  console.log('[API] Starting exercice:', { cycle, matiere, niveau, chapitre, exerciceNum, userId });
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || 'Failed to start exercice');
  }

  const data: StartCourseResponse = await response.json();
  console.log('[API] Exercice started:', data.conversationId);
  
  return data;
}
