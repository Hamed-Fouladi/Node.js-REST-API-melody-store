const router = require('express').Router();

const {
  getGenresWithCategories,
  buyMelody,
  getMelodies,
  giftMelody,
} = require('./melodies.controller');
const {
  jwtVerify,
} = require('../../middlewares');

const baseRouterPath = '/melodies';
router.get(`${baseRouterPath}/genres-and-categories`, jwtVerify, getGenresWithCategories);
router.get(`${baseRouterPath}/buy-melody/:id`, jwtVerify, buyMelody);
router.get(`${baseRouterPath}/category-id/:id`, jwtVerify, getMelodies);
router.post(`${baseRouterPath}/gift-melody/:melodyId`, jwtVerify, giftMelody);

module.exports = router;
