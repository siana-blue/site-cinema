/*
 * Retourne un tableau de couple de dates, correspondant au début
 * et à la fin de semaines allant du mercredi au mardi.
 *
 * La date de départ est la date actuelle.
 *
 * Le tableau retourné est de la forme :
 * [[mercredi, mardi], [mercredi, mardi] ... x4]
 */
exports.weekDates = function () {
  let weeks = [];

  let wednesday = new Date();
  while (wednesday.getDay() !== 3) wednesday.setDate(wednesday.getDate() - 1);
  let tuesday = new Date(wednesday);
  tuesday.setDate(wednesday.getDate() + 6);
  for (let i = 0; i < 4; i++) {
    weeks.push({ firstDay: new Date(wednesday), lastDay: new Date(tuesday) });

    wednesday.setDate(wednesday.getDate() + 7);
    tuesday.setDate(tuesday.getDate() + 7);
  }

  return weeks;
};

/*
 * Convertit un texte au format yyyy-mm-dd en l'objet Date
 * correspondant.
 */
exports.dateFromText = function (dateText) {
  if (!dateText) return undefined;

  const dayMonthYear = dateText.split("-");

  let dt = new Date();
  dt.setUTCDate(dayMonthYear[2]);
  dt.setUTCMonth(dayMonthYear[1] - 1);
  dt.setUTCFullYear(dayMonthYear[0]);
  dt.setUTCHours(0);
  dt.setUTCMinutes(0);
  dt.setUTCSeconds(0);
  dt.setUTCMilliseconds(0);

  return dt;
};
