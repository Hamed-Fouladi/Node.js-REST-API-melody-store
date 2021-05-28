module.exports = (sequelize, DataType) => {
  const genres = sequelize.define('genres', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataType.STRING(100),
      allowNull: false,
    },
  });

  genres.associate = (models) => {
    genres.hasMany(models.categories, { foreignKey: { name: 'fk_genres_id', allowNull: false }, foreignKeyConstraint: true });
  };

  return genres;
};
