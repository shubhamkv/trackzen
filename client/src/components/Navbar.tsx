import { BarChart3, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "dark:bg-gray-900/95 dark:backdrop-blur-md dark:shadow-lg bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <Link
              to="/"
              className={`ml-2 text-xl font-bold dark:text-white text-gray-900`}
            >
              TrackZen
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  isActive
                    ? `px-3 py-2 text-sm font-medium transition-colors underline underline-offset-8 dark:text-orange-500 text-orange-600`
                    : `px-3 py-2 text-sm font-medium transition-colors dark:text-gray-300 dark:hover:text-orange-400 text-gray-700 hover:text-orange-600`
                }
              >
                Features
              </NavLink>
              <NavLink
                to="/setup"
                className={({ isActive }) =>
                  isActive
                    ? `px-3 py-2 text-sm font-medium transition-colors underline underline-offset-8 dark:text-orange-500 text-orange-600`
                    : `px-3 py-2 text-sm font-medium transition-colors dark:text-gray-300 dark:hover:text-orange-400 text-gray-700 hover:text-orange-600`
                }
              >
                Setup Guide
              </NavLink>
              <NavLink
                to="/user/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? `px-3 py-2 text-sm font-medium transition-colors underline underline-offset-8 dark:text-orange-500 text-orange-600`
                    : `px-3 py-2 text-sm font-medium transition-colors dark:text-gray-300 dark:hover:text-orange-400 text-gray-700 hover:text-orange-600`
                }
              >
                Dashboard
              </NavLink>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors cursor-pointer
             dark:text-gray-300 dark:hover:text-orange-400 dark:hover:bg-gray-800
              text-gray-700 hover:text-orange-600 hover:bg-orange-50
          `}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer dark:text-gray-300 dark:hover:text-orange-400
              text-gray-700 hover:text-orange-600
          `}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Get Started
                </button>
              </>
            ) : (
              <button
                onClick={logout}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                Log out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2
            dark:text-gray-300 dark:hover:text-orange-400
              text-gray-700 hover:text-orange-600 cursor-pointer
          `}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden border-t dark:bg-gray-900/95 dark:backdrop-blur-md dark:border-gray-700 bg-white/95 backdrop-blur-md border-gray-200
        `}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  isActive
                    ? `block px-3 py-2 text-sm font-medium dark:text-orange-500 text-orange-600 underline underline-offset-8`
                    : `block px-3 py-2 text-sm font-medium dark:text-gray-300 dark:hover:text-orange-400 text-gray-700 hover:text-orange-600`
                }
              >
                Features
              </NavLink>
              <NavLink
                to="/setup"
                className={({ isActive }) =>
                  isActive
                    ? `block px-3 py-2 text-sm font-medium dark:text-orange-500 text-orange-600 underline underline-offset-8`
                    : `block px-3 py-2 text-sm font-medium dark:text-gray-300 dark:hover:text-orange-400 text-gray-700 hover:text-orange-600`
                }
              >
                Setup Guide
              </NavLink>
              <NavLink
                to="/user/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? `block px-3 py-2 text-sm font-medium dark:text-orange-500 text-orange-600 underline underline-offset-8`
                    : `block px-3 py-2 text-sm font-medium dark:text-gray-300 dark:hover:text-orange-400 text-gray-700 hover:text-orange-600`
                }
              >
                Dashboard
              </NavLink>
              <div
                className={`pt-2 border-t dark:border-gray-700 border-gray-200`}
              >
                {!user ? (
                  <>
                    <div className="flex items-center justify-between px-3 py-2">
                      <button
                        onClick={() => navigate("/login")}
                        className={`text-sm font-medium dark:text-gray-300 dark:hover:text-orange-400 text-gray-700 hover:text-orange-600 cursor-pointer
                `}
                      >
                        Login
                      </button>
                      <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors dark:text-gray-300 dark:hover:text-orange-400 dark:hover:bg-gray-800 text-gray-700 hover:text-orange-600 hover:bg-orange-50 cursor-pointer`}
                      >
                        {theme === "dark" ? (
                          <Sun className="w-5 h-5" />
                        ) : (
                          <Moon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <button
                      onClick={() => navigate("/register")}
                      className="block w-full mt-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 cursor-pointer"
                    >
                      Get Started
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={toggleTheme}
                      className={`p-2 rounded-lg transition-colors dark:text-gray-300 dark:hover:text-orange-400 dark:hover:bg-gray-800 text-gray-700 hover:text-orange-600 hover:bg-orange-50 cursor-pointer`}
                    >
                      {theme === "dark" ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full mt-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 cursor-pointer"
                    >
                      Log out
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
