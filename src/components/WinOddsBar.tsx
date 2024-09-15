import React from "react";

interface WinOddsBarProps {
  filledSections: number; // Number of sections to fill
}

const WinOddsBar: React.FC<WinOddsBarProps> = ({ filledSections }) => {
  const sections = 5;
  const sectionWidth = 100 / sections;

  const getSectionClass = (index: number) => {
    if (index < filledSections) {
      return "bg-reddit-orange";
    } else {
      return "bg-gray-300";
    }
  };

  return (
    <div className="w-full flex">
      {Array.from({ length: sections }).map((_, index) => (
        <div
          key={index}
          className={`h-6 ${getSectionClass(index)} border border-white ${
            index === 0 ? "rounded-l-full" : ""
          } ${index === sections - 1 ? "rounded-r-full" : ""}`}
          style={{ width: `${sectionWidth}%` }}
        />
      ))}
    </div>
  );
};

export default WinOddsBar;
