# 🚀 Installation de la Sidebar rétractable

## 📁 Structure des fichiers à créer

```
app/
├── components/
│   ├── Sidebar.tsx              ← Composant Sidebar
│   ├── SidebarContext.tsx       ← Context pour l'état
│   └── AppLayout.tsx            ← Layout principal
│
└── (platform)/
    └── app/
        └── page.tsx             ← Utilise AppLayout
```

---

## 📝 Étapes d'installation

### 1. Créer le dossier `components`

```bash
mkdir -p app/components
```

### 2. Créer `SidebarContext.tsx`

Place le fichier `SidebarContext.tsx` dans `app/components/`

### 3. Créer `Sidebar.tsx`

Place le fichier `Sidebar-improved.tsx` dans `app/components/Sidebar.tsx`

### 4. Créer `AppLayout.tsx`

Place le fichier `AppLayout-improved.tsx` dans `app/components/AppLayout.tsx`

### 5. Modifier `AppHomePage.tsx`

```tsx
import Link from "next/link";
import AppLayout from "../../components/AppLayout";

export default function AppHome() {
  return (
    <AppLayout>
      <div style={{ 
        padding: "2rem", 
        fontFamily: "sans-serif",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <h1>Amélys — Plateforme d'enseignement du droit</h1>
        
        <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
          Apprends le droit de façon interactive avec une IA juridique dédiée.
        </p>

        <hr style={{ margin: "2rem 0", opacity: 0.3 }} />

        <h2>Matières disponibles</h2>

        <div style={{
          display: "grid",
          gap: "1rem",
          marginTop: "1rem"
        }}>
          <Link 
            href="/app/matieres/introduction-au-droit"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              padding: "1.5rem",
              textDecoration: "none",
              color: "inherit",
              display: "block"
            }}
          >
            <h3 style={{ marginTop: 0 }}>📚 Introduction au droit</h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              5 parties • 25 modules • 550 activités
            </p>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
```

---

## ✅ Ce que tu obtiens

### Fonctionnalités :

✅ Sidebar rétractable avec bouton ☰
✅ Transition fluide (0.3s)
✅ Navigation complète (toutes les sections)
✅ Style moderne (gradient, hover effects)
✅ Responsive (overlay sur mobile)
✅ Footer avec Profil et Paramètres
✅ État partagé via Context (pas de re-render inutile)

### Comportement :

1. **Ouverture par défaut** : La sidebar est ouverte
2. **Clic sur ×** : Ferme la sidebar
3. **Clic sur ☰** : Ouvre la sidebar
4. **Hover sur lien** : Effet de couleur et translation
5. **Sur mobile** : Overlay sombre cliquable pour fermer

---

## 🎨 Personnalisation

### Changer les couleurs

Dans `Sidebar-improved.tsx`, modifie :

```tsx
// Couleur de fond
background: "linear-gradient(180deg, rgba(20,20,35,0.98) 0%, rgba(15,15,25,0.98) 100%)"

// Couleur du titre
background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"

// Couleur hover
background: "rgba(102, 126, 234, 0.15)"
```

### Changer la largeur

Dans `Sidebar-improved.tsx` et `AppLayout-improved.tsx`, change `240px` par ta valeur.

### Ajouter des liens

Dans `Sidebar-improved.tsx`, ajoute :

```tsx
<SidebarLink href="/ton-lien" icon="🔥" label="Nouveau lien" />
```

---

## 🐛 Problèmes courants

### Problème 1 : "useSidebar must be used within SidebarProvider"

**Solution** : Assure-toi que `AppLayout` enveloppe bien ton contenu avec `SidebarProvider`.

### Problème 2 : La sidebar ne s'affiche pas

**Solution** : Vérifie les imports et que `"use client"` est présent en haut des fichiers.

### Problème 3 : Erreur TypeScript

**Solution** : Ajoute les types React :

```bash
npm install --save-dev @types/react
```

---

## 📱 Responsive

La sidebar est responsive :

- **Desktop (>768px)** : Sidebar fixe, pas d'overlay
- **Mobile (<768px)** : Sidebar par-dessus le contenu avec overlay

Pour ajuster le breakpoint, modifie dans `Sidebar-improved.tsx` :

```tsx
display: window.innerWidth < 768 ? "block" : "none"
```

---

## 🚀 Prochaines étapes

1. ✅ Installer les fichiers
2. ✅ Tester l'ouverture/fermeture
3. 🔜 Ajouter l'authentification (Cognito)
4. 🔜 Ajouter la photo de profil
5. 🔜 Synchroniser l'état avec localStorage (persister l'état ouvert/fermé)

---

## 💡 Amélioration future : Persister l'état

Pour sauvegarder si la sidebar est ouverte/fermée :

```tsx
// Dans SidebarContext.tsx
const [isOpen, setIsOpen] = useState(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('sidebar-open');
    return saved !== null ? saved === 'true' : true;
  }
  return true;
});

useEffect(() => {
  localStorage.setItem('sidebar-open', String(isOpen));
}, [isOpen]);
```
