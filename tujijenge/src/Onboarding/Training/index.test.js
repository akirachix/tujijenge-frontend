// import { render, screen, fireEvent } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import userEvent from "@testing-library/user-event";
// import Training from "./Training";

// const mockedUsedNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockedUsedNavigate,
// }));

// describe("Training component", () => {
//   beforeEach(() => {
//     mockedUsedNavigate.mockReset();
//     render(
//       <BrowserRouter>
//         <Training />
//       </BrowserRouter>
//     );
//   });

//   test("renders all main elements", () => {
//     expect(screen.getByAltText(/Tuijenge Logo/i)).toBeInTheDocument();
//     expect(screen.getByText(/Train Mama Mbogas/i)).toBeInTheDocument();
//     expect(screen.getByText(/A platform that connects Mama Mbogas with a training agency/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
//     expect(screen.getByAltText(/Spinach/i)).toBeInTheDocument();

//     const dots = screen.getAllByText("", { selector: ".dot" });
//     expect(dots.length).toBe(4);
//     expect(document.querySelector(".dot.active")).toBeInTheDocument();
//   });

//   test("clicking skip navigates to /home", () => {
//     const skipLink = screen.getByText(/skip/i);
//     userEvent.click(skipLink);
//     expect(mockedUsedNavigate).toHaveBeenCalledWith("/home");
//   });

//   test("clicking continue button navigates to /orders", () => {
//     const continueButton = screen.getByRole("button", { name: /continue/i });
//     userEvent.click(continueButton);
//     expect(mockedUsedNavigate).toHaveBeenCalledWith("/orders");
//   });
// });
