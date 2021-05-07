import * as bcrypt from "bcrypt";
import * as PasswordGenerator from "generate-password";

export class Util {
  private static SALTROUND = 10;
  public static initiateAllRoutes = (cbs: Function[]) => {
    if (cbs && cbs.length > 0) {
      cbs.map((cb) => {
        cb();
      });
    }
  };

  public static generatePassword = () =>{
    const tempPassword: string = PasswordGenerator.generate({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
    });
    return tempPassword;
  }
  public static generateEncryptedPassword(): Promise<string> {
    const tempPassword: string = PasswordGenerator.generate({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
    });
    return Util.encryptPassword(tempPassword);
  }

  public static encryptPassword(passwordToEncrypt: string): Promise<string> {
    return bcrypt.hash(passwordToEncrypt, Util.SALTROUND);
  }

  public static comparePassword(
    passwordToCompare: string,
    actualPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(passwordToCompare, actualPassword);
  }
}
