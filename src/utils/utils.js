const { melodies, my_melodies } = require('../../database/models');

module.exports = {
  buyOrGiftMelody: async (req, res, { userId, melodyId, isGifted }) => {
    const requestMelody = await melodies.findOne({ where: { id: melodyId } }); // object
    const myMelodies = await my_melodies.findAll({
      where: {
        fk_user_id: userId,
        fk_melodies_id: melodyId,
      },
    });
    const chargePeriod = requestMelody.charge_period; // number of days while melody is active
    const oneDay = 86400 * 1000; // 1 day in milliseconds
    const now = Date.now(); // current date in milliseconds
    const expiringDate = now + (oneDay * chargePeriod); // date when melody become inactive
    const createNewMelodyRecord = () => {
      my_melodies.create({
        fk_user_id: userId,
        fk_melodies_id: melodyId,
        charges: 1,
        purchase_date: now,
        paid_date: expiringDate,
        is_gifted: isGifted,
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
        is_gifted: isGifted,
      });
      return res.status(200).send({ message: 'melody updated!' });
    }
  },
};
