const router = require('express').Router();
const { getMelodyById } = require('./example.controller');
const { exampleMiddleware } = require('../../middlewares');

// define base router path
const baseRouterPath = '/example';

router.get(`${baseRouterPath}/melody-by-id/:id`, exampleMiddleware, getMelodyById); // put here middleware
// ... here you put all other api's with their methods

// exporting router
module.exports = router;
