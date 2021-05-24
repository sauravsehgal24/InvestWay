import * as nodemailer from "nodemailer";
import * as smtpTransport from "nodemailer-smtp-transport";
import * as path from "path";
import SERVER_CONFIG from "../config/server.config";
import { IEmailData } from "../index";
import { Util } from "../utils/Util";

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

    public sendCronMail = async (replacements) => {
        const filePath = path.join(
            __dirname,
            "../views/email/cronStatusTemplate.html"
        );
        const template = Util.compileEmailTemplate(filePath, replacements);
        const emailData: IEmailData = {
            from: `admin <admin@investway.alienjack.net>`,
            to: "sauravsehgal44@gmail.com",
            subject: `Cron Status`,
            html: template, // take from templates,
            attachments: [],
        };
        console.log(
            `Sending Cron Email with context (${EmailService.context})`
        );
        return this.emailer
            .sendMail(emailData)
            .then((res) => {
                console.log(
                    `\n------------------EMAIl SENT-------------------\n\n\n\n`
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };
}
