
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("swiftslot", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  logging: false, 
});

export default sequelize;
