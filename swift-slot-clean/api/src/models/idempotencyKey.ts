import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class IdempotencyKey extends Model {
  public key!: string;
  public scope!: string;
  public response_hash!: string | null;
  public response_json!: string;
  public created_at!: Date;
}

IdempotencyKey.init(
  {
    key: { type: DataTypes.STRING, primaryKey: true },
    scope: { type: DataTypes.STRING, allowNull: false },
    response_hash: { type: DataTypes.TEXT, allowNull: true }, // optional
    response_json: { type: DataTypes.TEXT, allowNull: false }, // <-- add this
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: "IdempotencyKey",
    tableName: "idempotency_keys",
    timestamps: false,
  }
);
