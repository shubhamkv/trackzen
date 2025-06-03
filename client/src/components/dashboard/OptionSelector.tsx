import { useState } from "react";
import DailyStats from "./DailyStats";
import WeeklyStats from "./WeeklyStats";
import MonthlyStats from "./MonthlyStats";

const options = ["Daily", "Weekly", "Monthly"];

export const OptionSelector = () => {
  const [selected, setSelected] = useState("Daily");

  let RenderComponent;

  if (selected === "Daily") RenderComponent = <DailyStats />;
  else if (selected === "Weekly") RenderComponent = <WeeklyStats />;
  else RenderComponent = <MonthlyStats />;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mt-12 lg:mt-15 flex gap-1 sm:gap-2 lg:gap-3 p-1.5 sm:p-2 lg:p-3 bg-slate-200 dark:bg-slate-800 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-inner w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`
              flex-1 px-2 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 
              rounded-lg sm:rounded-xl lg:rounded-2xl 
              font-medium text-xs sm:text-sm lg:text-base xl:text-lg
              transition duration-300 cursor-pointer
              ${
                selected === option
                  ? "bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30"
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 lg:mt-8">{RenderComponent}</div>
    </div>
  );
};
