// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter, useNavigate } from "react-router-dom";
// import Welcome from "./Welcome";




// jest.mock("react-router-dom", () => ({
//   useNavigate: jest.fn(),
// }));

// describe("Welcome component", () => {
//   const navigate = jest.fn();

//   beforeEach(() => {
//     navigate.mockReset();
//     useNavigate.mockReturnValue(navigate);
//   });

//   it("renders the logo images and text", () => {
//     render(
//       <MemoryRouter>
//         <Welcome />
//       </MemoryRouter>
//     );

//     const stackedLogo = screen.getByAltText(/tuijenge logo/i);
//     expect(stackedLogo).toBeInTheDocument();

//     const horizontalLogo = screen.getByAltText(/tuijenge logo/i);
//     expect(horizontalLogo).toBeInTheDocument();

//     const welcomeText = screen.getByText(/welcome to/i);
//     expect(welcomeText).toBeInTheDocument();
//   });

//   it("renders Supplier and Trainer buttons", () => {
//     render(
//       <MemoryRouter>
//         <Welcome />
//       </MemoryRouter>
//     );

//     expect(screen.getByRole("button", { name: /supplier/i })).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /trainer/i })).toBeInTheDocument();
//   });

//   it("navigates to correct signin pages after button clicks", () => {
//     render(
//       <MemoryRouter>
//         <Welcome />
//       </MemoryRouter>
//     );

//     const supplierButton = screen.getByRole("button", { name: /supplier/i });
//     const trainerButton = screen.getByRole("button", { name: /trainer/i });

//     fireEvent.click(supplierButton);
//     expect(navigate).toHaveBeenCalledWith("/signin?role=supplier");

//     fireEvent.click(trainerButton);
//     expect(navigate).toHaveBeenCalledWith("/signin?role=trainer");
//   });
// });


