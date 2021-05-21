import { AxiosResponse } from "axios";

export type EquityTransaction = any;
export type TokenDealData = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    api_server: string;
};
export type QsTokenDealResponse = AxiosResponse & TokenDealData;

export interface IEmailData {
    to: string;
    from?: string;
    html: string;
    subject: string;
    attachments?: Array<object>;
}
