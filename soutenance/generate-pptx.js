const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();

// ── Theme constants ──
const C = {
  bg:        "1A2A4A",
  bgAlt:     "1E3460",
  accent:    "F97316",
  accentLt:  "FDBA74",
  white:     "FFFFFF",
  light:     "F1F5F9",
  gray:      "94A3B8",
  dark:      "0F172A",
  green:     "22C55E",
  red:       "EF4444",
  cardBg:    "F8FAFC",
};

const FONT = "Calibri";

// ── Helpers ──

function addSlide(title, contentItems, opts = {}) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };

  // Left accent bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 0.15, h: "100%", fill: { color: C.accent },
  });

  // Top bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: "100%", h: 0.06, fill: { color: C.accent },
  });

  // Bottom bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.1, w: "100%", h: 0.4, fill: { color: C.bg },
  });

  // Slide number
  slide.addText(opts.num ? String(opts.num) : "", {
    x: 8.8, y: 7.15, w: 1, h: 0.3, fontSize: 9, color: C.gray, align: "right", fontFace: FONT,
  });

  // Title
  slide.addText(title, {
    x: 0.5, y: 0.25, w: 8.5, h: 0.65, fontSize: 22, color: C.bg, bold: true, fontFace: FONT,
  });

  // Thin separator under title
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 0.9, w: 2.5, h: 0.04, fill: { color: C.accent },
  });

  const startY = opts.startY || 1.2;

  if (typeof contentItems === "string") {
    // Single text block
    slide.addText(contentItems, {
      x: 0.6, y: startY, w: 8.3, h: 5.2, fontSize: 14, color: C.dark, fontFace: FONT, valign: "top", lineSpacingMultiple: 1.4,
    });
  } else if (Array.isArray(contentItems)) {
    // Render items – could be text, shapes, or code blocks
    let curY = startY;
    contentItems.forEach((item) => {
      if (typeof item === "string") {
        slide.addText(item, {
          x: 0.6, y: curY, w: 8.3, h: 0.35, fontSize: 13, color: C.dark, fontFace: FONT, bold: item.startsWith("•") || item.startsWith("1.") || item.startsWith("2.") || item.startsWith("3.") || item.startsWith("4.") || item.startsWith("5.") || item.startsWith("6.") || item.startsWith("7.") || item.startsWith("8."),
        });
        curY += 0.35;
      } else if (item.type === "code") {
        // Code block background
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.6, y: curY, w: 8.3, h: item.h || 0.4, fill: { color: "1E293B" }, rectRadius: 0.08,
        });
        slide.addText(item.text, {
          x: 0.75, y: curY + 0.05, w: 8, h: item.h || 0.3, fontSize: 11, color: C.accentLt, fontFace: "Consolas", valign: "top",
        });
        curY += (item.h || 0.4) + 0.08;
      } else if (item.type === "spacer") {
        curY += item.h || 0.15;
      } else if (item.type === "card") {
        // Card with left border
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.6, y: curY, w: 8.3, h: item.h || 0.6, fill: { color: C.cardBg }, rectRadius: 0.06, line: { color: C.gray, width: 0.5 },
        });
        slide.addShape(pptx.ShapeType.rect, {
          x: 0.6, y: curY + 0.05, w: 0.06, h: (item.h || 0.6) - 0.1, fill: { color: item.accent || C.accent },
        });
        slide.addText(item.text, {
          x: 0.85, y: curY + 0.05, w: 7.8, h: (item.h || 0.6) - 0.1, fontSize: 12, color: C.dark, fontFace: FONT, valign: "top",
        });
        curY += (item.h || 0.6) + 0.1;
      } else if (item.type === "schema") {
        // Schema card
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.6, y: curY, w: 8.3, h: item.h || 2.5, fill: { color: C.cardBg }, rectRadius: 0.06, line: { color: C.gray, width: 0.5 },
        });
        slide.addText(item.text, {
          x: 0.75, y: curY + 0.1, w: 8, h: (item.h || 2.5) - 0.2, fontSize: 9.5, color: C.dark, fontFace: "Consolas", valign: "top",
        });
        curY += (item.h || 2.5) + 0.1;
      }
    });
  }

  return slide;
}

function addTitleSlide(title, subtitle, extra) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };

  // Decorative shapes
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 0.12, h: "100%", fill: { color: C.accent },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 4.8, w: "100%", h: 0.006, fill: { color: C.accent },
  });

  // Title
  slide.addText(title, {
    x: 0.8, y: 1.5, w: 8, h: 1.2, fontSize: 36, color: C.white, bold: true, fontFace: FONT,
  });

  // Subtitle
  slide.addText(subtitle, {
    x: 0.8, y: 2.7, w: 8, h: 0.6, fontSize: 18, color: C.accentLt, fontFace: FONT,
  });

  // Separator
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 3.5, w: 2, h: 0.04, fill: { color: C.accent },
  });

  // Extra info
  slide.addText(extra || "", {
    x: 0.8, y: 3.9, w: 8, h: 1.5, fontSize: 13, color: C.gray, fontFace: FONT, lineSpacingMultiple: 1.5,
  });
}

