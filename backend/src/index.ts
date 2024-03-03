import express, { json } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import dataSource from "./db/postgres.config";
import AuthRouter from "./router/AuthRouter";
import { prepareDataForUniversityTable } from "./utils/UniversityHelper";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
const database = process.env.POSTGRES_DATABASE || "";

app.use(json());

dataSource
    .initialize()
    .then(() => {
        prepareDataForUniversityTable();
        console.log(`Connected to ${database} database!`);
    })
    .catch((error) => {
        console.error("Error during Data Source initialization", error);
    });

app.use("/api/auth", AuthRouter);

app.listen(port, () => console.log(`Server is running on ${port}!`));
