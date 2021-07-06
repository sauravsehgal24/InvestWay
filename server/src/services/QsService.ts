// https://www.questrade.com/api/documentation

import { Connection } from "typeorm";
var request = require("request");
import SERVER_CONFIG from "../config/server.config";
import { _apiCall } from "../../../utils/Axios";
import { QsTokenDealResponse, TokenDealData } from "../";
import { IUserService, UserService } from "./UserService";
import User, {
    Balance,
    BalanceDetail,
    IndvBalanceDetail,
    QsProfileData,
    TokenData,
} from "../entity/User";
import { AxiosResponse } from "axios";
import { Util } from "../utils/Util";

export type IQsService = InstanceType<typeof QsService>;
export class QsService {
    private connection: Connection;
    private userService: IUserService;
    private _user: User;
    private openPandL: any;
    constructor(connection: Connection) {
        this.connection = connection;
        this.userService = new UserService(this.connection);
        this.openPandL = 0;
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
                        "saurav@gmail.com",
                        payload,
                        true
                    )) as User;
                    return updatedUser;
                }
            })
            .catch((err) => {
                throw "ERROR IN TOKEN DEAL";
            });
    };

    public test = async (userInfo) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        const offset = Util.getTZOffset(currentDate.getTimezoneOffset());
        const _sDate =
            currentDate.toISOString().split("T")[0] + "T08:00:00" + offset;
        currentDate.setDate(currentDate.getDate() + 1);
        const _endDate =
            currentDate.toISOString().split("T")[0] + "T08:00:00" + offset;

        const ep =
            userInfo.tokenData.api_server +
            "v1/accounts/" +
            userInfo.qsProfileData.accounts[0].number +
            "/orders?startTime=" +
            _sDate +
            "&endTime=" +
            _endDate;

        // return _apiCall<AxiosResponse>("GET", ep, {
        //     Authorization: `Bearer ${userInfo.tokenData.access_token}`,
        // })
        //     .then((res) => {
        //         console.log(res.data);
        //         return res.data;
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    // root method to perform all the tasks
    public _initiateSync = async (userInfo: User) => {
        const updatedUser: User = (await this.initTokenDeal(
            userInfo.tokenData.refresh_token
        )) as User;
        if (!updatedUser) throw " ERROR UPDATING TOKEN DATA";
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        const offset = Util.getTZOffset(currentDate.getTimezoneOffset());
        const _sDate =
            currentDate.toISOString().split("T")[0] + "T08:00:00" + offset;
        currentDate.setDate(currentDate.getDate() + 1);
        // Dont really require the endTime but just in case if i place order at 8:01 and cron got delayed and ran at 8:02 then their will be duplicate record
        const _endDate =
            currentDate.toISOString().split("T")[0] + "T08:00:00" + offset;
        // return this.syncBalances(updatedUser)
        //     .then((user) => {
        //         return user;
        //     })
        //     .catch((err) => {
        //         throw "ERROR SYNCING BALANCES";
        //     });

        return this.syncPositions(updatedUser)
            .then(async (result) => {
                return this.syncBalances(result as User)
                    .then((user) => {
                        return user;
                    })
                    .catch((err) => {
                        throw "ERROR SYNCING BALANCES";
                    });
            })
            .catch((err) => {
                throw "ERROR SYNCING ACCOUNTS";
            });
    };

    private syncBalances = (userInfo: User): Promise<User | void> => {
        const accountId = userInfo.qsProfileData.accounts[0].number;
        const ep =
            userInfo.tokenData.api_server +
            "v1/accounts/" +
            accountId +
            "/balances";

        const qsBalanceData = userInfo.qsProfileData.latestBalance;
        return _apiCall<AxiosResponse>("GET", ep, {
            Authorization: `Bearer ${userInfo.tokenData.access_token}`,
        })
            .then(async (res) => {
                if (
                    !res.data.perCurrencyBalances ||
                    !res.data.perCurrencyBalances[0] ||
                    res.data.perCurrencyBalances[0].length === 0
                ) {
                    throw "ERROR FETCHING BALANCE INFO";
                }
                const perCurrencyBalances: Array<IndvBalanceDetail> = res.data
                    .perCurrencyBalances as Array<IndvBalanceDetail>;
                let balance: Balance;

                const latestCadBalance: IndvBalanceDetail = perCurrencyBalances.filter(
                    (balanceDetail) => {
                        return balanceDetail.currency === "CAD";
                    }
                )[0];
                let payload = {};
                let prepBalanceDataToAppend: Partial<Balance> = {};
                prepBalanceDataToAppend.updatedDate = new Date();
                prepBalanceDataToAppend.createdDate = new Date();
                prepBalanceDataToAppend.openPAndL = this.openPandL;
                prepBalanceDataToAppend.recordHistory = [new Date()];
                prepBalanceDataToAppend.detail = res.data;
                if (
                    !qsBalanceData ||
                    qsBalanceData.marketValue !== latestCadBalance.marketValue
                ) {
                    const isBalanceArrayExist =
                        userInfo.qsProfileData.balances &&
                        userInfo.qsProfileData.balances.length !== 0
                            ? userInfo.qsProfileData.balances
                            : [];
                    payload = {
                        "qsProfileData.latestBalance": {
                            ...latestCadBalance,
                            openPAndL: this.openPandL,
                            updateDate: new Date(),
                            createdDate:
                                !qsBalanceData || !qsBalanceData.createdDate
                                    ? new Date()
                                    : qsBalanceData.createdDate,
                        },
                        "qsProfileData.balances": [
                            ...isBalanceArrayExist,
                            prepBalanceDataToAppend,
                        ],
                    };
                } else {
                    const lastBalanceFromQsData: Balance =
                        userInfo.qsProfileData.balances[
                            userInfo.qsProfileData.balances.length - 1
                        ];
                    lastBalanceFromQsData.updatedDate = new Date();
                    lastBalanceFromQsData.recordHistory = [
                        ...lastBalanceFromQsData.recordHistory,
                        new Date(),
                    ];
                    const oldBalances = userInfo.qsProfileData.balances.slice(
                        0,
                        -1
                    );
                    payload = {
                        "qsProfileData.balances": [
                            ...oldBalances,
                            lastBalanceFromQsData,
                        ],
                    };
                }
                const updatedUser: User = (await this.userService.updateUser(
                    "saurav@gmail.com",
                    payload,
                    true
                )) as User;
                return updatedUser as User;
            })
            .catch((err) => {
                throw "ERROR IN SYNC BALANCES CONTEXT";
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
                    positions.map((position) => {
                        this.openPandL += position.openPnl;
                    });
                    const payload = {
                        "qsProfileData.positions": [...positions],
                    };
                    const updatedUser: User = (await this.userService.updateUser(
                        "saurav@gmail.com",
                        payload,
                        true
                    )) as User;
                    return updatedUser as User;
                }
            })
            .catch((err) => {
                throw "ERROR IN SYNC POSITIONS CONTEXT";
            });
    };

    private syncExecutions = (
        userInfo: User,
        _sDate: string,
        _endDate: string
    ): Promise<User | void> => {
        const accountId = userInfo.qsProfileData.accounts[0].number;
        const ep =
            userInfo.tokenData.api_server +
            "v1/accounts/" +
            accountId +
            "/executions?startTime=" +
            _sDate +
            "&endTime=" +
            _endDate;
        return _apiCall<AxiosResponse>("GET", ep, {
            Authorization: `Bearer ${userInfo.tokenData.access_token}`,
        })
            .then(async (res) => {
                const { executions } = res.data;
                if (executions && executions.length !== 0) {
                    const payload = {
                        "qsProfileData.executions": userInfo.qsProfileData
                            .executions
                            ? [
                                  ...userInfo.qsProfileData.executions,
                                  ...executions,
                              ]
                            : [...executions],
                    };
                    const updatedUser: User = (await this.userService.updateUser(
                        "saurav@gmail.com",
                        payload,
                        true
                    )) as User;
                    return updatedUser as User;
                }
            })
            .catch((err) => {
                throw "ERROR IN SYNC EXECUTIONS CONTEXT";
            });
    };

    private syncOrders = (
        userInfo: User,
        _sDate: string,
        _endDate: string
    ): Promise<User | void> => {
        const accountId = userInfo.qsProfileData.accounts[0].number;
        const ep =
            userInfo.tokenData.api_server +
            "v1/accounts/" +
            accountId +
            "/orders?startTime=" +
            _sDate +
            "&endTime=" +
            _endDate;
        return _apiCall<AxiosResponse>("GET", ep, {
            Authorization: `Bearer ${userInfo.tokenData.access_token}`,
        })
            .then(async (res) => {
                const { orders } = res.data;
                if (orders && orders.length !== 0) {
                    const payload = {
                        "qsProfileData.orders": userInfo.qsProfileData.orders
                            ? [...userInfo.qsProfileData.orders, ...orders]
                            : [...orders],
                    };
                    const updatedUser: User = (await this.userService.updateUser(
                        "saurav@gmail.com",
                        payload,
                        true
                    )) as User;
                    return updatedUser as User;
                }
            })
            .catch((err) => {
                throw "ERROR IN SYNC ORDERS CONTEXT";
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
                const payload = {
                    "qsProfileData.accounts": [...res.data.accounts],
                    tokenData: { ...tokenData },
                };
                const updatedUser = await this.userService.updateUser(
                    "saurav@gmail.com",
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
