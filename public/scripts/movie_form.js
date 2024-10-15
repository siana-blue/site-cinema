/*
 * Recherche TMDb
 */

const queryInput = document.getElementById("query-input");
const searchButton = document.getElementById("search-movie-btn");
const prevButton = document.getElementById("previous-result-btn");
const nextButton = document.getElementById("next-result-btn");
const previewDiv = document.querySelector(".alaffiche");
const movieHiddenInput = document.getElementById("movie-tmdb-id");

function renderMovie(movieId) {
  fetch("/info/movie?id=" + movieId)
    .then((movie) => movie.json())
    .then((movie) =>
      fetch("/info/movie/render", {
        method: "POST",
        body: JSON.stringify({ movie: movie }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    )
    .then((movie) => movie.text())
    .then((movie) => {
      previewDiv.classList.remove("hidden");
      previewDiv.innerHTML = "";
      previewDiv.appendChild(document.createElement("h2")).textContent =
        "Prévisualisation";
      previewDiv.insertAdjacentHTML("beforeend", movie);
    });
}

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

searchButton.addEventListener("click", () => {
  fetch("/info/movie?title=" + queryInput.value)
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
  if (sessionssArr.includes(session)) {
    sessionsArr.splice(sessionssArr.indexOf(session), 1);
    updateSessionList();
  }
};

updateSessionList();
