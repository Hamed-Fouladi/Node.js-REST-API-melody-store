const { categories, genres } = require('../../../database/models');

module.exports = {
  getGenresWithCategories: (req, res) => {
    genres.findAll({ include: categories })
      .then((genres) => {
        res.status(200).send(genres);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },
};
