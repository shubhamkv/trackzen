import {
  ChevronDown,
  Shield,
  BarChart3,
  Clock,
  Star,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";

import { FaChrome } from "react-icons/fa";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description:
        "Get detailed insights into your browsing patterns with comprehensive analytics and visual reports.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time Tracking",
      description:
        "Automatically track time spent on different websites and applications throughout your day.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description:
        "Your data stays private and secure. We never share your browsing information with third parties.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Setting",
      description:
        "Set productivity goals and receive intelligent notifications to help you stay focused.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Progress Tracking",
      description:
        "Monitor your productivity improvements over time with detailed progress reports.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Insights",
      description:
        "Receive personalized recommendations to optimize your digital habits and boost productivity.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      avatar: "SJ",
      content:
        "TrackZen completely transformed how I manage my time online. The insights are incredible and have helped me boost my productivity by 40%.",
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      avatar: "MC",
      content:
        "As a developer, I needed detailed analytics about my work patterns. TrackZen provides exactly what I was looking for with a beautiful interface.",
    },
    {
      name: "Emily Rodriguez",
      role: "Digital Marketer",
      avatar: "ER",
      content:
        "The goal-setting feature is a game-changer. I can finally see where my time goes and make conscious decisions about my digital habits.",
    },
  ];

  const setupSteps = [
    {
      step: 1,
      title: "Create Account",
      description:
        "Sign up for your free TrackZen account to sync your data across all devices.",
    },
    {
      step: 2,
      title: "Download Extension",
      description:
        "Install TrackZen Chrome extension from the Chrome Web Store with just one click.",
    },
    {
      step: 3,
      title: "Start Tracking",
      description:
        "Begin monitoring your productivity automatically. View insights on your dashboard.",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 bg-gradient-to-br from-orange-50 to-red-50
      `}
    >
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section className="pt-30 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6
                 dark:text-white text-gray-900
              `}
            >
              Transform Your Digital
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {" "}
                Productivity
              </span>
            </h1>
            <p
              className={`text-xl mb-8 max-w-3xl mx-auto 
                dark:text-gray-300 text-gray-600
              `}
            >
              Track your website usage, analyze your digital habits, and boost
              your productivity with our intelligent Chrome extension and
              comprehensive dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                <FaChrome className="w-6 h-6" />
                Add to Chrome - It's Free
              </button>
              <Link
                to="/user/dashboard"
                className={`flex items-center gap-2 px-6 py-4 text-lg font-medium transition-colors cursor-pointer
                    dark:text-gray-300 dark:hover:text-orange-400
                    text-gray-700 hover:text-orange-600`}
              >
                View Dashboard
                <ChevronDown className="w-5 h-5" />
              </Link>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8 shadow-2xl">
                <div
                  className={`rounded-xl p-6 shadow-lg dark:bg-gray-800 bg-white
                  `}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div
                      className={`text-sm dark:text-gray-400 text-gray-500
                      `}
                    >
                      TrackZen Dashboard
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div
                        className={`text-lg font-semibold 
                           dark:text-white text-gray-900
                        `}
                      >
                        Today's Productivity
                      </div>
                      <div className="text-2xl font-bold text-orange-500">
                        87%
                      </div>
                    </div>
                    <div
                      className={`w-full rounded-full h-3 
                         dark:bg-gray-700 bg-gray-200
                      }`}
                    >
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                        style={{ width: "87%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className={`py-16 dark:bg-gray-800 bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 dark:text-white text-gray-900
              `}
            >
              Powerful Features for Better Productivity
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto
                dark:text-gray-300 text-gray-600
              `}
            >
              Discover how TrackZen can help you understand and improve your
              digital habits with our comprehensive suite of tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-2
                   dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800 dark:border-gray-600 dark:hover:border-orange-500 dark:hover:shadow-xl
                    bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-orange-300 hover:shadow-xl
                `}
              >
                <div className="text-orange-500 mb-4 group-hover:scale-110 transform transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 
                   dark:text-white text-gray-900
                  `}
                >
                  {feature.title}
                </h3>
                <p className={`dark:text-gray-300 text-gray-600`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section
        className={`py-16 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800
            bg-gradient-to-br from-orange-50 to-red-50
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 dark:text-white text-gray-900
              `}
            >
              Loved by Thousands of Users
            </h2>
            <p
              className={`text-xl dark:text-gray-300 text-gray-600
              `}
            >
              See what our community has to say about TrackZen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 bg-white
                `}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p
                  className={`mb-6 dark:text-gray-300 text-gray-700
                  `}
                >
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div
                      className={`font-semibold dark:text-white text-gray-900
                      `}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className={`text-sm  dark:text-gray-400 text-gray-600
                      `}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Setup Guide Section */}
      <section id="setup" className={`py-16 dark:bg-gray-800 bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 dark:text-white text-gray-900
              `}
            >
              Get Started in Minutes
            </h2>
            <p
              className={`text-xl dark:text-gray-300 text-gray-600
              `}
            >
              Setting up TrackZen is quick and easy. Follow these simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {setupSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3
                  className={`text-xl font-semibold mb-4 dark:text-white text-gray-900
                  `}
                >
                  {step.title}
                </h3>
                <p className={`dark:text-gray-300 text-gray-600`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl mx-auto transform hover:-translate-y-1 cursor-pointer">
              <FaChrome className="w-6 h-6" />
              Start Your Journey Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
