# Explorateur de séries

Projet fil rouge réalisé dans le cadre de ma formation **Concepteur Développeur d'Applications (CDA)** à l'AFPA.

**Module : JavaScript moderne — Préparation à React (fiches 1 à 9).**

## Présentation

Application web permettant de rechercher des séries télévisées grâce à l'API TVmaze, de consulter leurs informations et de gérer une liste personnelle de favoris.

Le projet a été modernisé progressivement, depuis un code JavaScript classique jusqu'à une architecture modulaire avec gestion centralisée de l'état.

## Fonctionnalités

- Recherche de séries avec l'API TVmaze.
- Affichage des résultats sous forme de cartes.
- Tri par titre ou par note.
- Consultation des fiches détaillées et des acteurs.
- Ajout et retrait des favoris.
- Sauvegarde des favoris avec `localStorage`.
- Gestion des erreurs HTTP et réseau.
- Messages de chargement et prise en compte de l'accessibilité.
- Mode démonstration avec données locales.

## Technologies utilisées

- HTML5 et CSS3
- JavaScript ES6+
- Modules JavaScript (`import` / `export`)
- Destructuring, spread et rest
- Promesses, `async` / `await`
- Fetch API et JSON
- `localStorage`
- Vite
- Git et GitHub

## Architecture du projet

| Fichier          | Rôle                                                  |
| ---------------- | ----------------------------------------------------- |
| `index.html`     | Structure de la page                                  |
| `src/style.css`  | Mise en forme                                         |
| `src/app.js`     | État centralisé (`state`) et logique de l'application |
| `src/api.js`     | Requêtes vers l'API TVmaze                            |
| `src/dom.js`     | Création des éléments et rendu de l'interface         |
| `src/events.js`  | Gestion des événements utilisateur                    |
| `src/favoris.js` | Gestion et sauvegarde des favoris                     |
| `src/donnees.js` | Données locales pour le mode démonstration            |

## Installation

Prérequis : Node.js et npm.

```bash
git clone https://github.com/MeherziHOS/explorateur-series.git
cd explorateur-series
npm install
npm run dev
```

Ouvrir l'adresse locale indiquée par Vite dans le terminal.

## Compilation

```bash
npm run build
```

La version de production est générée dans le dossier `dist`.

## Notions JavaScript mises en pratique

- Immutabilité des objets et tableaux.
- Manipulation du DOM.
- Fonctions fléchées et méthodes de tableaux (`map`, `filter`, `find`, `sort`).
- Gestion des événements.
- Programmation asynchrone et gestion des erreurs.
- État centralisé et fonction `rendu(state)`.
- Préparation aux principes de React.

**Remarque :** ce projet est réalisé en JavaScript natif. React n'est pas encore utilisé.

## Sécurité et accessibilité

Les données textuelles reçues de l'API sont affichées avec `textContent`, sans insertion directe de HTML non fiable.

L'application utilise notamment des attributs ARIA, des messages de statut et une gestion du focus.

## Crédits

Données et affiches : [TVmaze](https://www.tvmaze.com/).

Licence des données : [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Projet réalisé dans un cadre pédagogique à l'AFPA.
