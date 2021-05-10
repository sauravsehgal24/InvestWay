import * as express from "express";
import { Connection } from "typeorm";
import { Util } from "../utils/Util";
import HttpResponse from "../config/HttpResponse";
import { AuthService } from "../services/AuthService";
import { QsService } from "../services/QsService";

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
            const tokenDealData = await qsService._initiateSync(
                req.query.rToken as string
            );
            if (tokenDealData) {
                res.send(tokenDealData);
            } else {
                res.status(400).json({ error: "ERROR" });
            }
        });
    };

    public getCronRoutes = () => {
        return this.router;
    };
}
