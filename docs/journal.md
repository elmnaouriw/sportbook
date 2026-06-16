# Journal de bord — SportBook

## 2026-06-16
- Mise à jour du README pour refléter la nouvelle architecture backend/frontend
- Ajout de la skill commit-journal pour automatiser les commits avec mise à jour du journal

## 2026-06-16 (2e session)
### Réalisations
- Implémentation de la page admin frontend : création, listing et suppression de séances depuis le dashboard administrateur
- Correction des noms de colonnes dans l'API POST /api/sessions pour aligner backend et frontend
- Enrichissement de la skill commit-journal avec un questionnaire structuré pour guider la rédaction du journal de bord
- Ajout de la documentation projet (brief, todo, user-stories, AGENTS.md)

### Problèmes rencontrés
- Première utilisation d'opencode (passage de Claude dans le navigateur à un outil en ligne de commande)
- Découverte et création d'une skill personnalisée pour automatiser les commits avec journal
- Changement de workflow : auparavant je copiais-collais depuis le navigateur, maintenant j'utilise des outils spécialisés

### Compétences transversales
- Autonomie : travail en indépendance sur la feature admin
- Résolution de problèmes : correction de la désynchronisation backend/frontend
- Utilisation d'outils IA : adoption d'opencode avec ses agents spécialisés

### Prochaines étapes
- Modifier une séance existante (US-019) — PUT /api/sessions/:id + formulaire frontend

## 2026-06-16 (3e session)
### Réalisations
- Correction CORS dans `server.js` : ajout des origines `localhost:5500` et `127.0.0.1:5500` pour permettre au frontend de communiquer avec l'API
- Implémentation de la fonctionnalité "Annonces" côté utilisateur :
  - Table `announcements` en BDD (auto-créée au démarrage) avec liaison FK vers `users`
  - Route API `GET/POST/DELETE /api/announcements` avec authentification
  - Page frontend dédiée avec formulaire de création et liste des annonces
  - Styles CSS pour les cards d'annonces (avatar, auteur, date)

### Problèmes rencontrés
- Problème CORS : le frontend tournait sur le port 5500 alors que le CORS était configuré uniquement pour le 5501. Résolu en élargissant les origines autorisées dans la config CORS.

### Compétences transversales
- Autonomie : implémentation complète d'une feature de la BDD au frontend
- Utilisation d'outils IA exécutants : adoption des agents spécialisés (explore) pour analyser le codebase en profondeur avant d'implémenter

### Prochaines étapes
- Dashboard admin annonces : interface administrateur pour gérer toutes les annonces

## 2026-06-16 (4e session)
### Réalisations
- Dashboard admin annonces : section dédiée dans la page Admin pour lister et supprimer les annonces
- Ajout des fonctions `loadAdminAnnouncements()` et `adminDeleteAnnouncement()` dans app.js
- Intégration du chargement automatique des annonces dans `showAdminPage()`

### Prochaines étapes
- Notifications quand une annonce est publiée

## Avant 2026-06-16
- J'ai fais un brief et des tests au niveau de l'interface en utilisant Claude dans le navigateur
- J'ai installé sur ma machine XAMPP pour faire fonctionner la base de donnée et avoir PHPMYADMIN inclus dedans