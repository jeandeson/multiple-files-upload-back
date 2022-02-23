import "dotenv/config";
import express from "express";
import routes from "./routes/routes.js";
import morgan from "morgan";
import connect from "./database/connect.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(routes);

connect().then(() => app.listen(3000, "192.168.0.107"));
