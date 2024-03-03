import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    username: process.env.POSTGRES_USERNAME || "makemask_user",
    password: process.env.POSTGRES_PASSWORD || "makemask_password",
    database: process.env.POSTGRES_DATABASE || "makemask",
    // logging: true,
    entities: [],
    synchronize: true,
});

export default dataSource;
