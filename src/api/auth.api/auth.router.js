const router = require('express').Router();
const { signUp } = require('./auth.controller');
const { checkDuplicateEmail } = require('../../middlewares');

router.post('/signup', checkDuplicateEmail, signUp);

module.exports = router;