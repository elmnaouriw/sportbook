# Todo — SportBook

Statuts : ✅ Fait | ❌ À faire | ⚠️ Partiel

---

## P0 — Priorité Haute (Core fonctionnel)

| Statut | US      | Priorité | Epic | Description | Notes |
|--------|---------|----------|------|-------------|-------|
| ✅ | US-001 | P0 | Auth | Inscription utilisateur | Inscription + JWT |
| ✅ | US-002 | P0 | Auth | Connexion utilisateur | Login + JWT |
| ✅ | US-007 | P0 | Consultation | Liste des séances disponibles | GET /api/sessions |
| ✅ | US-008 | P0 | Consultation | Filtrer les séances (sport, date, search) | Query params |
| ✅ | US-009 | P0 | Consultation | Détail d'une séance | GET /api/sessions/:id |
| ✅ | US-010 | P0 | Consultation | Séances mises en avant (featured) | GET /api/sessions/featured |
| ✅ | US-011 | P0 | Consultation | Places disponibles en temps réel | sessions_view |
| ✅ | US-012 | P0 | Consultation | État de la séance (disponible / presque pleine / complète) | fill_pct + status |
| ✅ | US-013 | P0 | Réservation | Réserver une place | POST /api/bookings |
| ✅ | US-014 | P0 | Réservation | Voir mes réservations | GET /api/bookings/me |
| ✅ | US-015 | P0 | Réservation | Annuler une réservation | DELETE /api/bookings/:id |
| ✅ | US-017 | P0 | Réservation | Empêcher les doublons de réservation | UNIQUE(user_id, session_id) |
| ✅ | US-018 | P0 | Admin séances | Créer une séance | POST /api/sessions (admin) + page admin frontend |
| ✅ | US-020 | P0 | Admin séances | Supprimer une séance | DELETE /api/sessions/:id (admin) + page admin frontend |
| ✅ | US-034 | P0 | Sécurité | Hash des mots de passe (bcrypt) | 12 rounds |
| ✅ | US-035 | P0 | Sécurité | Protection des routes par JWT | authMiddleware |
| ✅ | US-036 | P0 | Sécurité | Vérification rôle admin | adminMiddleware |
| ✅ | US-037 | P0 | Sécurité | Prévention injections SQL | mysql2 paramétré |
| ✅ | US-038 | P0 | Sécurité | Validation formulaires (client + serveur) | Double validation |
| ✅ | US-003 | P0 | Auth | Maintien de la connexion | JWT 7 jours |
| ✅ | US-019 | P0 | Admin séances | Modifier une séance | PUT /api/sessions/:id |

## P1 — Priorité Moyenne

| Statut | US      | Priorité | Epic | Description | Notes |
|--------|---------|----------|------|-------------|-------|
| ✅ | US-016 | P1 | Réservation | Confirmation avant annulation | Dialog JS |
| ✅ | US-029 | P1 | UI/UX | Indicateurs de chargement (skeleton) | Skeleton cards CSS |
| ✅ | US-030 | P1 | UI/UX | Notifications toast | Toast system |
| ✅ | US-031 | P1 | UI/UX | Animations fluides | Intersection Observer + CSS |
| ✅ | US-005 | P1 | Auth | Page profil + modification | GET/PUT /api/users/me |
| ✅ | US-006 | P1 | Auth | Mot de passe oublié | Endpoint + page + nodemailer |
| ⚠️ | US-021 | P1 | Admin séances | Dashboard séances avec statistiques | Page admin avec liste + spots, sans dashboard complet |
| ❌ | US-022 | P1 | Admin séances | Dashboard réservations | Interface admin frontend |
| ✅ | US-023 | P1 | Admin users | Liste des utilisateurs | GET /api/admin/users |
| ✅ | US-026 | P1 | Admin users | Voir les réservations de tous les utilisateurs | GET /api/admin/bookings |
| ✅ | US-028 | P1 | UI/UX | Responsive mobile/tablette | Media queries CSS |
| ✅ | US-044 | P1 | Infrastructure | Gestion d'erreurs centralisée | Express error handler + AppError class |
| ✅ | US-004 | P1 | Auth | Déconnexion côté serveur | Endpoint logout + blacklist DB |
| ✅ | US-047 | P1 | Maintenance | Synchroniser database.sql avec db.js | Schéma aligné sur le runtime |

## P2 — Priorité Faible

| Statut | US      | Priorité | Epic | Description | Notes |
|--------|---------|----------|------|-------------|-------|
| ✅ | US-024 | P2 | Admin users | Modifier rôle utilisateur | PUT /api/admin/users/:id/role |
| ✅ | US-025 | P2 | Admin users | Supprimer/désactiver un compte | DELETE /api/admin/users/:id |
| ✅ | US-027 | P2 | Admin users | Annuler résa pour un utilisateur | DELETE /api/admin/bookings/:id |
| ❌ | US-032 | P2 | UI/UX | Navigation clavier | Tabindex, focus, skip links |
| ❌ | US-033 | P2 | UI/UX | Accessibilité (ARIA, contrastes) | Audit + corrections |
| ✅ | US-039 | P2 | Sécurité | Invalidation de token côté serveur | Blacklist en DB dans token_blacklist |
| ✅ | US-040 | P2 | Tests | Tests unitaires | Jest — auth, errorHandler (8 tests) |
| ✅ | US-041 | P2 | Tests | Tests fonctionnels | Supertest — health, sessions (3 tests, DB mockée) |
| ✅ | US-042 | P2 | Tests | Tests E2E frontend | Cypress — navigation, pages, formulaires (12 tests) |
| ⚠️ | US-042 | P2 | Tests | Tests de sécurité | Auth middleware testé (6 tests) |
| ✅ | US-043 | P2 | Déploiement | Mise en production | Dockerfile fourni |
| ✅ | US-045 | P2 | Légal | Mentions légales | mentions-legales.html |
| ✅ | US-046 | P2 | Légal | Conditions générales d'utilisation | cgu.html |
| ⚠️ | US-048 | P2 | Maintenance | Configuration centralisée dans .env | JWT_EXPIRES_IN manquant |
| ✅ | — | P0 | Admin séances | **POST /api/sessions corrigé** | Utilisait `instructor_id` au lieu de `instructor`, noms colonnes erronés |
| ✅ | — | P0 | Admin frontend | **Page Admin créée dans le frontend** | Route admin avec formulaire création + liste avec suppression |
| ✅ | — | P0 | Nav | **Lien Admin dynamique** | Visible uniquement si `user.role === 'admin'` |

---

## Résumé

| Priorité | Total | ✅ Fait | ❌ Manquant | ⚠️ Partiel |
|----------|-------|---------|-------------|------------|
| **P0** | 22 | 22 | 0 | 0 |
| **P1** | 14 | 13 | 0 | 1 |
| **P2** | 14 | 8 | 5 | 1 |
| **Total** | **50** | **43** | **5** | **2** |

✅ **43 / 50** items traités — ✅ **Toutes les P0/P1 sont faites**
