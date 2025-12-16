# Business United

Site web professionnel pour Business United - Cabinet de conseil en affaires accompagnant les entrepreneurs à Caen et en Normandie.

## 🚀 Stack Technique

### Framework & Runtime
- **Next.js 15.1.6** - Framework React avec App Router
- **React 19.2.0** - Bibliothèque UI moderne
- **TypeScript 5** - Typage statique pour la robustesse du code
- **Node.js** - Runtime JavaScript

### Styling & UI
- **Tailwind CSS 4.1.16** - Framework CSS utility-first
- **PostCSS 8.5.6** - Traitement CSS avancé
- **Autoprefixer** - Compatibilité navigateurs
- **Lucide React** - Bibliothèque d'icônes SVG

### Intégrations
- **Calendly** - Widget de réservation de rendez-vous inline
- **Axios** - Client HTTP pour les appels API

## 📁 Architecture du Projet

```
business-united/
├── src/
│   ├── app/                    # App Router Next.js
│   │   ├── layout.tsx         # Layout principal avec metadata
│   │   ├── page.tsx           # Page d'accueil principale
│   │   ├── globals.css        # Styles globaux et animations
│   │   └── professionnels/    # Page professionnels
│   ├── components/            # Composants React réutilisables
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   └── TestimonialsSection.tsx
│   ├── contexts/              # Contextes React
│   │   ├── FavoritesContext.tsx
│   │   └── LanguageContext.tsx
│   ├── hooks/                 # Hooks personnalisés
│   │   └── useTranslation.ts
│   ├── lib/                   # Utilitaires et configurations
│   │   ├── i18n.ts
│   │   ├── languageDetector.ts
│   │   └── statusUtils.ts
│   ├── services/              # Services API
│   │   └── api.ts
│   ├── types/                 # Définitions TypeScript
│   │   ├── annonces.ts
│   │   ├── campaign.ts
│   │   └── influencer.ts
│   └── utils/                 # Fonctions utilitaires
│       └── conversations.ts
├── public/                    # Assets statiques
├── tailwind.config.js         # Configuration Tailwind
├── tsconfig.json              # Configuration TypeScript
└── package.json               # Dépendances du projet
```

## 🛠️ Installation & Développement

### Prérequis
- Node.js 20+ 
- npm, yarn, pnpm ou bun

### Installation des dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### Démarrage du serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

### Build de production

```bash
npm run build
npm run start
```

## 🎨 Fonctionnalités Techniques

### Animations & Interactions
- **ScrollReveal** - Composant personnalisé pour animations au scroll avec Intersection Observer
- **AnimatedCounter** - Animation d'incrémentation des statistiques au scroll
- **Animations CSS** - Keyframes personnalisés pour effets visuels (shimmer, float, pulse)
- **Micro-interactions** - Transitions fluides avec courbes de Bézier personnalisées

### Performance
- **Optimisation des images** - Next.js Image avec lazy loading
- **Code splitting** - Automatique via App Router
- **Font optimization** - Next.js font optimization pour Geist

### Responsive Design
- **Mobile-first** - Approche mobile-first avec breakpoints Tailwind
- **Grid adaptatif** - Système de grille responsive pour toutes les sections
- **Typography fluide** - Tailles de texte adaptatives selon la taille d'écran

### Intégrations Externes
- **Calendly Widget** - Intégration inline avec gestion du scroll et styles personnalisés
- **Scripts externes** - Chargement asynchrone des scripts tiers

## 🎯 Sections Principales

1. **Hero Section** - Présentation de Business United avec CTA
2. **Statistiques** - Compteurs animés avec incrémentation au scroll
3. **Services** - Grille de services avec animations
4. **Process de lancement** - Timeline horizontale avec effets de profondeur
5. **Témoignages** - Carrousel de témoignages clients
6. **Contact** - Widget Calendly intégré

## 🔧 Configuration

### TypeScript
Configuration stricte avec `tsconfig.json` pour la sécurité des types.

### Tailwind CSS
Configuration avec PostCSS et Autoprefixer pour la compatibilité navigateurs.

### ESLint
Configuration Next.js pour le linting du code.

## 📦 Déploiement

### Vercel (Recommandé)
Le projet est optimisé pour le déploiement sur Vercel :

```bash
vercel deploy
```

### Variables d'environnement
Aucune variable d'environnement requise pour le moment.

## 🚀 Scripts Disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Build de production
- `npm run start` - Démarre le serveur de production
- `npm run lint` - Exécute ESLint

## 📝 Notes Techniques

- **App Router** - Utilisation du nouveau système de routing de Next.js 15
- **Server Components** - Par défaut, composants serveur pour meilleures performances
- **Client Components** - Marqué avec `'use client'` pour l'interactivité
- **CSS Modules** - Styles globaux avec Tailwind CSS
- **Type Safety** - TypeScript strict pour éviter les erreurs à l'exécution

## 🔗 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
