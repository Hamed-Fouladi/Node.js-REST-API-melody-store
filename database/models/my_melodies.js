module.exports = (sequelize, DataType) => {
  const myMelodies = sequelize.define('my_melodies', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fk_user_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    fk_melodies_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    charges: {
      type: DataType.INTEGER,
      allowNull: false,
      // unique: true,
    },
    purchase_date: {
      type: DataType.BIGINT,
      allowNull: false,
    },
    paid_date: {
      type: DataType.BIGINT,
      allowNull: false,
    },
    is_gifted: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  myMelodies.associate = (models) => {
    myMelodies.belongsTo(models.users, { foreignKey: { name: 'fk_user_id', allowNull: false }, foreignKeyConstraint: true });
    myMelodies.belongsTo(models.melodies, { foreignKey: { name: 'fk_melodies_id', allowNull: false }, foreignKeyConstraint: true });
  };

  return myMelodies;
};
