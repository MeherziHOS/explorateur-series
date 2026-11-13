export function initialiserEvenements({ surRecherche, surTri, surDetail, surFavori, surFermer }) {
    const formRecherche = document.querySelector("#form-recherche");
    const champRecherche = document.querySelector("#champ-recherche");

    // Recherche des séries
    formRecherche.addEventListener("submit", (event) => {
        event.preventDefault();
        surRecherche(champRecherche.value.trim());
    });

    // Tri des résultats
    const choixTri = document.querySelector("#choix-tri");

    choixTri.addEventListener("change", () => {
        surTri(choixTri.value);
    });

    // Actions sur les cartes : détails et favoris
    const zoneResultats = document.querySelector("#zone-resultats");

    zoneResultats.addEventListener("click", (event) => {
        const bouton = event.target.closest("button[data-action]");

        if (!bouton) {
            return;
        }

        const idSerie = Number(bouton.dataset.id);

        if (bouton.dataset.action === "detail") {
            surDetail(idSerie);
        }

        if (bouton.dataset.action === "favori") {
            surFavori(idSerie);
        }
    });

    // Retrait depuis la liste des favoris
    const zoneFavoris = document.querySelector("#zone-favoris");

    zoneFavoris.addEventListener("click", (event) => {
        const bouton = event.target.closest('button[data-action="retirer-favori"]');

        if (!bouton) {
            return;
        }

        surFavori(Number(bouton.dataset.id));
        document.querySelector("#favoris-titre").focus();
    });

    // Fermeture de la fiche détaillée
    const zoneDetail = document.querySelector("#zone-detail");

    zoneDetail.addEventListener("click", (event) => {
        const bouton = event.target.closest("button[data-action]");

        if (!bouton) {
            return;
        }

        if (bouton.dataset.action === "fermer") {
            surFermer();
        }

        if (bouton.dataset.action === "favori") {
            surFavori(Number(bouton.dataset.id));
        }
    });
}
