module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('melodies', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      artist: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      copyright: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      purchase_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      prolongation_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      charge_period: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('melodies');
  },
};
