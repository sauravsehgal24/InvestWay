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

    public static generatePassword = () => {
        const tempPassword: string = PasswordGenerator.generate({
            length: 8,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true,
        });
        return tempPassword;
    };
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

    public static getTZOffset = (offset: number): string => {
        let hr = offset < 0 ? -offset / 60 : offset / 60;
        let mins = 0.0;
        let timeZoneOffsetString = `${offset < 0 ? "+" : "-"}${
            hr.toString().length < 2 ? "0" + Math.round(hr) : Math.round(hr)
        }`;
        if (offset % 60 === 0) {
            timeZoneOffsetString = `${timeZoneOffsetString}:00`;
        } else {
            mins = hr - Math.round(hr);
            mins = Math.round(60 * mins);
            timeZoneOffsetString = `${timeZoneOffsetString}:${
                mins.toString().length > 1 ? mins : "0" + mins
            }`;
        }
        return timeZoneOffsetString;
    };
}
