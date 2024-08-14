function clearMovies() {
  const movies = document.querySelectorAll(".alaffiche article");
  movies.forEach((movie) => movie.remove());
}

async function displayMovies(sort, limit) {
  // Penser à rendre les paramètres optionnels et adapter l'url plus tard
  let movies = await fetch(
    `http://localhost:3000/movie/db?sort=${sort}&limit=${limit}`
  ).then((movies) => movies.json());

  const listElement = document.querySelector(".alaffiche");

  movies.forEach(function (movie) {
    let movieElement = document.createElement("article");
    let h3Element = document.createElement("h3");
    h3Element.appendChild(
      document.createTextNode(movie.title.replace("&#x27;", "'"))
    );
    movieElement.appendChild(h3Element);

    let divMainElement = document.createElement("div");
    divMainElement.classList.add("affiche-principal");
    let img = document.createElement("img");
    img.setAttribute("src", movie.imgURL);
    img.setAttribute(
      "alt",
      "Affiche du film " + movie.title.replace("&#x27;", "'")
    );
    img.setAttribute("width", 150);
    img.setAttribute("height", 200);
    divMainElement.appendChild(img);
    let divElement = document.createElement("div");
    let pElement = document.createElement("p");
    pElement.appendChild(document.createTextNode("Réalisé par "));
    let aElement = document.createElement("a");
    aElement.setAttribute("href", movie.director ? movie.director.url : "#");
    aElement.setAttribute("target", "_blank");
    aElement.appendChild(
      document.createTextNode(movie.director ? movie.director.name : "")
    );
    pElement.append(aElement);
    divElement.appendChild(pElement);
    pElement = document.createElement("p");
    pElement.appendChild(document.createTextNode("Avis - "));
    for (let i = 0; i < movie.rating; i++) {
      pElement.append(document.createTextNode("*"));
    }
    divElement.appendChild(pElement);
    divMainElement.appendChild(divElement);

    movieElement.appendChild(divMainElement);

    listElement.appendChild(movieElement);
  });
}

displayMovies("title", "5");

const filterForm = document.querySelector(".alaffiche form");
filterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (filterForm.filters.value) {
    clearMovies();
    displayMovies(filterForm.filters.value, "5");
  }
});
