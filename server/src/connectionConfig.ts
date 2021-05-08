import { ConnectionOptions } from "typeorm";
import * as path from "path";
import SERVER_CONFIG from "./config/server.config";
const config: ConnectionOptions = {
    type: "mongodb",
    url: "'mongodb://localhost:27017', {useNewUrlParser: true}",
    host: SERVER_CONFIG["SERVER_IW_DB_HOST"],
    port: parseInt(SERVER_CONFIG["SERVER_IW_DB_PORT"]),
    username: SERVER_CONFIG["SERVER_IW_DB_USERNAME"],
    password: SERVER_CONFIG["SERVER_IW_DB_PASSWORD"],
    database: SERVER_CONFIG["SERVER_IW_DB_DATABASE"],
    synchronize: false,
    logging: false,
    autoReconnect: false,
    entities: [
        path.join(__dirname, "/entity/**/*.js"),
        path.join(__dirname, "/entity/**/*.js.map"),
        path.join(__dirname, "/entity/**/**/*.js"),
        path.join(__dirname, "/entity/**/**/*.js.map"),
        path.join(__dirname, "/entity/**/*.ts"),
        path.join(__dirname, "/entity/**/**/*.ts"),
    ],
    migrations: [
        path.join(__dirname, "/migration/**/*.ts"),
        path.join(__dirname, "/migration/**/*.js"),
    ],
    subscribers: [path.join(__dirname, "/subscriber/**/*.ts")],
    cli: {
        entitiesDir: path.join(__dirname, "/entity"),
        migrationsDir: "server/src/migration",
        subscribersDir: path.join(__dirname, "/subscriber"),
    },
};

export = config;
