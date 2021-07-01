const router = require('express').Router();

const {
  getGenresWithCategories,
  getMelodies,
} = require('./melodies.controller');
const {
  jwtVerify,
} = require('../../middlewares');

const baseRouterPath = '/melodies';
router.get(`${baseRouterPath}/genres-and-categories`, jwtVerify, getGenresWithCategories);
router.get(`${baseRouterPath}/category-id/:id`, jwtVerify, getMelodies);

module.exports = router;
