const data = require('../dbData/melodies');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('melodies', data, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('melodies', null, {});
  },
};
