// https://www.questrade.com/api/documentation

import { Connection } from "typeorm";
var request = require("request");
import SERVER_CONFIG from "../config/server.config";
import { _apiCall } from "../../../utils/Axios";
import { QsTokenDealResponse, TokenDealData } from "../";
import { IUserService, UserService } from "./UserService";
import User, { TokenData } from "../entity/User";
import { AxiosResponse } from "axios";

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
    ): Promise<User | void> => {
        const url = SERVER_CONFIG["SERVER_IW_QS_API_DEAL"] + refreshToken;
        return _apiCall<QsTokenDealResponse>("POST", url)
            .then(async (result) => {
                if (result.data && result.data.access_token) {
                    const payload = {
                        tokenData: { ...result.data },
                    };
                    const updatedUser: User = (await this.userService.updateUser(
                        "sauravsehgal44@gmail.com",
                        payload,
                        true
                    )) as User;
                    return updatedUser;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // root method to perform all the tasks
    public _initiateSync = async (userInfo: User) => {
        const updatedUser: User = (await this.initTokenDeal(
            userInfo.tokenData.refresh_token
        )) as User;
        if (!updatedUser) throw " ERROR UPDATING TOKEN DATA";
        return this.syncPositions(updatedUser)
            .then(async (result) => {
                return result;
            })
            .catch((err) => {
                throw "ERROR SYNCING ACCOUNTS";
            });
    };

    private syncPositions = (userInfo: User): Promise<User | void> => {
        const accountId = userInfo.qsProfileData.accounts[0].number;
        const ep =
            userInfo.tokenData.api_server +
            "v1/accounts/" +
            accountId +
            "/positions";
        return _apiCall<AxiosResponse>("GET", ep, {
            Authorization: `Bearer ${userInfo.tokenData.access_token}`,
        })
            .then(async (res) => {
                const { positions } = res.data;
                if (positions && positions.length !== 0) {
                    const payload = {
                        "qsProfileData.positions": [...positions],
                    };
                    const updatedUser: User = (await this.userService.updateUser(
                        "sauravsehgal44@gmail.com",
                        payload,
                        true
                    )) as User;
                    return updatedUser as User;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    private syncExecutions = (userInfo: User): Promise<User | void> => {
        const accountId = userInfo.qsProfileData.accounts[0].number;
        const ep =
            userInfo.tokenData.api_server +
            "v1/accounts/" +
            accountId +
            "/executions";
        return _apiCall<AxiosResponse>("GET", ep, {
            Authorization: `Bearer ${userInfo.tokenData.access_token}`,
        })
            .then(async (res) => {
                const { executions } = res.data;
                if (executions && executions.length !== 0) {
                    const payload = {
                        "qsProfileData.executions": [...executions],
                    };
                    const updatedUser: User = (await this.userService.updateUser(
                        "sauravsehgal44@gmail.com",
                        payload,
                        true
                    )) as User;
                    return updatedUser as User;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    private syncOrders = (userInfo: User): Promise<User | void> => {
        const accountId = userInfo.qsProfileData.accounts[0].number;
        const ep =
            userInfo.tokenData.api_server +
            "v1/accounts/" +
            accountId +
            "/orders";
        return _apiCall<AxiosResponse>("GET", ep, {
            Authorization: `Bearer ${userInfo.tokenData.access_token}`,
        })
            .then(async (res) => {
                const { orders } = res.data;
                if (orders && orders.length !== 0) {
                    const payload = {
                        "qsProfileData.orders": [...orders],
                    };
                    const updatedUser: User = (await this.userService.updateUser(
                        "sauravsehgal44@gmail.com",
                        payload,
                        true
                    )) as User;
                    return updatedUser as User;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //Manual
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
