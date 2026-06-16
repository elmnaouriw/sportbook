---
name: commit-journal
description: Use when the user asks to commit, create a commit, make a commit, or update the journal de bord. Prompts to update docs/journal.md before committing.
---

# Commit + Journal de bord

Quand l'utilisateur demande de faire un commit :

1. Demande-lui de décrire brièvement ce qui a changé (ou utilise son message si déjà fourni)
2. Ajoute une entrée datée dans `docs/journal.md` avec la description
3. Stage `docs/journal.md` avec les autres fichiers modifiés
4. Fais le commit

## Format de l'entrée du journal

```markdown
## YYYY-MM-DD

- Description concise du changement
```
