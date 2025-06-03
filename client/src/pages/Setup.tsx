import { useState } from "react";
import {
  CheckCircle,
  Circle,
  ArrowRight,
  User,
  Globe,
  Monitor,
  ChevronRight,
  Zap,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaChrome } from "react-icons/fa";

const Setup = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const toggleStep = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter((step) => step !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const setupSteps = [
    {
      id: 1,
      title: "Create or Access Your Account",
      description: "Sign up / Sign in for TrackZen",
      icon: User,
      estimatedTime: "2 minutes",
      steps: [
        "Visit the trackzen landing page and click on “ Get Started ” button",
        "Fill out the form with your name, email, and password to create a new account",
        "If you already have an account, click “ Login ” on landing page",
        "And then enter your email and password to access your account",
      ],

      tips: "Use a strong password with at least 6 characters including numbers and symbols.",
    },
    {
      id: 2,
      title: "Connect Chrome Extension",
      description: "Install and configure chrome extension",
      icon: Globe,
      estimatedTime: "5 minutes",
      steps: [
        "After creating account or logging in, copy the token from the welcome card",
        "Install the “ TrackZen Chrome Extension ”",
        " In your browser’s extension panel, search for TrackZen (you can pin it for easier access)",
        "Click on the extension icon to open the popup",
        "Paste the copied token into the provided field and click “ Submit ”",
      ],

      tips: "Save the token securely. You'll need it for enabling extension.",
    },
    {
      id: 3,
      title: "Start Tracking and Manage Sessions",
      description: "Enable tracking and access Dashboard",
      icon: Monitor,
      estimatedTime: "3 minutes",
      steps: [
        "Click “ Enable ” in the extension popup to start a new session and begin tracking",
        "You can disable the extension anytime you wish",
        "If your token expires, click “ Update ” in the popup and submit the new token",
        "Then click “ Enable ” again to restart tracking",
        "Access full dashboard by clicking on “ View Full Dashboard ” in popup",
      ],

      tips: "Keep the extension enable always to access full insights of website activities.",
    },
  ];

  const quickActions = [
    {
      title: "Register",
      description: "Create your new TrackZen account",
      icon: UserPlus,
      url: "/register",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Login",
      description: "Logged into your existing TrackZen account",
      icon: LogIn,
      url: "/login",
      gradient: "from-red-500 to-orange-600",
    },
    {
      title: "Chrome Extension",
      description:
        "Download chrome extension and start tracking website activities",
      icon: FaChrome,
      url: "/user/dashboard", // change it with actual extension link later on
      gradient: "from-orange-600 to-red-400",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                <span className="text-gray-900 dark:text-white">Setup </span>
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Guide
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Get started with TrackZen in just a few minutes. Follow our
                step-by-step guide to set up website monitoring and boost your
                productivity.
              </p>
              <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Total time: ~10 minutes
                </span>
                <span className="flex items-center">
                  <Zap className="w-4 h-4 text-orange-500 mr-2" />3 simple steps
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Progress
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {completedSteps.length} of {setupSteps.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${
                    (completedSteps.length / setupSteps.length) * 100
                  }%`,
                }}
              ></div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {setupSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-colors duration-300 ${
                    completedSteps.includes(index)
                      ? "bg-gradient-to-r from-orange-500 to-red-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Setup Steps */}
        <div className="max-w-4xl mx-auto space-y-6">
          {setupSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.includes(index);
            const isActive = activeStep === index;

            return (
              <div
                key={step.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border transition-all duration-300 ${
                  isActive
                    ? "border-orange-500 shadow-xl scale-[1.02]"
                    : isCompleted
                    ? "border-green-500 dark:border-green-400"
                    : "border-gray-100 dark:border-gray-700 hover:shadow-xl"
                }`}
              >
                <div className="p-8">
                  {/* Step Header */}
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => toggleStep(index)}
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-gradient-to-br from-orange-500 to-red-500 text-white hover:scale-110"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </button>

                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Step {step.id}: {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {step.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <Circle className="w-3 h-3 mr-1" />
                              {step.estimatedTime}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setActiveStep(activeStep === index ? -1 : index)
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <ChevronRight
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 cursor-pointer ${
                              isActive ? "rotate-90" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Step Details */}
                  {isActive && (
                    <div className="mt-8 pl-16 space-y-6 animate-in slide-in-from-top-4 duration-300">
                      {/* Steps List */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                          Steps to complete:
                        </h4>
                        <ul className="space-y-3">
                          {step.steps.map((stepItem, stepIndex) => (
                            <li
                              key={stepIndex}
                              className="flex items-start space-x-3"
                            >
                              <ArrowRight className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300">
                                {stepItem}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tips */}
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          💡 Pro Tip
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.tips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(action.url)}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {action.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion CTA */}
        {completedSteps.length === setupSteps.length && (
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
              <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-20'></div>

              <div className="relative z-10">
                <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  🎉 Setup Complete!
                </h2>
                <p className="text-xl text-orange-100 mb-6">
                  Congratulations! You've successfully configured TrackZen. Your
                  websites are now being monitored.
                </p>
                <button
                  onClick={() => navigate("/user/dashboard")}
                  className="bg-white text-orange-600 hover:text-red-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="dark:border-t dark:border-gray-800">
        <Footer />
      </div>
    </>
  );
};

export default Setup;
