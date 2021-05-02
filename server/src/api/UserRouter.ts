import { Connection } from "typeorm";
import { IUserService, UserService } from "../services/UserService";
import { BaseRouter } from "./BaseRouter";


export class UserRouter extends BaseRouter<IUserService> {
    private userService:IUserService
    constructor(connection: Connection){
        super(connection, "UserRouter");
        this.userService = new UserService(this.connection);
        this.initiateAllRoutes([
            this.getAllUsers,
          ]);
    }

    // GET - All Users
  private getAllUsers = () => {
    this.router.get("/", async(req, res) => {
      res.send(await this.userService.testUserService());
    });
  };
  public getuserRoutes = () => {
    return this.router;
  };
}

    