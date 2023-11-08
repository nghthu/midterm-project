import { Sequelize, DataTypes } from "sequelize";
import pg from "pg";
import { DATABASE_URL } from "../lib/constants";
import initUser from "./userModel";

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
  dialectModule: pg,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize connected");
  })
  .catch((err) => {
    console.error(err);
  });

const User = initUser(sequelize, DataTypes);

// sequelize.sync();

export { sequelize, User };
