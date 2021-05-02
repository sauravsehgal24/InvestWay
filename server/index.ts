//  eslint help: https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/
//  mongodb:  http://mongodb.github.io/node-mongodb-native/3.6/api/
import "reflect-metadata";
import { createConnection, Connection, ConnectionOptions } from "typeorm";
import { ServerConfig, IServerConfig } from "./src/ServerConfig";
import config = require("./src/connectionConfig");
const connectionOpts: ConnectionOptions = config;

createConnection(connectionOpts)
  .then(async (connection: Connection) => {
    const server: IServerConfig = new ServerConfig(connection);
    server.initServer();
  })
  .catch((error) => console.log(error));
 

