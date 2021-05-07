import { Connection, Repository } from "typeorm";
import User from "../entity/User";

export type IUserService = InstanceType<typeof UserService>
export class UserService{
    private connection:Connection;
    private _userRepo: Repository<User>;
    constructor(connection: Connection){
        this.connection = connection;
        this._userRepo = this.connection.getRepository(User);
    }
    public findUserByEmail = async (email:string) =>{
        const user = await this._userRepo.findOne({email:email}) 
        return user
    }
    public testUserService = async () =>{
        const users = await this._userRepo.find() 
        return users
    }
}