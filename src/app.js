import { afficherSeries, afficherDetail, fermerDetail, afficherFavoris } from "./dom.js";
import { rechercherSeries, chargerSerie, chargerDistribution } from "./api.js";
import { initialiserEvenements } from "./events.js";
import { estFavori, ajouterAuxFavoris, retirerDesFavoris } from "./favoris.js";

// État de l'application
const choixTri = document.querySelector("#choix-tri");

let resultatsCourants = rechercherSeries("");
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
function ouvrirDetail(idSerie) {
    const serie = chargerSerie(idSerie);
    const distribution = chargerDistribution(idSerie);

    afficherDetail(serie, distribution);
}

// Relier les événements aux fonctionnalités
initialiserEvenements({
    surRecherche: (terme) => {
        resultatsCourants = rechercherSeries(terme);
        afficherSeries(trierSeries(resultatsCourants, choixTri.value), favoris);
    },

    surTri: (critere) => {
        const listeTriee = trierSeries(resultatsCourants, critere);
        afficherSeries(listeTriee, favoris);
        journaliser("Tri effectué", critere);
    },

    surDetail: (idSerie) => {
        ouvrirDetail(idSerie);
    },

    surFavori: (idSerie) => {
        const serie = chargerSerie(idSerie);

        if (!serie) {
            return;
        }

        if (estFavori(favoris, idSerie)) {
            favoris = retirerDesFavoris(favoris, idSerie);
            journaliser("Favori retiré", serie.name);
        } else {
            favoris = ajouterAuxFavoris(favoris, serie);
            journaliser("Favori ajouté", serie.name);
        }

        afficherSeries(trierSeries(resultatsCourants, choixTri.value), favoris);
        afficherFavoris(favoris);
    },

    surFermer: () => {
        fermerDetail();
    },
});

// Affichage initial
afficherSeries(rechercherSeries(""), favoris);
afficherFavoris(favoris);
