const router = require('express').Router();
const { signUp } = require('./auth.controller');
const { validate, authValidationChains, checkDuplicateEmail } = require('../../middlewares');

const baseRouterPath = '/auth';

router.post(`${baseRouterPath}/signup`, authValidationChains(), validate, checkDuplicateEmail, signUp);

module.exports = router;
