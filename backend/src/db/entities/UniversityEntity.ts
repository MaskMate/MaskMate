import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
    OneToMany,
} from "typeorm";
import { User } from "./UserEntity";

@Entity()
export class University {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar", unique: true })
    @Index({ unique: true })
    domain: string;

    @Column({ type: "varchar" })
    country: string;

    @Column({ type: "varchar" })
    logo: string =
        "https://cdn2.iconfinder.com/data/icons/school-and-education-flat/64/Education_Flat-48-512.png";

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @OneToMany(() => User, (user) => user.university)
    users: User[];
}
