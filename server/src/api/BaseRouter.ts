import * as express from "express";
import { Connection } from "typeorm";
import { Util } from "../utils/Util";

export abstract class BaseRouter<T> {
    protected connection: Connection;
    protected router: express.Router;
    private _selfContext = "BaseRouter";
    protected _context: string;
  
    constructor(connection: any, context: string) {
      this.router = express.Router();
      this.connection = connection;
      this._context = context;
    }
  
    protected initiateAllRoutes = (cbs: Function[]) => {
      Util.initiateAllRoutes(cbs);
    };
  }
  