module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('genres', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('genres');
  },
};
