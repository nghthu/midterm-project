const initUser = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "full_name",
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        field: "refresh_token",
      },
      sex: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
};

export default initUser;
