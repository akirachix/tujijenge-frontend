// import React from "react";
// import { render, screen } from "@testing-library/react";
// import Splash from "./Splash";
// import { MemoryRouter } from "react-router-dom";
// import { createMemoryHistory } from "history";
// import { Router } from "react-router-dom";

// jest.useFakeTimers();

// describe("Splash component", () => {
//   let navigateMock;

//   beforeEach(() => {
//     navigateMock = jest.fn();
//   });

//   jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useNavigate: () => navigateMock,
//   }));

//   it("renders the logo", () => {
//     render(
//       <MemoryRouter>
//         <Splash />
//       </MemoryRouter>
//     );
//     const logo = screen.getByAltText(/tuijenge logo/i);
//     expect(logo).toBeInTheDocument();
//   });

//   it("adds fade-in class immediately on mount", () => {
//     render(
//       <MemoryRouter>
//         <Splash />
//       </MemoryRouter>
//     );
//     const wrapper = screen.getByRole("img", { name: /tuijenge logo/i }).parentElement;
//     expect(wrapper.classList.contains("fade-in")).toBe(true);
//   });

//   it("adds fade-out class after 4 seconds", () => {
//     render(
//       <MemoryRouter>
//         <Splash />
//       </MemoryRouter>
//     );
//     const wrapper = screen.getByRole("img", { name: /tuijenge logo/i }).parentElement;

//     expect(wrapper.classList.contains("fade-out")).toBe(false);

//     jest.advanceTimersByTime(4000);
//     expect(wrapper.classList.contains("fade-out")).toBe(true);
//   });

//   it("navigates to /supplychain after 5 seconds", () => {
//     render(
//       <MemoryRouter>
//         <Splash />
//       </MemoryRouter>
//     );

//     expect(navigateMock).not.toHaveBeenCalled();

//     jest.advanceTimersByTime(5000);

//     expect(navigateMock).toHaveBeenCalledWith("/supplychain");
//   });

//   afterAll(() => {
//     jest.useRealTimers();
//   });
// });


