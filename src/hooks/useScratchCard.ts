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

  const [state, setState] = useState<ScratchCardState>({
    isAvailable: false,
    latestScratchResult: null,
    todayScratchResults: [],
    nextAvailableTime: new Date(),
  });

  const [streak, setStreak] = useState(0);

  const checkAvailability = () => {
    const now = new Date();
    const estNow = toZonedTime(now, TIME_ZONE);

    const todayReloadTime = setHours(
      setMinutes(startOfDay(estNow), RELOAD_TIME.minutes),
      RELOAD_TIME.hours
    );
    const yesterdayReloadTime = new Date(
      todayReloadTime.getTime() - 24 * 60 * 60 * 1000
    );

    let isAvailable = true;
    let nextAvailableTime = todayReloadTime;

    if (state.latestScratchResult) {
      const lastScratchTime = parse(
        state.latestScratchResult.scratchTime,
        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
        new Date()
      );
      const lastScratchEST = toZonedTime(lastScratchTime, TIME_ZONE);

      if (isAfter(lastScratchEST, yesterdayReloadTime)) {
        isAvailable = false;
        nextAvailableTime = new Date(
          todayReloadTime.getTime() + 24 * 60 * 60 * 1000
        );
      }
    }

    setState((prev) => ({ ...prev, isAvailable, nextAvailableTime }));
  };

  const refetchScratchState = async () => {
    if (status === "authenticated") {
      const { latestScratchResult, todayScratchResults, allScratchResults } =
        await actions.getScratchState();
      setState((prev) => ({
        ...prev,
        latestScratchResult: latestScratchResult
          ? {
              won: latestScratchResult.won,
              scratchTime: latestScratchResult.lastScratchTime,
            }
          : null,
        todayScratchResults: todayScratchResults.map((result) => ({
          won: result.won,
          scratchTime: result.scratchTime,
        })),
      }));
      setStreak(calculateStreak(allScratchResults));
      checkAvailability();
    }
  };

  useEffect(() => {
    refetchScratchState();
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") return;

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000);

    return () => clearInterval(interval);
  }, [state.latestScratchResult, status]);

  const handleScratch = async (didWin: boolean) => {
    if (status !== "authenticated") {
      console.error("User not authenticated");
      return;
    }

    const now = new Date();
    const estNow = toZonedTime(now, TIME_ZONE);
    const result = await actions.saveScratchResult(didWin);
    if (result.success) {
      const newScratchResult: ScratchResult = {
        won: didWin,
        scratchTime: estNow.toISOString(),
      };
      setState((prev) => ({
        ...prev,
        latestScratchResult: newScratchResult,
        todayScratchResults: [...prev.todayScratchResults, newScratchResult],
      }));
      checkAvailability();
    } else {
      console.error("Failed to save scratch result");
    }
  };

  return {
    isAvailable: state.isAvailable,
    latestScratchResult: state.latestScratchResult,
    todayScratchResults: state.todayScratchResults,
    nextAvailableTime: state.nextAvailableTime,
    handleScratch,
    refetchScratchState,
    streak,
    isAuthenticated: status === "authenticated",
  };
}
