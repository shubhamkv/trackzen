import { Request, Response } from "express";
import { subHours } from "date-fns";
import { prisma } from "../config/db";
import { redisClient } from "../config/redisDB";

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0
    ? `${hours} h ${Math.floor(remainingMinutes)} m`
    : `${Math.floor(minutes)} m`;
};

export const getDailyStats = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
  }

  const userId = req.user.id;

  try {
    const now = new Date();
    const lastTwentyFourHours = subHours(now, 24);

    const activities = await prisma.websiteActivity.findMany({
      where: {
        userId,
        startTime: {
          gte: lastTwentyFourHours,
        },
      },
    });

    if (!activities || activities.length === 0) {
      res.status(200).json({
        msg: "No activities found!!",
      });
      return;
    }

    const uniqueDomains = new Set(activities.map((a) => a.domain));
    const totalWebsites = uniqueDomains.size;

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

    const sessions = await prisma.session.findMany({
      where: {
        userId,
        startTime: {
          gte: lastTwentyFourHours,
        },
      },
      orderBy: {
        duration: "desc",
      },
    });

    const totalDuration = sessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );
    const averageTime =
      sessions.length > 0 ? totalDuration / sessions.length : 0;

    const longestSession = sessions.length > 0 ? sessions[0].duration : 0;

    const response = {
      activities,
      topWebsite: {
        domain: topSite,
        duration: formatDuration(topSiteTime),
      },
      totalWebsites,
      dailyAverage: formatDuration(averageTime),
      longestSession: formatDuration(longestSession),
      totalDuration: formatDuration(totalDuration),
    };

    if (response) res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching daily stats", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getWeeklyStats = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
  }

  const userId = req.user.id;

  try {
    const now = new Date();
    const lastWeek = subHours(now, 168);

    const activities = await prisma.websiteActivity.findMany({
      where: {
        userId,
        startTime: {
          gte: lastWeek,
        },
      },
    });

    if (!activities || activities.length === 0) {
      res.status(200).json({
        msg: "No activities found!!",
      });
      return;
    }

    const uniqueDomains = new Set(activities.map((a) => a.domain));
    const totalWebsites = uniqueDomains.size;

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

    const sessions = await prisma.session.findMany({
      where: {
        userId,
        startTime: {
          gte: lastWeek,
        },
      },
      orderBy: {
        duration: "desc",
      },
    });

    const totalDuration = sessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );
    const averageTime =
      sessions.length > 0 ? totalDuration / sessions.length : 0;

    const longestSession = sessions.length > 0 ? sessions[0].duration : 0;

    const response = {
      activities,
      topWebsite: {
        domain: topSite,
        duration: formatDuration(topSiteTime),
      },
      totalWebsites,
      weeklyAverage: formatDuration(averageTime),
      longestSession: formatDuration(longestSession),
      totalDuration: formatDuration(totalDuration),
    };

    if (response) res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching daily stats", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getMonthlyStats = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
  }

  const userId = req.user.id;

  try {
    const now = new Date();
    const lastMonth = subHours(now, 720);

    const activities = await prisma.websiteActivity.findMany({
      where: {
        userId,
        startTime: {
          gte: lastMonth,
        },
      },
    });

    if (!activities || activities.length === 0) {
      res.status(200).json({
        msg: "No activities found!!",
      });
      return;
    }

    const uniqueDomains = new Set(activities.map((a) => a.domain));
    const totalWebsites = uniqueDomains.size;

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

    const sessions = await prisma.session.findMany({
      where: {
        userId,
        startTime: {
          gte: lastMonth,
        },
      },
      orderBy: {
        duration: "desc",
      },
    });

    const totalDuration = sessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );
    const averageTime =
      sessions.length > 0 ? totalDuration / sessions.length : 0;

    const longestSession = sessions.length > 0 ? sessions[0].duration : 0;

    const response = {
      activities,
      topWebsite: {
        domain: topSite,
        duration: formatDuration(topSiteTime),
      },
      totalWebsites,
      monthlyAverage: formatDuration(averageTime),
      longestSession: formatDuration(longestSession),
      totalDuration: formatDuration(totalDuration),
    };

    if (response) res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching daily stats", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const postExtensionState = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
  }

  const userId = req.user.id;
  const { newState } = req.body;

  try {
    const dbres = await redisClient.set(
      `extensionState:${userId}`,
      String(newState)
    );
    if (dbres)
      res.status(200).json({
        msg: `Extention ${newState ? "enabled" : "disabled"}`,
      });
  } catch (error) {
    console.error("Error msg:", error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getExtensionState = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
  }

  const userId = req.user.id;

  try {
    const dbres = await redisClient.get(`extensionState:${userId}`);
    if (dbres)
      res.status(200).json({
        msg: `Extention state fetched successfully`,
        extensionState: dbres === "true",
      });
  } catch (error) {
    console.error("Error msg:", error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};
