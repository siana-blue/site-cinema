const actorsSelect = document.getElementById("actors");
const actorsCurSel = document.querySelector(
  "#actors + .current-selection-list"
);
// J'utilise le hidden tant que je ne sais pas faire mieux (méthode "hidden")
const actorsHiddenInput = document.querySelector("#actors ~ input");

let actorsArr = [];
const initActorEleList = document.querySelectorAll(
  ".current-selection-list div p"
);
initActorEleList.forEach((a) => {
  actorsArr.push(a.textContent);
});

actorsSelect.addEventListener("change", function () {
  if (!actorsArr.includes(this.value)) {
    actorsArr.push(this.value);

    updateActorList();
  }
});

// Méthode fetch non maîtrisée, je ne parviens pas à
// render les fichiers PUG par cette méthode
// ==> méthode "hidden" en attendant
// Elle s'étend à moviesController.js
/*
const movieForm = document.getElementById("movie-form");
movieForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let data = new FormData(movieForm);
  let actIds = [];
  actorsArr.forEach((actor) => {
    actIds.push(actor.split(";")[0]);
  });

  data.append("actors_id", actIds);

  switch (event.submitter.id) {
    case "movie-preview-btn":
      fetch("http://localhost:3000/movie/form", {
        method: "POST",
        body: data,
      });
      break;
    case "movie-create-btn":
      fetch("http://localhost:3000/movie/create", {
        method: "POST",
        body: data,
      });
      break;
  }
});
*/

const updateActorList = function () {
  actorsCurSel.replaceChildren();

  // Utilisé temporairement (méthode hidden)
  actorsHiddenInput.value = "";

  actorsArr.forEach((actor) => {
    // Méthode "hidden"
    const actorId = actor.split(";")[0];
    actorsHiddenInput.value +=
      (actorsHiddenInput.value === "" ? "" : ";") + actorId;
    // ----------------

    const actorName = actor.split(";")[1];

    let divElement = document.createElement("div");
    let pElement = document.createElement("p");
    pElement.appendChild(document.createTextNode(actorName));
    divElement.appendChild(pElement);
    let btnElement = document.createElement("button");
    btnElement.appendChild(document.createTextNode("\u00d7"));
    btnElement.addEventListener("click", () => {
      removeActorSelection(actor);
    });
    divElement.appendChild(btnElement);
    actorsCurSel.appendChild(divElement);
  });
  console.log(actorsHiddenInput.value);
};

const removeActorSelection = function (actor) {
  if (actorsArr.includes(actor)) {
    actorsArr.splice(actorsArr.indexOf(actor), 1);
    updateActorList();
  }
};

updateActorList();
