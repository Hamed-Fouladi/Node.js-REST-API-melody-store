const { Op } = require('sequelize');
const { categories, genres, users, melodies, categories_melodies, my_melodies } = require('../../../database/models');
const { buyOrGiftMelody } = require('../../utils');

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
  buyMelody: async (req, res) => {
    try {
      const { melodyId } = req.params;
      // buyOrGiftMelody function from utils
      await buyOrGiftMelody(req, res, { userId: req.user.userId, melodyId, isGifted: false });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },
  giftMelody: async (req, res) => {
    try {
      const { id } = await users.findOne({
        where: {
          email: req.body.recepientId,
        },
        attributes: ['id'],
      });
      const { melodyId } = req.params;
      // buyOrGiftMelody function from utils
      await buyOrGiftMelody(req, res, { userId: id, melodyId, isGifted: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },
  getContent: async (req, res) => {
    try {
      const now = Date.now();
      const content = await my_melodies.findAll({
        where: {
          fk_user_id: req.user.userId,
          paid_date: {
            [Op.gt]: now,
          },
        },
        order: [['paid_date', 'DESC']],
      });
      res.send(content);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },
};
