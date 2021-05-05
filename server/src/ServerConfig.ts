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
export type IServerConfig = InstanceType<typeof ServerConfig>
export class ServerConfig{
    _context:string = "ServerConfig"
    private app;
    private connection: Connection;
    private server: https.Server | http.Server;

    constructor(connection: Connection){
        this.app = express();
        this.initiateConfig([this.injectMiddleware]);
        this.connection = connection;
    }
    private initiateConfig = (cbs: Function[]) =>  { 
        cbs.map((cb) => cb());
    };
    public initServer = () =>{
        this.enableRoutes()
        if(SERVER_CONFIG["IW_NODE_ENV"] === "local" || SERVER_CONFIG["IW_NODE_ENV"] === "development"){
            this.server = http.createServer(this.app);
            this.server.listen(SERVER_CONFIG["SERVER_IW_SERVER_PORT"], () => {
                console.log(
                    "\n---------------------------------------------------------------\nIW "
                    +SERVER_CONFIG['IW_NODE_ENV']+" ts server listening at http://localhost:"+SERVER_CONFIG['SERVER_IW_SERVER_PORT']+
                    "\n---------------------------------------------------------------\n"
                );
            });
    }
    }
    
    private enableRoutes = () =>{
        const allRoutes = new RootRouter(this.connection).getRoutes();
        this.app.use("/api",allRoutes);
        if(SERVER_CONFIG["IW_NODE_ENV"] === "local" || SERVER_CONFIG["IW_NODE_ENV"] === "development"){
            this.app.get("/", (req, res) => {
                res.send("IW server active!"); 
            });
        }
    }
    private injectMiddleware = () =>{
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(compression());
    }
    
}