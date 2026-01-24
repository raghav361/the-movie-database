import React from "react";

interface RatingCircleProps {
  value?: number | null; // percentage (0–100)
  size?: number; // px size of the circle
  strokeWidth?: number;
}

const RatingCircle: React.FC<RatingCircleProps> = ({
  value,
  size = 48,
  strokeWidth = 3,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const percentage = value != null ? Math.max(0, Math.min(100, value)) : null;
  const offset = percentage != null ? circumference - (percentage / 100) * circumference : circumference;

  let color = {
    dark: "#9CA3AF", // gray-400 (default if no value)
    light: "#D1D5DB", // gray-300
  };

  if (percentage != null) {
    if (percentage >= 70) {
      color = { dark: "#22c55e", light: "#14532d" }; // green
    } else if (percentage >= 40) {
      color = { dark: "#fcd34d", light: "#713f12" }; // yellow
    } else if (percentage > 0) {
      color = { dark: "#f87171", light: "#7f1d1d" }; // red
    } else {
      color = { dark: "#9CA3AF", light: "#D1D5DB" }; // gray-400 (default if no value)
    }
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Light ring */}
        <circle
          stroke={color.light}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Dark progress ring */}
        <circle
          stroke={color.dark}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.35s" }}
        />
      </svg>

      {/* Centered text */}
      <div className="absolute text-white text-sm font-bold bg-black rounded-full flex items-center justify-center"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          fontSize: size * 0.3,
        }}
      >
        {percentage != 0 ? (
          <>
            <span>{percentage}</span>
            <span className="text-[0.5rem] pb-1">%</span>
          </>
        ) : "NR"}
      </div>
    </div>
  );
};

export default RatingCircle;
