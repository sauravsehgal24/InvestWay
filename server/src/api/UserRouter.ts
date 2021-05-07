import { Connection } from "typeorm";
import { IUserService, UserService } from "../services/UserService";
import { BaseRouter } from "./BaseRouter";
import HttpResponse from "../config/HttpResponse";
import { Util } from "../utils/Util";
import { AuthService } from "../services/AuthService";

export class UserRouter extends BaseRouter<IUserService> {
    private userService: IUserService;
    constructor(connection: Connection) {
        super(connection, "UserRouter");
        this.userService = new UserService(this.connection);
        this.initiateAllRoutes([this.getAllUsers, this.authUser]);
    }

    // GET - All Users
    private getAllUsers = () => {
        this.router.get("/", async (req, res) => {
            res.send(await this.userService.testUserService());
        });
    };

    private authUser = () => {
        this.router.post("/auth", async (req, res) => {
            const { email, password } = req.body;
            const user = await this.userService.findUserByEmail(email);
            if (!user) {
                return res
                    .status(HttpResponse.Forbidden.status)
                    .json({ message: HttpResponse.Forbidden.message });
            }
            const isPassowrdCorrect: boolean = await Util.comparePassword(
                password.toString(),
                user.password.toString()
            );
            if (!isPassowrdCorrect) {
                return res
                    .status(HttpResponse.Forbidden.status)
                    .json({ message: HttpResponse.Forbidden.message });
            }
            const payload = {
                userId: user._id,
                _id: user._id,
                email: user.email,
                role: user.role,
            };
            const token = AuthService.signToken(payload);
            return res
                .status(HttpResponse.OK.status)
                .json({ token, isActivated: user.isActivated });
        });
    };

    public getuserRoutes = () => {
        return this.router;
    };
}
