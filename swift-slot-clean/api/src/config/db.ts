
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("swiftslot", "root", "Chider@2029#", {
  host: "localhost",
  dialect: "mysql",
  logging: false, 
});

export default sequelize;
