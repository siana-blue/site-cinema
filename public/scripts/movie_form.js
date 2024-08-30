const actorsSelect = document.getElementById("actors");
const actorsCurSel = document.querySelector(
  "#actors + .current-selection-list"
);

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

const updateActorList = function () {
  actorsCurSel.replaceChildren();

  actorsHiddenInput.value = "";

  actorsArr.forEach((actor) => {
    const actorId = actor.split(";")[0];
    actorsHiddenInput.value +=
      (actorsHiddenInput.value === "" ? "" : ";") + actorId;

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
};

const removeActorSelection = function (actor) {
  if (actorsArr.includes(actor)) {
    actorsArr.splice(actorsArr.indexOf(actor), 1);
    updateActorList();
  }
};

updateActorList();
