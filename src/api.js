// Importer les données locales des séries
import { series, distributions } from "./donnees.js";
const DELAI = 800;
function attendre(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// Rechercher les séries par titre
export async function rechercherSeries(terme) {
    await attendre(DELAI);

    const recherche = terme.trim().toLowerCase();

    if (recherche === "panne") {
        throw new Error("Le serveur ne répond pas (panne simulée).");
    }

    const resultats = series.filter((serie) => serie.name.toLowerCase().includes(recherche));

    return resultats;
}

// Récupérer une série grâce à son identifiant
export async function chargerSerie(idSerie) {
    await attendre(DELAI);

    const serie = series.find((serie) => serie.id === idSerie);

    if (!serie) {
        throw new Error("Cette série est introuvable.");
    }

    return serie;
}

// Récupérer les acteurs d'une série
export async function chargerDistribution(idSerie) {
    await attendre(DELAI);

    const acteurs = distributions[idSerie] || [];

    return acteurs;
}
