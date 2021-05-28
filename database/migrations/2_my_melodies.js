module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('my_melodies', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fk_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
            key: 'id',
          },
        },
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
      charges: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      purchase_date: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      paid_date: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      is_gifted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('my_melodies');
  },
};
