// Jeu de données local : 10 séries au format de l'API TVmaze (https://www.tvmaze.com/api).
// Extrait de vraies réponses de l'API (13/10/2026), réduit aux propriétés utiles.
// Données TVmaze sous licence CC BY-SA 4.0 : https://creativecommons.org/licenses/by-sa/4.0/
// Remarquez les valeurs null : une série sans note (rating.average), sans résumé (summary),
// sans date de fin (ended), diffusée par une chaîne (network) ou par une plateforme (webChannel).

const series = [
    {
        id: 7092,
        name: "Kaamelott",
        language: "French",
        genres: ["Drama", "Comedy", "History"],
        status: "Ended",
        premiered: "2005-01-03",
        ended: "2009-10-31",
        rating: { average: null },
        network: {
            name: "M6",
            country: { name: "France" },
        },
        webChannel: null,
        image: {
            medium: "https://static.tvmaze.com/uploads/images/medium_portrait/345/863865.jpg",
            original: "https://static.tvmaze.com/uploads/images/original_untouched/345/863865.jpg",
        },
        summary:
            "<p><b>Kaamelott</b>'s four first seasons (called \"livres\", French for \"books\") were composed of short episodes (about 3 and a half minutes each.) Early seasons consisted of humorous depictions of daily life at King Arthur's court and of the knights' ineffective quest for the Holy Grail; but as the author grew more self-confident, it got spiced by more and more continuity (including Retcon at some point), half-serious story arcs. The fifth season then had longer episodes (7 minutes) and a Darker and Edgier tone. The sixth season depicts Arthur's youth in Rome (partly filmed in the décors of the series of the same name, in Cinecittà.)</p>",
    },
    {
        id: 50701,
        name: "Lupin",
        language: "French",
        genres: ["Drama", "Adventure", "Crime"],
        status: "Running",
        premiered: "2021-01-08",
        ended: null,
        rating: { average: 7.4 },
        network: null,
        webChannel: { name: "Netflix" },
        image: {
            medium: "https://static.tvmaze.com/uploads/images/medium_portrait/603/1507749.jpg",
            original: "https://static.tvmaze.com/uploads/images/original_untouched/603/1507749.jpg",
        },
        summary:
            "<p>Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.</p>",
    },
    {
        id: 45295,
        name: "Arsène Lupin",
        language: "French",
        genres: ["Comedy", "Action", "Adventure"],
        status: "Ended",
        premiered: "1971-03-18",
        ended: "1974-02-16",
        rating: { average: null },
        network: {
            name: "ORTF",
            country: { name: "France" },
        },
        webChannel: null,
        image: {
            medium: "https://static.tvmaze.com/uploads/images/medium_portrait/229/573852.jpg",
            original: "https://static.tvmaze.com/uploads/images/original_untouched/229/573852.jpg",
        },
        summary:
            "<p>The adventures of the iconic gentleman-burglar, loosely adapted from Maurice Leblanc's pages.</p>",
    },
    {
        id: 82500,
        name: "Belfort & Lupin",
        language: "French",
        genres: ["Adventure"],
        status: "Running",
        premiered: "2025-02-10",
        ended: null,
        rating: { average: null },
        network: {
            name: "France 4",
            country: { name: "France" },
        },
        webChannel: null,
        image: {
            medium: "https://static.tvmaze.com/uploads/images/medium_portrait/555/1388073.jpg",
            original: "https://static.tvmaze.com/uploads/images/original_untouched/555/1388073.jpg",
        },
        summary: null,
    },
    {
        id: 6131,
        name: "Le Bureau des Légendes",
        language: "French",
        genres: ["Drama", "Espionage"],
        status: "Ended",
        premiered: "2015-04-27",
        ended: "2020-05-04",
        rating: { average: 7.9 },
        network: {
            name: "Canal+",
            country: { name: "France" },
        },
        webChannel: null,
        image: {
            medium: "https://static.tvmaze.com/uploads/images/medium_portrait/247/619649.jpg",
            original: "https://static.tvmaze.com/uploads/images/original_untouched/247/619649.jpg",
        },
        summary:
            "<p>Within the French secret service, one department known as the DGSE manages the missions of all undercover operatives working under fake identities to identify intelligence sources.</p>",
    },
    {
        id: 7098,
        name: "Dix pour cent",
        language: "French",
        genres: ["Comedy"],
        status: "Ended",
        premiered: "2015-10-14",
        ended: "2020-11-04",
        rating: { average: 8.2 },
        network: {
            name: "France 2",
            country: { name: "France" },
        },
        webChannel: null,
        image: {
            medium: "https://static.tvmaze.com/uploads/images/medium_portrait/26/66432.jpg",
            original: "https://static.tvmaze.com/uploads/images/original_untouched/26/66432.jpg",
        },
        summary:
            "<p>Mathias, Andréa, Gabriel &amp; Arlette are agents in a Talent Agency called ASK. When its founder, Samuel Kerr, who has not taken any vacation for 8 years, dies while on holiday, their entire lives are upheaved. Mathias is being courted by other agencies especially since he has the biggest portfolio of the four.</p><p>Amid all this, they still need to negociate contracts for the people they represent, whether it's Nathalie Baye or Cécile de France, they must make sure that all goes to plan even when they want a way out of a production.</p>",
    },
    {
        id: 1168,
        name: "Les Revenants",
        language: "French",
        genres: ["Drama", "Fantasy", "Horror"],
        status: "Ended",
        premiered: "2012-11-26",
        ended: "2015-10-19",
        rating: { average: 7.6 },
        network: {
            name: "Canal+",
            country: { name: "France" },
        },
        webChannel: null,
        image: {
            medium: "https://static.tvmaze.com/uploads/images/medium_portrait/272/680355.jpg",
            original: "https://static.tvmaze.com/uploads/images/original_untouched/272/680355.jpg",
        },
        summary:
            "<p><b>Les Revenants</b> is a unique, stylish and powerful supernatural drama. It follows the residents of a small French alpine town as they come to terms with a series of mysterious and unbelievable occurrences. As a small group of unknowingly deceased men, women and children return from the dead and attempt to re-join the family and friends they left behind years before, the town begins to experience a series of chilling local murders….Beautifully filmed, expertly plotted, and featuring superbly believable performances and an unforgettably atmospheric soundtrack by cult Scottish group Mogwai, The Returned is the most original and enthralling series in years.</p>",
    },
    {
        id: 2993,
        name: "Stranger Things",
        language: "English",
        genres: ["Drama", "Horror", "Science-Fiction"],
        status: "Ended",
        premiered: "2016-07-15",
        ended: "2025-12-31",
        rating: { average: 8.4 },
        network: null,
        webChannel: { name: "Netflix" },
        image: {
            medium: "https://static.tvmaze.com/uploads/images/medium_portrait/595/1489169.jpg",
            original: "https://static.tvmaze.com/uploads/images/original_untouched/595/1489169.jpg",
        },
        summary:
            "<p>When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.</p>",
    },
    {
        id: 55138,
        name: "Arcane: League of Legends",
        language: "English",
        genres: ["Action", "Adventure", "Fantasy"],
        status: "Ended",
        premiered: "2021-11-06",
        ended: "2024-11-23",
        rating: { average: 8.5 },
        network: null,
        webChannel: { name: "Netflix" },
        image: {
            medium: "https://static.tvmaze.com/uploads/images/medium_portrait/536/1340287.jpg",
            original: "https://static.tvmaze.com/uploads/images/original_untouched/536/1340287.jpg",
        },
        summary:
            "<p>Set in utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions — and the power that will tear them apart.</p>",
    },
    {
        id: 335,
        name: "Sherlock",
        language: "English",
        genres: ["Drama", "Crime", "Mystery"],
        status: "Ended",
        premiered: "2010-07-25",
        ended: "2017-01-15",
        rating: { average: 8.9 },
        network: {
            name: "BBC One",
            country: { name: "United Kingdom" },
        },
        webChannel: null,
        image: {
            medium: "https://static.tvmaze.com/uploads/images/medium_portrait/171/428042.jpg",
            original: "https://static.tvmaze.com/uploads/images/original_untouched/171/428042.jpg",
        },
        summary:
            "<p>Sherlock Holmes and Dr. John Watson's adventures in 21st Century London. A thrilling, funny, fast-paced contemporary reimagining of the Arthur Conan Doyle classic.</p>",
    },
];

