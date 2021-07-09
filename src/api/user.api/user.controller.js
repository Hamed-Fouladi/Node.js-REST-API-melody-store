const bcrypt = require('bcryptjs');
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
  changePassword: async (req, res) => {
    try {
      const user = await users.findOne({
        where: {
          id: req.user.userId,
        },
      });
      await user.update({
        password: bcrypt.hashSync(req.body.password, 8),
      });
      res.status(200).send({ message: 'password was changed successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },
  getHistory: async (req, res) => {
    const offset = +req.query.offset;
    let limit = +req.query.offset;
    try {
      if (isNaN(offset) || offset < 0) {
        return res.status(400).send({ message: '"request query offset" should be a number!' });
      }
      if (isNaN(limit) || limit <= 0) {
        limit = 10;
      }
      const history = await my_melodies.findAll({
        where: {
          fk_user_id: req.user.userId,
        },
        offset,
        limit,
      });
      res.status(200).send(history);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
