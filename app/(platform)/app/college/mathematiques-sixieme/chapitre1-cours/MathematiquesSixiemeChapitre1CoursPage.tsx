/**
 * MathematiquesSixiemeChapitre1CoursPage
 * 
 * Page de cours interactif pour le Chapitre 1 de Mathématiques 6ème.
 * Utilise le module interface-conversation pour une implémentation simplifiée.
 */

"use client";

import React from 'react';
import AppLayout from '@/app/components/sidebar/AppLayout';
import { 
  ConversationLayout, 
  ContentConfig, 
  ContentInfo 
} from '@/app/components/shared/interface-conversation';

// ============================================
// ⚙️ CONFIGURATION
// ============================================

/**
 * Configuration du contenu pour ce cours
 */
const courseConfig: ContentConfig = {
  cycle: 'college',
  matiere: 'mathematiques',
  niveau: 'sixieme',
  chapitre: 1,
  type: 'cours',
};

/**
 * Informations d'affichage du cours
 */
const courseInfo: ContentInfo = {
  titre: 'Chapitre 1 : Les nombres entiers et décimaux',
  emoji: '📐',
  description: 
    "Bienvenue dans ce cours interactif ! Amélys va t'accompagner pas à pas " +
    "pour maîtriser les nombres entiers et décimaux.",
};

// ============================================
// 📄 COMPOSANT PAGE
// ============================================

export default function MathematiquesSixiemeChapitre1CoursPage() {
  return (
    <AppLayout>
      <ConversationLayout
        config={courseConfig}
        contentInfo={courseInfo}
        headerTitle="Ch 1. Les nombres entiers et décimaux - Cours interactif"
        startButtonText="Commencer le cours"
        inputPlaceholder="Message Amélys..."
      />
    </AppLayout>
  );
}