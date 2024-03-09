import { CreateDateColumn, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
export class Like {
    @PrimaryColumn({ name: "post_id" })
    postId: string;

    @PrimaryColumn({ name: "profile_id" })
    profileId: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;
}
