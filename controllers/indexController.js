exports.index_page = async (req, res, next) => {
  res.status(200).render("index", {
    layout: "layout-accueil",
  });
};
