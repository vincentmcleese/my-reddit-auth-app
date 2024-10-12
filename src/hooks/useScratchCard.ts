import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  isAfter,
  parse,
  setHours,
  setMinutes,
  startOfDay,
  differenceInDays,
  isSameDay,
  parseISO,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import * as actions from "@/actions";

// Define the structure of a scratch result
export type ScratchResult = {
  won: boolean;
  scratchTime: string; // ISO string
};

// Define the state structure for the scratch card
interface ScratchCardState {
  isAvailable: boolean;
  latestScratchResult: ScratchResult | null;
  todayScratchResults: ScratchResult[];
  nextAvailableTime: Date;
}

// Constants for reload time and timezone
const RELOAD_TIME = { hours: 17, minutes: 0 }; // 5:00 PM
const TIME_ZONE = "America/New_York"; // Eastern Standard Time

function calculateStreak(scratchResults: ScratchResult[]): number {
  if (scratchResults.length === 0) return 0;

  let streak = 1;
  let currentDate = parseISO(scratchResults[0].scratchTime);

  for (let i = 1; i < scratchResults.length; i++) {
    const prevDate = parseISO(scratchResults[i].scratchTime);
    if (
      isSameDay(currentDate, prevDate) ||
      differenceInDays(currentDate, prevDate) === 1
    ) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return streak;
}

export function useScratchCard() {
  const { status } = useSession();

  // Initialize state with default values
  const [state, setState] = useState<ScratchCardState>({
    isAvailable: false,
    latestScratchResult: null,
    todayScratchResults: [],
    nextAvailableTime: new Date(),
  });

  const [streak, setStreak] = useState(0);

  // Effect to fetch initial state when the component mounts and user is authenticated
  useEffect(() => {
    const fetchInitialState = async () => {
      if (status === "authenticated") {
        const { latestScratchResult, todayScratchResults, allScratchResults } =
          await actions.getScratchState();
        setState((prev) => ({
          ...prev,
          // Map the latest scratch result to our ScratchResult type
          latestScratchResult: latestScratchResult
            ? {
                won: latestScratchResult.won,
                scratchTime: latestScratchResult.lastScratchTime,
              }
            : null,
          // Map today's scratch results to our ScratchResult type
          todayScratchResults: todayScratchResults.map((result) => ({
            won: result.won,
            scratchTime: result.scratchTime,
          })),
        }));
        setStreak(calculateStreak(allScratchResults));
      }
    };

    fetchInitialState();
  }, [status]);

  // Effect to check scratch availability and update state
  useEffect(() => {
    if (status !== "authenticated") return;

    const checkAvailability = () => {
      const now = new Date();
      const estNow = toZonedTime(now, TIME_ZONE);

      // Calculate reload times
      const todayReloadTime = setHours(
        setMinutes(startOfDay(estNow), RELOAD_TIME.minutes),
        RELOAD_TIME.hours
      );
      const yesterdayReloadTime = new Date(
        todayReloadTime.getTime() - 24 * 60 * 60 * 1000
      );
      const tomorrowReloadTime = new Date(
        todayReloadTime.getTime() + 24 * 60 * 60 * 1000
      );

      let isAvailable = false;
      let nextAvailableTime = todayReloadTime;

      if (state.latestScratchResult) {
        // Parse the last scratch time and convert to EST
        const lastScratchTime = parse(
          state.latestScratchResult.scratchTime,
          "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
          new Date()
        );
        const lastScratchEST = toZonedTime(lastScratchTime, TIME_ZONE);

        // Check if the user has already scratched after today's reload time
        if (
          isAfter(lastScratchEST, yesterdayReloadTime) &&
          isAfter(lastScratchEST, todayReloadTime)
        ) {
          isAvailable = false;
          nextAvailableTime = tomorrowReloadTime;
        } else {
          // User hasn't scratched since yesterday's reload time
          isAvailable = true;
        }
      } else {
        // No scratch result, so it's available
        isAvailable = true;
      }

      // Update state with new availability and next available time
      setState((prev) => ({ ...prev, isAvailable, nextAvailableTime }));
    };

    // Check availability immediately and set up interval
    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [state.latestScratchResult, status]);

  // Function to handle scratch action
  const handleScratch = async (didWin: boolean) => {
    if (status !== "authenticated") {
      console.error("User not authenticated");
      return;
    }

    const now = new Date();
    const estNow = toZonedTime(now, TIME_ZONE);
    const result = await actions.saveScratchResult(didWin);
    if (result.success) {
      // Create new scratch result
      const newScratchResult: ScratchResult = {
        won: didWin,
        scratchTime: estNow.toISOString(),
      };
      // Update state with new scratch result
      setState((prev) => ({
        ...prev,
        latestScratchResult: newScratchResult,
        todayScratchResults: [...prev.todayScratchResults, newScratchResult],
        isAvailable: false,
      }));
    } else {
      console.error("Failed to save scratch result");
    }
  };

  // Return the current state and handleScratch function
  return {
    isAvailable: state.isAvailable,
    latestScratchResult: state.latestScratchResult,
    todayScratchResults: state.todayScratchResults,
    nextAvailableTime: state.nextAvailableTime,
    handleScratch,
    streak,
    isAuthenticated: status === "authenticated",
  };
}
