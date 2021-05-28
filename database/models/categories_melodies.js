module.exports = (sequelize, DataType) => {
  const categoriesMelodies = sequelize.define('categories_melodies', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fk_melodies_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    fk_categories_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['fk_melodies_id', 'fk_categories_id'],
      },
    ],
  });

  categoriesMelodies.associate = (models) => {
    categoriesMelodies.belongsTo(models.genres, { foreignKey: { name: 'fk_melodies_id', allowNull: false }, foreignKeyConstraint: true });
    categoriesMelodies.belongsTo(models.genres, { foreignKey: { name: 'fk_categories_id', allowNull: false }, foreignKeyConstraint: true });
  };

  return categoriesMelodies;
};
