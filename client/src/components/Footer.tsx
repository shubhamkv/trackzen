import { BarChart3 } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <Link to="/" className="ml-2 text-xl font-bold">
                TrackZen
              </Link>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transform your digital productivity with intelligent website
              tracking and comprehensive analytics.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/hii_lets_code"
                target="_blank"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/shubhamkv"
                target="_blank"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/user/dashboard"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/setup"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Setup Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {year} TrackZen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