// ════════════════════════════════════════════
//  SLIDE 1 — Title
// ════════════════════════════════════════════
addTitleSlide(
  "SportBook",
  "Application de réservation de séances sportives",
  "Walid El Mnaouri\nTitre Professionnel DWWM — RNCP 37674\nMolenGeek — Juillet 2026"
);

// ════════════════════════════════════════════
//  SLIDE 2 — Présentation personnelle
// ════════════════════════════════════════════
addSlide("Qui suis-je ?", [
  { type: "spacer", h: 0.1 },
  "• Walid El Mnaouri",
  "• Parcours : [à compléter]",
  "• Formation Développeur Web et Web Mobile — MolenGeek (6 mois)",
  "• Objectif : Devenir développeur web full-stack",
  { type: "spacer", h: 0.3 },
  { type: "card", text: "Compétences clés : HTML / CSS / JavaScript / Node.js / Express / MySQL / Git", h: 0.5 },
], { num: 2 });

// ════════════════════════════════════════════
//  SLIDE 3 — Contexte formation
// ════════════════════════════════════════════
addSlide("Contexte de la formation", [
  { type: "spacer", h: 0.1 },
  "• Titre Professionnel Développeur Web et Web Mobile — RNCP 37674",
  "• Organisme : MolenGeek (Bruxelles)",
  "• Durée : 6 mois — Temps plein",
  { type: "spacer", h: 0.2 },
  "Compétences visées par le référentiel :",
  { type: "card", text: "CC1 — Développer la partie front-end d'une application web", h: 0.4 },
  { type: "card", text: "CC2 — Développer la partie back-end d'une application web", h: 0.4 },
  { type: "card", text: "CC3 — Concevoir une base de données et assurer sa sécurité", h: 0.4 },
], { num: 3 });

// ════════════════════════════════════════════
//  SLIDE 4 — Présentation du projet
// ════════════════════════════════════════════
addSlide("SportBook — Le projet", [
  { type: "spacer", h: 0.1 },
  { type: "card", text: "Quoi ?  Application web de réservation de séances sportives", h: 0.5, accent: C.accent },
  { type: "card", text: "Pour qui ?  Associations sportives, salles de sport, pratiquants", h: 0.5, accent: C.accent },
  { type: "card", text: "Stack :  HTML / CSS / JS vanilla — Node.js / Express — MySQL", h: 0.5, accent: C.accent },
  { type: "card", text: "Type :  SPA (Single Page Application) full-stack", h: 0.5, accent: C.accent },
  { type: "spacer", h: 0.2 },
  "Une plateforme centralisée pour découvrir, réserver et gérer des séances sportives.",
], { num: 4 });

// ════════════════════════════════════════════
//  SLIDE 5 — Problématique
// ════════════════════════════════════════════
addSlide("Problème identifié", [
  { type: "spacer", h: 0.1 },
  "Situation initiale :",
  { type: "card", text: "❌  Offre sportive dispersée (WhatsApp, téléphone, bouche-à-oreille)", h: 0.4, accent: C.red },
  { type: "card", text: "❌  Pas de visibilité en temps réel sur les places disponibles", h: 0.4, accent: C.red },
  { type: "card", text: "❌  Pas de système centralisé de réservation en ligne", h: 0.4, accent: C.red },
  { type: "card", text: "❌  Gestion manuelle pour les organisateurs", h: 0.4, accent: C.red },
  { type: "spacer", h: 0.2 },
  "Avec SportBook :",
  { type: "card", text: "✅  Tout est centralisé en un clic — réservation et annulation autonomes", h: 0.4, accent: C.green },
], { num: 5 });

// ════════════════════════════════════════════
//  SLIDE 6 — Objectifs
// ════════════════════════════════════════════
addSlide("Objectifs du projet", [
  { type: "spacer", h: 0.1 },
  "Objectifs fonctionnels :",
  { type: "card", text: "✓  Inscription et connexion sécurisée des utilisateurs", h: 0.35, accent: C.accent },
  { type: "card", text: "✓  Catalogue de séances sportives avec filtres (sport, date, recherche)", h: 0.35, accent: C.accent },
  { type: "card", text: "✓  Réservation et annulation de séances", h: 0.35, accent: C.accent },
  { type: "card", text: "✓  Espace d'administration complet (CRUD séances, utilisateurs, annonces)", h: 0.35, accent: C.accent },
  { type: "spacer", h: 0.2 },
  "Objectifs techniques :",
  { type: "card", text: "✓  Application full-stack fonctionnelle (Node.js / Express / MySQL)", h: 0.35, accent: C.green },
  { type: "card", text: "✓  Code sécurisé (JWT, bcrypt, validation, Helmet, rate-limit)", h: 0.35, accent: C.green },
  { type: "card", text: "✓  Interface responsive (mobile, tablette, desktop)", h: 0.35, accent: C.green },
  { type: "card", text: "✓  Tests automatisés (Jest, Supertest, Cypress)", h: 0.35, accent: C.green },
], { num: 6 });

