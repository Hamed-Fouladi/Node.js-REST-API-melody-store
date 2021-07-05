const { categories, genres, users, melodies, my_melodies } = require('../../../database/models');

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
  giftMelody: async (req, res) => {
    try {
      const { id } = await users.findOne({
        where: {
          email: req.body.recepientId,
        },
        attributes: ['id'],
      });
      const { melodyId } = req.params;
      console.log('------melodyId-------', melodyId);
      const requestMelody = await melodies.findOne({ where: { id: melodyId } }); // object
      const myMelodies = await my_melodies.findAll({
        where: {
          fk_user_id: id,
          fk_melodies_id: melodyId,
        },
      });
      const chargePeriod = requestMelody.charge_period; // number of days while melody is active
      const oneDay = 86400 * 1000; // 1 day in milliseconds
      const now = Date.now(); // current date in milliseconds
      const expiringDate = now + (oneDay * chargePeriod); // date when melody become inactive
      const createNewMelodyRecord = () => {
        my_melodies.create({
          fk_user_id: id,
          fk_melodies_id: melodyId,
          charges: 1,
          purchase_date: now,
          paid_date: expiringDate,
          is_gifted: true,
        });
      };
      const myMelodiesPaidDate = myMelodies.findIndex((item) => item.paid_date > now);
      if (myMelodies.length === 0 || myMelodiesPaidDate === -1) {
        await createNewMelodyRecord();
        return res.status(201).send({ message: 'The melody was successfully purchased!!' });
      }
      if (myMelodiesPaidDate >= 0) {
        await myMelodies[myMelodiesPaidDate].update({
          charges: myMelodies[myMelodiesPaidDate].charges + 1,
          paid_date: myMelodies[myMelodiesPaidDate].paid_date + (oneDay * chargePeriod),
          is_gifted: true,
        });
        return res.status(200).send({ message: 'melody updated!' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },
};
