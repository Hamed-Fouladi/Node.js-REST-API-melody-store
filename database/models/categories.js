module.exports = (sequelize, DataType) => {
  const categories = sequelize.define('categories', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fk_genres_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataType.STRING(100),
      allowNull: false,
    },
  });

  categories.associate = (models) => {
    categories.belongsTo(models.genres, { foreignKey: { name: 'fk_genres_id', allowNull: false }, foreignKeyConstraint: true });
  };

  return categories;
};
