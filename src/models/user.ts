import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

export enum USER_STATUS {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  WAITING_VERIFY = "WAITING_VERIFY",
}

export interface IUserAttribute {
  id: number;
  name: string;
  email: string;
  password: string;
  status: USER_STATUS;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUserCreationAttributes extends Optional<IUserAttribute, "id"> {}

export class UserModel
  extends Model<IUserAttribute, IUserCreationAttributes>
  implements IUserAttribute
{
  public id: number;
  public email: string;
  public password: string;
  public name: string;
  public status: USER_STATUS;
  public verify_at: Date | undefined;
  public created_at: Date;
  public updated_at: Date | undefined;

  static toModel(model: IUserAttribute) {
    return {
      id: model.id,
      email: model.email,
      name: model.name,
      createdAt: model.createdAt,
    };
  }
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(USER_STATUS)),
      allowNull: false,
      field: "is_active",
    },
  },
  {
    sequelize: sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
