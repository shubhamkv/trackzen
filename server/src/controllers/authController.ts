import { prisma } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/zodSchema";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, username, password } = req.body;

  try {
    const inputValidation = registerSchema.safeParse(req.body);
    if (!inputValidation.success) {
      res.status(400).json({
        msg: "Incorrect Inputs",
        errors: inputValidation.error.flatten().fieldErrors,
      });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      res.status(409).json({
        msg: "Username already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
      },
    });

    if (newUser) {
      res.status(201).json({
        msg: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          username: newUser.username,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      err: error,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const inputValidation = loginSchema.safeParse(req.body);
    if (!inputValidation.success) {
      res.status(400).json({
        msg: "Incorrect Inputs",
        errors: inputValidation.error.flatten().fieldErrors,
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      res.status(404).json({
        msg: "User not found",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        msg: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "5d",
    });

    res.status(200).json({
      msg: "Login successfully",
      token: token,
      name: user.name,
      username: user.username,
      createdAt: user.createdAt,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "unknown error";
    res.status(500).json({
      msg: "Error while sign in! Try Again...",
      err: errMsg,
    });
  }
};
