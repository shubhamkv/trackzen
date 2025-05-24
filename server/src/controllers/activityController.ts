import { Request, Response } from "express";
import { prisma } from "../config/db";
import { activitySchema, paramsSchema } from "../validators/zodSchema";

export const createActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
  }

  const result = activitySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      msg: "Invalid data",
      errors: result.error.errors,
    });
    return;
  }

  const { url, domain, title, startTime, endTime, duration, sessionId } =
    result.data;

  try {
    const activity = await prisma.websiteActivity.create({
      data: {
        url,
        domain,
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        duration,
        sessionId,
        userId: req.user.id,
      },
    });

    if (activity) {
      res.status(201).json({
        msg: "Activity created",
        websiteActivity: activity,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error creating activity",
      error,
    });
  }
};

export const getActivitiesByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
  }

  try {
    const activities = await prisma.websiteActivity.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        session: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (activities) {
      res.status(200).json({
        msg: "User web activities successfully fetched",
        userActivities: activities,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching web activities",
      error,
    });
  }
};

export const getActivitiesBySession = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
  }

  const result = paramsSchema.safeParse(req.params);
  if (!result.success) {
    res.status(400).json({
      msg: "Invalid session id",
      error: result.error.errors,
    });
    return;
  }

  const { sessionId } = result.data;
  try {
    const activities = await prisma.websiteActivity.findMany({
      where: {
        userId: req.user.id,
        sessionId,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    if (activities) {
      res.status(200).json({
        msg: "User session activities successfully fetched",
        sessionActivities: activities,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching session activities",
      error,
    });
  }
};
