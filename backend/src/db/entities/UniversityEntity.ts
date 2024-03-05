import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
    OneToMany,
} from "typeorm";
import { Profile } from "./ProfileEntity";

@Entity()
export class University {
    @PrimaryGeneratedColumn("uuid", { name: "university_id" })
    universityId: string;

    @Column({ name: "university_name", type: "varchar" })
    name: string;

    @Column({ name: "university_domain", type: "varchar", unique: true })
    @Index({ unique: true })
    domain: string;

    @Column({ name: "country", type: "varchar", nullable: true })
    country: string;

    @Column({ name: "logo", type: "varchar" })
    logo: string =
        "https://cdn2.iconfinder.com/data/icons/school-and-education-flat/64/Education_Flat-48-512.png";

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @OneToMany(() => Profile, (profile) => profile.university)
    profiles: Profile[];
}
