import { Sequelize, DataTypes } from "sequelize";
import { DB_URI } from "../lib/constants";
import initUser from "./userModel";

const sequelize = new Sequelize(DB_URI);

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize connected");
  })
  .catch((err) => {
    throw new Error(err);
  });

const User = initUser(sequelize, DataTypes);

sequelize.sync();

export { sequelize, User };
