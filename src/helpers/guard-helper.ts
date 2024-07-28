import jwt from "jsonwebtoken";
import { Environment } from "../configs";

export class GuardHelper {
  static createAccessToken(userId: number) {
    return jwt.sign({ id: userId }, Environment.JWT_SECRET_KEY, {
      expiresIn: Environment.JWT_ACCESS_EXPIRE,
    });
  }

  static createRefreshToken(userId: number) {
    return jwt.sign({ id: userId }, Environment.JWT_REFRESH_SECRET_KEY, {
      expiresIn: Environment.JWT_REFRESH_EXPIRE,
    });
  }
}
