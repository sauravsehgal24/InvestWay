import { Connection } from "typeorm";
import * as express from "express";
import { UserRouter } from "./UserRouter";

export default class RootRouter {
    private rootRouter: any;
    private connection: Connection;
    constructor(connection: Connection) {
      this.connection = connection;
      this.rootRouter = express.Router();
    }

    private initAllRoutes = (cbs) => {
        if (cbs && cbs.length > 0) {
          cbs.map((cbObject) => {
            this.rootRouter.use(`${cbObject.route}`, cbObject.cb());
          });
        }
      };

      public getRoutes = () => {
        this.initAllRoutes([
          {
            route: "/user",
            cb: new UserRouter(this.connection).getuserRoutes,
          }
        ]);
    
        return this.rootRouter;
      };


}