// ════════════════════════════════════════════
//  SLIDE 7 — Public cible
// ════════════════════════════════════════════
addSlide("Public cible", [
  { type: "spacer", h: 0.1 },
  { type: "card", text: "👤  Utilisateurs finaux — Pratiquants de sport (tout âge, tout niveau)", h: 0.6, accent: C.accent },
  { type: "card", text: "👤  Personnes cherchant une activité sportive près de chez elles", h: 0.5, accent: C.accent },
  { type: "spacer", h: 0.3 },
  { type: "card", text: "👑  Administrateurs — Gérants de salles de sport, associations, coachs", h: 0.6, accent: C.bg },
  { type: "card", text: "👑  Personnes ayant besoin de gérer l'offre sportive et les réservations", h: 0.5, accent: C.bg },
], { num: 7 });

// ════════════════════════════════════════════
//  SLIDE 8 — Fonctionnalités
// ════════════════════════════════════════════
addSlide("Fonctionnalités principales", [
  { type: "spacer", h: 0.1 },
  "Utilisateur :",
  { type: "card", text: "🔐  Inscription / Connexion sécurisée — Profil utilisateur", h: 0.35, accent: C.accent },
  { type: "card", text: "📋  Consultation des séances avec filtres (sport, date, recherche texte)", h: 0.35, accent: C.accent },
  { type: "card", text: "✅  Réservation et annulation de séances", h: 0.35, accent: C.accent },
  { type: "card", text: "📰  Consultation des annonces", h: 0.35, accent: C.accent },
  { type: "spacer", h: 0.15 },
  "Administrateur :",
  { type: "card", text: "⚙️  CRUD complet des séances sportives", h: 0.35, accent: C.bg },
  { type: "card", text: "👥  Gestion des utilisateurs et des rôles (user/admin)", h: 0.35, accent: C.bg },
  { type: "card", text: "📢  CRUD des annonces", h: 0.35, accent: C.bg },
], { num: 8 });

// ════════════════════════════════════════════
//  SLIDE 9 — Parcours utilisateur
// ════════════════════════════════════════════
addSlide("Parcours utilisateur", [
  { type: "spacer", h: 0.05 },
  { type: "schema", text: `
  Accueil
     │
     ▼
  Inscription ────► Connexion
     │
     ▼
  Page des séances ──► Filtres (sport, date, recherche)
     │
     ▼
  Réserver une séance
     │
     ▼
  Mes réservations ──► Annulation (si besoin)
     │
     ▼
  Profil (modification)
  `, h: 3.8 },
], { num: 9 });

// ════════════════════════════════════════════
//  SLIDE 10 — Parcours admin
// ════════════════════════════════════════════
addSlide("Parcours administrateur", [
  { type: "spacer", h: 0.05 },
  { type: "schema", text: `
  Connexion admin
       │
       ▼
  Dashboard admin
       │
   ┌───┼───────────┐
   ▼   ▼           ▼
Séances Utilisateurs Annonces
   │     │           │
   ▼     ▼           ▼
CRUD  Gérer rôles  CRUD
complet             complet
  `, h: 3.5 },
  { type: "spacer", h: 0.1 },
  "Protection des routes : middleware JWT + middleware admin (double vérification)",
], { num: 10 });

// ════════════════════════════════════════════
//  SLIDE 11 — Maquettes Figma
// ════════════════════════════════════════════
addSlide("Conception — Maquettes Figma", [
  { type: "spacer", h: 0.1 },
  "• Conception de l'interface avant le développement",
  "• Création des maquettes desktop et mobile",
  "• Définition du parcours utilisateur visuel",
  "• Validation du design avant intégration",
  { type: "spacer", h: 0.2 },
  "Avantages de cette approche :",
  { type: "card", text: "✓  Cohérence visuelle assurée dès le départ", h: 0.35, accent: C.green },
  { type: "card", text: "✓  Gain de temps — évite les allers-retours correctifs", h: 0.35, accent: C.green },
  { type: "card", text: "✓  Vision claire du résultat final partagée avec le formateur", h: 0.35, accent: C.green },
], { num: 11 });

