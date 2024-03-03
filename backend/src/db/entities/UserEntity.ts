import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
    ManyToOne,
} from "typeorm";
import { University } from "./UniversityEntity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid", { name: "user_id" })
    userId: string;

    @Column({ name: "username", type: "varchar", length: 50, unique: true })
    @Index({ unique: true })
    username: string;

    @Column({ name: "email", type: "varchar", length: 100, unique: true })
    @Index({ unique: true })
    email: string;

    @Column({ name: "password", type: "varchar" })
    password: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => University, (university) => university.users)
    university: University;
}
