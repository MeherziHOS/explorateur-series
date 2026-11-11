import {
    afficherSeries,
    afficherDetail,
    fermerDetail,
    afficherFavoris,
    afficherMessage,
    afficherChargement,
    afficherErreur,
    marquerOccupe,
} from "./dom.js";
import { rechercherSeries, chargerSerie, chargerDistribution } from "./api.js";
import { initialiserEvenements } from "./events.js";
import { estFavori, ajouterAuxFavoris, retirerDesFavoris } from "./favoris.js";

// État de l'application
const choixTri = document.querySelector("#choix-tri");

let resultatsCourants = [];
let favoris = [];

// Journalisation des actions
function journaliser(action, ...details) {
    console.log("[Explorateur]", action, ...details);
}

// Trier les séries sans modifier le tableau original
function trierSeries(liste, critere) {
    if (critere === "titre") {
        return [...liste].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (critere === "note") {
        return [...liste].sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0));
    }

    return [...liste];
}

// Ouvrir la fiche détaillée d'une série
async function ouvrirDetail(idSerie) {
    afficherChargement("Chargement de la fiche...");

    try {
        const [serie, distribution] = await Promise.all([
            chargerSerie(idSerie),
            chargerDistribution(idSerie),
        ]);

        afficherMessage("");
        afficherDetail(serie, distribution);
    } catch (erreur) {
        afficherErreur(erreur.message);
    } finally {
        marquerOccupe(false);
    }
}

// Relier les événements aux fonctionnalités
initialiserEvenements({
    surRecherche: async (terme) => {
        afficherChargement("Recherche en cours...");
        marquerOccupe(true);

        try {
            const resultats = await rechercherSeries(terme);

            resultatsCourants = resultats;

            afficherSeries(trierSeries(resultatsCourants, choixTri.value), favoris);

            afficherMessage("");
            journaliser("Recherche effectuée", terme);
        } catch (erreur) {
            resultatsCourants = [];
            afficherSeries([], favoris);
            afficherErreur(erreur.message);
        } finally {
            marquerOccupe(false);
        }
    },

    surTri: (critere) => {
        const listeTriee = trierSeries(resultatsCourants, critere);
        afficherSeries(listeTriee, favoris);
        journaliser("Tri effectué", critere);
    },

    surDetail: (idSerie) => {
        ouvrirDetail(idSerie);
    },

    surFavori: async (idSerie) => {
        try {
            const serie = await chargerSerie(idSerie);

            if (estFavori(favoris, idSerie)) {
                favoris = retirerDesFavoris(favoris, idSerie);
                journaliser("Favori retiré", serie.name);
            } else {
                favoris = ajouterAuxFavoris(favoris, serie);
                journaliser("Favori ajouté", serie.name);
            }

            afficherSeries(trierSeries(resultatsCourants, choixTri.value), favoris);

            afficherFavoris(favoris);
        } catch (erreur) {
            afficherErreur(erreur.message);
        }
    },

    surFermer: () => {
        fermerDetail();
    },
});

// Affichage initial
async function initialiserApplication() {
    afficherChargement("Chargement des séries...");
    marquerOccupe(true);

    try {
        const resultats = await rechercherSeries("");

        resultatsCourants = resultats;

        afficherSeries(trierSeries(resultatsCourants, choixTri.value), favoris);

        afficherMessage("");
    } catch (erreur) {
        afficherErreur(erreur.message);
    } finally {
        marquerOccupe(false);
    }

    afficherFavoris(favoris);
}

initialiserApplication();
