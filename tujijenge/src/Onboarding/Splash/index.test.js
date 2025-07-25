import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import Splash from ".";
import { MemoryRouter } from "react-router-dom";

jest.useFakeTimers();

// Mock useNavigate at the top level
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Splash component", () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    // Reset the mock before each test
    require("react-router-dom").useNavigate.mockReturnValue(navigateMock);
  });

  it("renders the logo", () => {
    render(
      <MemoryRouter>
        <Splash />
      </MemoryRouter>
    );
    const logo = screen.getByAltText(/tuijenge logo/i);
    expect(logo).toBeInTheDocument();
  });

  it("adds fade-in class immediately on mount", () => {
    render(
      <MemoryRouter>
        <Splash />
      </MemoryRouter>
    );
    const wrapper = screen.getByRole("img", { name: /tuijenge logo/i }).parentElement;
    expect(wrapper.classList.contains("fade-in")).toBe(true);
  });

  it("adds fade-out class after 4 seconds", () => {
    render(
      <MemoryRouter>
        <Splash />
      </MemoryRouter>
    );
    const wrapper = screen.getByRole("img", { name: /tuijenge logo/i }).parentElement;
    expect(wrapper.classList.contains("fade-out")).toBe(false);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // Re-query after state update
    const updatedWrapper = screen.getByRole("img", { name: /tuijenge logo/i }).parentElement;
    expect(updatedWrapper.classList.contains("fade-out")).toBe(true);
  });

  it("navigates to /supplychain after 5 seconds", () => {
    render(
      <MemoryRouter>
        <Splash />
      </MemoryRouter>
    );

    expect(navigateMock).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(navigateMock).toHaveBeenCalledWith("/supplychain");
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });
});