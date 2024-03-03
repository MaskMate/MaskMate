import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Otp {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100, unique: true })
    email: string;

    @Column({ type: "varchar", length: 6, unique: true })
    otp: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}
