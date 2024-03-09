import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class CommentLike {
    @PrimaryColumn({ name: "profile_id" })
    profileId: string;

    @PrimaryColumn({ name: "comment_id" })
    commentId: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;
}