// Distribution (4 premiers rôles au plus), rangée par identifiant de série.
// Deux séries n'ont pas de distribution dans ce jeu de données.
const distributions = {
    335: [
        {
            person: { name: "Benedict Cumberbatch" },
            character: { name: "Sherlock Holmes" },
        },
        {
            person: { name: "Martin Freeman" },
            character: { name: "Dr. John Watson" },
        },
    ],
    1168: [
        {
            person: { name: "Alix Poisson" },
            character: { name: "Laure" },
        },
        {
            person: { name: "Ana Girardot" },
            character: { name: "Lucy Clarsen" },
        },
        {
            person: { name: "Anne Consigny" },
            character: { name: "Claire" },
        },
        {
            person: { name: "Clotilde Hesme" },
            character: { name: "Adèle" },
        },
    ],
    2993: [
        {
            person: { name: "Winona Ryder" },
            character: { name: "Joyce Byers" },
        },
        {
            person: { name: "Caleb McLaughlin" },
            character: { name: "Lucas Sinclair" },
        },
        {
            person: { name: "Finn Wolfhard" },
            character: { name: "Mike Wheeler" },
        },
        {
            person: { name: "Gaten Matarazzo" },
            character: { name: "Dustin Henderson" },
        },
    ],
    6131: [
        {
            person: { name: "Mathieu Kassovitz" },
            character: { name: "Guillaume Debailly" },
        },
        {
            person: { name: "Sara Giraudeau" },
            character: { name: "Marina Loiseau" },
        },
        {
            person: { name: "Florence Loiret-Caille" },
            character: { name: "Marie-Jeanne Duthilleul" },
        },
        {
            person: { name: "Jean-Pierre Darroussin" },
            character: { name: "Henri Duflot" },
        },
    ],
    7092: [
        {
            person: { name: "Alexandre Astier" },
            character: { name: "Arthur" },
        },
        {
            person: { name: "Lionnel Astier" },
            character: { name: "Léodagan" },
        },
        {
            person: { name: "Franck Pitiot" },
            character: { name: "Perceval" },
        },
        {
            person: { name: "Anne Girouard" },
            character: { name: "Guenièvre" },
        },
    ],
    7098: [
        {
            person: { name: "Fanny Sidney" },
            character: { name: "Camille Valentini" },
        },
        {
            person: { name: "Camille Cottin" },
            character: { name: "Andréa Martel" },
        },
        {
            person: { name: "Thibault de Montalembert" },
            character: { name: "Mathias Barneville" },
        },
        {
            person: { name: "Stéfi Celma" },
            character: { name: "Sofia Leprince" },
        },
    ],
    50701: [
        {
            person: { name: "Omar Sy" },
            character: { name: "Assane Diop" },
        },
    ],
    55138: [
        {
            person: { name: "Kevin Alejandro" },
            character: { name: "Jayce" },
        },
        {
            person: { name: "Hailee Steinfeld" },
            character: { name: "Vi" },
        },
        {
            person: { name: "Harry Lloyd" },
            character: { name: "Viktor" },
        },
        {
            person: { name: "Toks Olagundoye" },
            character: { name: "Mel Medarda" },
        },
    ],
};
