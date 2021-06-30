const router = require('express').Router();

const {
  getProfileData
} = require('./user.controller');
const {
  jwtVerify,
} = require('../../middlewares');

const baseRouterPath = '/user';
router.get(`${baseRouterPath}/profile`, jwtVerify, getProfileData);

module.exports = router;
