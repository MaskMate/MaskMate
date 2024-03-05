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
    postId: string;

    @Column({ name: "title", type: "varchar" })
    title: string;

    @Column({ name: "content", type: "varchar" })
    content: string;

    @Column({ name: "upvote", type: "int", default: 0 })
    upvote: number;

    @Column({ name: "downvote", type: "int", default: 0 })
    downvote: number;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => Category, (category) => category.posts)
    category: Category;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;
}
