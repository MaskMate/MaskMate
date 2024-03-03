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
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50, unique: true })
    @Index({ unique: true })
    username: string;

    @Column({ type: "varchar", length: 100, unique: true })
    @Index({ unique: true })
    email: string;

    @Column({ type: "varchar" })
    password: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => University, (university) => university.users)
    university: University;
}
