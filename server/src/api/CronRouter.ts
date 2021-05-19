import * as express from "express";
import { Connection } from "typeorm";
import { Util } from "../utils/Util";
import HttpResponse from "../config/HttpResponse";
import { AuthService } from "../services/AuthService";
import { QsService } from "../services/QsService";
import { UserService } from "../services/UserService";

export class CronRouter {
    private _context = "CronRouter";
    private router: express.Router;
    private connection: Connection;
    constructor(connection: Connection) {
        this.router = express.Router();
        this.connection = connection;
        Util.initiateAllRoutes([this.qsSync, this.testQsServiceFuncsRoute]);
    }
    public qsSync = async () => {
        this.router.get("/qsSync", async (req, res) => {
            const qsService = new QsService(this.connection);
            const userService = new UserService(this.connection);
            const userInfo = await userService.findUserByEmail(
                "sauravsehgal44@gmail.com"
            );
            if (!userInfo) {
                return res
                    .status(HttpResponse.Forbidden.status)
                    .json({ message: HttpResponse.Forbidden.message });
            }
            qsService._initiateSync(userInfo).then((updatedUser) => {
                res.status(HttpResponse.OK.status).json({ updatedUser });
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
