const { users } = require('../../database/models');

module.exports = {
  checkDuplicateEmail: (req, res, next) => {
      users.findOne({
          where: {
              email: req.body.email
          }
      }).then(user => {
          if (user) {
              res.status(400).send({ message: 'Faild! Email is already in use!' });
              return;
          }
          next();
      });
  },
};