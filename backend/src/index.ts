import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import dataSource from "./db/postgres.config";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const database = process.env.POSTGRES_DATABASE || "";

dataSource
    .initialize()
    .then(() => {
        console.log(`Connected to ${database} database!`);
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Server is running on ${port}!`));
