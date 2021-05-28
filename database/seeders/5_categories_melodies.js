const data = require('../dbData/categories_melodies');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('categories_melodies', data, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('categories_melodies', null, {});
  },
};
