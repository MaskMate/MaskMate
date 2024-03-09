import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./PostEntity";
import { Profile } from "./ProfileEntity";
import { Reply } from "./ReplyEntity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn("uuid", { name: "comment_id" })
    commentId: string;

    @Column({ type: "varchar", name: "comment" })
    comment: string;

    @Column({ name: "like", type: "int", default: 0 })
    like: number;

    @Column({ name: "reply_count", type: "int", default: 0 })
    replyCount: number;

    @ManyToOne(() => Profile, profile => profile.comments)
    profile: Profile;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @OneToMany(() => Reply, reply => reply.comment)
    replies: Reply[];

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;
}
