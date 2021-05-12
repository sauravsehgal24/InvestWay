// https://www.questrade.com/api/documentation

import { Connection } from "typeorm";
import get from "axios";
var request = require("request");
import post from "axios";
import SERVER_CONFIG from "../config/server.config";
import { _get, _post } from "../../../utils/Axios";
import { QsTokenDealResponse, TokenDealData } from "../";
import { IUserService, UserService } from "./UserService";
import User, { TokenData } from "../entity/User";

export type IQsService = InstanceType<typeof QsService>;
export class QsService {
    private connection: Connection;
    private _qs: TokenDealData;
    private userService: IUserService;
    private _user: User;
    constructor(connection: Connection) {
        this.connection = connection;
        this.userService = new UserService(this.connection);
    }
    private initTokenDeal = async (
        rToken?: string
    ): Promise<QsTokenDealResponse | void> => {
        const userInfo = await this.userService.findUserByEmail(
            "sauravsehgal44@gmail.com"
        );
        const refreshToken = (await userInfo).tokenData.refresh_token;

        const url = SERVER_CONFIG["SERVER_IW_QS_API_DEAL"] + refreshToken;
        return _post<QsTokenDealResponse>(url)
            .then(async (result) => {
                if (result && result.access_token) {
                    this._qs = result;
                    const newTokenData: TokenData = this._qs;
                    const resultUpdate = await this.userService.updateUser(
                        userInfo.accountSettings.email as string,
                        newTokenData
                    );
                    this._user = resultUpdate as User;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // root method to perform all the tasks
    public _initiateSync = async (rToken: string) => {
        return await this.initTokenDeal(rToken);
    };

    private syncAccounts = async () => {
        const ep = this._user.tokenData.api_server + "/v1/accounts";
        _get(ep)
            .then((res) => {
                this._user.qsProfileData = res;
            })
            .catch((err) => {
                console.log(
                    `\nERROR SYNCING ACCOUNTS-----------------------------\n${err}-------------------------------`
                );
            });
    };
}
