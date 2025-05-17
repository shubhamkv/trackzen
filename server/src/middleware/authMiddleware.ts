import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

interface JwtPayload {
  userId: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({
      msg: "Access Denied: No token found",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (decoded && decoded.userId) {
      req.user = { id: decoded.userId };
      return next();
    } else {
      res.status(403).json({ msg: "Invalid token payload" });
      return;
    }
  } catch (error) {
    res.status(403).json({
      msg: "Invalid token !!",
    });
    return;
  }
};
