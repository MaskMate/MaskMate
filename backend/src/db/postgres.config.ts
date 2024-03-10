import { DataSource } from "typeorm";
import { User } from "@/db/entities/UserEntity";
import { Otp } from "@/db/entities/OtpEntity";
import { University } from "@/db/entities/UniversityEntity";
import { Post } from "@/db/entities/PostEntity";
import { Category } from "@/db/entities/CategoryEntity";
import { Profile } from "@/db/entities/ProfileEntity";
import { PostLike } from "@/db/entities/PostLikeEntity";
import { Comment } from "@/db/entities/CommentEntity";
import { CommentLike } from "@/db/entities/CommentLikeEntity";
import { Reply } from "@/db/entities/ReplyEntity";
import { ReplyLike } from "@/db/entities/ReplyLikeEntity";
import { AddCategories1709573550000 } from "@/migration/addCategories";
import { AddUniversites1709573535718 } from "@/migration/addUniversites";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    username: process.env.POSTGRES_USERNAME || "makemask_user",
    password: process.env.POSTGRES_PASSWORD || "makemask_password",
    database: process.env.POSTGRES_DATABASE || "makemask",
    // logging: true,
    entities: [
        User,
        Profile,
        Otp,
        University,
        Category,
        Post,
        PostLike,
        Comment,
        CommentLike,
        Reply,
        ReplyLike,
    ],
    migrations: [AddCategories1709573550000, AddUniversites1709573535718],
    migrationsTableName: "migrations",
    synchronize: true,
});

export default dataSource;
