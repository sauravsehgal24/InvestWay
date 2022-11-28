import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ObjectID,
    ObjectIdColumn, 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

enum Role {
    VIEWER = "Viewer",
    USER = "User",
}

class QsAccount {
    @Column({})
    type: string;
    @Column({})
    number: number;
    @Column({})
    status: string;
    @Column({})
    isPrimary: boolean;
    @Column({})
    isBilling: boolean;
    @Column({})
    clientAccountType: string;
}

export class IndvBalanceDetail {
    @Column({})
    currency: string;
    @Column({})
    cash: number;
    @Column({})
    marketValue: number;
    @Column({})
    totalEquity: number;
    @Column({})
    buyingPower: number;
    @Column({})
    maintenanceExcess: number;
    @Column({})
    isRealTime: boolean;
}

export class BalanceDetail {
    @Column({})
    perCurrencyBalances: Array<IndvBalanceDetail>;

    @Column({})
    combinedBalances: Array<IndvBalanceDetail>;

    @Column({})
    sodPerCurrencyBalances: Array<IndvBalanceDetail>;

    @Column({})
    sodCombinedBalances: Array<IndvBalanceDetail>;
}

export class Balance {
    @PrimaryGeneratedColumn("uuid")
    balanceId: string;

    @Column({})
    detail: BalanceDetail;

    @Column({})
    openPAndL: number;

    @Column({})
    recordHistory: Array<Date>;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}

export class QsProfileData {
    @Column({})
    accounts: Array<QsAccount>;

    @Column({})
    positions: Array<any>;

    @Column({})
    executions: Array<any>;

    @Column({})
    orders: Array<any>;

    @Column({})
    latestBalance: IndvBalanceDetail & {
        openPAndL: string;
        createdDate: Date;
        updatedDate: Date;
    };

    @Column({})
    balances: Array<Balance>;
}

export class TokenData {
    @Column({})
    access_token: string;
    @Column({})
    refresh_token: string;
    @Column({})
    expires_in: number;
    @Column({})
    api_server: string;
    @Column({})
    token_type: string;
}

class QsSettings {
    @Column({})
    maxGenre: number;
    @Column({})
    maxEquity: number;
    @Column({})
    genreVal: number;
    @Column({})
    equityVal: number;
    @Column({})
    dCombineVal: number;
    @Column({})
    genreCount: number;
    @Column({})
    equityCount: number;
    @Column({})
    dVal: number;
}

class AccountSettings {
    @Column({
        type: "varchar",
        length: 150,
        nullable: false,
    })
    name: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    email: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    password: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    athTkn: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    cronTkn: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    address: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    phone: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    profileIcon: string;

    @Column({ nullable: true })
    qsSettings: QsSettings;
}

@Entity({ name: "user" })
export default class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string;
    @ObjectIdColumn()
    _id: ObjectID;
    @Column({
        nullable: false,
    })
    accountSettings: AccountSettings;

    @Column({ type: "varchar", length: 150, nullable: true })
    name: string;

    @Column({
        nullable: false,
    })
    tokenData: TokenData;

    @Column({
        length: 150,
        nullable: false,
        unique: false,
    })
    role: Role;

    @Column({
        nullable: false,
        unique: false,
    })
    isActivated: boolean;

    @Column({
        nullable: true,
        unique: false,
    })
    isDummy: boolean;

    @Column({
        nullable: true,
    })
    qsProfileData: QsProfileData;
}
