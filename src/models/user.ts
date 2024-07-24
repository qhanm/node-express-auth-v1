import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

export default class UserModel extends Model {
  public id: number;
  public email: string;
  public password: string;
  public name: string;
  public verify_at: Date | undefined;
  public created_at: Date;
  public updated_at: Date | undefined;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: sequelize,
    tableName: "users", // Specify your table name
  }
);
