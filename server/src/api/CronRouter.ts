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
        Util.initiateAllRoutes([this.qsSync]);
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

    public getCronRoutes = () => {
        return this.router;
    };
}
