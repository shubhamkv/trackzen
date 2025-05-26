import { Request, Response } from "express";
import { createSessionSchema } from "../validators/zodSchema";
import { prisma } from "../config/db";
import { Prisma } from "@prisma/client";

export const createSession = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
  }

  const response = createSessionSchema.safeParse(req.body);
  if (!response.success) {
    res.status(400).json({
      msg: "Invalid data",
      errors: response.error.errors,
    });
    return;
  }

  const { startTime, totalTabs, endTime, duration } = response.data;

  try {
    const session = await prisma.session.create({
      data: {
        userId: req.user.id,
        startTime: new Date(startTime!),
        endTime: endTime ? new Date(endTime) : undefined,
        totalTabs: totalTabs,
        duration: duration ? duration : 0,
      },
    });

    if (session) {
      res.status(200).json({
        msg: "Session created successfully",
        sessionId: session.id,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error creating session",
      error,
    });
  }
};

export const getAllSessions = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
  }

  try {
    const sessions = await prisma.session.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        activities: true,
      },
    });

    if (sessions) {
      res.status(200).json({
        msg: "User sessions are fetched successfully",
        userSessions: sessions,
      });
      return;
    }
  } catch (err) {
    res.status(500).json({
      msg: "Error fetching user session",
      err,
    });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
  }

  const response = createSessionSchema.safeParse(req.body);
  if (!response.success) {
    res.status(400).json({
      msg: "Invalid data",
      errors: response.error.errors,
    });
    return;
  }

  const { startTime, endTime, totalTabs, sessionId, duration } = response.data;

  try {
    const updateData: Prisma.SessionUpdateInput = {};
    if (startTime) updateData.startTime = new Date(startTime);
    if (endTime) updateData.endTime = new Date(endTime);
    if (duration !== undefined) updateData.duration = duration;
    if (totalTabs !== undefined) updateData.totalTabs = totalTabs;

    const finalSession = await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: updateData,
    });

    if (finalSession) {
      res.status(200).json({
        msg: "Final Session created successfully",
        sessionId: finalSession.id,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error creating final session",
      error,
    });
  }
};

export const getSessionSummary = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const sessions = await prisma.session.findMany({
      where: { userId },
    });

    if (!sessions || sessions.length === 0) {
      res.status(404).json({
        msg: "No active session found!!",
      });
      return;
    }

    const totalTime = sessions.reduce(
      (acc, session) => acc + session.duration,
      0
    );

    //console.log(totalTime);

    const activities = await prisma.websiteActivity.findMany({
      where: {
        userId,
      },
    });

    const domainDuration: Record<string, number> = {};
    for (const activity of activities) {
      const domain = activity.domain;
      domainDuration[domain] =
        (domainDuration[domain] || 0) + activity.duration;
    }

    let topSite = "";
    let topSiteTime = 0;

    for (const [domain, time] of Object.entries(domainDuration)) {
      if (time > topSiteTime) {
        topSite = domain;
        topSiteTime = time;
      }
    }

    const totalSessions = await prisma.session.count({ where: { userId } });

    res.json({
      totalTime: formatDuration(totalTime),
      topSite,
      topSiteTime: formatDuration(topSiteTime),
      totalSessions,
    });
  } catch (error) {
    console.error("Error in fetching latest session: ", error);
    res.status(500).json({
      msg: "Error fetching lastest session",
    });
  }
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0 ? `${hours} h ${remainingMinutes} m` : `${minutes} m`;
};
