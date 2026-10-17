import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import Login from "./Login";

function renderLogin() {
  const store = configureStore({ reducer: { auth: authReducer } });
  render(
    <Provider store={store}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Login />
      </MemoryRouter>
    </Provider>
  );
  return store;
}

test("shows an error for invalid credentials", async () => {
  renderLogin();
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "bad@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "wrong" },
  });
  fireEvent.click(screen.getByRole("button", { name: /^sign in$/i }));
  expect(
    await screen.findByText(/invalid email or password/i, {}, { timeout: 3000 })
  ).toBeInTheDocument();
});

test("authenticates with the demo credentials", async () => {
  const store = renderLogin();
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "user@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByRole("button", { name: /^sign in$/i }));
  await waitFor(
    () => expect(store.getState().auth.isAuthenticated).toBe(true),
    { timeout: 3000 }
  );
});
