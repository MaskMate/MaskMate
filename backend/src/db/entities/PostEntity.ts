import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";
import { Category } from "./CategoryEntity";
import { User } from "./UserEntity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn("uuid", { name: "post_id" })
    postId: number;

    @Column({ name: "title", type: "varchar" })
    title: string;

    @Column({ name: "content", type: "varchar" })
    content: string;

    @Column({ name: "upvote", type: "bigint", default: 0 })
    upvote: bigint;

    @Column({ name: "upvote", type: "bigint", default: 0 })
    downvote: bigint;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => Category, (category) => category.posts)
    category: Category;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;
}
