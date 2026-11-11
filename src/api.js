// Importer les données locales des séries
import { series, distributions } from "./donnees.js";

const URL_API = "https://api.tvmaze.com";
const MODE_DEMO = false;
const DELAI_DEMO = 800;
function attendre(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
// Lire les données JSON depuis l'API TVmaze
async function lireJSON(chemin) {
    const reponse = await fetch(URL_API + chemin);

    if (!reponse.ok) {
        throw new Error(`TVmaze a répondu avec le code ${reponse.status}`);
    }

    return reponse.json();
}

// Rechercher les séries par titre
export async function rechercherSeries(terme) {
    const recherche = terme.trim().toLowerCase();

    if (MODE_DEMO) {
        await attendre(DELAI_DEMO);

        if (recherche === "panne") {
            throw new Error("Le serveur ne répond pas (panne simulée).");
        }

        return series.filter((serie) => serie.name.toLowerCase().includes(recherche));
    }

    const donnees = await lireJSON(`/search/shows?q=${encodeURIComponent(recherche)}`);

    return donnees.map(({ show }) => show);
}

// Récupérer une série grâce à son identifiant
export async function chargerSerie(idSerie) {
    if (MODE_DEMO) {
        await attendre(DELAI_DEMO);

        const serie = series.find((serie) => serie.id === idSerie);

        if (!serie) {
            throw new Error("Cette série est introuvable.");
        }

        return serie;
    }

    return lireJSON(`/shows/${idSerie}`);
}

// Récupérer les acteurs d'une série
export async function chargerDistribution(idSerie) {
    if (MODE_DEMO) {
        await attendre(DELAI_DEMO);

        return distributions[idSerie] || [];
    }

    const donnees = await lireJSON(`/shows/${idSerie}/cast`);

    return donnees.map(({ person, character }) => ({
        person,
        character,
    }));
}
