import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Otp {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100, unique: true })
    @Index({ unique: true })
    email: string;

    @Column({ type: "varchar", length: 6, unique: true })
    otp: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}
