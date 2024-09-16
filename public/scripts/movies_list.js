function clearMovies() {
  const movies = document.querySelectorAll(".alaffiche article");
  movies.forEach((movie) => movie.remove());
}

async function displayMovies(sort, limit) {
  let movies = await fetch(
    `http://localhost:3000/db/movie?sort=${sort}&limit=${limit}`
  ).then((movies) => movies.text());

  const listElement = document.querySelector(".alaffiche");
  listElement.insertAdjacentHTML("beforeend", movies);
}

displayMovies("title", "10");

const filterForm = document.querySelector(".alaffiche form");
filterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (filterForm.filters.value) {
    clearMovies();
    displayMovies(filterForm.filters.value, "10");
  }
});