// ════════════════════════════════════════════
//  SLIDE 12 — Charte graphique
// ════════════════════════════════════════════
addSlide("Charte graphique / UI", [
  { type: "spacer", h: 0.05 },
  "Couleurs :",
  { type: "card", text: "🔵  Primaire : Bleu foncé #1A2A4A — Secondaire : Bleu nuit #0F172A", h: 0.35, accent: C.bg },
  { type: "card", text: "🟠  Accent : Orange #F97316 (boutons CTA, badges, survols)", h: 0.35, accent: C.accent },
  { type: "card", text: "⚪  Neutres : Blanc #FFFFFF — Gris clair #F8FAFC — Texte #1F2937", h: 0.35, accent: C.gray },
  { type: "spacer", h: 0.1 },
  "Composants UI :",
  "• Cartes avec ombres, badges de statut, toasts de notification",
  "• Skeleton loading (shimmer) pendant chargement",
  "• Design responsive (mobile < 640px, tablette < 1024px, desktop)",
  { type: "spacer", h: 0.1 },
  "Technique : Variables CSS (custom properties), Flexbox, Grid, media queries",
], { num: 12 });

// ════════════════════════════════════════════
//  SLIDE 13 — Architecture globale
// ════════════════════════════════════════════
addSlide("Architecture globale", [
  { type: "spacer", h: 0.05 },
  { type: "schema", text: `
  ┌──────────────────────────────────────┐
  │          NAVIGATEUR                   │
  │  Frontend SPA (HTML / CSS / JS)      │
  │  Port 5501 — Live Server             │
  └──────────────┬───────────────────────┘
                 │ API REST (HTTP / JSON)
                 │ Authorization: Bearer JWT
  ┌──────────────┴───────────────────────┐
  │          BACKEND Node.js             │
  │  Express — Routes / Middlewares /    │
  │  Contrôleurs                         │
  │  Port 3000                           │
  └──────────────┬───────────────────────┘
                 │ mysql2/promise
                 │ Pool de connexions
  ┌──────────────┴───────────────────────┐
  │    BASE DE DONNÉES MySQL 8           │
  │    7 tables + 1 vue (sessions_view)  │
  └──────────────────────────────────────┘
  `, h: 3.5 },
  "Architecture 3 couches : Frontend / Backend / Base de données",
], { num: 13 });

// ════════════════════════════════════════════
//  SLIDE 14 — Architecture front-end
// ════════════════════════════════════════════
addSlide("Architecture front-end", [
  { type: "spacer", h: 0.05 },
  "3 fichiers seulement :",
  { type: "card", text: "📄  index.html — Structure unique de la SPA (toutes les pages)", h: 0.4, accent: C.accent },
  { type: "card", text: "🎨  style.css — Styles complets, responsive, animations, variables", h: 0.4, accent: C.accent },
  { type: "card", text: "⚡  app.js — Logique applicative : navigation, API, auth, DOM", h: 0.4, accent: C.accent },
  { type: "spacer", h: 0.15 },
  "Fonctionnement SPA :",
  "• showPage(page) — masque/affiche les sections dans le HTML",
  "• Navigation fluide sans rechargement de page",
  "• Token JWT stocké dans localStorage — envoyé via apiFetch()",
  "• apiFetch() — wrapper fetch() avec header Authorization + gestion d'erreurs",
], { num: 14 });

// ════════════════════════════════════════════
//  SLIDE 15 — Architecture back-end
// ════════════════════════════════════════════
addSlide("Architecture back-end", [
  { type: "spacer", h: 0.05 },
  "Structure du projet backend :",
  { type: "card", text: "📁  server.js — Point d'entrée, montage des middlewares et routes", h: 0.35, accent: C.accent },
  { type: "card", text: "📁  config/db.js — Pool MySQL + auto-initialisation DB/tables/seed", h: 0.35, accent: C.accent },
  { type: "card", text: "📁  middleware/auth.js — Auth JWT + Vérification admin", h: 0.35, accent: C.accent },
  { type: "card", text: "📁  routes/ — auth.js, sessions.js, bookings.js, admin.js...", h: 0.35, accent: C.accent },
  { type: "spacer", h: 0.1 },
  "Chaîne de traitement d'une requête :",
  { type: "schema", text: `
  Requête
     │
     ▼
  Helmet (sécurité headers)
     │
     ▼
  CORS (origines autorisées)
     │
     ▼
  express.json (parsing body)
     │
     ▼
  Rate Limiter (10 ou 100 req/15min)
     │
     ▼
  Auth Middleware (vérification JWT) ── si route protégée
     │
     ▼
  Admin Middleware (vérification rôle) ── si route admin
     │
     ▼
  Controller → BDD → Réponse JSON
  `, h: 2.5 },
], { num: 15 });

