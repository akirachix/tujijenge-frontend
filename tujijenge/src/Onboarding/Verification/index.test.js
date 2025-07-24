// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { BrowserRouter } from "react-router-dom";
// import Verification from "./Verification";

// const mockedUsedNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockedUsedNavigate,
// }));

// describe("Verification component", () => {
//   beforeEach(() => {
//     mockedUsedNavigate.mockReset();
//     render(
//       <BrowserRouter>
//         <Verification />
//       </BrowserRouter>
//     );
//   });

//   test("renders all main elements", () => {
//     expect(screen.getByAltText(/Tuijenge Logo/i)).toBeInTheDocument();
//     expect(screen.getByAltText(/Spinach/i)).toBeInTheDocument();

//     expect(screen.getByText(/Verify Mama Mbogas/i)).toBeInTheDocument();
//     expect(screen.getByText(/Provide verification for Mama Mbogas who have been trained./i)).toBeInTheDocument();

//     const dots = screen.getAllByText("", { selector: ".dot" });
//     expect(dots).toHaveLength(4);
//     expect(document.querySelector(".dot.active")).toBeInTheDocument();

//     expect(screen.getByText(/skip/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /finish/i })).toBeInTheDocument();
//   });

//   test("clicking Skip navigates to /home", async () => {
//     const skipLink = screen.getByText(/skip/i);
//     await userEvent.click(skipLink);
//     expect(mockedUsedNavigate).toHaveBeenCalledWith("/home");
//   });

//   test("clicking Finish button navigates to /home", async () => {
//     const finishButton = screen.getByRole("button", { name: /finish/i });
//     await userEvent.click(finishButton);
//     expect(mockedUsedNavigate).toHaveBeenCalledWith("/home");
//   });
// });
