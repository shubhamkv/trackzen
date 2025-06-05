import { axiosInstance } from "@/utils/axiosInstance";

const IDLE_THRESHOLD_MINUTES = 180;
const SYNC_INTERVAL_MINUTES = 5;

type WebsiteActivity = {
  url: string;
  title: string;
  domain: string;
  startTime: string;
  endTime?: string;
  duration?: number;
};

type SessionData = {
  sessionStartTime: string;
  sessionEndTime?: string;
  totalTabs?: number;
};

let sessionStartTime: string | null = null;
let sessionEndTime: string | null = null;
let currentTabId: number | null = null;
let currentActivity: WebsiteActivity | null = null;
let activeTabIds: Set<number> = new Set();
let isSessionActive = false;
let isTrackingEnabled: boolean;
let sessionId: string;

function extractDomain(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch (error) {
    return "unknown";
  }
}

async function loadTrackingState() {
  const { trackzen_enabled } = await chrome.storage.local.get(
    "trackzen_enabled"
  );

  if (trackzen_enabled === true) isTrackingEnabled = true;
  else isTrackingEnabled = false;
}

/** LOCAL STORAGE HELPERS **/
async function cacheWebsiteActivity(activity: WebsiteActivity) {
  const result = await chrome.storage.local.get("websiteActivities");
  const activities: WebsiteActivity[] = result.websiteActivities || [];
  activities.push(activity);
  await chrome.storage.local.set({ websiteActivities: activities });
}

async function getCachedWebsiteActivities(): Promise<WebsiteActivity[]> {
  const result = await chrome.storage.local.get("websiteActivities");
  return result.websiteActivities || [];
}

async function clearCachedWebsiteActivities() {
  await chrome.storage.local.remove("websiteActivities");
}

async function cacheSessionData() {
  const data: SessionData = {
    sessionStartTime: sessionStartTime!,
    sessionEndTime: sessionEndTime || undefined,
    totalTabs: activeTabIds.size,
  };
  await chrome.storage.local.set({ trackzen_session: data });
}

async function getCachedSessionData(): Promise<SessionData | null> {
  const result = await chrome.storage.local.get("trackzen_session");
  return result.trackzen_session || null;
}

async function clearCachedSessionData() {
  await chrome.storage.local.remove("trackzen_session");
}

/** SESSION MANAGEMENT **/
async function startSession() {
  const { trackZen_sessionId } = await chrome.storage.local.get(
    "trackZen_sessionId"
  );
  if (!trackZen_sessionId) {
    const cachedSession = await getCachedSessionData();
    if (cachedSession) {
      try {
        const response = await axiosInstance.post("/session", {
          startTime: cachedSession.sessionStartTime,
          endTime: cachedSession.sessionEndTime,
          duration: Math.floor(
            (new Date(cachedSession.sessionEndTime!).getTime() -
              new Date(cachedSession.sessionStartTime).getTime()) /
              (60 * 1000)
          ),
          totalTabs: cachedSession.totalTabs,
        });
        sessionId = response.data.sessionId;
        await chrome.storage.local.set({ trackZen_sessionId: sessionId });
        await clearCachedSessionData();
        console.log("Recovered last session data");
      } catch (err) {
        console.error(
          "Failed to send recovered session, will retry later",
          err
        );
      }
    }
  } else {
    const cachedSession = await getCachedSessionData();
    if (cachedSession) {
      try {
        await axiosInstance.put("/session", {
          startTime: cachedSession.sessionStartTime,
          endTime: cachedSession.sessionEndTime,
          duration: Math.floor(
            (new Date(cachedSession.sessionEndTime!).getTime() -
              new Date(cachedSession.sessionStartTime).getTime()) /
              (60 * 1000)
          ),
          totalTabs: cachedSession.totalTabs,
          sessionId: trackZen_sessionId,
        });
        await clearCachedSessionData();
        console.log("Recovered last session data");
      } catch (err) {
        console.error(
          "Failed to send recovered session, will retry later",
          err
        );
      }
    }
  }

  const cachedWebsite = await getCachedWebsiteActivities();
  if (cachedWebsite && cachedWebsite.length > 0) {
    const { trackZen_sessionId } = await chrome.storage.local.get(
      "trackZen_sessionId"
    );
    try {
      await Promise.all(
        cachedWebsite.map((activity) =>
          axiosInstance.post("/activities", {
            ...activity,
            sessionId: trackZen_sessionId,
          })
        )
      );
      console.log("Recovered last session activities successfully");
      await clearCachedWebsiteActivities();
    } catch (error) {
      console.error("Unsuccessful recovery of last session activities", error);
    }
  }

  // Start new session
  sessionStartTime = new Date().toISOString();
  sessionEndTime = null;
  currentActivity = null;
  activeTabIds = new Set();
  isSessionActive = true;

  try {
    const response = await axiosInstance.post("/session", {
      startTime: sessionStartTime,
      totalTabs: 0,
    });
    sessionId = response.data.sessionId;
    await chrome.storage.local.set({ trackZen_sessionId: sessionId });
    console.log("New session started at", sessionStartTime);
  } catch (error) {
    console.error("Failed to send new session data, caching it", error);
    await cacheSessionData();
  }
}

