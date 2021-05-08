import { AxiosResponse } from "axios";

export type AbstractProps = {
    match?: any;
    history?: any;
};

export type AuthResponse = AxiosResponse & {
    status: number;

    token: string;
    role: string;
    isActivated: boolean;
};
