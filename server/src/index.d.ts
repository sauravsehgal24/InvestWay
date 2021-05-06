import { AxiosResponse } from 'axios'
export type EquityTransaction = any
export type QsTokenDealResponse = AxiosResponse & {
    access_token:string,
    token_type: string ,
    expires_in:number,
    refresh_token:string,
    api_server:string
}

