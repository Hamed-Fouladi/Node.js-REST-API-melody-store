const data = require('../dbData/categories');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('categories', data, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
