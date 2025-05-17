import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createActivity,
  getActivitiesBySession,
  getActivitiesByUser,
} from "../controllers/activityController";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createActivity);
router.get("/", getActivitiesByUser);
router.get("/session/:sessionId", getActivitiesBySession);

export default router;
