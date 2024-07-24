import bcrypt from "bcrypt";

export class HashPasswordHelper {
  public static async toPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  public static async compare(newPassword: string, oldPassword: string) {
    return await bcrypt.compare(newPassword, oldPassword);
  }
}
