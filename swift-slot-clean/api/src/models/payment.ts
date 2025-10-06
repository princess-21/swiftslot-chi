import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Payment extends Model {
  public id!: number;
  public booking_id!: number;
  public ref!: string;
  public status!: string;
  public raw_event_json!: string;
}

Payment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    booking_id: { type: DataTypes.INTEGER, allowNull: false },
    ref: { type: DataTypes.STRING, unique: true, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
    raw_event_json: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
