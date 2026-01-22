/**
 * Hook useStreamText
 * 
 * Gère l'affichage progressif du texte (streaming simulé côté frontend).
 * Affiche le texte mot par mot pour une meilleure expérience utilisateur.
 */

import { useCallback, useRef } from 'react';

interface UseStreamTextOptions {
  /** Vitesse en ms entre chaque mot (défaut: 30ms) */
  speed?: number;
  /** Callback appelé à chaque mise à jour du texte */
  onUpdate: (text: string, isComplete: boolean) => void;
  /** Callback appelé quand le streaming est terminé */
  onComplete?: () => void;
}

interface UseStreamTextReturn {
  /** Démarre le streaming d'un texte */
  startStreaming: (fullText: string) => void;
  /** Arrête le streaming en cours */
  stopStreaming: () => void;
  /** Indique si un streaming est en cours */
  isStreaming: boolean;
}

export function useStreamText(options: UseStreamTextOptions): UseStreamTextReturn {
  const { speed = 30, onUpdate, onComplete } = options;
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isStreamingRef = useRef(false);

  /**
   * Arrête le streaming en cours
   */
  const stopStreaming = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isStreamingRef.current = false;
  }, []);

  /**
   * Démarre le streaming d'un texte
   */
  const startStreaming = useCallback((fullText: string) => {
    // Arrêter tout streaming précédent
    stopStreaming();
    
    const words = fullText.split(' ');
    let currentIndex = 0;
    isStreamingRef.current = true;

    intervalRef.current = setInterval(() => {
      if (currentIndex < words.length) {
        const displayText = words.slice(0, currentIndex + 1).join(' ');
        onUpdate(displayText, false);
        currentIndex++;
      } else {
        // Streaming terminé
        onUpdate(fullText, true);
        stopStreaming();
        onComplete?.();
      }
    }, speed);
  }, [speed, onUpdate, onComplete, stopStreaming]);

  return {
    startStreaming,
    stopStreaming,
    isStreaming: isStreamingRef.current,
  };
}

export default useStreamText;
