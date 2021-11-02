import "reflect-metadata";
import express from "express";
import { router } from "./routes/index";
import "./database/index";
const app = express();

app.use(express.json());
app.use(router);

export { app };
