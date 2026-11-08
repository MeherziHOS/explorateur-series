// =========================================================
// Mon explorateur de séries : kit de départ
// Ce code fonctionne, mais il est écrit « à l'ancienne » : il lit les données
// propriété après propriété. Fiche après fiche, vous allez le moderniser
// (déstructuration, spread, modules, asynchrone), puis le brancher sur l'API TVmaze.
// Les données viennent de donnees.js, chargé juste avant ce fichier :
// les constantes series et distributions y sont définies.
// =========================================================

// ===== Éléments de la page =====
const formRecherche = document.querySelector("#form-recherche");
const champRecherche = document.querySelector("#champ-recherche");
const zoneMessage = document.querySelector("#zone-message");
const zoneDetail = document.querySelector("#zone-detail");
const zoneResultats = document.querySelector("#zone-resultats");

// Statuts de TVmaze traduits en français
const STATUTS = {
    Running: "En cours",
    Ended: "Terminée",
    "To Be Determined": "Suite incertaine",
    "In Development": "En préparation",
};

// ===== Petites fonctions utiles =====

// "2005-01-03" → "2005"
function extraireAnnee(date) {
    if (!date) {
        return "Année inconnue";
    }
    const [annee] = date.split("-");
    return annee;
}

// ["Drama", "Comedy"] → "Drama, Comedy"
function texteGenres(genres) {
    if (genres.length === 0) {
        return "Genre non précisé";
    }
    return genres.join(", ");
}

// Le résumé de TVmaze contient des balises HTML (<p>, <b>…) : on n'en garde que le texte.
// DOMParser lit le HTML sans l'afficher ni l'exécuter ; textContent en extrait le texte.
function texteSansBalises(html) {
    if (!html) {
        return "Pas de résumé disponible.";
    }
    const documentLu = new DOMParser().parseFromString(html, "text/html");
    return documentLu.body.textContent;
}

// Affiche un message dans la zone prévue (role="status" : lu par les lecteurs d'écran)
function afficherMessage(texte) {
    zoneMessage.textContent = texte;
}

// ===== Cartes des résultats =====

// Crée la carte d'une série : uniquement createElement et textContent, jamais innerHTML
function creerCarteSerie({ id, name: titre, genres, rating: { average: note }, image, premiered }) {
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

    actions.append(boutonDetail);
    corps.append(titreCarte, infos, texteNote, actions);
    carte.append(corps);
    return carte;
}

// Affiche une liste de séries dans la grille
function afficherSeries(liste) {
    zoneResultats.replaceChildren(); // vide la grille

    liste.forEach((serie) => {
        zoneResultats.append(creerCarteSerie(serie));
    });

    if (liste.length === 0) {
        afficherMessage("Aucune série ne correspond à votre recherche.");
    } else {
        afficherMessage(`Séries affichées : ${liste.length}.`);
    }
}

// ===== Fiche détaillée =====

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
function afficherDetail(
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

// Cherche la série et sa distribution dans les données, puis affiche la fiche
function ouvrirDetail(idSerie) {
    const serie = series.find((uneSerie) => uneSerie.id === idSerie);
    const distribution = distributions[idSerie] || [];
    afficherDetail(serie, distribution);
}

// Cache la fiche et ramène le focus sur la recherche
function fermerDetail() {
    zoneDetail.hidden = true;
    zoneDetail.replaceChildren();
    champRecherche.focus();
}

// ===== Événements =====

// Recherche : on filtre les séries dont le titre contient le texte saisi
formRecherche.addEventListener("submit", (event) => {
    event.preventDefault();
    const terme = champRecherche.value.trim().toLowerCase();
    const resultats = series.filter((serie) => serie.name.toLowerCase().includes(terme));
    afficherSeries(resultats);
});

// Délégation : un seul écouteur pour tous les boutons « Voir la fiche » de la grille
zoneResultats.addEventListener("click", (event) => {
    const bouton = event.target.closest("button[data-action]");
    if (!bouton) {
        return;
    }
    if (bouton.dataset.action === "detail") {
        ouvrirDetail(Number(bouton.dataset.id));
    }
});

zoneDetail.addEventListener("click", (event) => {
    if (event.target.closest("[data-action='fermer']")) {
        fermerDetail();
    }
});

// ===== Démarrage : on affiche toutes les séries du jeu de données =====
afficherSeries(series);
