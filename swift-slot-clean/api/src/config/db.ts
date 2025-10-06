
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("swiftslot", "root", "insert_your_password", {
  host: "localhost",
  dialect: "mysql",
  logging: false, 
});

export default sequelize;
