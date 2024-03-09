import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./ProfileEntity";
import { Comment } from "./CommentEntity";

@Entity()
export class Reply {
    @PrimaryGeneratedColumn("uuid", { name: "reply_id" })
    replyId: string;

    @Column({ type: "varchar", name: "reply" })
    reply: string;

    @Column({ name: "like", type: "int", default: 0 })
    like: number;

    @ManyToOne(() => Profile)
    profile: Profile;

    @ManyToOne(() => Comment, (comment) => comment.replies)
    comment: Comment;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;
}