// ════════════════════════════════════════════
//  SLIDE 16 — Base de données
// ════════════════════════════════════════════
addSlide("Base de données — Présentation", [
  { type: "spacer", h: 0.05 },
  "Type : MySQL 8 — Base de données relationnelle",
  { type: "spacer", h: 0.05 },
  "7 tables :",
  { type: "card", text: "👤  users — Comptes utilisateurs (email unique, mot de passe hashé, rôle ENUM)", h: 0.35, accent: C.bg },
  { type: "card", text: "🏅  sports — Catégories de sport (yoga, cardio, football, fitness)", h: 0.35, accent: C.bg },
  { type: "card", text: "📅  sessions — Séances sportives (date, horaire, lieu, places)", h: 0.35, accent: C.bg },
  { type: "card", text: "📋  bookings — Réservations (contrainte UNIQUE user + session)", h: 0.35, accent: C.bg },
  { type: "card", text: "📢  announcements — Annonces publiées par les admins", h: 0.35, accent: C.bg },
  { type: "card", text: "⛔  token_blacklist — Tokens JWT invalidés (hash SHA-256)", h: 0.35, accent: C.bg },
  { type: "card", text: "🔑  password_reset_tokens — Réinitialisation de mot de passe", h: 0.35, accent: C.bg },
  { type: "spacer", h: 0.05 },
  "1 vue : sessions_view — Statut des séances en temps réel (places dispo, taux remplissage)",
], { num: 16 });

// ════════════════════════════════════════════
//  SLIDE 17 — Schéma des tables
// ════════════════════════════════════════════
addSlide("Schéma des tables", [
  { type: "schema", text: `
  users                    sports
  ├── id (PK)              ├── id (PK)
  ├── full_name            ├── slug (UNIQUE)
  ├── email (UNIQUE)       └── name
  ├── password (bcrypt)
  ├── role (ENUM: user/admin)
  └── created_at

  sessions                 bookings
  ├── id (PK)              ├── id (PK)
  ├── sport_id (FK)        ├── user_id (FK)
  ├── title                ├── session_id (FK)
  ├── instructor           ├── status (ENUM)
  ├── date                 └── UNIQUE(user_id, session_id)
  ├── time
  ├── duration
  ├── location
  └── total_spots
  `, h: 3.8 },
  "PK = Primary Key | FK = Foreign Key | ENUM = valeurs contraintes",
], { num: 17 });

// ════════════════════════════════════════════
//  SLIDE 18 — Relations tables
// ════════════════════════════════════════════
addSlide("Relations entre les tables", [
  { type: "schema", text: `
    ┌──────────┐          ┌──────────────┐
    │  sports  │──*───────│  sessions    │
    └──────────┘    1      └──────┬───────┘
                                  │1
                                  │
                                  │*
                          ┌──────┴───────┐
                          │  bookings    │
                          └──────┬───────┘
                             *   │
                             ┌───┘
                             │1
                       ┌─────┴──────┐
                       │   users    │──*── announcements
                       └────────────┘
  `, h: 2.5 },
  { type: "spacer", h: 0.1 },
  "Relations :",
  "• Un sport → plusieurs séances | Une séance → un sport",
  "• Un utilisateur → plusieurs réservations | Une séance → plusieurs réservations",
  "• bookings = table de liaison entre users et sessions (relation N-N)",
  "• Un admin → plusieurs annonces",
  "• ON DELETE CASCADE : suppression d'un sport → suppression de ses séances",
], { num: 18 });

// ════════════════════════════════════════════
//  SLIDE 19 — Authentification JWT
// ════════════════════════════════════════════
addSlide("Authentification — JWT", [
  { type: "schema", text: `
  CLIENT                          SERVEUR
     │                               │
     │── POST /auth/login ──────────►│
     │   { email, password }         │
     │                               ├── bcrypt.compare(password, hash)
     │                               ├── jwt.sign({ userId, role }, secret)
     │◄── { token } ────────────────│
     │                               │
     │── GET /api/bookings/me ──────►│
     │   Authorization: Bearer xxx   │
     │                               ├── jwt.verify(token, secret)
     │                               ├── Vérifie blacklist
     │                               ├── req.user = { userId, role }
     │◄── { bookings } ────────────│
  `, h: 3 },
  { type: "spacer", h: 0.05 },
  "Structure du JWT : header.payload.signature",
  "Payload : { userId, role (user/admin), exp (7 jours) }",
  "Avantage : pas de stockage côté serveur (stateless)",
], { num: 19 });

