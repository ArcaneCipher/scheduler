import React from "react";
import { act } from "react"; // ✅ Correct import
import { render, screen } from "@testing-library/react"; // ✅ screen added
import "@testing-library/jest-dom"; // ✅ Fix for missing matchers
import axios from "axios";
import Application from "../Application";

// Mock API responses
jest.mock("axios");

describe("Application", () => {
  beforeEach(() => {
    axios.get
      .mockResolvedValueOnce({
        data: [
          { id: 1, name: "Monday", interviewers: [1, 2], spots: 2 },
          { id: 2, name: "Tuesday", interviewers: [3, 4], spots: 1 },
        ],
      })
      .mockResolvedValueOnce({
        data: {
          1: { id: 1, time: "12pm", interview: null },
          2: { id: 2, time: "1pm", interview: null },
        },
      })
      .mockResolvedValueOnce({
        data: {
          1: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          },
          2: {
            id: 2,
            name: "Tori Malcolm",
            avatar: "https://i.imgur.com/Nmx0Qxo.png",
          },
        },
      });
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<Application />);
    });

    expect(screen.getByText("Monday")).toBeInTheDocument(); // ✅ Should now work
  });
});
