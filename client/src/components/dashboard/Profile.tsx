import { useEffect, useState } from "react";
import { User, Mail } from "lucide-react";
import { format } from "date-fns";
import { axiosInstance } from "../../utils/axiosInstance";
import { useAuthStore } from "../../store/authStore";

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

export const Profile = () => {
  const [extensionEnabled, setExtensionEnabled] = useState<boolean>();
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchExtensionState = async () => {
      try {
        const res = await axiosInstance.get("/dashboard/extension-state");
        setExtensionEnabled(res.data.extensionState);
      } catch (error) {}
    };
    fetchExtensionState();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full mb-4 sm:mb-6 md:mb-8">
        <div className="animate-pulse bg-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800/50 dark:to-red-800/50 rounded-2xl p-4 sm:p-6 w-full max-w-md border border-orange-100 dark:border-orange-700/50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-300 dark:bg-orange-600/50 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-orange-300 dark:bg-orange-600/50 rounded w-3/4"></div>
              <div className="h-4 bg-orange-300 dark:bg-orange-600/50 rounded w-1/2"></div>
              <div className="h-4 bg-orange-300 dark:bg-orange-600/50 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto mb-4 mt-10 sm:mb-6 md:mb-8">
      <div className="group relative bg-gradient-to-br from-white via-orange-50 to-red-50 dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-900 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl dark:shadow-orange-500/10 dark:hover:shadow-orange-500/20 transition-all duration-500 border border-orange-200/50 dark:border-orange-600/30 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-300/10 via-transparent to-red-300/10 dark:from-orange-400/10 dark:via-transparent dark:to-red-400/10 animate-pulse"></div>

        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-400 to-red-500 dark:from-orange-400 dark:via-red-400 dark:to-red-500"></div>

        {/* Main content */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
          {/* Avatar section */}
          <div className="relative group/avatar">
            <div className="relative bg-gradient-to-br from-orange-400 to-red-600 dark:from-orange-500 dark:to-red-600 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full shadow-lg group-hover:shadow-xl dark:shadow-orange-500/30 dark:group-hover:shadow-orange-500/40 transition-all duration-300 border-4 border-white/50 dark:border-gray-700/50">
              {/* Animated ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 dark:from-orange-300 dark:to-red-400 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500 animate-spin-slow blur-sm"></div>

              <div className="relative flex justify-center items-center h-full text-white font-bold text-lg sm:text-xl md:text-2xl">
                {getInitials(user.name)}
              </div>

              {/* Online indicator */}
              {extensionEnabled ? (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 dark:bg-green-500 rounded-full border-2 border-white dark:border-gray-700 shadow-md animate-pulse"></div>
              ) : (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-amber-400 dark:bg-amber-500 rounded-full border-2 border-white dark:border-gray-700 shadow-md animate-pulse"></div>
              )}
            </div>
          </div>

          {/* User info section */}
          <div className="flex-1 text-center sm:text-left space-y-2 sm:space-y-3">
            {/* Name */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                {user.name}
              </h2>
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 dark:from-orange-400 dark:to-red-500 mx-auto sm:mx-0 rounded-full"></div>
            </div>

            {/* User details */}
            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="truncate">{user.username}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">
                <User className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span>
                  Joined {format(new Date(user.createdAt), "MMM dd, yyyy")}
                </span>
              </div>
            </div>

            {/* Extension status badge */}
            <div className="pt-2">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  extensionEnabled
                    ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 shadow-green-200/50 dark:shadow-green-500/20 shadow-md hover:shadow-lg dark:hover:shadow-green-500/30 border border-green-200/50 dark:border-green-600/30"
                    : "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 shadow-amber-200/50 dark:shadow-amber-500/20 shadow-md hover:shadow-lg dark:hover:shadow-amber-500/30 border border-amber-200/50 dark:border-amber-600/30"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    extensionEnabled
                      ? "bg-green-500 dark:bg-green-400 animate-pulse"
                      : "bg-amber-500 dark:bg-amber-400"
                  }`}
                ></div>
                Extension {extensionEnabled ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
