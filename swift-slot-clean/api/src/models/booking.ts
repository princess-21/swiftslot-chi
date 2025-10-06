import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";


export class Booking extends Model {
  public id!: number;
  public vendor_id!: number;
  public buyer_id!: number;
  public start_time_utc!: Date;
  public end_time_utc!: Date;
  public status!: string;
  public created_at!: Date;
}

Booking.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    vendor_id: { type: DataTypes.INTEGER, allowNull: false },
    buyer_id: { type: DataTypes.INTEGER, allowNull: false },
    start_time_utc: { type: DataTypes.DATE(3), allowNull: false },
    end_time_utc: { type: DataTypes.DATE(3), allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: "Booking",
    tableName: "bookings",
    timestamps: false,
  }
);
