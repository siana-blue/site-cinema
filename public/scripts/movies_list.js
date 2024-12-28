function clearMovies() {
  const movies = document.querySelectorAll(".alaffiche article");
  movies.forEach((movie) => movie.remove());
}

async function displayMovies(
  sort = "",
  filter = "",
  startDate = "",
  endDate = ""
) {
  let movies = fetch(
    `/db/movies?sort=${sort}&filter=${filter}&start_date=${startDate}&end_date=${endDate}`
  )
    .then((movies) => movies.json())
    .then((movies) => {
      const listElement = document.querySelector(".alaffiche");

      listElement.insertAdjacentHTML("beforeend", movies.html);
    });
}

displayMovies();

const queryForm = document.querySelector(".alaffiche form");
queryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  clearMovies();

  let filters = "";
  if (queryForm.elements["check_jeunesse"].checked) filters += "Jeunesse";
  if (queryForm.elements["check_coupdecoeur"].checked)
    filters += (filters ? "+" : "") + "Coup_de_coeur";
  if (queryForm.elements["check_patrimoine"].checked)
    filters += (filters ? "+" : "") + "Patrimoine";

  displayMovies(
    queryForm.elements["sorting"].value,
    filters,
    queryForm.elements["start_date"].value,
    queryForm.elements["end_date"].value
  );
});
