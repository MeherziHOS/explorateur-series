import { estFavori } from "./favoris.js";

// Éléments HTML utilisés pour l'affichage
const zoneDetail = document.querySelector("#zone-detail");
const champRecherche = document.querySelector("#champ-recherche");
const zoneFavoris = document.querySelector("#zone-favoris");
const zoneResultats = document.querySelector("#zone-resultats");
// Statuts de TVmaze traduits en français
const STATUTS = {
    Running: "En cours",
    Ended: "Terminée",
    "To Be Determined": "Suite incertaine",
    "In Development": "En préparation",
};
// "2005-01-03" → "2005"
export function extraireAnnee(date) {
    if (!date) {
        return "Année inconnue";
    }
    const [annee] = date.split("-");
    return annee;
}

// ["Drama", "Comedy"] → "Drama, Comedy"
export function texteGenres(genres) {
    if (genres.length === 0) {
        return "Genre non précisé";
    }
    return genres.join(", ");
}

// Convertir le résumé HTML en texte pour l'afficher sans balises
export function texteSansBalises(html) {
    if (!html) {
        return "Pas de résumé disponible.";
    }
    const documentLu = new DOMParser().parseFromString(html, "text/html");
    return documentLu.body.textContent;
}

export function afficherChargement(texte) {
    const zoneMessage = document.querySelector("#zone-message");

    zoneMessage.classList.add("chargement");
    zoneMessage.classList.remove("erreur");
    zoneMessage.textContent = texte;
}
// Affiche un message dans la zone prévue (role="status" : lu par les lecteurs d'écran)
export function afficherMessage(texte) {
    const zoneMessage = document.querySelector("#zone-message");
    zoneMessage.classList.remove("chargement");
    zoneMessage.classList.remove("erreur");
    zoneMessage.textContent = texte;
}
export function afficherErreur(texte) {
    const zoneMessage = document.querySelector("#zone-message");

    zoneMessage.classList.remove("chargement");
    zoneMessage.classList.add("erreur");
    zoneMessage.textContent = texte;
}
export function marquerOccupe(occupe) {
    const zoneResultats = document.querySelector("#zone-resultats");

    zoneResultats.setAttribute("aria-busy", String(occupe));
}
// Construire une carte de série sans utiliser innerHTML
export function creerCarteSerie(
    { id, name: titre, genres, rating: { average: note }, image, premiered },
    favoris,
) {
    const annee = extraireAnnee(premiered);

    const carte = document.createElement("article");
    carte.className = "carte";

    if (image) {
        const affiche = document.createElement("img");
        affiche.className = "carte-affiche";
        affiche.src = image.medium;
        affiche.alt = `Affiche de ${titre}`;
        carte.append(affiche);
    } else {
        const sansAffiche = document.createElement("div");
        sansAffiche.className = "carte-affiche sans-affiche";
        sansAffiche.textContent = "Pas d'affiche";
        carte.append(sansAffiche);
    }

    const corps = document.createElement("div");
    corps.className = "carte-corps";

    const titreCarte = document.createElement("h3");
    titreCarte.className = "carte-titre";
    titreCarte.textContent = titre;

    const infos = document.createElement("p");
    infos.className = "carte-infos";
    infos.textContent = `${annee} · ${texteGenres(genres)}`;

    const texteNote = document.createElement("p");
    texteNote.className = "carte-note";
    texteNote.textContent = note !== null ? `★ ${note} / 10` : "Pas encore notée";

    const actions = document.createElement("div");
    actions.className = "carte-actions";

    const boutonDetail = document.createElement("button");
    boutonDetail.type = "button";
    boutonDetail.className = "bouton bouton-secondaire";
    boutonDetail.dataset.action = "detail";
    boutonDetail.dataset.id = id;
    boutonDetail.textContent = "Voir la fiche";
    boutonDetail.setAttribute("aria-label", `Voir la fiche de ${titre}`);

    const boutonFavori = document.createElement("button");
    boutonFavori.type = "button";
    boutonFavori.className = "bouton bouton-secondaire";
    boutonFavori.dataset.action = "favori";
    boutonFavori.dataset.id = id;

    const dejaFavori = estFavori(favoris, id);
    boutonFavori.textContent = dejaFavori ? "★ Retirer des favoris" : "☆ Ajouter aux favoris";

    boutonFavori.setAttribute("aria-pressed", String(dejaFavori));
    actions.append(boutonDetail, boutonFavori);
    corps.append(titreCarte, infos, texteNote, actions);
    carte.append(corps);
    return carte;
}

