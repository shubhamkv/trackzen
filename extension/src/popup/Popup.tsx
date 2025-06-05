import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/Spinner";
import { jwtDecode } from "jwt-decode";
import { BarChart3, PanelTop } from "lucide-react";

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
        if (result.trackzen_token) {
          try {
            const decoded = jwtDecode(result.trackzen_token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp! >= currentTime)
              setStoredToken(result.trackzen_token);
            else toast.error("Token expired... Enter new token");
          } catch (error) {
            console.log(error);
          }
        }

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
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp! < currentTime) {
        toast.error("Token expired... Enter new token");
        setToken("");
        return;
      }
    } catch (error) {
      console.log(error);
    }
    await chrome.storage.local.set({ trackzen_token: token });
    setStoredToken(token);
    setToken(""); // clear the input visually
    toast.success("Token saved successfully");
  };

  const handleToggleTracking = async () => {
    const { trackzen_token } = await chrome.storage.local.get("trackzen_token");
    try {
      const decoded = jwtDecode(trackzen_token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp! < currentTime) {
        toast.error("Token expired... Enter new token");
        return;
      }
    } catch (error) {
      console.log(error);
    }

    const newState = !isTrackingEnabled;
    setIsTrackingEnabled(newState);
    chrome.runtime.sendMessage(
      { type: "ENABLE_TRACKING", payload: newState },
      async (response) => {
        if (chrome.runtime.lastError) {
          console.error("Background error:", chrome.runtime.lastError);
          setIsTrackingEnabled(!newState); // rollback
          toast.error("Oops!! something went wrong...");
        } else {
          console.log("Tracking state changed:", response);
          console.log(newState);
          try {
            const res = await axiosInstance.post("/dashboard/extension-state", {
              newState,
            });
            console.log(res.data);
          } catch (error) {
            console.error("Error sending extension state", error);
            setIsTrackingEnabled(!newState);
          }

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
    <div className="w-[550px] h-[550px] bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg text-white p-4 font-sans border-3 border-orange-600">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-shrink-0 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h1
            className={`ml-2 text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`}
          >
            TrackZen
          </h1>
        </div>

        <button
          onClick={handleToggleTracking}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          {isTrackingEnabled ? "Disable" : "Enable"}
        </button>
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

          <button
            onClick={handleTokenSubmit}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center mb-2 gap-3">
          <div className=" bg-green-400 text-green-800 px-3 py-1 rounded-xl hover:bg-green-600">
            <span className="text-sm text-center font-medium">Token saved</span>
          </div>

          <button
            onClick={handleUpdateToken}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            Update Token
          </button>
        </div>
      )}

      {/* Stats or Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <>
          <div
            className="group bg-gradient-to-br 
                      from-gray-800 via-gray-800/90 to-gray-900
                       hover:bg-gray-700/50 transform hover:-translate-y-2 transition-all duration-300 ease-in-out
                      cursor-pointer border border-orange-600/30 shadow-lg hover:shadow-2xl shadow-orange-500/10 border-t-4 hover:shadow-orange-500/20 mt-8 rounded-lg p-4 space-y-2 text-sm"
          >
            <h2
              className="text-lg font-semibold mb-2 text-gray-200 group-hover:text-orange-400
                        transition-colors duration-300"
            >
              Your Activity Stats
            </h2>
            <div className="flex justify-between">
              <span
                className="text-gray-200 group-hover:text-white
                           transition-colors duration-300"
              >
                Total Time :
              </span>
              <span
                className="text-gray-100 group-hover:text-orange-400
                        transition-colors duration-300 font-medium"
              >
                {stats?.totalTime || "--"}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className="text-gray-200 group-hover:text-white
                           transition-colors duration-300"
              >
                Top Site :
              </span>
              <span
                className="text-gray-100 group-hover:text-orange-400
                        transition-colors duration-300 font-medium"
              >
                {stats?.topSite || "--"}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className="text-gray-200 group-hover:text-white
                           transition-colors duration-300"
              >
                Time on Top Site :
              </span>
              <span
                className="text-gray-100 group-hover:text-orange-400
                        transition-colors duration-300 font-medium"
              >
                {stats?.topSiteTime || "--"}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className="text-gray-200 group-hover:text-white
                           transition-colors duration-300"
              >
                Total Sessions :
              </span>
              <span
                className="text-gray-100 group-hover:text-orange-400
                        transition-colors duration-300 font-medium"
              >
                {stats?.totalSessions ?? "--"}
              </span>
            </div>
          </div>

          {/* Dashboard Link */}
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() =>
                window.open(
                  "https://trackzen.netlify.app/user/dashboard",
                  "_blank"
                )
              }
              className="flex justify-center items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
            >
              <PanelTop className="w-6 h-6" />
              View Full Dashboard
            </button>
          </div>
        </>
      )}
      <div className="mt-10 font-semibold text-orange-400 hover:text-orange-500 text-xl text-center">
        <p>
          "Every minute you spend in planning saves 10 minutes in execution."
        </p>
      </div>
    </div>
  );
};

export default Popup;
