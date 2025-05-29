import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getDailyStats,
  getMonthlyStats,
  getWeeklyStats,
} from "../controllers/dashboardController";

const router = express.Router();

router.use(authMiddleware);

router.get("/daily-stats", getDailyStats);
router.get("/weekly-stats", getWeeklyStats);
router.get("/monthly-stats", getMonthlyStats);

export default router;
