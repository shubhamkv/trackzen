import { useEffect, useState } from "react";
import { Clock, Globe, Timer, Activity } from "lucide-react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Spinner } from "../Spinner";
import { OptionSelector } from "./OptionSelector";

export const Stats = () => {
  const [stats, setStats] = useState<{
    totalTime: string;
    topSite: string;
    topSiteTime: string;
    totalSessions: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/session/extension");
        setStats(response.data);
      } catch (err) {
        console.error("Error fetching session stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !stats)
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 p-4 sm:p-6 lg:p-8">
        {/* Total Hours */}
        <div
          className="group px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 rounded-xl shadow-lg hover:shadow-2xl 
                      dark:shadow-orange-500/10 dark:hover:shadow-orange-500/20
                      border-t-4
                      bg-gradient-to-br from-white via-orange-50 to-red-50 
                      dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-900
                      hover:bg-white dark:hover:bg-gray-700/50
                      transform hover:-translate-y-2 transition-all duration-300 ease-in-out
                      cursor-pointer border border-orange-100/50 dark:border-orange-600/30"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Clock
                className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 dark:text-orange-400 
                           group-hover:text-orange-600 dark:group-hover:text-orange-300
                           group-hover:scale-110 transition-all duration-300"
              />
              <span
                className="text-slate-800 dark:text-gray-200 font-medium text-sm sm:text-base 
                           group-hover:text-slate-900 dark:group-hover:text-white
                           transition-colors duration-300"
              >
                Total Hours
              </span>
            </div>
            <div
              className="font-bold text-xl sm:text-2xl lg:text-3xl text-slate-700 dark:text-gray-100
                        group-hover:text-orange-600 dark:group-hover:text-orange-400
                        transition-colors duration-300"
            >
              {stats.totalTime}
            </div>
          </div>
        </div>

        {/* Top Site */}
        <div
          className="group px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 rounded-xl shadow-lg hover:shadow-2xl 
                      dark:shadow-orange-500/10 dark:hover:shadow-orange-500/20
                      border-t-4 
                      bg-gradient-to-br from-white via-orange-50 to-red-50 
                      dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-900
                      hover:bg-white dark:hover:bg-gray-700/50
                      transform hover:-translate-y-2 transition-all duration-300 ease-in-out
                      cursor-pointer border border-orange-100/50 dark:border-orange-600/30"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Globe
                className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 dark:text-orange-400 
                           group-hover:text-orange-600 dark:group-hover:text-orange-300
                           group-hover:scale-110 transition-all duration-300"
              />
              <span
                className="text-slate-800 dark:text-gray-200 font-medium text-sm sm:text-base 
                           group-hover:text-slate-900 dark:group-hover:text-white
                           transition-colors duration-300"
              >
                Top Site
              </span>
            </div>
            <div
              className="font-bold text-xl sm:text-2xl lg:text-3xl text-slate-700 dark:text-gray-100
                        group-hover:text-orange-600 dark:group-hover:text-orange-400
                        transition-colors duration-300 break-words"
            >
              {stats.topSite}
            </div>
          </div>
        </div>

        {/* Top Site Duration */}
        <div
          className="group px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 rounded-xl shadow-lg hover:shadow-2xl 
                      dark:shadow-orange-500/10 dark:hover:shadow-orange-500/20
                      border-t-4 
                      bg-gradient-to-br from-white via-orange-50 to-red-50 
                      dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-900
                      hover:bg-white dark:hover:bg-gray-700/50
                      transform hover:-translate-y-2 transition-all duration-300 ease-in-out
                      cursor-pointer border border-orange-100/50 dark:border-orange-600/30"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Timer
                className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 dark:text-orange-400 
                           group-hover:text-orange-600 dark:group-hover:text-orange-300
                           group-hover:scale-110 transition-all duration-300"
              />
              <span
                className="text-slate-800 dark:text-gray-200 font-medium text-sm sm:text-base 
                           group-hover:text-slate-900 dark:group-hover:text-white
                           transition-colors duration-300"
              >
                Top Site Duration
              </span>
            </div>
            <div
              className="font-bold text-xl sm:text-2xl lg:text-3xl text-slate-700 dark:text-gray-100
                        group-hover:text-orange-600 dark:group-hover:text-orange-400
                        transition-colors duration-300"
            >
              {stats.topSiteTime}
            </div>
          </div>
        </div>

        {/* Total Sessions */}
        <div
          className="group px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 rounded-xl shadow-lg hover:shadow-2xl 
                      dark:shadow-orange-500/10 dark:hover:shadow-orange-500/20
                      border-t-4 
                      bg-gradient-to-br from-white via-orange-50 to-red-50 
                      dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-900
                      hover:bg-white dark:hover:bg-gray-700/50
                      transform hover:-translate-y-2 transition-all duration-300 ease-in-out
                      cursor-pointer border border-orange-100/50 dark:border-orange-600/30"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Activity
                className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 dark:text-orange-400 
                             group-hover:text-orange-600 dark:group-hover:text-orange-300
                             group-hover:scale-110 transition-all duration-300"
              />
              <span
                className="text-slate-800 dark:text-gray-200 font-medium text-sm sm:text-base 
                           group-hover:text-slate-900 dark:group-hover:text-white
                           transition-colors duration-300"
              >
                Total Sessions
              </span>
            </div>
            <div
              className="font-bold text-xl sm:text-2xl lg:text-3xl text-slate-700 dark:text-gray-100
                        group-hover:text-orange-600 dark:group-hover:text-orange-400
                        transition-colors duration-300"
            >
              {stats.totalSessions}
            </div>
          </div>
        </div>
      </div>
      <OptionSelector />
    </>
  );
};
