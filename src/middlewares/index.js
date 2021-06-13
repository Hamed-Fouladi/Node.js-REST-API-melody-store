const exampleMiddleware = require('./example.middleware');
const { validate, authValidationChains, checkDuplicateEmail } = require('./auth.middleware');

module.exports = {
    exampleMiddleware,
    checkDuplicateEmail,
    authValidationChains,
    validate,
};
