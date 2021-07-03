const { categories, genres, melodies, categories_melodies, my_melodies } = require('../../../database/models');
const Op = require('sequelize').Op;

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
      const result = await melodies.findAll({
        include: [{
          model: categories_melodies,
          where: {
            fk_categories_id: { [Op.eq]: id },
          },
          attributes: [],
        }],
      });
      return res.status(200).json({ Melodies: result });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },
};
