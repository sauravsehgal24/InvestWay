// https://www.questrade.com/api/documentation

import { Connection } from "typeorm";

export type IQsService = InstanceType<typeof QsService>
export class QsService{
    private connection:Connection 
    constructor(connection:Connection){
        this.connection = connection
    }
    public processTokenRequest = () =>{

    }
}