
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
import { EquityTransaction } from "..";

export enum EType {
    STOCK = "STOCK",
    BOND = "BOND",
    MUTUAL_FUNDS = "MUTUAL_FUNDS",
    REITS = "REITS",
    ETF = "ETF",
    PRECIOUS_METAL = "PRECIOUS_METAL",
}

export enum Genre {
    IT = "IT",
    BANKING = "Banking",
    MANUFACTURING = "Manufacturing",
    MINING = "Mining",
    REAL_ESTATE = "Real Estate",
    JEWELLERY = "Jewellery",
}

@Entity({ name: "equity" })
export default class User{
    @PrimaryGeneratedColumn("uuid")
    equityId: string;
    @Column()
    _id;

    @Column({
        type: "varchar",
        length: 150,
        unique: false,
        nullable: false,
    })
    name: string;

    @Column({
    type: "varchar",
    length: 150,
    unique: false,
    nullable: false,
    })
    stockExchange: string;

    @Column({
    type: "varchar",
    length: 150,
    unique: true,
    nullable: false,
    })
    symbol: string;

    @Column({
    type: "enum",
    enum: EType,
    nullable: false,
    })
    type: EType;

    @Column({
    type: "enum",
    enum: Genre,
    nullable: false,
    })
    genre: Genre;

    @Column({
    type: "int",
    unique: false,
    nullable: false,
    })
    totalQty: number;

    @Column({
    type: "int",
    unique: false,
    nullable: false,
    })
    totalMktVal: number;

    @CreateDateColumn()
    creationDate: Date;

    @UpdateDateColumn()
    latestUpdateDate: Date;
      
    @Column()
    history: Array<EquityTransaction>;
}
