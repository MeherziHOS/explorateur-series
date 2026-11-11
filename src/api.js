// Importer les données locales des séries
import { series, distributions } from "./donnees.js";
const DELAI = 800;

// Rechercher les séries par titre
export function rechercherSeries(terme) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const recherche = terme.trim().toLowerCase();

            if (recherche === "panne") {
                reject(new Error("Le serveur ne répond pas (panne simulée)."));
                return;
            }

            const resultats = series.filter((serie) =>
                serie.name.toLowerCase().includes(recherche),
            );

            resolve(resultats);
        }, DELAI);
    });
}

// Récupérer une série grâce à son identifiant
export function chargerSerie(idSerie) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const serie = series.find((serie) => serie.id === idSerie);

            if (!serie) {
                reject(new Error("Cette série est introuvable."));
                return;
            }

            resolve(serie);
        }, DELAI);
    });
}

// Récupérer les acteurs d'une série
export function chargerDistribution(idSerie) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const acteurs = distributions[idSerie] || [];

            resolve(acteurs);
        }, DELAI);
    });
}
