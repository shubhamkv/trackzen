import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { FaTwitter } from "react-icons/fa";

const ContactPage = () => {
  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:contact.trackzen@gmail.com",
      label: "contact.trackzen@gmail.com",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: "https://twitter.com/trackzen_",
      label: "@trackzen_",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-red-600 dark:from-orange-600 dark:via-red-600 dark:to-red-700">
          <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Get in <span className="text-orange-200">Touch</span>
              </h1>
              <p className="text-xl sm:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                Have questions about TrackZen? We'd love to hear from you. Send
                us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-orange-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Let's Connect
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  TrackZen is built with passion for productivity and website
                  monitoring. Whether you have feedback, need support, or want
                  to collaborate, we're here to help.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-100 dark:border-orange-800/30">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      contact.trackzen@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-100 dark:border-orange-800/30">
                  <div className="flex-shrink-0">
                    <FaTwitter className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      X
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      @trackzen_
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-100 dark:border-orange-800/30">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center space-x-3 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200`}
                      >
                        <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:scale-110 group-hover:text-orange-400 dark:group-hover:text-orange-500 transition-transform duration-200" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-400 dark:group-hover:text-orange-500">
                          {social.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-2xl p-8 sm:p-12 border border-orange-100 dark:border-orange-800/30">
              <MessageCircle className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Response Guarantee
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We're committed to providing excellent support. Most inquiries
                receive a response within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="dark:border-t dark:border-gray-800">
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
