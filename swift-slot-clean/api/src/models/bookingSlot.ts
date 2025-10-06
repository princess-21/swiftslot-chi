import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class BookingSlot extends Model {
  public id!: number;
  public booking_id!: number;
  public vendor_id!: number;
  public slot_start_utc!: Date;
}

BookingSlot.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    booking_id: { type: DataTypes.INTEGER, allowNull: false },
    vendor_id: { type: DataTypes.INTEGER, allowNull: false },
    slot_start_utc: { type: DataTypes.DATE(3), allowNull: false },
  },
  {
    sequelize,
    modelName: "BookingSlot",
    tableName: "booking_slots",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["vendor_id", "slot_start_utc"],
      },
    ],
  }
);
