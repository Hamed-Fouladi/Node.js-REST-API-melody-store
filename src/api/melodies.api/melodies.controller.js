const { categories, genres, melodies, my_melodies } = require('../../../database/models');

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
  buyMelody: async (req, res) => {
    try {
      const { id } = req.params;
      const requestMelody = await melodies.findOne({ where: { id } }); // object
      const myMelodies = await my_melodies.findAll({
        where: {
          fk_user_id: req.user.userId,
          fk_melodies_id: id,
        },
      });
      const chargePeriod = requestMelody.charge_period; // number of days while melody is active
      const oneDay = 86400 * 1000; // 1 day in milliseconds
      const now = Date.now(); // current date in milliseconds
      const expiringDate = now + (oneDay * chargePeriod); // date when melody become inactive
      // console.log('======now====', new Date(1625335587098));
      // console.log('======expiringDate====', new Date(1631988387098));
      // console.log('======chargePeriod====', typeof chargePeriod);
      const createNewMelodyRecord = () => {
        my_melodies.create({
          fk_user_id: req.user.userId,
          fk_melodies_id: id,
          charges: 1,
          purchase_date: now,
          paid_date: expiringDate,
          is_gifted: false,
        });
      };
      const myMelodiesPaidDate = myMelodies.findIndex((item) => item.paid_date > now);
      // const result = myMelodies[]
      //  res.send(myMelodies[myMelodiesPaidDate].id);
      if (myMelodies.length === 0 || myMelodiesPaidDate === -1) {
        await createNewMelodyRecord();
        return res.status(201).send({ message: 'The melody was successfully purchased!!' });
      }
      if (myMelodiesPaidDate >= 0) {
        await myMelodies[myMelodiesPaidDate].update({
          charges: myMelodies[myMelodiesPaidDate].charges + 1,
          paid_date: myMelodies[myMelodiesPaidDate].paid_date + (oneDay * chargePeriod),
        });
        return res.status(200).send('melody updated');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },
};
