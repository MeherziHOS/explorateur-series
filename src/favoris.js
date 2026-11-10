// Vérifier si une série est dans les favoris
export function estFavori(liste, idSerie) {
    return liste.some((serie) => serie.id === idSerie);
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
