const { users, my_melodies } = require('../../../database/models');

module.exports = {
  getProfileData: (req, res) => {
    users.findOne({
      where: {
        id: req.user.userId,
      },
      attributes: ['id', 'name', 'email'],
    }).then((user) => {
      // console.log(user);
      res.status(200).json({ userProfile: user });
    }).catch((error) => {
      res.status(500).send({ message: error.message });
    });
  },
  getHistory: async (req, res) => {
    try {
      if (isNaN(req.query.offset)) {
        return res.status(400).send('"request query offset" should be a number!');
      }
      if (isNaN(req.query.limit) || req.query.limit < 10) {
        req.query.limit = 10;
      }
      const history = await my_melodies.findAll({
        where: {
          fk_user_id: req.user.userId,
        },
        offset: +req.query.offset,
        limit: +req.query.limit,
      });
      res.status(200).send(history);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
