const router = require('express').Router();

const {
  getProfileData,
  getHistory,
} = require('./user.controller');
const {
  jwtVerify,
} = require('../../middlewares');

const baseRouterPath = '/user';
router.get(`${baseRouterPath}/profile`, jwtVerify, getProfileData);
router.get(`${baseRouterPath}/history`, jwtVerify, getHistory);

module.exports = router;
