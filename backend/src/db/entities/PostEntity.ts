import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";
import { Category } from "./CategoryEntity";
import { Profile } from "./ProfileEntity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn("uuid", { name: "post_id" })
    postId: string;

    @Column({ name: "title", type: "varchar" })
    title: string;

    @Column({ name: "content", type: "varchar" })
    content: string;

    @Column({ name: "like", type: "int", default: 0 })
    like: number;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => Category, (category) => category.posts)
    category: Category;

    @ManyToOne(() => Profile, (profile) => profile.posts)
    profile: Profile;
}
