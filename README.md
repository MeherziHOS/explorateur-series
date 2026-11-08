# Mon explorateur de séries : kit de départ

Le projet fil rouge de la mission « JavaScript moderne : préparation à React ». Ce kit contient une petite application **qui fonctionne déjà** : elle affiche dix séries, permet d'en chercher une par son titre et d'ouvrir sa fiche détaillée. Son code est volontairement écrit « à l'ancienne ». Fiche après fiche, vous allez le moderniser (déstructuration, spread, modules, promesses, `async`/`await`), puis le brancher sur une vraie API, celle de TVmaze.

## Installer le kit (fiche 1)

1. Décompressez le fichier .zip, puis déplacez le dossier `explorateur-series` dans `C:\dev` : vous obtenez `C:\dev\explorateur-series`.
2. Ouvrez ce dossier dans VS Code (Fichier › Ouvrir le dossier).
3. Ouvrez `index.html` **par un double-clic** dans l'Explorateur de fichiers : les dix séries s'affichent.

## Ce que contient le kit

| Fichier | Rôle |
|---|---|
| `index.html` | La page. La zone de tri et la liste des favoris sont masquées (`hidden`) jusqu'à la fiche 2. |
| `src/style.css` | La feuille de style, **fournie** : vous n'avez pas à la modifier. |
| `src/donnees.js` | Le jeu de données local : 10 séries et leur distribution, au format de l'API TVmaze. |
| `src/app.js` | Le code de l'application, à moderniser. |
| `package.json` | Sert à partir de la fiche 3 : il déclare Vite, le serveur de développement. |
| `.gitignore`, `.gitattributes`, `.editorconfig`, `.prettierrc` | Réglages de Git, de l'éditeur et de Prettier (indentation de 4 espaces). |

## À partir de la fiche 3 : Vite

Les modules JavaScript ne fonctionnent pas en double-clic : la page doit être servie en `http://`. Dans le terminal de VS Code, à la racine du projet :

```powershell
npm install
npm run dev
```

Ouvrez ensuite l'adresse affichée (`http://localhost:5173`). `Ctrl+C` arrête le serveur.

## Règle de sécurité

Les textes reçus d'une API (titres, résumés…) sont affichés avec `textContent`, **jamais** avec `innerHTML` : un texte qui contiendrait du HTML ou un script resterait du simple texte.

## Crédits

Données et affiches : [TVmaze](https://www.tvmaze.com/), sous licence [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Extrait de vraies réponses de l'API, enregistrées le 13/10/2026. Les résumés de TVmaze sont en anglais.
