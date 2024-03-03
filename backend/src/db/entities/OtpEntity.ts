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
    @PrimaryGeneratedColumn("uuid", { name: "otp_id" })
    otpId: string;

    @Column({ name: "email", type: "varchar", length: 100, unique: true })
    @Index({ unique: true })
    email: string;

    @Column({ name: "otp", type: "varchar", length: 6, unique: true })
    otp: string;

    @Column({ name: "verified", type: "boolean", default: false })
    verified: boolean;

    @Column({ name: "expires_at", type: "timestamptz" })
    expiresAt: Date;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt: Date;

    @BeforeInsert()
    addExpiry() {
        const currentDate = new Date().toISOString();
        const utcDate = new Date(currentDate);
        utcDate.setMinutes(utcDate.getMinutes() + 30);
        this.expiresAt = utcDate;
    }
}
