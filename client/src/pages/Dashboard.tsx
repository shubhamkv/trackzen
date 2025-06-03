import { Stats } from "../components/dashboard/Stats";
import { Profile } from "../components/dashboard/Profile";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 bg-gradient-to-br from-orange-50 to-red-50 flex flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-24 lg:py-12 xl:px-32 xl:py-16 2xl:px-40 2xl:py-20">
        <Profile />
        <Stats />
      </div>
      <Footer />
    </>
  );
};