// ════════════════════════════════════════════
//  SLIDE 20 — Sécurité
// ════════════════════════════════════════════
addSlide("Sécurité", [
  { type: "spacer", h: 0.05 },
  { type: "card", text: "🔐  1. Mots de passe hashés avec bcrypt (12 rounds) — jamais en clair", h: 0.4 },
  { type: "card", text: "🔑  2. JWT signés (HS256) + blacklist à la déconnexion (hash SHA-256)", h: 0.4 },
  { type: "card", text: "🛡️  3. Routes protégées : middleware auth + middleware admin", h: 0.4 },
  { type: "card", text: "🗄️  4. Injections SQL bloquées — requêtes paramétrées (mysql2 placeholders)", h: 0.4 },
  { type: "card", text: "🌐  5. Helmet — en-têtes HTTP sécurisés (anti-clickjacking, MIME sniffing...)", h: 0.4 },
  { type: "card", text: "⏱️  6. Rate limiting : 10 req/15min login — 100 req/15min API générale", h: 0.4 },
  { type: "card", text: "✅  7. Double validation : client (HTML5) + serveur (express-validator)", h: 0.4 },
  { type: "card", text: "🛑  8. XSS — fonction escapeHTML() avant injection dans le DOM", h: 0.4 },
], { num: 20 });

// ════════════════════════════════════════════
//  SLIDE 21 — Routes API
// ════════════════════════════════════════════
addSlide("API — Exemples de routes", [
  { type: "spacer", h: 0.05 },
  "Authentification (publique) :",
  { type: "code", text: "POST  /api/auth/register    Créer un compte", h: 0.3 },
  { type: "code", text: "POST  /api/auth/login       Se connecter", h: 0.3 },
  { type: "spacer", h: 0.05 },
  "Séances (publique) :",
  { type: "code", text: "GET   /api/sessions          Liste (filtres: sport, date, search)", h: 0.3 },
  { type: "code", text: "GET   /api/sessions/featured  4 séances vedettes", h: 0.3 },
  { type: "code", text: "POST  /api/sessions          Créer (admin)", h: 0.3 },
  { type: "spacer", h: 0.05 },
  "Réservations (token requis 🔒) :",
  { type: "code", text: "POST  /api/bookings          Réserver une séance", h: 0.3 },
  { type: "code", text: "GET   /api/bookings/me       Mes réservations", h: 0.3 },
  { type: "code", text: "DELETE /api/bookings/:id      Annuler une réservation", h: 0.3 },
  { type: "spacer", h: 0.05 },
  "Administration (admin requis 🔒) :",
  { type: "code", text: "GET   /api/admin/users       Liste des utilisateurs", h: 0.3 },
  { type: "code", text: "PUT   /api/admin/users/:id/role  Modifier le rôle", h: 0.3 },
], { num: 21 });

// ════════════════════════════════════════════
//  SLIDE 22 — Démonstration
// ════════════════════════════════════════════
addSlide("Démonstration", [
  { type: "spacer", h: 0.05 },
  "Parcours utilisateur :",
  { type: "card", text: "1.  Page d'accueil — Hero, statistiques, séances vedettes", h: 0.4, accent: C.accent },
  { type: "card", text: "2.  Inscription / Connexion — Création de compte, JWT", h: 0.4, accent: C.accent },
  { type: "card", text: "3.  Parcourir les séances — Filtres par sport, date, recherche", h: 0.4, accent: C.accent },
  { type: "card", text: "4.  Réserver une séance — Confirmation immédiate (toast)", h: 0.4, accent: C.accent },
  { type: "card", text: "5.  Mes réservations — Visualisation et annulation", h: 0.4, accent: C.accent },
  { type: "card", text: "6.  Profil — Modification des informations personnelles", h: 0.4, accent: C.accent },
  { type: "spacer", h: 0.1 },
  "Parcours administrateur :",
  { type: "card", text: "7.  Dashboard admin — CRUD séances / Gestion utilisateurs / Annonces", h: 0.4, accent: C.bg },
], { num: 22 });

// ════════════════════════════════════════════
//  SLIDE 23 — Tests
// ════════════════════════════════════════════
addSlide("Tests réalisés", [
  { type: "spacer", h: 0.05 },
  "Tests backend — Jest + Supertest (17 tests) :",
  { type: "card", text: "✓  Tests du middleware d'authentification (token valide, expiré, absent)", h: 0.35, accent: C.green },
  { type: "card", text: "✓  Tests du middleware administrateur (rôle user refusé, rôle admin autorisé)", h: 0.35, accent: C.green },
  { type: "card", text: "✓  Tests des routes API (health, sessions, featured)", h: 0.35, accent: C.green },
  { type: "card", text: "✓  Tests de gestion d'erreurs (401, 403)", h: 0.35, accent: C.green },
  { type: "spacer", h: 0.15 },
  "Tests E2E — Cypress (12 tests) :",
  { type: "card", text: "✓  Tests d'affichage de la page d'accueil", h: 0.35, accent: C.green },
  { type: "card", text: "✓  Tests de navigation entre les pages de la SPA", h: 0.35, accent: C.green },
  { type: "card", text: "✓  Tests des formulaires (connexion, inscription, mot de passe oublié)", h: 0.35, accent: C.green },
  { type: "spacer", h: 0.15 },
  "Commandes :  npm test (Jest)  |  npm run test:e2e (Cypress)",
], { num: 23 });

