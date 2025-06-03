import {
  Monitor,
  BarChart3,
  Zap,
  Clock,
  TrendingUp,
  Settings,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FaChrome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Feature {
  icon: React.ElementType;
  color: string;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const Features = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Monitor,
      title: "Real-Time Website Monitoring",
      description:
        "Track your websites 24/7 with instant notifications when downtime occurs. Never miss a beat with our reliable monitoring system.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics Dashboard",
      description:
        "Comprehensive insights into your website performance with detailed reports, uptime statistics, and performance metrics.",
      color: "from-red-500 to-orange-600",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description:
        "Identify bottlenecks and optimize your website's speed with actionable recommendations and performance insights.",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Clock,
      title: "Uptime Tracking",
      description:
        "Monitor uptime with 99.9% accuracy. Historical data helps you understand patterns and improve reliability.",
      color: "from-orange-400 to-red-500",
    },
    {
      icon: TrendingUp,
      title: "Productivity Insights",
      description:
        "Track how website performance affects your productivity with detailed analytics and improvement suggestions.",
      color: "from-orange-600 to-red-400",
    },
    {
      icon: Settings,
      title: "Easy Configuration",
      description:
        "Simple setup process with intuitive configuration options. Get started in minutes, not hours.",
      color: "from-red-600 to-orange-400",
    },
  ];

  const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
    const Icon = feature.icon;
    return (
      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10">
          {/* Icon with gradient background */}
          <div
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-4 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-full h-full text-white" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 group-hover:bg-clip-text transition-all duration-300">
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center mb-20">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8">
                <span className="text-gray-900 dark:text-white">Powerful </span>
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Features
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Discover how TrackZen helps you monitor websites, boost
                productivity, and stay ahead of issues with our comprehensive
                suite of powerful features.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-20'></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Productivity?
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust TrackZen to keep their
                websites running smoothly and their productivity at peak levels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="flex items-center gap-3 border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                  <FaChrome className="w-6 h-6" />
                  Start Tracking
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-white text-orange-600 hover:text-red-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "99.9%", label: "Uptime Accuracy" },
              { number: "5K+", label: "Websites Monitored" },
              { number: "24/7", label: "Monitoring Coverage" },
              { number: "1000+", label: "Happy Users" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dark:border-t dark:border-gray-800">
        <Footer />
      </div>
    </>
  );
};

export default Features;
