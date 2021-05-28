module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories_melodies', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fk_melodies_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'melodies',
            key: 'id',
          },
        },
      },
      fk_categories_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'categories',
            key: 'id',
          },
        },
      },
    }, {
      uniqueKeys: {
        fk_categories_melodies_unique: {
          customIndex: true,
          fields: ['fk_melodies_id', 'fk_categories_id'],
        },
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('categories_melodies');
  },
};