// ════════════════════════════════════════════
//  SLIDE 24 — Difficultés
// ════════════════════════════════════════════
addSlide("Difficultés rencontrées", [
  { type: "spacer", h: 0.05 },
  { type: "card", text: "❌  1. Invalidation des JWT — Les tokens sont stateless, impossible à révoquer", h: 0.45, accent: C.red },
  { type: "card", text: "❌  2. Comptage des places — Risque de sur-réservation en cas d'accès concurrent", h: 0.45, accent: C.red },
  { type: "card", text: "❌  3. SPA sans framework — Gestion manuelle du routage et de l'état", h: 0.45, accent: C.red },
  { type: "card", text: "❌  4. Désynchronisation BDD/Front — Noms de colonnes différents entre API et affichage", h: 0.45, accent: C.red },
  { type: "card", text: "❌  5. CORS — Origine bloquée entre les ports 5500/5501 et 3000", h: 0.45, accent: C.red },
], { num: 24 });

// ════════════════════════════════════════════
//  SLIDE 25 — Solutions
// ════════════════════════════════════════════
addSlide("Solutions apportées", [
  { type: "spacer", h: 0.05 },
  { type: "card", text: "✅  1. Blacklist de tokens — Table token_blacklist (hash SHA-256 du JWT)", h: 0.45, accent: C.green },
  { type: "card", text: "✅  2. Vue SQL sessions_view + contrainte UNIQUE(user_id, session_id)", h: 0.45, accent: C.green },
  { type: "card", text: "✅  3. Architecture modulaire : showPage(), state localStorage, rendus dédiés", h: 0.45, accent: C.green },
  { type: "card", text: "✅  4. Correction des noms de colonnes dans les routes API POST /api/sessions", h: 0.45, accent: C.green },
  { type: "card", text: "✅  5. Configuration CORS via .env — whitelist des ports de développement", h: 0.45, accent: C.green },
], { num: 25 });

// ════════════════════════════════════════════
//  SLIDE 26 — Améliorations
// ════════════════════════════════════════════
addSlide("Améliorations possibles", [
  { type: "spacer", h: 0.05 },
  "Fonctionnelles :",
  { type: "card", text: "💳  Paiement en ligne pour les séances payantes", h: 0.35, accent: C.accent },
  { type: "card", text: "📧  Notifications par email (confirmation de réservation, rappels)", h: 0.35, accent: C.accent },
  { type: "card", text: "⭐  Système d'avis et notation des séances", h: 0.35, accent: C.accent },
  { type: "spacer", h: 0.1 },
  "Techniques :",
  { type: "card", text: "📄  Pagination des résultats de séances", h: 0.35, accent: C.bg },
  { type: "card", text: "♿  Accessibilité (attributs ARIA, navigation clavier)", h: 0.35, accent: C.bg },
  { type: "card", text: "🧩  Modularisation de app.js (fichiers séparés par page)", h: 0.35, accent: C.bg },
  { type: "card", text: "📊  Graphiques et statistiques dans le dashboard admin", h: 0.35, accent: C.bg },
], { num: 26 });

// ════════════════════════════════════════════
//  SLIDE 27 — Compétences DWWM
// ════════════════════════════════════════════
addSlide("Compétences DWWM mobilisées", [
  { type: "spacer", h: 0.05 },
  "Compétences techniques :",
  { type: "card", text: "🎨  Front-end — HTML/CSS/JS : SPA, responsive, animations, Intersection Observer", h: 0.35, accent: C.accent },
  { type: "card", text: "⚙️  Back-end — Node.js/Express : API REST, middlewares, contrôleurs", h: 0.35, accent: C.accent },
  { type: "card", text: "🗄️  Base de données — MySQL : schéma relationnel, vues, contraintes, jointures", h: 0.35, accent: C.accent },
  { type: "card", text: "🔒  Sécurité — JWT, bcrypt, Helmet, rate-limit, XSS, SQL paramétré", h: 0.35, accent: C.accent },
  { type: "card", text: "🧪  Tests — Jest, Supertest, Cypress", h: 0.35, accent: C.accent },
  { type: "card", text: "🔧  Outils — Git, GitHub, VS Code, Figma, Thunder Client, DBeaver", h: 0.35, accent: C.accent },
  { type: "spacer", h: 0.1 },
  "Compétences transversales :",
  { type: "card", text: "📋  Gestion de projet — Priorisation P0/P1/P2, user stories, todo list", h: 0.35, accent: C.bg },
  { type: "card", text: "📝  Documentation — Journal de bord, dossier professionnel, documentation technique", h: 0.35, accent: C.bg },
], { num: 27 });

