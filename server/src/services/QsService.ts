// https://www.questrade.com/api/documentation

import { Connection } from "typeorm";
import get from "axios"
import post from "axios"
import SERVER_CONFIG from '../config/server.config';
import {_post} from "../../../utils/Axios";
import { QsTokenDealResponse } from "..";

export type IQsService = InstanceType<typeof QsService>
export class QsService{
    private connection:Connection 
    constructor(connection:Connection){
        this.connection = connection
    }
    public makeTokenDeal = async () =>{
        const result = await _post<QsTokenDealResponse>(`${SERVER_CONFIG["SERVER_IW_QS_API_DEAL"]}fAEJULRdxQaFF2iEcojs-sLeiwGoA6qA0`)
        console.log("RESULT")
        console.log(result)
        if(result && result.access_token){
            return result
        }
    }
}  