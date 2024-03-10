import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import Category from "./CategoryEntity";
import Profile from "./ProfileEntity";
import Comment from "./CommentEntity";

@Entity()
export default class Post {
    @PrimaryGeneratedColumn("uuid", { name: "post_id" })
    postId: string;

    @Column({ name: "title", type: "varchar" })
    title: string;

    @Column({ name: "content", type: "varchar" })
    content: string;

    @Column({ name: "like", type: "int", default: 0 })
    like: number;

    @Column({ name: "comment_count", type: "int", default: 0 })
    commentCount: number;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => Category, category => category.posts)
    category: Category;

    @ManyToOne(() => Profile, profile => profile.posts)
    profile: Profile;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
}
