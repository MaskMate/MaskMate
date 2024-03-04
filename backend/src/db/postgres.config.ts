import { DataSource } from "typeorm";
import { User } from "./entities/UserEntity";
import { Otp } from "./entities/OtpEntity";
import { University } from "./entities/UniversityEntity";
import { Post } from "./entities/PostEntity";
import { Category } from "./entities/CategoryEntity";
import { AddCategories1709573550000 } from "../migration/addCategories";
import { AddUniversites1709573535718 } from "../migration/addUniversites";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    username: process.env.POSTGRES_USERNAME || "makemask_user",
    password: process.env.POSTGRES_PASSWORD || "makemask_password",
    database: process.env.POSTGRES_DATABASE || "makemask",
    // logging: true,
    entities: [User, Otp, University, Post, Category],
    migrations: [AddCategories1709573550000, AddUniversites1709573535718],
    migrationsTableName: "migrations",
    synchronize: true,
});

export default dataSource;
