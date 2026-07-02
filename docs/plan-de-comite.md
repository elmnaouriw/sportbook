# Plan de comité — SportBook

**Auteur :** Walid El Mnaouri
**Formation :** Titre Professionnel Développeur Web et Web Mobile — RNCP 37674
**Établissement :** MolenGeek
**Date :** Juillet 2026

---

## 1. Déroulement du jour J

### 1.1 Timing estimé (20-30 min)

| Durée | Phase | Contenu |
|-------|-------|---------|
| 1 min | Accueil | Installation, check technique (vidéoprojecteur, démo) |
| 1 min | Introduction | Présentation personnelle, contexte de la formation |
| 8-10 min | Présentation projet | Slides 1 à 28 — voir plan détaillé ci-dessous |
| 5-7 min | Démonstration en direct | Parcours utilisateur + parcours admin |
| 10-15 min | Questions du jury | Échanges, précisions techniques, mise en situation |
| 1 min | Conclusion | Remerciements, fin de la soutenance |

**Durée totale conseillée :** 20-30 minutes

### 1.2 Plan de présentation détaillé (slides)

| Slide | Durée | Sujet |
|-------|-------|-------|
| 1 | 30s | Slide de titre — SportBook |
| 2 | 30s | Présentation personnelle (parcours, formation) |
| 3 | 30s | Contexte de la formation (DWWM, MolenGeek, RNCP) |
| 4 | 30s | Présentation du projet SportBook |
| 5 | 30s | Problématique / besoin utilisateur |
| 6 | 30s | Objectifs du projet (fonctionnels + techniques) |
| 7 | 15s | Public cible (utilisateurs + administrateurs) |
| 8 | 45s | Fonctionnalités principales |
| 9 | 30s | Parcours utilisateur (schéma de navigation) |
| 10 | 30s | Parcours administrateur (dashboard) |
| 11 | 30s | Maquettes Figma (conception avant code) |
| 12 | 30s | Charte graphique / UI (couleurs, typo, composants) |
| 13 | 1 min | Architecture globale (3 couches : frontend / backend / BDD) |
| 14 | 45s | Architecture front-end (SPA, showPage, apiFetch) |
| 15 | 45s | Architecture back-end (Express, middleware chain) |
| 16 | 30s | Base de données — Présentation (7 tables + 1 vue) |
| 17 | 45s | Schéma des tables (colonnes, types, contraintes) |
| 18 | 30s | Relations entre les tables (FK, CASCADE) |
| 19 | 1 min | Authentification JWT (flux, structure du token) |
| 20 | 1 min | Sécurité (bcrypt, JWT, Helmet, rate-limit, XSS) |
| 21 | 30s | Exemples de routes API (endpoints clés) |
| 22 | — | Démonstration en direct (voir §1.3) |
| 23 | 30s | Tests (Jest + Supertest backend, Cypress E2E) |
| 24 | 45s | Difficultés rencontrées (JWT invalidation, concurrence, SPA, CORS) |
| 25 | 30s | Solutions apportées (blacklist, vue SQL, contrainte UNIQUE) |
| 26 | 30s | Améliorations possibles (V2, paiement, accessibilité, modules) |
| 27 | 45s | Compétences DWWM mobilisées (techniques + transversales) |
| 28 | 30s | Conclusion |
| 29 | 15s | Remerciements |
| 30 | — | Questions du jury |

### 1.3 Démonstration en direct (5-7 min)

**Prérequis technique :**
- Application lancée localement (Docker ou serveur dev)
- Compte admin déjà créé pour gagner du temps
- Données de démonstration préchargées (séances, sports)
- Navigateur ouvert sur la page d'accueil

**Parcours utilisateur (3-4 min) :**
1. **Page d'accueil** — Présentation des séances en vedette, animations
2. **Inscription** — Création rapide d'un compte (email + mot de passe simple)
3. **Connexion** — Authentification avec le compte créé
4. **Exploration des séances** — Filtres par sport, recherche par mot-clé
5. **Réservation** — Inscription à une séance (notification toast)
6. **Mes réservations** — Visualisation et annulation
7. **Profil** — Modification des informations

