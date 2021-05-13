import { Connection, MongoRepository, getManager } from "typeorm";
import User from "../entity/User";

export type IUserService = InstanceType<typeof UserService>;
export class UserService {
    private connection: Connection;
    private _userRepo: MongoRepository<User>;
    constructor(connection: Connection) {
        this.connection = connection;
        this._userRepo = this.connection.getMongoRepository(User);
    }
    public findUserByEmail = async (email: string) => {
        const user = await this._userRepo.findOne({
            where: {
                "accountSettings.email": { $eq: email },
            },
        });
        return user;
    };

    public findUserById = async (userId) => {
        const user = await this._userRepo.findOne({ userId: userId });
        return user;
    };

    public updateUser = async (email, payload, upsert?) => {
        const updateDoc = {
            $set: { ...payload },
        };
        return this._userRepo
            .findOneAndUpdate(
                { "accountSettings.email": email },
                { ...updateDoc },
                {
                    upsert: upsert ? upsert : false,
                    returnOriginal: false,
                }
            )
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    public testUserService = async () => {
        const user = await this._userRepo.find();
        return user;
    };
}
