async function displayMovies(sort, limit) {
  // Penser à rendre les paramètres optionnels et adapter l'url plus tard
  let movies = await fetch(
    `http://localhost:3000/movie/db?sort=${sort}&limit=${limit}`
  ).then((movies) => movies.json());

  const listElement = document.querySelector(".alaffiche");

  movies.forEach(function (movie) {
    let movieElement = document.createElement("article");
    let h3Element = document.createElement("h3");
    h3Element.appendChild(document.createTextNode(movie.title));
    movieElement.appendChild(h3Element);

    let divMainElement = document.createElement("div");
    divMainElement.classList.add("affiche-principal");
    let img = document.createElement("img");
    img.setAttribute("src", movie.imgURL);
    img.setAttribute("alt", "Affiche du film " + movie.title);
    img.setAttribute("width", 150);
    img.setAttribute("height", 200);
    divMainElement.appendChild(img);
    let divElement = document.createElement("div");
    let pElement = document.createElement("p");
    pElement.appendChild(document.createTextNode("Réalisé par "));
    let aElement = document.createElement("a");
    aElement.setAttribute("href", "#");
    aElement.appendChild(document.createTextNode(movie.director));
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
