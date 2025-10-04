#!/bin/bash

# Ne commit que s'il y a des changements
if ! git diff-index --quiet HEAD --; then
    git add .
    git commit -m "
        initialisation des dossiers/fichiers du backend
                    "
fi

# Pousser sur gitea et origin séparément, sortie silencieuse
git push gitea >/dev/null 2>&1
git push github >/dev/null 2>&1

echo "✅ Push terminé sur gitea et github."
