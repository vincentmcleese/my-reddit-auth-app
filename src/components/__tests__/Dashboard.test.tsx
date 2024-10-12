import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";
import { SessionProvider } from "next-auth/react";

// Mock the next-auth session
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: () => ({
    data: {
      user: {
        name: "TestUser",
        total_karma: 1000,
      },
    },
    status: "authenticated",
  }),
}));

describe("Dashboard", () => {
  const mockProps = {
    onScratch: jest.fn(),
    isAvailable: true,
    nextAvailableTime: new Date(),
    todayScratchResults: [],
    streak: 3,
  };

  it("renders correctly", () => {
    render(
      <SessionProvider session={null}>
        <Dashboard {...mockProps} />
      </SessionProvider>
    );

    expect(screen.getByText("You can scratch your card now!")).toBeTruthy();
    expect(screen.getByText("Current Streak: 3 days")).toBeTruthy();
    expect(screen.getByText("Scratch Now!")).toBeTruthy();
  });

  it("displays correct boost information", () => {
    render(
      <SessionProvider session={null}>
        <Dashboard {...mockProps} />
      </SessionProvider>
    );

    expect(screen.getByText("High Karma")).toBeTruthy();
    expect(screen.getByText("1000 Karma")).toBeTruthy();
    expect(screen.getByText("3 day streak")).toBeTruthy();
  });
});