async function endSession(reason: string) {
  if (!isSessionActive) return;

  sessionEndTime = new Date().toISOString();

  if (currentActivity) {
    currentActivity.endTime = sessionEndTime;
    currentActivity.duration = Math.floor(
      (new Date(currentActivity.endTime).getTime() -
        new Date(currentActivity.startTime).getTime()) /
        (60 * 1000)
    );

    await sendActivity(currentActivity);
    currentActivity = null;
  }

  const { trackZen_sessionId } = await chrome.storage.local.get(
    "trackZen_sessionId"
  );

  try {
    await axiosInstance.put(`/session`, {
      sessionId: trackZen_sessionId,
      endTime: sessionEndTime,
      duration: Math.floor(
        (new Date(sessionEndTime).getTime() -
          new Date(sessionStartTime!).getTime()) /
          (60 * 1000)
      ),
      totalTabs: activeTabIds.size,
    });
    console.log("Full Session data sent to backend");
    console.log(`Session ended due to: ${reason} at`, sessionEndTime);
    await clearCachedSessionData();
    await chrome.storage.local.remove("trackZen_sessionId");
    await clearCachedWebsiteActivities();
  } catch (error) {
    console.error("Failed to send full session data, caching it", error);
    await cacheSessionData();
  }

  isSessionActive = false;
  sessionStartTime = null;
}

async function sendActivity(activity: WebsiteActivity) {
  if (activity.title === "New Tab" || activity.duration === 0) return;

  const { trackZen_sessionId } = await chrome.storage.local.get(
    "trackZen_sessionId"
  );
  //console.log(activity);

  try {
    await axiosInstance.post(`/activities`, {
      ...activity,
      sessionId: trackZen_sessionId,
    });
    console.log("Website activity sent successfully");
  } catch (error) {
    console.error("Failed to send activity", error);
    await cacheWebsiteActivity(activity);
  }
}

/** INIT ON INSTALL OR STARTUP **/
chrome.runtime.onInstalled.addListener(async () => {
  await loadTrackingState();
  console.log("Extension installed");

  if (isTrackingEnabled) startSession();
});

chrome.runtime.onStartup.addListener(async () => {
  await loadTrackingState();

  if (isTrackingEnabled) startSession();
});

/** IDLE TRACKING **/
chrome.idle.setDetectionInterval(IDLE_THRESHOLD_MINUTES * 60);

chrome.idle.onStateChanged.addListener((newState) => {
  if (!isTrackingEnabled) return;

  if (newState === "idle" || newState === "locked") {
    endSession("Idle timeout");
  } else if (newState === "active" && !isSessionActive) {
    startSession();
  }
});

