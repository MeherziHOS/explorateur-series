// Importer les données locales des séries
import { series, distributions } from "./donnees.js";

// Rechercher les séries par titre
export function rechercherSeries(terme) {
    const recherche = terme.trim().toLowerCase();

    return series.filter((serie) => serie.name.toLowerCase().includes(recherche));
}

// Récupérer une série et de sa distribution grâce à son identifiant
export function chargerSerie(idSerie) {
    return series.find((serie) => serie.id === idSerie);
}

// Récupérer les acteurs d'une série
export function chargerDistribution(idSerie) {
    return distributions[idSerie] || [];
}
