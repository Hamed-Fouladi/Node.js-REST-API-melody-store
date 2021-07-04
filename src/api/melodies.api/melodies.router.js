const router = require('express').Router();

const {
  getGenresWithCategories,
  buyMelody,
} = require('./melodies.controller');
const {
  jwtVerify,
} = require('../../middlewares');

const baseRouterPath = '/melodies';
router.get(`${baseRouterPath}/genres-and-categories`, jwtVerify, getGenresWithCategories);
router.get(`${baseRouterPath}/buy-melody/:id`, jwtVerify, buyMelody);

module.exports = router;
