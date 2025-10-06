import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Vendor extends Model {
  public id!: number;
  public name!: string;
  public timezone!: string;
}

Vendor.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    timezone: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Vendor",
    tableName: "vendors",
    timestamps: false,
  }
);
