import React from "react";
import { useTheme } from "@/app/context/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  let color = "";
  if (theme === "light") color = "white";
  else color = "gray-400";
  return (
    <div className={`bg-${color} w-full flex justify-center`}>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-700"
      >
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </div>
  );
};

export default ThemeToggleButton;
