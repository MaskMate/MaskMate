import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { PostCategories } from "../../utils/Categories";
import { Post } from "./PostEntity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid", { name: "category_id" })
    categoryId: string;

    @Column({ name: "category_name", type: "enum", enum: PostCategories })
    name: string;

    @Column({ name: "description", type: "varchar" })
    description: string;

    @Column({ name: "logo", type: "varchar" })
    logo: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @OneToMany(() => Post, (post) => post.category)
    posts: Post[];
}
