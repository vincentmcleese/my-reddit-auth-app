import { renderHook, act } from "@testing-library/react";
import { useScratchCard } from "../useScratchCard";
import * as actions from "@/actions";

jest.mock("@/actions", () => ({
  ...jest.requireActual("@/actions"),
  getScratchState: jest.fn(),
  saveScratchResult: jest.fn(),
}));

describe("useScratchCard", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("initializes with default values", async () => {
    (actions.getScratchState as jest.Mock).mockResolvedValue({
      latestScratchResult: null,
      todayScratchResults: [],
      allScratchResults: [],
    });

    const { result } = renderHook(() => useScratchCard());

    expect(result.current.isAvailable).toBe(true);
    expect(result.current.latestScratchResult).toBe(null);
    expect(result.current.todayScratchResults).toEqual([]);
    expect(result.current.streak).toBe(0);
  });

  it("handles scratch action correctly", async () => {
    (actions.getScratchState as jest.Mock).mockResolvedValue({
      latestScratchResult: null,
      todayScratchResults: [],
      allScratchResults: [],
    });
    (actions.saveScratchResult as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { result } = renderHook(() => useScratchCard());

    jest.advanceTimersByTime(1000); // Assuming there's a timeout or interval in useScratchCard that needs to be advanced

    act(() => {
      result.current.handleScratch(true);
    });

    expect(actions.saveScratchResult).toHaveBeenCalledWith(true);
    expect(result.current.isAvailable).toBe(false);
    expect(result.current.latestScratchResult).not.toBe(null);
    expect(result.current.todayScratchResults.length).toBe(1);
  });
});
