import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection().then(() => console.log("🔥 Banco de dados conectado"));
