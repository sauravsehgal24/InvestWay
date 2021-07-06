import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import * as https from "https";
import * as http from "http";
import * as path from "path";
import * as fs from "fs";
import { Connection, Like } from "typeorm";
import RootRouter from "./api/RootRouter";
import SERVER_CONFIG from "./config/server.config";
import Response from "./config/HttpResponse";
import get from "axios";
import { Util } from "./utils/Util";
import { CronRouter } from "./api/CronRouter";

export type IServerConfig = InstanceType<typeof ServerConfig>;
export class ServerConfig {
    _context: string = "ServerConfig";
    private app;
    private connection: Connection;
    private server: https.Server | http.Server;

    constructor(connection: Connection) {
        this.app = express();
        this.initiateConfig([this.injectMiddleware]);
        this.connection = connection;
    }
    private initiateConfig = (cbs: Function[]) => {
        cbs.map((cb) => cb());
    };
    public initServer = async () => {
        this.enableRoutes();
        if (
            SERVER_CONFIG["IW_NODE_ENV"] === "local" ||
            SERVER_CONFIG["IW_NODE_ENV"] === "development"
        ) {
            this.server = http.createServer(this.app);
            this.server.listen(SERVER_CONFIG["SERVER_IW_SERVER_PORT"], () => {
                console.log(
                    "\n---------------------------------------------------------------\nIW " +
                        SERVER_CONFIG["IW_NODE_ENV"] +
                        " ts server listening at http://localhost:" +
                        SERVER_CONFIG["SERVER_IW_SERVER_PORT"] +
                        "\n---------------------------------------------------------------\n"
                );
            });
        } else if (SERVER_CONFIG["IW_NODE_ENV"] === "production") {
            this.server = http.createServer(this.app);
            this.server.listen(SERVER_CONFIG["SERVER_IW_SERVER_PORT"], () => {
                console.log(
                    "\n---------------------------------------------------------------\nIW " +
                        SERVER_CONFIG["IW_NODE_ENV"] +
                        " ts server listening at http://localhost:" +
                        SERVER_CONFIG["SERVER_IW_SERVER_PORT"] +
                        "\n---------------------------------------------------------------\n"
                );
            });
            // this.server = http.createServer(this.app);
            // this.server.listen(SERVER_CONFIG["SERVER_IW_SERVER_PORT"], () => {
            //     console.log(
            //         "\n---------------------------------------------------------------\nIW " +
            //             SERVER_CONFIG["IW_NODE_ENV"] +
            //             " ts server listening at http://localhost:" +
            //             SERVER_CONFIG["SERVER_IW_SERVER_PORT"] +
            //             "\n---------------------------------------------------------------\n"
            //     );
            // });
            // this.server = https.createServer(
            //     {
            //         key: fs.readFileSync(
            //             path.join(__dirname, "../../ssl/iw_key.pem")
            //         ),
            //         cert: fs.readFileSync(
            //             path.join(__dirname, "../../ssl/iw_crt.crt")
            //         ),
            //     },
            //     this.app
            // );
            // this.server.listen(
            //     SERVER_CONFIG["SERVER_IW_SERVER_PORT"],
            //     function () {
            //         console.log(
            //             "\n---------------------------------------------------------------\nIW " +
            //                 SERVER_CONFIG["IW_NODE_ENV"] +
            //                 " prod_ts server listening at https://localhost:" +
            //                 SERVER_CONFIG["SERVER_IW_SERVER_PORT"] +
            //                 "\n---------------------------------------------------------------\n"
            //         );
            //     }
            // );
        }
    };

    private enableRoutes = () => {
        const allRoutes = new RootRouter(this.connection).getRoutes();
        this.app.get('/passwordtest',async(req,res,next)=>{
            const pwd = req.query.pwd
            const enc = await Util.encryptPassword(pwd as string)
            console.log(enc)
            res.send(enc)
        })
        this.app.use("/api", allRoutes);
        this.app.use("/cron", new CronRouter(this.connection).getCronRoutes());
        if (
            SERVER_CONFIG["IW_NODE_ENV"] === "local" ||
            SERVER_CONFIG["IW_NODE_ENV"] === "development"
        ) {
            this.app.get("/", (req, res) => {
                res.send("IW server active!");
            });
        } else if (SERVER_CONFIG["IW_NODE_ENV"] === "production") {
            this.app.get("/testui", (req, res) => {
                res.send("IW server active prod!");
            });
            this.app.use(
                "/",
                express.static(path.resolve(__dirname, "../../interface"))
            );
            this.app.use(
                "*",
                express.static(path.resolve(__dirname, "../../interface"))
            );
        }
        this.app.get("/request_c_code", (req, res) => {
            const payload = {
                message: Response.OK.message,
                refreshToken: SERVER_CONFIG["APP_IW_QS_REFRESH_TOKEN"],
                qsAuthUrl: SERVER_CONFIG["APP_IW_QS_API_AUTH"],
                callbackUrl: SERVER_CONFIG["APP_QS_AUTH_CALLBACK_URL"],
                consumerKey: SERVER_CONFIG["APP_IW_QS_CONSMER_KEY"],
            };
            console.log(payload);
            res.status(Response.OK.status).json(payload);
        });
        this.app.get("/test", (req, res) => {
            get(
                "https://api07.iq.questrade.com/v1/accounts/52310463/positions",
                {
                    headers: {
                        // 'Content-Type': 'application/json',
                        // "Access-Control-Allow-Origin":"ORIGIN",
                        Authorization:
                            "Bearer DhgBfdS5COzm-5iJWl4N_PsoE_FHVUUF0",
                    },
                }
            ).then((response) => {
                console.log(response.data);
            });
        });
    };
    private injectMiddleware = () => {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(compression());
    };
}
