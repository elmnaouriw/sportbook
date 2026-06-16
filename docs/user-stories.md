# User Stories — SportBook

## Epic 1 : Authentification & Gestion de compte

| ID   | En tant que... | Je veux... | Afin de... | Statut |
|------|---------------|------------|------------|--------|
| US-001 | Visiteur | M'inscrire avec nom, email et mot de passe | Créer un compte et accéder à l'application | ✅ Fait |
| US-002 | Utilisateur | Me connecter avec email et mot de passe | Accéder à mon espace personnel | ✅ Fait |
| US-003 | Utilisateur | Rester connecté entre les sessions | Ne pas avoir à me reconnecter à chaque visite | ✅ Fait |
| US-004 | Utilisateur | Me déconnecter | Sécuriser mon compte | ✅ Fait (côté client) |
| US-005 | Utilisateur | Consulter et modifier mon profil | Mettre à jour mes informations personnelles | ❌ Manquant |
| US-006 | Utilisateur | Réinitialiser mon mot de passe via email | Récupérer l'accès à mon compte si j'oublie mon mot de passe | ❌ Manquant |

## Epic 2 : Consultation des séances sportives

| ID   | En tant que... | Je veux... | Afin de... | Statut |
|------|---------------|------------|------------|--------|
| US-007 | Visiteur | Voir la liste des séances disponibles | Choisir une activité sportive | ✅ Fait |
| US-008 | Visiteur | Filtrer les séances par sport, date ou mot-clé | Trouver rapidement une séance qui m'intéresse | ✅ Fait |
| US-009 | Visiteur | Voir le détail d'une séance (date, heure, places, coach) | Décider si je veux réserver | ✅ Fait |
| US-010 | Visiteur | Voir les séances mises en avant sur la page d'accueil | Découvrir les séances populaires à venir | ✅ Fait |
| US-011 | Visiteur | Voir le nombre de places disponibles en temps réel | Savoir si une séance est complète | ✅ Fait |
| US-012 | Visiteur | Voir l'état d'une séance (disponible, presque pleine, complète) | Choisir rapidement une séance accessible | ✅ Fait |

## Epic 3 : Réservations

| ID   | En tant que... | Je veux... | Afin de... | Statut |
|------|---------------|------------|------------|--------|
| US-013 | Utilisateur connecté | Réserver une place à une séance | Participer à l'activité sportive | ✅ Fait |
| US-014 | Utilisateur connecté | Voir la liste de mes réservations | Suivre les séances auxquelles je suis inscrit | ✅ Fait |
| US-015 | Utilisateur connecté | Annuler une réservation | Libérer ma place si je ne peux plus venir | ✅ Fait |
| US-016 | Utilisateur connecté | Confirmer avant d'annuler une réservation | Éviter les annulations accidentelles | ✅ Fait |
| US-017 | Utilisateur connecté | Ne pas pouvoir réserver deux fois la même séance | Éviter les doublons | ✅ Fait |

## Epic 4 : Administration — Gestion des séances

| ID   | En tant que... | Je veux... | Afin de... | Statut |
|------|---------------|------------|------------|--------|
| US-018 | Administrateur | Créer une nouvelle séance sportive | Proposer de nouvelles activités aux utilisateurs | ✅ Fait |
| US-019 | Administrateur | Modifier une séance existante | Mettre à jour les informations (date, coach, places...) | ❌ Manquant |
| US-020 | Administrateur | Supprimer une séance | Retirer une séance qui n'a plus lieu | ✅ Fait |
| US-021 | Administrateur | Voir la liste des séances avec leurs statistiques | Piloter l'offre sportive | ⚠️ Partiel (page admin avec liste + places, sans graphiques) |
| US-022 | Administrateur | Voir le tableau de bord des réservations | Suivre le taux de remplissage | ❌ Manquant |

## Epic 5 : Administration — Gestion des utilisateurs

