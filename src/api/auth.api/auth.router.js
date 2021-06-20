const router = require('express').Router();
const {
    signUp,
    signIn,
    verifyUser,
} = require('./auth.controller');
const {
    validate,
    authValidationChains,
    checkDuplicateEmail,
} = require('../../middlewares');

const baseRouterPath = '/auth';

router.post(`${baseRouterPath}/signup`, authValidationChains(), validate, checkDuplicateEmail, signUp);
router.post(`${baseRouterPath}/signin`, authValidationChains(), validate, signIn);
router.get(`${baseRouterPath}/confirm/:verificationCode`, verifyUser);

module.exports = router;