**Parcours administrateur (2-3 min) :**
8. **Déconnexion / Connexion admin** — Compte avec rôle administrateur
9. **Dashboard admin** — Vue d'ensemble
10. **Gestion des séances** — Création d'une nouvelle séance
11. **Gestion des utilisateurs** — Changement de rôle
12. **Annonces** — Publication d'une annonce

### 1.4 Questions jury — Anticipation

Voir le fichier `docs/preparation-soutenance.md` pour 50 questions préparées, réparties en :
- Présentation générale & Contexte (Q1-Q4)
- Architecture & Choix techniques (Q5-Q13)
- Base de données (Q14-Q19)
- Authentification & Sécurité (Q20-Q33)
- Frontend (Q34-Q39)
- Tests (Q40-Q41)
- Déploiement & DevOps (Q42-Q44)
- Gestion de projet (Q45-Q47)
- Problèmes rencontrés (Q48-Q50)
- Compétences transversales (Q51-Q53)

---

## 2. Dossier jury

### 2.1 Documents à fournir (support papier ou tablette)

| # | Document | Fichier | Indispensable |
|---|----------|---------|:---:|
| 1 | **Dossier professionnel** | `docs/dossier-professionnel-walid-el-mnaouri.md` | ✅ Oui |
| 2 | **Présentation slides** | `soutenance/SportBook-Presentation.pptx` | ✅ Oui |
| 3 | **Script oral** (pour vous) | `soutenance/script-oral.md` | 🔶 Non |
| 4 | **Cahier des charges / Brief** | `docs/brief.md` | ✅ Oui |
| 5 | **User stories** | `docs/user-stories.md` | ✅ Oui |
| 6 | **Journal de bord** | `docs/journal.md` | ✅ Oui |
| 7 | **Analyse du projet** | `docs/analyse-projet.md` | 🔶 Non |
| 8 | **Todo list / Suivi** | `docs/todo.md` | 🔶 Non |

### 2.2 Informations clés à communiquer

**Projet :**
- **Nom :** SportBook
- **Type :** Application web de réservation de séances sportives
- **Stack :** HTML / CSS / JS vanilla — Node.js / Express — MySQL 8
- **Architecture :** SPA full-stack (3 couches)
- **Statut :** 43/50 user stories réalisées, 17 tests Jest, 12 tests Cypress

**Dépôt GitHub :** [URL du dépôt à communiquer]

**Instructions de lancement :**
```bash
# Avec Docker (recommandé)
docker compose up

# Sans Docker
npm run install:all
npm run dev
# Accès : http://localhost:3000
```

### 2.3 Checklist de préparation

**La veille :**
- [ ] Vérifier que l'application tourne (Docker ou dev)
- [ ] Vérifier que les données de démo sont présentes
- [ ] Exporter les slides en PDF (backup)
- [ ] Préparer le dossier jury (imprimer ou exporter)
- [ ] Tester le vidéoprojecteur
- [ ] Prévoir une connexion Internet (fallback)

**Le jour J :**
- [ ] Arriver 15 min en avance
- [ ] Installer la présentation sur le PC du jury
- [ ] Ouvrir l'application dans le navigateur (prête pour la démo)
- [ ] Avoir le script oral à portée de main
- [ ] Respirer et rester naturel

### 2.4 Auto-évaluation (pour le jury)

| Critère | Niveau visé |
|---------|:-----------:|
| Présentation du contexte | ★★★★★ |
| Explication de l'architecture | ★★★★★ |
| Compréhension des choix techniques | ★★★★★ |
| Qualité de la démonstration | ★★★★★ |
| Réponses aux questions | ★★★★★ |
| Organisation / Gestion de projet | ★★★★★ |
