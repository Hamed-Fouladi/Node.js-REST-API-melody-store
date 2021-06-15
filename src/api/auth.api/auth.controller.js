const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require('../../../config/nodemailerConfig');
const config = require('../../../config/jwtConfig');
const { users } = require('../../../database/models');

module.exports = {
    signUp: (req, res) => {
        const longToken = jwt.sign({ email: req.body.email }, config.secret);
        const token = longToken.substr(longToken.length - 100, 100);
        console.log('token length: ', token.length);
        // const token = Math.floor((Math.random() * 100) + 54);
        // Save User to Database
        users.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            verification_code: token,
        }).then(() => {
            res.status(201).send({ message: 'User was registered successfully!' });
        }).catch((error) => {
            res.status(500).send({ message: error.message });
        });
        sendConfirmationEmail(req.body.email, token);
    },
    verifyUser: (req, res) => {
        users.findOne({
            verificationCode: req.params.verificationCode,
        })
            .then((user) => {
                if (!user) {
                    res.status(404).send({ message: 'User Not found.' });
                }

                user.is_verified = true;
                user.save((error) => {
                    if (error) {
                        res.status(500).send({ message: error.message });
                    }
                });
            })
            .catch((error) => {
                res.status(500).send({ message: error.message });
            });
    },
    signIn: (req, res) => {
        users.findOne({
            where: {
                email: req.body.email,
            },
        })
            .then(user => {
                if (!user) {
                    return res.status(404).send({ message: 'User Not found.' });
                }
                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password,
                );
                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: 'Invalid Password!',
                    });
                }
                if (user.is_verified !== true) {
                    return res.status(403).send({
                        accessToken: null,
                        message: 'Please Verify Your Email to sign in!',
                    });
                }
                const token = jwt.sign({ email: user.email }, config.secret, {
                    expiresIn: 86400, // 24 hours
                });
                res.status(200).send({
                    id: user.id,
                    email: user.email,
                    accessToken: token,
                });
            })
            .catch(error => {
                res.status(500).send({ message: error.message });
            });
    },
};
