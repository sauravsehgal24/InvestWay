import express from "express";
import { Connection } from "typeorm";
import { Util } from "../utils/Util";


export class CronRouter  {
    private _context="CronRouter"
    private router;
    private connection:Connection;
    constructor(connection: Connection){
      this.router = express.Router();
      this.connection = connection;
        Util.initiateAllRoutes([]);
    }
    public syncQsUserData = async() =>{

    }

    public getCronRoutes = () => {
        return this.router;
    };
}

    