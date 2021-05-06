import { Connection } from "typeorm";
import { IQsService, QsService } from "../services/QsService";
import { BaseRouter } from "./BaseRouter";
import get from "axios"
import post from "axios"
import SERVER_CONFIG from '../config/server.config';

export class QsRouter extends BaseRouter<IQsService> {
    private qsService:IQsService
    constructor(connection: Connection){
        super(connection, "UserRouter");
        this.qsService = new QsService(this.connection);
        this.initiateAllRoutes([
            this.getQsDeal,
          ]);
    }

    // GET - All Users
    // once u get the token and api info, save it in the users document 
  private getQsDeal = () => {
    this.router.get("/qs_auth_deal", async(req, res) => {
      const authDealResult = await this.qsService.makeTokenDeal()
      if(authDealResult){
          res.status(200).json(authDealResult)
      }
    });
  };
  public getQsRoutes = () => {
    return this.router;
  };
}

    