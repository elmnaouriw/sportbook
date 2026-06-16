---
name: commit-journal
description: Use when the user asks to commit, create a commit, make a commit, or update the journal de bord. Prompts to update docs/journal.md before committing.
---

# Commit + Journal de bord

Quand l'utilisateur demande de faire un commit :

1. Demande-lui de décrire brièvement ce qui a changé (ou utilise son message si déjà fourni)

2. **Parcours le questionnaire structuré ci-dessous** pour enrichir le journal :
   - Ne pose que les questions pertinentes par rapport au travail effectué (pas besoin de tout demander à chaque fois)
   - Laisse l'utilisateur répondre librement, reformule si nécessaire
   - Note les réponses pour les intégrer dans l'entrée du journal

3. Ajoute une entrée datée dans `docs/journal.md` en suivant le format enrichi

4. Stage `docs/journal.md` avec les autres fichiers modifiés

5. Fais le commit

---

## Questionnaire structuré pour le journal

### 1. Réalisations techniques
- Qu'est-ce qui a été implémenté ou modifié concrètement ? (routes, composants, logique métier, BDD)
- Quelles technologies / librairies as-tu utilisées ou découvertes ?
- As-tu écrit des tests ? Si oui, quoi et comment ?

### 2. Problèmes rencontrés & solutions
- As-tu rencontré des difficultés ? Lesquelles ?
- Comment les as-tu résolues ? (recherche documentation, debugging, expérimentation, aide extérieure)
- Y a-t-il des compromis techniques que tu as dû faire ?

### 3. Décisions de conception
- Pourquoi as-tu choisi telle approche plutôt qu'une autre ?
- Quelles alternatives as-tu envisagées ?

### 4. Organisation & méthodologie
- Comment cette tâche s'inscrit-elle dans le planning global du projet ?
- As-tu utilisé des outils spécifiques (Trello, diagrammes, etc.) ?
- As-tu respecté les délais prévus ? Si non, pourquoi ?

### 5. Compétences transversales (soft skills)
- As-tu dû faire preuve d'autonomie, de recherche personnelle ?
- As-tu sollicité de l'aide (formateur, collègues, communautés) ?
- As-tu dû t'adapter à un changement ou un imprévu ?
- As-tu communiqué ou collaboré avec quelqu'un ?

### 6. Qualité & sécurité
- As-tu pris des mesures pour la qualité du code ? (linting, conventions, relecture)
- As-tu vérifié des aspects de sécurité ? (validation des entrées, injections, auth)

### 7. Prochaines étapes
- Quelle est la prochaine fonctionnalité ou tâche prévue ?
- Reste-t-il de la dette technique à traiter ?

---

## Format d'entrée du journal enrichi

```markdown
## YYYY-MM-DD
### Réalisations
- ...

### Problèmes rencontrés
- ...

### Décisions
- ...

### Compétences transversales
- ...

### Prochaines étapes
- ...
```
