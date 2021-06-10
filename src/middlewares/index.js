const exampleMiddleware = require('./example.middleware');
const { checkDuplicateEmail } = require('./auth.middleware');

module.exports = {
  exampleMiddleware,
  checkDuplicateEmail,
};
