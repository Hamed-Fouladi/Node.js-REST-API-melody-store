const data = require('../dbData/genres');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('genres', data, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('genres', null, {});
  },
};
