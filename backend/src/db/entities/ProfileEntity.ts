import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { University } from "./UniversityEntity";
import { Post } from "./PostEntity";
import { Comment } from "./CommentEntity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn("uuid", { name: "profile_id" })
    profileId: string;

    @Column({ name: "username", type: "varchar", length: 50, unique: true })
    @Index({ unique: true })
    username: string;

    @Column({ name: "email", type: "varchar", length: 100, unique: true })
    @Index({ unique: true })
    email: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => University, (university) => university.profiles)
    university: University;

    @OneToMany(() => Post, (post) => post.profile)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.profile)
    comments: Comment[];
}