// ════════════════════════════════════════════
//  SLIDE 28 — Conclusion
// ════════════════════════════════════════════
addSlide("Conclusion", [
  { type: "spacer", h: 0.05 },
  "SportBook en bref :",
  { type: "card", text: "✅  Application full-stack complète et fonctionnelle", h: 0.4, accent: C.green },
  { type: "card", text: "✅  Architecture 3 couches : frontend indépendant / API REST / BDD relationnelle", h: 0.4, accent: C.green },
  { type: "card", text: "✅  Code sécurisé — JWT, bcrypt, validation, Helmet, protection XSS", h: 0.4, accent: C.green },
  { type: "card", text: "✅  Interface responsive et soignée (mobile, tablette, desktop)", h: 0.4, accent: C.green },
  { type: "card", text: "✅  Tests automatisés (Jest + Supertest + Cypress)", h: 0.4, accent: C.green },
  { type: "spacer", h: 0.15 },
  "Apprentissages clés :",
  "• Maîtrise du développement full-stack (front-end + back-end + BDD)",
  "• Importance de la sécurité dès la conception",
  "• Valeur de l'organisation, de la priorisation et de la documentation",
], { num: 28 });

// ════════════════════════════════════════════
//  SLIDE 29 — Remerciements
// ════════════════════════════════════════════
const slide29 = pptx.addSlide();
slide29.background = { color: C.bg };
slide29.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 0.12, h: "100%", fill: { color: C.accent },
});
slide29.addShape(pptx.ShapeType.rect, {
  x: 0, y: 3, w: "100%", h: 0.006, fill: { color: C.accent },
});
slide29.addText("Remerciements", {
  x: 0.8, y: 1.0, w: 8, h: 0.8, fontSize: 30, color: C.white, bold: true, fontFace: FONT,
});
slide29.addShape(pptx.ShapeType.rect, {
  x: 0.8, y: 1.9, w: 2, h: 0.04, fill: { color: C.accent },
});
slide29.addText([
  { text: "MolenGeek\n", options: { fontSize: 16, color: C.accentLt, bold: true } },
  { text: "Pour la formation et l'accompagnement pendant 6 mois\n\n", options: { fontSize: 13, color: C.white } },
  { text: "Mon formateur\n", options: { fontSize: 16, color: C.accentLt, bold: true } },
  { text: "Pour son suivi, ses conseils et son expertise\n\n", options: { fontSize: 13, color: C.white } },
  { text: "Le jury\n", options: { fontSize: 16, color: C.accentLt, bold: true } },
  { text: "Pour le temps consacré à l'évaluation de mon projet\n\n", options: { fontSize: 13, color: C.white } },
  { text: "Mes proches\n", options: { fontSize: 16, color: C.accentLt, bold: true } },
  { text: "Pour leur soutien et leurs encouragements", options: { fontSize: 13, color: C.white } },
], {
  x: 0.8, y: 2.2, w: 8, h: 4.2, fontFace: FONT, lineSpacingMultiple: 1.3, valign: "top",
});

// ════════════════════════════════════════════
//  SLIDE 30 — Questions
// ════════════════════════════════════════════
const slide30 = pptx.addSlide();
slide30.background = { color: C.bg };
slide30.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 0.12, h: "100%", fill: { color: C.accent },
});
slide30.addText("Questions ?", {
  x: 0.8, y: 1.8, w: 8, h: 1.2, fontSize: 40, color: C.white, bold: true, fontFace: FONT,
});
slide30.addShape(pptx.ShapeType.rect, {
  x: 0.8, y: 3.1, w: 2, h: 0.04, fill: { color: C.accent },
});
slide30.addText("Merci de votre attention.\nJe suis disponible pour répondre à vos questions.", {
  x: 0.8, y: 3.5, w: 8, h: 1.5, fontSize: 16, color: C.gray, fontFace: FONT, lineSpacingMultiple: 1.5,
});

// ── Save ──
const outPath = "/Users/julyahery/Documents/code/GitHub/sportbook/soutenance/SportBook-Presentation.pptx";
pptx.writeFile({ fileName: outPath }).then(() => {
  console.log("✅ Presentation générée : " + outPath);
}).catch((err) => {
  console.error("❌ Erreur :", err);
});
