export default class UserModel {
  public id: number;
  public email: string;
  public password: string;
  public name: string;
  public verify_at: Date | undefined;
  public created_at: Date;
  public updated_at: Date | undefined;
}
