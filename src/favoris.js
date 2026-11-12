const CLE_STOCKAGE = "explorateur-series.favoris";
// Vérifier si une série est dans les favoris
export function estFavori(liste, idSerie) {
    return liste.some((serie) => serie.id === idSerie);
}
export function chargerFavoris() {
    try {
        const donnees = localStorage.getItem(CLE_STOCKAGE);

        return donnees ? JSON.parse(donnees) : [];
    } catch (erreur) {
        return [];
    }
}
export function sauvegarderFavoris(liste) {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(liste));
}

// Ajouter une série sans modifier le tableau original
export function ajouterAuxFavoris(liste, serie) {
    if (estFavori(liste, serie.id)) {
        return liste;
    }

    const { summary, ...serieLegere } = serie;
    return [...liste, serieLegere];
}

// Retirer une série sans modifier le tableau original
export function retirerDesFavoris(liste, idSerie) {
    return liste.filter((serie) => serie.id !== idSerie);
}
