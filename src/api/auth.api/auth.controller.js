const { users } = require('../../../database/models');
const bcrypt = require('bcryptjs');

module.exports = {
    signUp: (req, res) => {
        //Validate if email consist "@"
        if(req.body.email.indexOf('@') === -1) {
            return res.status(400).send({ message: 'Incorrect Email' });
        }
        // Save User to Database
        users.create({
           email: req.body.email,
           password: bcrypt.hashSync(req.body.password, 5) // check passvord have min 5 simbols
        }).then(() => {
            res.send({ message: 'User was registered successfully!' });
        }).catch(error => {
            res.status(500).send({ message: error.message });
        });
    },
};