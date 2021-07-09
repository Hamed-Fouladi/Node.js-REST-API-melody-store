const bcrypt = require('bcryptjs');
const { users } = require('../../../database/models');

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
};
