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

    public findUserById = async (req) => {
        let user;
        const { userId, athTkn } = req.query;
        if (athTkn.trim() !== "") {
            user = (
                await this._userRepo.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $set: { "accountSettings.athTkn": athTkn },
                    },
                    {
                        upsert: true,
                        returnOriginal: false,
                    }
                )
            ).value;
        } else {
            user = await this._userRepo.findOne({ userId: userId });
        }
        return user;
    };

    public updateUser = async (email, payload, upsert?):Promise<User |void> => {
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
                return result.value as User;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    public verifyAthTkn = (email: string, tkn: string) => {
        return this._userRepo
            .findOne({
                where: {
                    "accountSettings.email": email,
                },
            })
            .then((user) => {
                if ((user as User).accountSettings.athTkn === tkn)
                    return (user as User).accountSettings.password;
                else {
                    throw "Tkn didn't matched";
                }
            })
            .catch((err) => {
                return err;
            });
    };

    public testUserService = async () => {
        const user = await this._userRepo.find();
        return user;
    };
}
