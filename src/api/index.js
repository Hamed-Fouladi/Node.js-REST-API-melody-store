const exampleRouter = require('./example.api');
const authRouter = require('./auth.api');
const userRouter = require('./user.api');

module.exports = [
    exampleRouter,
    authRouter,
    userRouter,
];
