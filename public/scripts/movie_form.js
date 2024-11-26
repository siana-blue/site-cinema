/*
 * Recherche TMDb
 */

const queryInput = document.getElementById("query-input");
const searchButton = document.getElementById("search-movie-btn");
const prevButton = document.getElementById("previous-result-btn");
const nextButton = document.getElementById("next-result-btn");
const previewDiv = document.querySelector(".alaffiche");
const movieHiddenInput = document.getElementById("movie-tmdb-id");

/*
 * Va chercher le contenu HTML mis en forme par PUG pour représenter
 * l'affiche du film dont l'ID TMDB est fourni en paramètre.
 *
 * L'élément de préviisualisation n'est plus "hidden" et est rempli
 * par ce HTML.
 */
function renderMovie(movieId) {
  fetch("/db/info?id=" + movieId)
    .then((movie) => movie.json())
    .then((movie) => {
      previewDiv.classList.remove("hidden");
      previewDiv.innerHTML = "";
      previewDiv.appendChild(document.createElement("h2")).textContent =
        "Prévisualisation";
      previewDiv.insertAdjacentHTML("beforeend", movie.html);
    });
}

/*
 * Met à jour l'état des boutons de recherche (flèches inhibées ou non) en
 * fonction de l'indice actuel dans le tableau des résultats.
 *
 * Puis, appelle renderMovie pour afficher le film en cours dans la preview.
 */
function updateMovieBrowser() {
  const searchIndex = sessionStorage.getItem("search-index") ?? 0;
  const moviesId = JSON.parse(sessionStorage.getItem("search-results"));

  if (searchIndex > 0) prevButton.removeAttribute("disabled");
  else prevButton.setAttribute("disabled", "");
  if (searchIndex < moviesId.length - 1) nextButton.removeAttribute("disabled");
  else nextButton.setAttribute("disabled", "");

  movieHiddenInput.value = moviesId[searchIndex];
  renderMovie(moviesId[searchIndex]);
}

/*
 * Le clic sur le bouton va fetch un tableau d'id TMDB correspondant
 * aux résultats de recherche textuelle de film via l'API TMDB.
 * A noter que TMDB retourne plusieurs tableaux représentant des pages
 * de résultat, seul la première page est prise en compte.
 *
 * Ce tableau de résultat est stocké en sessionStorage.
 * Puis, l'indice de recherche est placé à 0 (ce qui correspond au film
 * à afficher en preview parmi le tableau).
 *
 * La foncton updateMovieBrowser est alors appelée, qui met à jour l'état
 * des boutons de recherche (flèches précédent/suivant inhibées ou non
 * en fonction de l'indice de recherche en cours), et qui appelle la fonction
 * renderMovie pour afficher la preview.
 */
searchButton.addEventListener("click", () => {
  fetch("/db/tmdb?title=" + queryInput.value)
    .then((movie) => movie.json())
    .then((movie) => {
      sessionStorage.setItem("search-results", JSON.stringify(movie));
      sessionStorage.setItem("search-index", 0);
      updateMovieBrowser();
    })
    .catch((err) => console.error(err));
});

nextButton.addEventListener("click", () => {
  sessionStorage.setItem(
    "search-index",
    parseInt(sessionStorage.getItem("search-index")) + 1
  );
  updateMovieBrowser();
});

prevButton.addEventListener("click", () => {
  sessionStorage.setItem(
    "search-index",
    parseInt(sessionStorage.getItem("search-index")) - 1
  );
  updateMovieBrowser();
});

// Script en cas d'ID de film chargé avec la page
/*
 * Dans le cas où, au chargement de ce script, le contrôle movieHiddenInput
 * contient déjà une valeur d'ID, on met à jour la page comme si on
 * avait reçu un résultat de recherche ne contenant que cet ID.
 */
if (movieHiddenInput.value) {
  queryInput.classList.add("hidden");
  searchButton.classList.add("hidden");
  nextButton.classList.add("hidden");
  prevButton.classList.add("hidden");

  sessionStorage.setItem("search-results", `[${movieHiddenInput.value}]`);
  sessionStorage.setItem("search-index", 0);
  updateMovieBrowser();
}

/*
 * Gestion des séances
 */

const addSessionBtn = document.getElementById("session-form-btn");
const sessionDate = document.getElementById("session-date");
const sessionTime = document.getElementById("session-time");
const sessionRoom = document.getElementById("session-room");
const sessionVersion = document.getElementById("session-version");

const sessionsList = document.querySelector(
  "#session-block .current-selection-list"
);
const sessionHidden = document.getElementById("sessions-hid");

let sessionsArr = [];
addSessionBtn.addEventListener("click", () => {
  const session = {
    date: sessionDate.valueAsNumber,
    time: sessionTime.value,
    room: sessionRoom.value,
    version: sessionVersion.value,
  };
  if (session.date && session.time && session.room) {
    if (!sessionsArr.includes(session)) sessionsArr.push(session);

    updateSessionList();
  }
  window.location.href = "#";
});

/*
 * Met à jour la formulaire en fonction du contenu du tableau
 * sessionsArr.
 */
const updateSessionList = function () {
  sessionsList.replaceChildren();
  sessionHidden.value = "";

  sessionsArr.forEach((session) => {
    let divElement = document.createElement("div");
    let pElement = document.createElement("p");
    const date = new Date(session.date);
    pElement.appendChild(
      document.createTextNode(
        date.toLocaleDateString("fr-FR") +
          " " +
          session.time +
          " - Salle " +
          session.room +
          " " +
          (session.version ?? "")
      )
    );
    divElement.appendChild(pElement);
    let btnElement = document.createElement("button");
    btnElement.appendChild(document.createTextNode("\u00d7"));
    btnElement.addEventListener("click", () => {
      removeSession(session);
    });
    divElement.appendChild(btnElement);
    sessionsList.appendChild(divElement);

    sessionHidden.value +=
      (sessionHidden.value ? ";" : "") +
      session.date +
      "," +
      session.time +
      "," +
      session.room +
      (session.version ? "," + session.version : "");
  });
};

const removeSession = function (session) {
  if (sessionsArr.includes(session)) {
    sessionsArr.splice(sessionsArr.indexOf(session), 1);
    updateSessionList();
  }
};

/*
 * Si des sessions existent déjà au chargement de la page,
 * c'est-à-dire si sessionHidden a une valeur,
 * le tableau sessionsArr est renseigné.
 */
if (sessionHidden.value) {
  const tmpSessions = sessionHidden.value.split(";");
  for (let tmpSession of tmpSessions) {
    const tmpSessionValues = tmpSession.split(",");
    let tmp;
    if (tmpSessionValues.length >= 3)
      tmp = {
        date: tmpSessionValues[0],
        time: tmpSessionValues[1],
        room: tmpSessionValues[2],
      };
    if (tmpSessionValues.length >= 4) tmp.version = tmpSessionValues[3];
    sessionsArr.push(tmp);
  }
}

// puis dans tous les cas cette fonction est appelée.
updateSessionList();
