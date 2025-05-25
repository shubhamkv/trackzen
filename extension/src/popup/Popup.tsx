import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/Spinner";

const Popup = () => {
  const [token, setToken] = useState("");
  const [storedToken, setStoredToken] = useState<string | null>(null);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);
  const [stats, setStats] = useState<{
    totalTime: number;
    topSite: string;
    topSiteTime: string;
    totalSessions: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    chrome.storage.local.get(
      ["trackzen_enabled", "trackzen_token"],
      (result) => {
        setIsTrackingEnabled(result.trackzen_enabled ?? false);
        if (result.trackzen_token) setStoredToken(result.trackzen_token);

        (async () => {
          try {
            const response = await axiosInstance.get("/session/extension");
            setStats(response.data);
          } catch (err) {
            console.error("Error fetching session stats:", err);
          } finally {
            setLoading(false);
          }
        })();
      }
    );

    // Listen for changes in tracking state (like idle timeout disables it)
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === "local" && changes.trackzen_enabled) {
        const newValue = changes.trackzen_enabled.newValue;
        setIsTrackingEnabled(newValue ?? false);
        console.log("Tracking state updated from storage change:", newValue);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Cleanup
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const handleTokenSubmit = async () => {
    if (!token.trim()) return toast.error("Please enter a token");
    await chrome.storage.local.set({ trackzen_token: token });
    setStoredToken(token);
    setToken(""); // clear the input visually
    toast.success("Token saved successfully");
  };

  const handleToggleTracking = async () => {
    const newState = !isTrackingEnabled;
    setIsTrackingEnabled(newState);
    chrome.runtime.sendMessage(
      { type: "ENABLE_TRACKING", payload: newState },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("Background error:", chrome.runtime.lastError);
          setIsTrackingEnabled(!newState); // rollback
          toast.error("Oops!! something went wrong...");
        } else {
          console.log("Tracking state changed:", response);
          if (newState) toast.success("TrackZen Enabled");
          else toast.success("TrackZen Disabled");
        }
      }
    );
  };

  const handleUpdateToken = () => {
    setStoredToken(null); // reveal the input for entering a new token
  };

  return (
    <div className="w-[500px] h-[500px] bg-slate-700 dark:bg-gray-900 shadow-lg text-black dark:text-white p-4 font-sans border-3 border-orange-300">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-orange-500">TrackZen</h1>
        <Button
          variant={isTrackingEnabled ? "destructive" : "default"}
          onClick={handleToggleTracking}
          className="cursor-pointer"
        >
          {isTrackingEnabled ? "Disable" : "Enable"}
        </Button>
      </div>

      {/* Token Input or Update Button */}
      {!storedToken ? (
        <div className="flex justify-center items-center space-x-2 mb-2">
          <Input
            type="text"
            placeholder="Enter token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-grow"
          />
          <Button className="cursor-pointer" onClick={handleTokenSubmit}>
            Submit
          </Button>
        </div>
      ) : (
        <div className="flex justify-center items-center mb-2 gap-3">
          <div className="flex items-center bg-green-400 text-green-800 px-3 py-1 rounded-xl shadow-md">
            <span className="text-sm font-medium">Token saved</span>
          </div>
          <Button
            className="cursor-pointer"
            size="sm"
            onClick={handleUpdateToken}
          >
            Update Token
          </Button>
        </div>
      )}

      {/* Stats or Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="bg-gray-300 dark:bg-gray-800 mt-5 rounded-lg p-4 space-y-2 text-sm">
            <h2 className="text-lg font-semibold mb-2">Your Activity Stats</h2>
            <div className="flex justify-between">
              <span className="text-gray-900">Total Time :</span>
              <span className="font-medium">{stats?.totalTime || "--"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">Top Site :</span>
              <span className="font-medium">{stats?.topSite || "--"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">Time on Top Site :</span>
              <span className="font-medium">{stats?.topSiteTime || "--"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">Total Sessions :</span>
              <span className="font-medium">
                {stats?.totalSessions ?? "--"}
              </span>
            </div>
          </div>

          {/* Dashboard Link */}
          <div className="mt-6 text-center flex justify-center items-center bg-yellow-300 text-indigo-700 px-3 py-1 rounded-xl shadow-md font-bold hover:underline">
            <a
              href="https://dashboard.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Dashboard →
            </a>
          </div>
        </>
      )}
      <div className="mt-8 font-bold text-orange-400 text-xl text-center">
        <p>
          "Every minute you spend in planning saves 10 minutes in execution."
        </p>
      </div>
    </div>
  );
};

export default Popup;
