// https://www.questrade.com/api/documentation

import { Connection } from "typeorm";
import get from "axios";
var request = require("request");
import post from "axios";
import SERVER_CONFIG from "../config/server.config";
import { _get, _post } from "../../../utils/Axios";
import { QsTokenDealResponse, TokenDealData } from "../";
import { IUserService, UserService } from "./UserService";

export type IQsService = InstanceType<typeof QsService>;
export class QsService {
    private connection: Connection;
    private _qs: TokenDealData;
    private userService: IUserService;
    constructor(connection: Connection) {
        this.connection = connection;
        this.userService = new UserService(this.connection);
    }
    private initTokenDeal = async (
        rToken: string
    ): Promise<QsTokenDealResponse | void> => {
        console.log(`URL: ${SERVER_CONFIG["SERVER_IW_QS_API_DEAL"]}${rToken}`);

        // request.post(
        //     `${SERVER_CONFIG["SERVER_IW_QS_API_DEAL"]}${rToken}}`,
        //     (err, res, body) => {
        //         if (err) {
        //             console.log("ERROR IN CALL");
        //             console.log(err);
        //         } else {
        //             console.log("RES IN CALL");
        //             console.log(res);
        //         }
        //     }
        // );

        const url = SERVER_CONFIG["SERVER_IW_QS_API_DEAL"] + rToken;
        return _post<QsTokenDealResponse>(url)
            .then((result) => {
                if (result && result.access_token) {
                    this._qs = result;
                    return result;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // root method to perform all the tasks
    public _initiateSync = async (rToken: string) => {
        return this.initTokenDeal(rToken);
    };

    private syncAccounts = async () => {
        const ep = `${this._qs.api_server}/v1/accounts`;
        _get(ep)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(
                    `\nERROR SYNCING ACCOUNTS-----------------------------\n${err}-------------------------------`
                );
            });
    };
}
