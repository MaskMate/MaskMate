import express, { json } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import dataSource from "./db/postgres.config";
import AuthRouter from "./routers/AuthRouter";
import PostRouter from "./routers/PostRouter";
import CommentRouter from "./routers/CommentRouter";
import ReplyRouter from "./routers/ReplyRouter";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
const database = process.env.POSTGRES_DATABASE || "";

app.use(json());

dataSource
    .initialize()
    .then(() => {
        console.log(`Connected to ${database} database!`);
    })
    .catch(error => {
        console.error("Error during Data Source initialization", error);
    });

app.use("/api/auth", AuthRouter);
app.use("/api/post", PostRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/reply", ReplyRouter);

app.listen(port, () => console.log(`Server is running on ${port}!`));
