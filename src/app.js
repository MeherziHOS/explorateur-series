import {
    afficherSeries,
    afficherDetail,
    fermerDetail,
    afficherFavoris,
    afficherMessage,
    afficherChargement,
    afficherErreur,
    marquerOccupe,
    rendu,
} from "./dom.js";
import { rechercherSeries, chargerSerie, chargerDistribution } from "./api.js";
import { initialiserEvenements } from "./events.js";
import {
    estFavori,
    ajouterAuxFavoris,
    retirerDesFavoris,
    chargerFavoris,
    sauvegarderFavoris,
} from "./favoris.js";

// État centralisé de l'application
let state = {
    terme: "",
    resultats: [],
    tri: document.querySelector("#choix-tri").value,
    chargement: false,
    erreur: null,
    detail: null,
    favoris: chargerFavoris(),
};
function mettreAJourState(changements) {
    state = {
        ...state,
        ...changements,
    };
    rendu(state);
}

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
        return [...liste].sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0));
    }

    return [...liste];
}
async function lancerRecherche(terme) {
    const recherche = terme.trim();

    if (!recherche) {
        mettreAJourState({
            terme: "",
            resultats: [],
            erreur: null,
            chargement: false,
        });
        return;
    }

    mettreAJourState({
        terme: recherche,
        chargement: true,
        erreur: null,
        resultats: [],
    });

    try {
        const resultats = await rechercherSeries(recherche);

        mettreAJourState({
            resultats,
            chargement: false,
        });
    } catch (erreur) {
        mettreAJourState({
            resultats: [],
            erreur: erreur.message,
            chargement: false,
        });
    }
}

async function ouvrirDetail(idSerie) {
    mettreAJourState({
        chargement: true,
        erreur: null,
        detail: null,
    });

    try {
        const [serie, distribution] = await Promise.all([
            chargerSerie(idSerie),
            chargerDistribution(idSerie),
        ]);

        mettreAJourState({
            detail: { serie, distribution },
            chargement: false,
        });
    } catch (erreur) {
        mettreAJourState({
            erreur: erreur.message,
            chargement: false,
        });
    }
}
async function basculerFavori(idSerie) {
    try {
        const serie = await chargerSerie(idSerie);

        const nouveauxFavoris = estFavori(state.favoris, idSerie)
            ? retirerDesFavoris(state.favoris, idSerie)
            : ajouterAuxFavoris(state.favoris, serie);

        sauvegarderFavoris(nouveauxFavoris);

        mettreAJourState({
            favoris: nouveauxFavoris,
        });

        journaliser("Favoris mis à jour", serie.name);
    } catch (erreur) {
        mettreAJourState({
            erreur: erreur.message,
        });
    }
}

// Relier les événements aux fonctionnalités
initialiserEvenements({
    surRecherche: (terme) => {
        lancerRecherche(terme);
    },

    surTri: (critere) => {
        mettreAJourState({ tri: critere });
    },

    surDetail: (idSerie) => {
        ouvrirDetail(idSerie);
    },

    surFavori: (idSerie) => {
        basculerFavori(idSerie);
    },

    surFermer: () => {
        mettreAJourState({ detail: null });
        fermerDetail();
    },
});
// Affichage initial
function initialiserApplication() {
    rendu(state);
}

initialiserApplication();

initialiserApplication();
