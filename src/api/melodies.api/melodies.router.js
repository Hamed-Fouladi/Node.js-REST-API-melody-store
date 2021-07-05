const router = require('express').Router();

const {
  getGenresWithCategories,
  giftMelody,
} = require('./melodies.controller');
const {
  jwtVerify,
} = require('../../middlewares');

const baseRouterPath = '/melodies';
router.get(`${baseRouterPath}/genres-and-categories`, jwtVerify, getGenresWithCategories);
router.post(`${baseRouterPath}/gift-melody/:melodyId`, jwtVerify, giftMelody);
module.exports = router;
