const router = require('express').Router();

const {
  getProfileData,
  changePassword,
} = require('./user.controller');
const {
  jwtVerify,
  passwordValidation,
  validate,
} = require('../../middlewares');

const baseRouterPath = '/user';
router.get(`${baseRouterPath}/profile`, jwtVerify, getProfileData);
router.post(`${baseRouterPath}/change-password`, jwtVerify, passwordValidation(), validate, changePassword);

module.exports = router;
