import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class ReplyLike {
    @PrimaryColumn({ name: "profile_id" })
    profileId: string;

    @PrimaryColumn({ name: "reply_id" })
    replyId: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;
}
