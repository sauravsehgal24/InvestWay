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
            this.rqPsd,
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
            const user = await this.userService.findUserById(req);
            let acntSettings = {};
            Object.keys(user.accountSettings).map((key) => {
                if (key !== "password" && key !== "athTkn") {
                    acntSettings = {
                        ...acntSettings,
                        [key]: user.accountSettings[key],
                    };
                }
            });
            const userPayload = {
                name: user.name,
                role: user.role,
                isActivated: user.isActivated,
                accountSettings: acntSettings,
                qsProfileData: user.qsProfileData,
                isDummy:user.isDummy
            };
            res.send(userPayload);
        });
    };

    private authUser = () => {
        this.router.post("/auth", async (req, res) => {
            const { email, password } = req.body;
            // const athTkn = (req.body.athTkn as string).trim();
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
            // athTkn !== "" && user.accountSettings.athTkn === athTkn &&
            const isPsdEncTrue = user.accountSettings.password === password;
            if (!isPassowrdCorrect && !isPsdEncTrue) {
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

    private rqPsd = () => {
        this.router.get("/rqpsd", async (req, res) => {
            const athTkn = req.query.athTkn;
            const email = req.query.email;
            if (!athTkn) {
                return res
                    .status(HttpResponse.Forbidden.status)
                    .json({ message: HttpResponse.Forbidden.message });
            }
            this.userService
                .verifyAthTkn(email as string, athTkn as string)
                .then((psd) => {
                    if (psd && psd.trim() !== "") {
                        return res
                            .status(HttpResponse.OK.status)
                            .json({ isOk: true, psd: psd });
                    }
                })
                .catch((err) => {
                    return res
                        .status(HttpResponse.Forbidden.status)
                        .json({ message: HttpResponse.Forbidden.message });
                });
        });
    };

    public getuserRoutes = () => {
        return this.router;
    };
}
