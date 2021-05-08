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
        this.initiateAllRoutes([
            this.getAllUsers,
            this.authUser,
            this.getUserById,
        ]);
    }

    // GET - All Users
    private getAllUsers = () => {
        this.router.get("/users", async (req, res) => {
            res.send(await this.userService.testUserService());
        });
    };

    private getUserById = () => {
        this.router.get("/", async (req, res) => {
            res.send(await this.userService.findUserById(req.query.userId));
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
                user.accountSettings.password.toString()
            );
            if (!isPassowrdCorrect) {
                return res
                    .status(HttpResponse.Forbidden.status)
                    .json({ message: HttpResponse.Forbidden.message });
            }
            const payload = {
                userId: user.userId,
                _id: user._id,
                email: user.accountSettings.email,
                role: user.role,
            };
            const token = AuthService.signToken(payload);
            return res
                .status(HttpResponse.OK.status)
                .json({ token: token, isActivated: user.isActivated });
        });
    };

    public getuserRoutes = () => {
        return this.router;
    };
}