/** TAB TRACKING **/
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  if (!isTrackingEnabled) return;

  activeTabIds.add(tabId);

  if (currentTabId !== null && currentActivity) {
    currentActivity.endTime = new Date().toISOString();
    currentActivity.duration = Math.floor(
      (new Date(currentActivity.endTime).getTime() -
        new Date(currentActivity.startTime).getTime()) /
        (60 * 1000)
    );

    await sendActivity(currentActivity);
  }

  currentTabId = tabId;
  let tab;
  try {
    tab = await chrome.tabs.get(tabId);
  } catch (err) {
    console.warn("Failed to get tab info", err);
    return;
  }
  currentActivity = {
    url: tab.url || "",
    title: tab.title || "",
    domain: extractDomain(tab.url || ""),
    startTime: new Date().toISOString(),
  };
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!isTrackingEnabled) return;

  if (tabId === currentTabId && changeInfo.url && currentActivity) {
    currentActivity.endTime = new Date().toISOString();
    currentActivity.duration = Math.floor(
      (new Date(currentActivity.endTime).getTime() -
        new Date(currentActivity.startTime).getTime()) /
        (60 * 1000)
    );

    await sendActivity(currentActivity);

    currentActivity = {
      url: changeInfo.url,
      title: tab.title || "",
      domain: extractDomain(tab.url || ""),
      startTime: new Date().toISOString(),
    };
  }

  if (
    tabId === currentTabId &&
    changeInfo.status === "complete" &&
    tab.url?.startsWith("http")
  ) {
    // Send old activity if it's still going
    if (currentActivity) {
      currentActivity.endTime = new Date().toISOString();
      currentActivity.duration = Math.floor(
        (new Date(currentActivity.endTime).getTime() -
          new Date(currentActivity.startTime).getTime()) /
          (60 * 1000)
      );
      await sendActivity(currentActivity);
    }

    // Start new activity (even if same URL)
    currentActivity = {
      url: tab.url,
      title: tab.title || "",
      domain: extractDomain(tab.url),
      startTime: new Date().toISOString(),
    };
  }
});

/** PERIODIC SYNC BACKUP **/
let isSyncing: boolean = false;
setInterval(async () => {
  if (!isTrackingEnabled) return;

  if (isSyncing) return;
  isSyncing = true;

  try {
    const sessionData = await getCachedSessionData();
    if (sessionData) {
      const { trackZen_sessionId } = await chrome.storage.local.get(
        "trackZen_sessionId"
      );

      if (!trackZen_sessionId) {
        try {
          const response = await axiosInstance.post("/session", {
            startTime: sessionData.sessionStartTime,
            endTime: sessionEndTime ? sessionData.sessionEndTime : undefined,
            duration: sessionEndTime
              ? Math.floor(
                  (new Date(sessionData.sessionEndTime!).getTime() -
                    new Date(sessionData.sessionStartTime).getTime()) /
                    (60 * 1000)
                )
              : 0,
            totalTabs: sessionData.totalTabs,
          });
          sessionId = response.data.sessionId;
          await chrome.storage.local.set({ trackZen_sessionId: sessionId });
          console.log("Session data sync successfully");
          await clearCachedSessionData();
        } catch (error) {
          console.error("Session data sync failed", error);
        }
      } else {
        try {
          await axiosInstance.put("/session", {
            startTime: sessionData.sessionEndTime,
            endTime: sessionData.sessionEndTime,
            duration: Math.floor(
              (new Date(sessionData.sessionEndTime!).getTime() -
                new Date(sessionData.sessionStartTime).getTime()) /
                (60 * 1000)
            ),
            totalTabs: sessionData.totalTabs,
            sessionId: trackZen_sessionId,
          });
          console.log("Session data sync successfully");
          await clearCachedSessionData();
        } catch (error) {
          console.error("Session data sync failed", error);
        }
      }
    }

    const websiteActivitiesData = await getCachedWebsiteActivities();
    if (websiteActivitiesData && websiteActivitiesData.length > 0) {
      const { trackZen_sessionId } = await chrome.storage.local.get(
        "trackZen_sessionId"
      );
      try {
        await Promise.all(
          websiteActivitiesData.map((activity) =>
            axiosInstance.post("/activities", {
              ...activity,
              sessionId: trackZen_sessionId,
            })
          )
        );

        console.log("Website activities sync successfully");
        await clearCachedWebsiteActivities();
      } catch (error) {
        console.error("Unsuccessful website activities sync", error);
      }
    }
  } catch (error) {
    console.error("Error during periodic sync", error);
  } finally {
    isSyncing = false;
  }
}, SYNC_INTERVAL_MINUTES * 60 * 1000);

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "ENABLE_TRACKING") {
    isTrackingEnabled = msg.payload;
    chrome.storage.local.set({ trackzen_enabled: msg.payload });

    if (isTrackingEnabled && !isSessionActive) {
      startSession();
    } else if (!isTrackingEnabled && isSessionActive) {
      endSession("Disabled by user");
    }

    sendResponse({ status: "ok" });
  }

  return true;
});
