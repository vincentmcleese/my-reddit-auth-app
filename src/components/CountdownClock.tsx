import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeUnit {
  value: number;
  label: string;
}

const CountdownClock: React.FC = () => {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([
    { value: 0, label: "Hours" },
    { value: 0, label: "Hours" },
    { value: 0, label: "Minutes" },
    { value: 0, label: "Minutes" },
  ]);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const targetTime = new Date(now);
      targetTime.setHours(17, 0, 0, 0); // Set to 5:00:00 PM

      // If it's past 5 PM, set target to 5 PM tomorrow
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const difference = targetTime.getTime() - now.getTime();
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      return [
        { value: Math.floor(hours / 10), label: "Hours" },
        { value: hours % 10, label: "Hours" },
        { value: Math.floor(minutes / 10), label: "Minutes" },
        { value: minutes % 10, label: "Minutes" },
      ];
    };

    const updateClock = () => {
      setTimeUnits(calculateTimeRemaining());
    };

    // Update immediately and then every second
    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-semibold mb-2">Your next scratch in:</div>
      <div className="flex justify-center items-center space-x-2">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={index}>
            <div className="relative w-16 h-20 bg-gray-800 rounded-xl flex flex-col items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={unit.value}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl font-bold text-white"
                >
                  {unit.value}
                </motion.div>
              </AnimatePresence>
              <div className="text-xs text-gray-400 mt-1">{unit.label}</div>
            </div>
            {index === 1 && (
              <div className="text-4xl font-bold text-orange-500 mx-1">:</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CountdownClock;
