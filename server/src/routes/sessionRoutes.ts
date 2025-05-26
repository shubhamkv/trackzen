import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createSession,
  getAllSessions,
  getSessionSummary,
  updateSession,
} from "../controllers/sessionController";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSession);
router.get("/", getAllSessions);
router.put("/", updateSession);
router.get("/extension", getSessionSummary);

export default router;