// Affiche une liste de séries dans la grille
export function afficherSeries(liste, favoris) {
    zoneResultats.replaceChildren();

    liste.forEach((serie) => {
        zoneResultats.append(creerCarteSerie(serie, favoris));
    });

    if (liste.length === 0) {
        afficherMessage("Aucune série ne correspond à votre recherche.");
    } else {
        afficherMessage(`Séries affichées : ${liste.length}.`);
    }
}
// Ajoute une ligne « terme : valeur » à une liste de définitions <dl>
function ajouterInfo(liste, terme, valeur) {
    const ligne = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = terme;
    dd.textContent = valeur;
    ligne.append(dt, dd);
    liste.append(ligne);
}
// Remplit et affiche la fiche détaillée d'une série
export function afficherDetail(
    {
        name: titre,
        genres,
        premiered,
        ended,
        status,
        network,
        webChannel,
        rating: { average: note },
        image,
        summary,
    },
    distribution,
) {
    zoneDetail.replaceChildren();

    if (image) {
        const affiche = document.createElement("img");
        affiche.className = "detail-affiche";
        affiche.src = image.medium;
        affiche.alt = `Affiche de ${titre}`;
        zoneDetail.append(affiche);
    }

    const texte = document.createElement("div");

    const titreDetail = document.createElement("h2");
    titreDetail.id = "detail-titre";
    titreDetail.tabIndex = -1; // pour pouvoir y placer le focus
    titreDetail.textContent = titre;

    let diffuseur = "Diffuseur inconnu";
    if (network) {
        diffuseur = network.name;
    } else if (webChannel) {
        diffuseur = webChannel.name;
    }

    let periode = `depuis ${extraireAnnee(premiered)}`;
    if (ended) {
        periode = `${extraireAnnee(premiered)} – ${extraireAnnee(ended)}`;
    }

    const infos = document.createElement("dl");
    infos.className = "detail-infos";
    ajouterInfo(infos, "Années", periode);
    ajouterInfo(infos, "Statut", STATUTS[status] || status);
    ajouterInfo(infos, "Diffusion", diffuseur);
    ajouterInfo(infos, "Genres", texteGenres(genres));
    ajouterInfo(infos, "Note", note !== null ? `${note} / 10` : "Pas encore notée");

    const resume = document.createElement("p");
    resume.className = "detail-resume";
    resume.textContent = texteSansBalises(summary); // le texte seul, jamais le HTML reçu
    if (summary) {
        resume.lang = "en"; // les résumés de TVmaze sont en anglais
    }

    const titreDistribution = document.createElement("h3");
    titreDistribution.textContent = "Distribution";

    const listeRoles = document.createElement("ul");
    listeRoles.className = "detail-distribution";
    if (distribution.length === 0) {
        const vide = document.createElement("li");
        vide.textContent = "Distribution non renseignée.";
        listeRoles.append(vide);
    }
    distribution.forEach(({ person, character }) => {
        const ligne = document.createElement("li");
        ligne.textContent = `${person.name} (${character.name})`;
        listeRoles.append(ligne);
    });

    const actions = document.createElement("div");
    actions.className = "detail-actions";
    const boutonFermer = document.createElement("button");
    boutonFermer.type = "button";
    boutonFermer.className = "bouton bouton-secondaire";
    boutonFermer.dataset.action = "fermer";
    boutonFermer.textContent = "Fermer la fiche";
    actions.append(boutonFermer);

    texte.append(titreDetail, infos, resume, titreDistribution, listeRoles, actions);
    zoneDetail.append(texte);
    zoneDetail.hidden = false;
    titreDetail.focus(); // on amène le lecteur (et le lecteur d'écran) sur la fiche
}
// Cache la fiche et ramène le focus sur la recherche
export function fermerDetail() {
    zoneDetail.hidden = true;
    zoneDetail.replaceChildren();
    champRecherche.focus();
}
export function afficherFavoris(favoris) {
    zoneFavoris.replaceChildren();

    if (favoris.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Aucune série favorite pour le moment.";
        zoneFavoris.append(message);
        return;
    }

    favoris.forEach(({ id, name }) => {
        const ligne = document.createElement("li");
        ligne.className = "favori-ligne";

        const titre = document.createElement("span");
        titre.textContent = name;

        const bouton = document.createElement("button");
        bouton.type = "button";
        bouton.className = "bouton bouton-secondaire";
        bouton.dataset.action = "retirer-favori";
        bouton.dataset.id = id;
        bouton.textContent = "Retirer";
        bouton.setAttribute("aria-label", `Retirer ${name} des favoris`);

        ligne.append(titre, bouton);
        zoneFavoris.append(ligne);
    });
}
