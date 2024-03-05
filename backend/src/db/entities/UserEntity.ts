import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid", { name: "user_id" })
    userId: string;

    @Column({ name: "email", type: "varchar", length: 100, unique: true })
    @Index({ unique: true })
    email: string;

    @Column({ name: "password", type: "varchar" })
    password: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;
}
