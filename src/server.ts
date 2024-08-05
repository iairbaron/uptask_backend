import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./cors";
import { connectDB } from "./db";
import router from "./router/ProjectRoutes";

dotenv.config();

connectDB();
const app = express();
app.use(cors(corsConfig));

app.use(express.json());

//Routess
app.use("/api/auth", router);
app.use("/api/projects", router);

export default app;
