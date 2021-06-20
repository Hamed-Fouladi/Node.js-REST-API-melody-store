const exampleMiddleware = require('./example.middleware');
const {
    validate,
    authValidationChains,
    checkDuplicateEmail,
    jwtVerify,
} = require('./auth.middleware');

module.exports = {
    exampleMiddleware,
    checkDuplicateEmail,
    authValidationChains,
    validate,
    jwtVerify,
};
