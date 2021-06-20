const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { sendConfirmationEmail } = require('../../../config/nodemailerConfig');
const config = require('../../../config/jwtConfig');
const { users } = require('../../../database/models');

module.exports = {
    signUp: (req, res) => {
        try {
            const uuid = uuidv4();
            users.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                verification_code: uuid,
            }).then(() => {
                res.status(201).send({ message: 'User was registered successfully!' });
            }).catch((error) => {
                res.status(500).send({ message: error.message });
            });
            sendConfirmationEmail(req.body.email, uuid);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    },
    verifyUser: (req, res) => {
        try {
            users.findOne({
                where: {
                    verification_code: req.params.verificationCode,
                },
            })
                .then((user) => {

                    if (!user) {
                        return res.status(400).send({ message: 'We were unable to find a user with that email. Make sure your Email is correct!' });
                    }
                    if (!user.is_verified) {
                        const token = jwt.sign({ userId: user.id }, config.secret, {
                            expiresIn: 86400, // 24 hours
                        });
                        user.update({
                            verification_code: null,
                            is_verified: true,
                            access_token: token,
                        });
                        return res.status(200).send({
                            id: user.id,
                            accessToken: token,
                            message: 'Email is been Successfully verified',
                        });
                    }
                });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    signIn: (req, res) => {
        try {
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
                    const token = jwt.sign({ userId: user.id }, config.secret, {
                        expiresIn: 86400, // 24 hours
                    });
                    user.update({
                        access_token: token,
                    });
                    res.status(200).send({
                        id: user.id,
                        accessToken: token,
                    });
                })
                .catch(error => {
                    res.status(500).send({ message: error.message });
                });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
};
