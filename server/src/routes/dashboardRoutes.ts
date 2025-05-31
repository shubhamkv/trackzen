import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getDailyStats,
  getExtensionState,
  getMonthlyStats,
  getWeeklyStats,
  postExtensionState,
} from "../controllers/dashboardController";

const router = express.Router();

router.use(authMiddleware);

router.get("/daily-stats", getDailyStats);
router.get("/weekly-stats", getWeeklyStats);
router.get("/monthly-stats", getMonthlyStats);
router.post("/extension-state", postExtensionState);
router.get("/extension-state", getExtensionState);

export default router;
