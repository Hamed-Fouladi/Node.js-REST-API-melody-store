const router = require('express').Router();

const {
  getGenresWithCategories,
} = require('./melodies.controller');
const {
  jwtVerify,
} = require('../../middlewares');

const baseRouterPath = '/melodies';
router.get(`${baseRouterPath}/genres-and-categories`, jwtVerify, getGenresWithCategories);

module.exports = router;
