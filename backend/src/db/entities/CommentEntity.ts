import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./PostEntity";
import { Profile } from "./ProfileEntity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn("uuid", { name: "comment_id" })
    commentId: string;

    @Column({ type: "varchar", name: "comment" })
    comment: string;

    @Column({ name: "like", type: "int", default: 0 })
    like: number;

    @ManyToOne(() => Profile, (profile) => profile.comments)
    profile: Profile;

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;
}
