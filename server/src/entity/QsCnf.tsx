import {
    Column,
    Entity,
    ObjectID,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "qsCnf" })
export default class QsCnf {
    @PrimaryGeneratedColumn("uuid")
    configId: string;

    @ObjectIdColumn()
    _id: ObjectID;

    @Column({ type: "varchar", length: 150, nullable: false })
    condumerKey: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    appName: string;

    @Column({ nullable: false })
    consumerKeyExp: Date;
}