| ID   | En tant que... | Je veux... | Afin de... | Statut |
|------|---------------|------------|------------|--------|
| US-023 | Administrateur | Voir la liste des utilisateurs inscrits | Gérer les comptes | ❌ Manquant |
| US-024 | Administrateur | Modifier le rôle d'un utilisateur | Promouvoir un utilisateur en administrateur | ❌ Manquant |
| US-025 | Administrateur | Supprimer / désactiver un compte utilisateur | Gérer les abus ou comptes inactifs | ❌ Manquant |
| US-026 | Administrateur | Voir les réservations de tous les utilisateurs | Superviser l'activité globale | ❌ Manquant |
| US-027 | Administrateur | Annuler une réservation pour un utilisateur | Gérer les cas exceptionnels | ❌ Manquant |

## Epic 6 : Interface & Expérience Utilisateur

| ID   | En tant que... | Je veux... | Afin de... | Statut |
|------|---------------|------------|------------|--------|
| US-028 | Utilisateur | Que l'interface soit adaptée aux mobiles et tablettes | Utiliser l'application depuis n'importe quel appareil | ⚠️ Partiel (CSS sans media queries) |
| US-029 | Utilisateur | Voir des indicateurs de chargement pendant les appels API | Comprendre que l'application travaille | ✅ Fait |
| US-030 | Utilisateur | Recevoir des notifications toast pour les actions réussies/échouées | Avoir un retour clair sur mes actions | ✅ Fait |
| US-031 | Utilisateur | Que les animations et transitions soient fluides | Une expérience agréable | ✅ Fait |
| US-032 | Utilisateur | Pouvoir naviguer au clavier | Accéder à l'application sans souris | ❌ Manquant |
| US-033 | Utilisateur | Que l'interface soit accessible (contrastes, labels ARIA) | Pouvoir utiliser des outils d'assistance | ❌ Manquant |

## Epic 7 : Sécurité & Infrastructure

| ID   | En tant que... | Je veux... | Afin de... | Statut |
|------|---------------|------------|------------|--------|
| US-034 | Développeur | Que les mots de passe soient hashés | Protéger les données utilisateurs | ✅ Fait |
| US-035 | Développeur | Que les routes sensibles soient protégées par JWT | Empêcher les accès non autorisés | ✅ Fait |
| US-036 | Développeur | Que les routes admin soient protégées par vérification de rôle | Limiter les actions critiques aux administrateurs | ✅ Fait |
| US-037 | Développeur | Que les requêtes SQL soient paramétrées | Prévenir les injections SQL | ✅ Fait |
| US-038 | Développeur | Valider les formulaires côté client et serveur | Assurer l'intégrité des données | ✅ Fait |
| US-039 | Développeur | Avoir un endpoint de déconnexion côté serveur | Gérer les sessions proprement (invalidation de token) | ❌ Manquant |
| US-040 | Développeur | Avoir des tests unitaires sur les fonctions principales | Assurer la fiabilité du code | ❌ Manquant |
| US-041 | Développeur | Avoir des tests fonctionnels sur les scénarios utilisateur | Valider le parcours complet | ❌ Manquant |
| US-042 | Développeur | Avoir des tests de sécurité (auth, accès admin) | Prévenir les failles | ❌ Manquant |
| US-043 | Développeur | Déployer l'application sur une plateforme web | La rendre accessible publiquement | ❌ Manquant |
| US-044 | Développeur| Centraliser la gestion des erreurs API | Avoir des messages d'erreur cohérents | ❌ Manquant |

## Epic 8 : Pages légales & Informationnelles

| ID   | En tant que... | Je veux... | Afin de... | Statut |
|------|---------------|------------|------------|--------|
| US-045 | Utilisateur | Accéder aux mentions légales | Connaître les informations juridiques | ❌ Manquant |
| US-046 | Utilisateur | Accéder aux conditions générales d'utilisation | Connaître mes droits et obligations | ❌ Manquant |

## Epic 9 : Qualité & Maintenance du code

| ID   | En tant que... | Je veux... | Afin de... | Statut |
|------|---------------|------------|------------|--------|
| US-047 | Développeur | Que la base de données soit versionnée dans `database.sql` | Recréer la DB à l'identique | ⚠️ Partiel (fichier désynchronisé du code) |
| US-048 | Développeur | Centraliser la configuration (port, DB, JWT) dans `.env` | Simplifier le déploiement | ⚠️ Partiel (JWT_EXPIRES_IN manquant) |
