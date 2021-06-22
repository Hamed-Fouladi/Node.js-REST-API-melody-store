const router = require('express').Router();
const {
    signUp,
    signIn,
    verifyUser,
    logOut,
} = require('./auth.controller');
const {
    validate,
    authValidationChains,
    checkDuplicateEmail,
    jwtVerify,
} = require('../../middlewares');

const baseRouterPath = '/auth';

router.post(`${baseRouterPath}/signup`, authValidationChains(), validate, checkDuplicateEmail, signUp);
router.post(`${baseRouterPath}/signin`, authValidationChains(), validate, signIn);
router.get(`${baseRouterPath}/confirm/:verificationCode`, verifyUser);
router.get(`${baseRouterPath}/logout`, jwtVerify, logOut);
module.exports = router;
