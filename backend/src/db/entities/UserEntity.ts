import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50, unique: true })
    username: string;

    @Column({ type: "varchar", length: 100, unique: true })
    email: string;

    @Column({ type: "varchar", length: 30 })
    password: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}
