import express from "express";
import router from "./routes/userRoute.js";
export const app = express();
app.use(express.json());
app.use("/users", router);
