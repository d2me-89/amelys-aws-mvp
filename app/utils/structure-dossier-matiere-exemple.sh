# Créer la structure de dossiers pour les 13 chapitres de Mathématiques Sixième

# Nombre d'exercices par chapitre
exercices=(39 26 12 15 12 12 12 21 8 7 10 12 10)

# Créer tous les dossiers
for chapitre in {1..13}; do
  mkdir -p chapitre${chapitre}-{cours,binome,controle,session-libre}
  for exercice in $(seq 1 ${exercices[$chapitre-1]}); do
    mkdir -p chapitre${chapitre}-exercice${exercice}
  done
done

echo "✅ 248 dossiers créés avec succès !"


