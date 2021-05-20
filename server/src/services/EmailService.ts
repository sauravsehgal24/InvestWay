import * as nodemailer from "nodemailer";
import * as smtpTransport from "nodemailer-smtp-transport";
import SERVER_CONFIG from "../config/server.config";
import { IEmailData } from "../index";

export type IEmailService = InstanceType<typeof EmailService>;
export class EmailService {
    private static context = "EmailService";
    private emailer;
    constructor() {
        this.emailer = this.initTransporter();
    }

    private initTransporter = () => {
        const transporter = nodemailer.createTransport(
            smtpTransport({
                name: SERVER_CONFIG["SERVER_IW_EMAIL_NAME"],
                host: SERVER_CONFIG["SERVER_IW_EMAIL_HOST"],
                port: SERVER_CONFIG["SERVER_IW_EMAILPORT"],
                secure: true, // true for 465, false for other ports
                auth: {
                    user: SERVER_CONFIG["SERVER_IW_EMAIL_USER"], // generated ethereal user
                    pass: SERVER_CONFIG["SERVER_IW_EMAIL_PASSWORD"], // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false,
                },
            })
        );
        return transporter;
    };

    public sendCronMail = async (emailData: IEmailData) => {
        console.log(
            `Sending Cron Email with context (${EmailService.context})`
        );
        return this.emailer
            .sendMail(emailData)
            .then((res) => {
                console.log(
                    `\n------------------EMAIl SENT-------------------\n\n${res}\n\n`
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };
}
