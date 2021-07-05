import * as express from "express";
import { Connection } from "typeorm";
import { Util } from "../utils/Util";
import HttpResponse from "../config/HttpResponse";
import { AuthService } from "../services/AuthService";
import { QsService } from "../services/QsService";
import { UserService } from "../services/UserService";
import { EmailService, IEmailService } from "../services/EmailService";
import * as path from "path";
import { IEmailData } from "..";
import CONFIG from "../config/server.config";

export class CronRouter {
    private _context = "CronRouter";
    private router: express.Router;
    private connection: Connection;
    private emailService: IEmailService;
    constructor(connection: Connection) {
        this.router = express.Router();
        this.connection = connection;
        this.emailService = new EmailService();
        Util.initiateAllRoutes([this.qsSync, this.testQsServiceFuncsRoute]);
    }
    public qsSync = async () => {
        this.router.get("/qsSync", async (req, res) => {
            const cronTkn = req.query.cronTkn;
            if (
                !cronTkn ||
                cronTkn.toString().trim() === "" ||
                CONFIG["SERVER_IW_CRON_TKN"] !== cronTkn
            ) {
                return res.status(HttpResponse.Forbidden.status).json({
                    message: HttpResponse.Forbidden.message,
                });
            }

            const qsService = new QsService(this.connection);
            const userService = new UserService(this.connection);
            const userInfo = await userService.findUserByEmail(
                "saurav@gmail.com"
            );
            if (!userInfo) {
                return res
                    .status(HttpResponse.Forbidden.status)
                    .json({ message: HttpResponse.Forbidden.message });
            }
            const replacements = {
                status: "",
                error: "",
                email: "sauravsehgal44@gmail.com",
            };
            qsService
                ._initiateSync(userInfo)
                .then((updatedUser) => {
                    res.status(HttpResponse.OK.status).json({ updatedUser });
                    replacements.status = "CRON COMPLETED";
                    this.emailService.sendCronMail(replacements);
                })
                .catch((err) => {
                    replacements.status = "CRON FAILED WITH ERR";
                    replacements.error = err.toString();
                    res.status(HttpResponse.ServerError.status).json({
                        message: "SYNC FUCKED",
                    });
                    this.emailService.sendCronMail(replacements);
                });
        });
    };

    public testQsServiceFuncsRoute = async () => {
        //https://api07.iq.questrade.com/v1/accounts/52310463/orders
        this.router.get("/testQsService", async (req, res) => {
            const userService = new UserService(this.connection);
            const qsService = new QsService(this.connection);
            const userInfo = await userService.findUserByEmail(
                "sauravsehgal44@gmail.com"
            );
            if (!userInfo) {
                return res
                    .status(HttpResponse.Forbidden.status)
                    .json({ message: HttpResponse.Forbidden.message });
            }

            const testResult = await qsService.test(userInfo);
            res.send(testResult);
        });
    };

    public getCronRoutes = () => {
        return this.router;
    };
}
