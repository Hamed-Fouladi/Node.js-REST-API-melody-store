const { users } = require('../../../database/models');
const bcrypt = require('bcryptjs');

module.exports = {
    signUp: (req, res) => {
        // Validate if email consist "@"
        if(req.body.email.indexOf('@') === -1) {
            return res.status(400).send({ message: 'Incorrect Email' });
        }
        // Validate if password contain at least 5 characters
        if(req.body.password.length < 5) {
            return res.status(400).send({ message: 'Password must contain at least 5 characters' });
        }
        // Save User to Database
        users.create({
           email: req.body.email,
           password: bcrypt.hashSync(req.body.password, 8) // ToDo: check passvord have min 5 simbols
        }).then(() => {
            res.status(201).send({ message: 'User was registered successfully!' });
        }).catch(error => {
            res.status(500).send({ message: error.message });
        });
    },
};