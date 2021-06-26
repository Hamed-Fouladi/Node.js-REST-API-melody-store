module.exports = (sequelize, DataType) => {
  const melodies = sequelize.define('melodies', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    artist: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    copyright: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    purchase_price: {
      type: DataType.FLOAT,
      allowNull: false,
    },
    prolongation_price: {
      type: DataType.FLOAT,
      allowNull: false,
    },
    charge_period: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    link: {
      type: DataType.STRING(200),
      allowNull: false,
    },
    image: {
      type: DataType.STRING(200),
      allowNull: true,
    },
  });

  melodies.associate = (models) => {
    melodies.hasMany(models.my_melodies, { foreignKey: { name: 'fk_melodies_id', allowNull: false }, foreignKeyConstraint: true });
    melodies.hasMany(models.categories_melodies, { foreignKey: { name: 'fk_melodies_id', allowNull: false }, foreignKeyConstraint: true });
  };

  return melodies;
};
