const { categories, genres, melodies, categories_melodies } = require('../../../database/models');

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
  getMelodies: async (req, res) => {
    try {
      const { id } = req.params;
      if (isNaN(id)) return res.status(400).send('"category id" should be a number');
      const categoryMelodies = await categories_melodies.findAll({ where: { fk_categories_id: id } });
      const melodiesId = categoryMelodies.map((melody) => melody.fk_melodies_id);

      const result = await melodies.findAll({ where: { id: melodiesId } });
      return res.status(200).json({ Melodies: result });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },
};
