import {
    BeforeInsert,
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

    @Column({ type: "boolean", default: false })
    verified: boolean;

    @Column({ type: "timestamptz" })
    expiresAt: Date;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @BeforeInsert()
    addExpiry() {
        const currentDate = new Date().toISOString();
        const utcDate = new Date(currentDate);
        utcDate.setMinutes(utcDate.getMinutes() + 30);
        this.expiresAt = utcDate;
    }
}
