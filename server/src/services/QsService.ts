// https://www.questrade.com/api/documentation

import { Connection } from "typeorm";
var request = require("request");
import SERVER_CONFIG from "../config/server.config";
import { _apiCall } from "../../../utils/Axios";
import { QsTokenDealResponse, TokenDealData } from "../";
import { IUserService, UserService } from "./UserService";
import User, { TokenData } from "../entity/User";

export type IQsService = InstanceType<typeof QsService>;
export class QsService {
    private connection: Connection;
    private userService: IUserService;
    private _user: User;
    constructor(connection: Connection) {
        this.connection = connection;
        this.userService = new UserService(this.connection);
    }
    private initTokenDeal = async (
        refreshToken: string
    ): Promise<QsTokenDealResponse | void> => {
        const url = SERVER_CONFIG["SERVER_IW_QS_API_DEAL"] + refreshToken;
        console.log(url);
        return _apiCall<QsTokenDealResponse>("POST", url)
            .then(async (result) => {
                if (result.data && result.data.access_token) {
                    console.log(`\nTOKEN DATA\n`);
                    console.log(result.data);
                    return result.data;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // root method to perform all the tasks
    public _initiateSync = async (userInfo: User) => {
        const newTokenData = (await this.initTokenDeal(
            userInfo.tokenData.refresh_token
        )) as TokenData;
        return this.syncAccounts(newTokenData)
            .then(async (result) => {
                return result;
            })
            .catch((err) => {
                throw "ERROR SYNCING ACCOUNTS";
            });
    };

    private syncAccounts = async (tokenData: TokenData) => {
        if (!tokenData) {
            throw "ERROR NO TOKEN DATA FOUND";
        }
        const ep = tokenData.api_server + "v1/accounts";
        _apiCall("GET", ep, {
            Authorization: `Bearer ${tokenData.access_token}`,
        })
            .then(async (res: any) => {
                console.log(`\nACCOUNTS DATA\n`);
                console.log(res.data);
                const payload = {
                    "qsProfileData.accounts": [...res.data.accounts],
                    tokenData: { ...tokenData },
                };
                const updatedUser = await this.userService.updateUser(
                    "sauravsehgal44@gmail.com",
                    payload,
                    true
                );
                return updatedUser;
            })
            .catch((err) => {
                console.log(
                    `\nERROR SYNCING ACCOUNTS-----------------------------\n${err}-------------------------------`
                );
            });
    };
}
