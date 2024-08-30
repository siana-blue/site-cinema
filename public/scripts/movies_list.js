function clearMovies() {
  const movies = document.querySelectorAll(".alaffiche article");
  movies.forEach((movie) => movie.remove());
}

async function displayMovies(sort, limit) {
  // Penser à rendre les paramètres optionnels et adapter l'url plus tard
  let movies = await fetch(
    `http://localhost:3000/movie/db?sort=${sort}&limit=${limit}`
  ).then((movies) => movies.text());

  const listElement = document.querySelector(".alaffiche");
  listElement.insertAdjacentHTML("beforeend", movies);
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
