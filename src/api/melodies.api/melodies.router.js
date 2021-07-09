const router = require('express').Router();

const {
  getGenresWithCategories,
  getMelodies,
  buyMelody,
  giftMelody,
  getContent,
} = require('./melodies.controller');
const {
  jwtVerify,
} = require('../../middlewares');

const baseRouterPath = '/melodies';
router.get(`${baseRouterPath}/genres-and-categories`, jwtVerify, getGenresWithCategories);
router.get(`${baseRouterPath}/category-id/:id`, jwtVerify, getMelodies);
router.post(`${baseRouterPath}/buy-melody/:melodyId`, jwtVerify, buyMelody);
router.post(`${baseRouterPath}/gift-melody/:melodyId`, jwtVerify, giftMelody);
router.get(`${baseRouterPath}/get-content`, jwtVerify, getContent);

module.exports = router;
