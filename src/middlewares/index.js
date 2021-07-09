const exampleMiddleware = require('./example.middleware');
const {
  validate,
  authValidationChains,
  checkDuplicateEmail,
  passwordValidation,
  jwtVerify,
} = require('./auth.middleware');

module.exports = {
  exampleMiddleware,
  checkDuplicateEmail,
  passwordValidation,
  authValidationChains,
  validate,
  jwtVerify,
};
