import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";

// Mock axios module
jest.mock("axios", () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe("SignUp component", () => {
  beforeEach(() => {
    render(<SignUp />);
  });

  it("should render the SignUp component", () => {
    // Assert that the component is rendered successfully
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("should submit the form with correct data", async () => {
    // Mock user input
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Mock API response
    const mockedAxiosPost = require("axios").post;
    mockedAxiosPost.mockResolvedValueOnce({});

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: "Sign Up" }));

    // Assert API request
    await waitFor(() => {
      expect(mockedAxiosPost).toHaveBeenCalledTimes(1);
      expect(mockedAxiosPost).toHaveBeenCalledWith(
        "https://localhost:7164/api/Users/Register",
        expect.any(Object),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    // Assert navigation
    expect(window.location.pathname).toEqual("/login");
  });
});
