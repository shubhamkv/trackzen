import { useState } from "react";
import {
  Shield,
  Eye,
  Database,
  Calendar,
  Mail,
  ChevronDown,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (sectionIndex: number) => {
    if (expandedSections.includes(sectionIndex)) {
      setExpandedSections(
        expandedSections.filter((index) => index !== sectionIndex)
      );
    } else {
      setExpandedSections([...expandedSections, sectionIndex]);
    }
  };

  const privacySections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      lastUpdated: "Updated: June 03, 2025",
      content: {
        overview:
          "We collect information to provide you with the best website monitoring and productivity tracking experience.",
        subsections: [
          {
            title: "Account Information",
            items: [
              "Full name and Email address to uniquely identify you",
              "Encrypted password (for secure account authentication)",
            ],
          },
          {
            title: "Website Monitoring Data",
            items: [
              "URLs and domains of websites you choose to monitor",
              "Title of each active tab and total number of open tabs",
              "Start and end times of tabs",
            ],
          },
        ],
      },
    },
    {
      id: "data-usage",
      title: "How We Use Your Data",
      icon: Eye,
      lastUpdated: "Updated: June 03, 2025",
      content: {
        overview:
          "Your data helps us deliver reliable monitoring services and improve your productivity experience.",
        subsections: [
          {
            title: "Data Usage",
            items: [
              "We use your data solely to provide a comprehensive and insightful dashboard that visualizes your browsing activity",
              "We do not share your data with third parties",
              "We do not use your data for marketing or advertising purposes",
              "All activity insights are shown only to you within your dashboard",
            ],
          },
        ],
      },
    },

    {
      id: "user-rights",
      title: "Your Privacy Rights",
      icon: Shield,
      lastUpdated: "Updated: June 03, 2025",
      content: {
        overview:
          "You have full control over your personal data and can exercise various rights regarding your information.",
        subsections: [
          {
            title: "Access & Review",
            items: [
              "You can view your activity data within the TrackZen dashboard UI",
            ],
          },
          {
            title: "Data Deletion",
            items: [
              "If you wish to delete your data permanently, you can request this by contacting us directly",
              "We will promptly remove your data from our databases",
            ],
          },
        ],
      },
    },

    {
      id: "data-retention",
      title: "Data Protection and Security",
      icon: Calendar,
      lastUpdated: "Updated: June 03, 2025",
      content: {
        overview:
          "We retain and protect (using strong security measures) your data only as long as necessary to provide our services.",
        subsections: [
          {
            title: "Encrypted Passwords",
            items: [
              "Your password is stored in an encrypted format to ensure confidentiality",
            ],
          },
          {
            title: "Database Security",
            items: [
              "We implement robust security measures to protect your data against unauthorized access or disclosure",
            ],
          },
        ],
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative">
              <div
                className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20`}
              />

              <div className="relative z-10">
                <Shield className="w-16 h-16 text-white mx-auto mb-6" />
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                  Privacy Policy
                </h1>
                <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                  Your privacy is fundamental to how we build and operate
                  TrackZen. This policy explains how we collect, use, and
                  protect your information.
                </p>
                <div className="mt-8 flex items-center justify-center space-x-6 text-orange-100">
                  <span className="flex items-center hover:text-yellow-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last updated: June 03, 2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="max-w-4xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-8">
            {privacySections.map((section, index) => {
              const Icon = section.icon;
              const isExpanded = expandedSections.includes(index);

              return (
                <div
                  key={index}
                  id={section.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border transition-all duration-300 border-gray-100 dark:border-gray-700
                  }`}
                >
                  <div className="p-8">
                    {/* Section Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 p-3 flex-shrink-0">
                          <Icon className="w-full h-full text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {section.title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">
                            {section.content.overview}
                          </p>
                          <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                            {section.lastUpdated}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSection(index)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-400 cursor-pointer" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer" />
                        )}
                      </button>
                    </div>

                    {/* Section Content */}
                    {isExpanded && (
                      <div className="space-y-8 animate-in slide-in-from-top-4 duration-300">
                        {section.content.subsections.map(
                          (subsection, subIndex) => (
                            <div key={subIndex}>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                {subsection.title}
                              </h3>
                              <ul className="space-y-3">
                                {subsection.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="flex items-start space-x-3"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-300">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Questions About Your Privacy?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              We're here to help. If you have any questions about this privacy
              policy or how we handle your data, please don't hesitate to
              contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="flex items-center justify-center space-x-2 border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
