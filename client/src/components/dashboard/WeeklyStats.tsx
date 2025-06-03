import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  type TooltipProps,
} from "recharts";
import {
  BarChart2,
  Clock3,
  Gauge,
  LineChart,
  Link,
  ListTree,
} from "lucide-react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Spinner } from "../Spinner";

interface Activity {
  id: string;
  domain: string;
  title: string;
  duration: number;
}

interface ApiResponse {
  activities: Activity[];
  topWebsite: {
    domain: string;
    duration: string;
  };
  totalWebsites: number;
  weeklyAverage: string;
  longestSession: string;
  totalDuration: string;
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const { domain, title, duration } = payload[0].payload;
    return (
      <div className="p-3 sm:p-4 bg-gradient-to-br from-orange-100 to-red-200 dark:from-orange-900 dark:to-red-900 rounded-xl shadow-lg border border-orange-300 dark:border-orange-600 text-sm sm:text-base transform transition-all duration-200 scale-105">
        <p className="mb-1">
          <strong className="text-orange-800 dark:text-orange-300">
            Title:
          </strong>
          <span className="text-gray-800 dark:text-gray-200 ml-1">{title}</span>
        </p>
        <p className="mb-1">
          <strong className="text-orange-800 dark:text-orange-300">
            Domain:
          </strong>
          <span className="text-gray-800 dark:text-gray-200 ml-1">
            {domain}
          </span>
        </p>
        <p>
          <strong className="text-orange-800 dark:text-orange-300">
            Duration:
          </strong>
          <span className="text-gray-800 dark:text-gray-200 ml-1">
            {duration} mins
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const WeeklyStats: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [backendResponse, setBackendResponse] = useState<ApiResponse>();
  const [selectedDomain, setSelectedDomain] = useState<string>("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axiosInstance.get("/dashboard/weekly-stats");
        setBackendResponse(res.data);

        if (res.data?.activities) {
          const topActivities: Activity[] = res.data.activities
            .sort((a: Activity, b: Activity) => b.duration - a.duration)
            .slice(0, 7);
          setActivities(topActivities);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 sm:h-60">
        <Spinner />
      </div>
    );
  }

  if (!backendResponse || !backendResponse.activities) {
    return (
      <div className="flex justify-center font-bold text-orange-600 dark:text-orange-400 text-lg items-center h-40 sm:h-60">
        No data to show !!
      </div>
    );
  }

  const uniqueDomains = Array.from(
    new Set(activities.map((activity) => activity.domain))
  );

  const filteredActivities = selectedDomain
    ? activities.filter((activity) => activity.domain === selectedDomain)
    : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
        {/* Bar Chart - Takes full width on mobile, 2/3 on xl screens */}
        <div className="xl:col-span-2 bg-gradient-to-br from-white via-orange-50 to-red-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 shadow-lg hover:shadow-2xl dark:shadow-orange-900/20 rounded-2xl p-4 sm:p-6 border-t-4 border-orange-400 dark:border-orange-500 transition-all duration-300 transform hover:scale-[1.02]">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center text-orange-600 dark:text-orange-400 tracking-wide">
            Top Websites (Last Week)
          </h2>
          <div className="h-64 sm:h-80 lg:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activities}
                margin={{
                  top: 20,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
              >
                <XAxis
                  dataKey="domain"
                  className="text-xs sm:text-sm text-gray-800 dark:text-gray-300 font-medium"
                  tick={{ fontSize: 12, fill: "currentColor" }}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tickFormatter={(value) => `${value}m`}
                  allowDecimals={false}
                  className="text-xs sm:text-sm text-gray-800 dark:text-gray-300 font-medium"
                  tick={{ fontSize: 12, fill: "currentColor" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="duration"
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={60}
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  {activities.map((_, index) => (
                    <Cell key={index} fillOpacity={0.9} />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Cards - Stack on mobile, sidebar on xl */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Top Website Card */}
          <div className="group bg-gradient-to-br from-white via-orange-50 to-red-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-orange-900/20 border-t-4 border-orange-500 dark:border-orange-600 p-4 sm:p-6 transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-100 dark:hover:from-slate-700 dark:hover:to-slate-600">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Link className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 dark:text-orange-400" />
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-base lg:text-lg">
                Top Website
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-orange-600 dark:group-hover:text-orange-400">
                {backendResponse.topWebsite.domain}
              </div>
              <div className="text-orange-700 dark:text-orange-400 font-bold text-sm sm:text-base lg:text-lg">
                {backendResponse.topWebsite.duration}
              </div>
            </div>
          </div>

          {/* Total Hours Card */}
          <div className="bg-gradient-to-br from-white via-orange-50 to-red-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-orange-900/20 border-t-4 border-orange-500 dark:border-orange-600 p-4 sm:p-6 transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-100 dark:hover:from-slate-700 dark:hover:to-slate-600">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Clock3 className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 dark:text-orange-400" />
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-base lg:text-lg">
                Total Hours (Last week)
              </span>
            </div>
            <div className="text-orange-700 dark:text-orange-400 font-bold text-lg sm:text-xl lg:text-2xl">
              {backendResponse.totalDuration}
            </div>
          </div>

          {/* Performance Card */}
          <div className="bg-gradient-to-br from-white via-orange-50 to-red-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-orange-900/20 border-t-4 border-orange-500 dark:border-orange-600 p-4 sm:p-6 transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-100 dark:hover:from-slate-700 dark:hover:to-slate-600">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <LineChart className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 dark:text-orange-400" />
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-base lg:text-lg">
                Performance
              </span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between gap-2 group">
                <div className="flex items-center gap-2 sm:gap-3">
                  <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm lg:text-base">
                    Websites Visited
                  </span>
                </div>
                <span className="font-bold text-orange-700 dark:text-orange-400 text-sm sm:text-base lg:text-lg">
                  {backendResponse.totalWebsites}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 group">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm lg:text-base">
                    Weekly Average
                  </span>
                </div>
                <span className="font-bold text-orange-700 dark:text-orange-400 text-sm sm:text-base lg:text-lg">
                  {backendResponse.weeklyAverage}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 group">
                <div className="flex items-center gap-2 sm:gap-3">
                  <ListTree className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm lg:text-base">
                    Longest Session
                  </span>
                </div>
                <span className="font-bold text-orange-700 dark:text-orange-400 text-sm sm:text-base lg:text-lg">
                  {backendResponse.longestSession}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Selector Section */}
      <div className="mt-8 sm:mt-10 lg:mt-12 bg-gradient-to-br from-white via-orange-50 to-red-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-orange-900/20 border-t-4 border-orange-400 dark:border-orange-500 p-4 sm:p-6 lg:p-8 transition-all duration-300 transform hover:scale-[1.01]">
        <div className="space-y-4 sm:space-y-6">
          <label
            htmlFor="domainSelect"
            className="block font-semibold text-slate-800 dark:text-slate-200 tracking-wide text-sm sm:text-base lg:text-lg"
          >
            Select a Domain
          </label>

          <select
            id="domainSelect"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full sm:max-w-md p-3 sm:p-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 dark:focus:border-orange-400 text-slate-700 dark:text-slate-200 shadow-sm bg-slate-50 dark:bg-slate-700 hover:bg-white dark:hover:bg-slate-600 transition-all duration-200 text-sm sm:text-base"
          >
            <option value="">-- Select any domain --</option>
            {uniqueDomains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>

          {/* Activity Details */}
          {filteredActivities.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-gradient-to-r from-slate-100 to-orange-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-4 sm:p-6 shadow-inner border-l-4 border-orange-400 dark:border-orange-500 hover:shadow-md dark:hover:shadow-orange-900/20 transition-all duration-200 transform hover:scale-[1.01]"
                >
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-semibold text-orange-600 dark:text-orange-400 text-sm sm:text-base">
                        Title:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base break-words">
                        {activity.title}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-semibold text-orange-600 dark:text-orange-400 text-sm sm:text-base">
                        Duration:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                        {activity.duration} min
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyStats;
