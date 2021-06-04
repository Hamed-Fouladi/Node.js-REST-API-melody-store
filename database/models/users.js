module.exports = (sequelize, DataType) => {
  const usersTable = sequelize.define('users', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataType.STRING(100),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataType.STRING(100),
      allowNull: true,
    },
    password: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    access_token: {
      type: DataType.TEXT,
      allowNull: true,
    },
    verification_code: {
      type: DataType.STRING(100),
      allowNull: true,
      unique: true,
    },
    is_verified: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  usersTable.associate = (models) => {
    usersTable.hasMany(models.my_melodies, { foreignKey: { name: 'fk_users_id', allowNull: false }, foreignKeyConstraint: true });
  };

  return usersTable;
};
