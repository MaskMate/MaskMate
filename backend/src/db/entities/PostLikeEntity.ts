import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class PostLike {
    @PrimaryColumn({ name: "profile_id" })
    profileId: string;

    @PrimaryColumn({ name: "post_id" })
    postId: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;
}
