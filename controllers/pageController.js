const { tmdbIDMovie, movieSessions } = require("../db");
const { weekDates, textFromDate } = require("../utils");

exports.index_page = async (req, res, next) => {
  res.status(200).render("index", {
    layout: "layout-accueil",
    scripts: ["main"],
  });
};

exports.planning_page = async (req, res, next) => {
  const dates = weekDates();
  let weeks = [];
  const movies = await Promise.all(
    dates.map((week) => {
      // {Titre de la semaine, date du premier jour}
      weeks.push({
        name:
          "Semaine du " +
          week.firstDay.getDate() +
          " / " +
          (week.firstDay.getMonth() + 1) +
          " au " +
          week.lastDay.getDate() +
          " / " +
          (week.lastDay.getMonth() + 1),
        firstDay: week.firstDay,
      });
      const mov = movieSessions([], week.firstDay, week.lastDay);
      return mov;
    })
  );
  // Tableau [[film sem 1, film sem 1], ..., [film sem n, ...]]
  try {
    for (mov of movies) {
      for (m of mov) {
        m.movie = await tmdbIDMovie(m.tmdb_id);
      }
    }
  } catch (err) {
    next(err);
  }
  let edit = false;
  if (req.cookies.jwtToken) edit = true;
  res.status(200).render("programmation", {
    weeks,
    movies,
    edit,
  });
};

exports.children_page = async (req, res, next) => {
  const dates = weekDates();
  let weeks = [];
  const movies = await Promise.all(
    dates.map((week) => {
      // {Titre de la semaine, date du premier jour}
      weeks.push({
        name:
          "Semaine du " +
          week.firstDay.getDate() +
          " / " +
          (week.firstDay.getMonth() + 1) +
          " au " +
          week.lastDay.getDate() +
          " / " +
          (week.lastDay.getMonth() + 1),
        firstDay: week.firstDay,
      });
      const mov = movieSessions(["Jeunesse"], week.firstDay, week.lastDay);
      return mov;
    })
  );
  // Tableau [[film sem 1, film sem 1], ..., [film sem n, ...]]
  try {
    for (mov of movies) {
      for (m of mov) {
        m.movie = await tmdbIDMovie(m.tmdb_id);
        for (s of m.sessions) {
          s.dateText = textFromDate(s.date);
        }
      }
    }
  } catch (err) {
    next(err);
  }
  res.status(200).render("jeunesse", {
    weeks,
    movies,
  });
};

exports.info_page = async (req, res, next) => {
  res.status(200).render("info-pratique", {
    theme: "theme-chauvigny",
  });
};
