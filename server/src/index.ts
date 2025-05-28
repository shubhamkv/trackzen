import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import activityRouter from "./routes/activityRoutes";
import sessionRouter from "./routes/sessionRoutes";
import dashboardRouter from "./routes/dashboardRoutes";
import { connectDB } from "./config/db";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/activities", activityRouter);
app.use("/api/session", sessionRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
