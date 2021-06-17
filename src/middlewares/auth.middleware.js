const { body, validationResult } = require('express-validator');
const { users } = require('../../database/models');

module.exports = {
    checkDuplicateEmail: (req, res, next) => {
        users.findOne({
            where: {
                email: req.body.email,
            },
        }).then((user) => {
            if (user) {
                res.status(400).send({ message: 'User with this email already exists!' });
                return;
            }
            next();
        });
    },
    authValidationChains: () => [
        // username must be an email
        body('email').exists().withMessage('email is required field').isEmail()
            .withMessage('incorrect email'),
        // password must be at least 5 chars long
        body('password').exists().withMessage('password is required field').isLength({ min: 5 })
            .withMessage('must be at least 5 chars long'),
    ],
    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const extractedErrors = [];
        errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

        return res.status(422).json({
            errors: extractedErrors,
        });
    },
};
