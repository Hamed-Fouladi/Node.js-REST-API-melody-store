const exampleRouter = require('./example.api');
const authRouter = require('./auth.api');
const userRouter = require('./user.api');
const melodiesRouter = require('./melodies.api');

module.exports = [
  exampleRouter, authRouter, userRouter, melodiesRouter,
];
