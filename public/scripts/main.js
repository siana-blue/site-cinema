const coupcoeurResume = document.getElementById("resume-coup-coeur");
const coupcoeurImage = document.querySelector(".coup-coeur img");
const comingsoonImage = document.querySelector("#coming-soon img");

let dt = new Date();
dt = dt.toISOString().split("T")[0];
fetch(`/db/movies?filter=Coup_de_coeur&start_date=${dt}`)
  .then((res) => res.json())
  .then((result) => {
    if (result.data.length > 0) {
      const ind = Math.floor(Math.random() * result.data.length);
      coupcoeurResume.innerText = result.data[ind].tmdb.overview;
      coupcoeurImage.src = result.data[ind].tmdb.poster_path;
      coupcoeurImage.alt = "Affiche du film " + result.data[ind].tmdb.title;
    }
  });

fetch(`/db/movies?start_date=${dt}`)
  .then((res) => res.json())
  .then((result) => {
    if (result.data.length > 0) {
      const ind = Math.floor(Math.random() * result.data.length);
      comingsoonImage.innerText = result.data[ind].tmdb.overview;
      comingsoonImage.src = result.data[ind].tmdb.poster_path;
      comingsoonImage.alt = "Affiche du film " + result.data[ind].tmdb.title;
    }
  });
