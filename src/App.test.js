import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "axios";
import App from "./App";
import { store } from "./store/apps";
import { loginSuccess, logout } from "./store/authSlice";

jest.mock("axios");

const mockWeather = {
  name: "Tangier",
  sys: { country: "MA", sunrise: 1700000000, sunset: 1700040000 },
  main: {
    temp: 18,
    temp_min: 14,
    temp_max: 22,
    humidity: 60,
    feels_like: 17,
    pressure: 1013,
  },
  weather: [{ description: "clear sky" }],
  wind: { speed: 3 },
  clouds: { all: 0 },
  visibility: 10000,
  timezone: 3600,
};

function renderApp() {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

beforeEach(() => {
  localStorage.clear();
  axios.get.mockReset();
  axios.get.mockResolvedValue({ data: mockWeather });
});

test("redirects to the login page when not authenticated", async () => {
  store.dispatch(logout());
  renderApp();
  expect(
    await screen.findByRole("heading", { name: /login/i })
  ).toBeInTheDocument();
});

test("shows the dashboard when authenticated", async () => {
  store.dispatch(
    loginSuccess({
      token: "test-token",
      user: { email: "user@example.com", name: "Test User" },
    })
  );
  renderApp();
  expect(await screen.findByText(/skycode/i)).toBeInTheDocument();
  expect((await screen.findAllByText(/tangier/i)).length).toBeGreaterThan(0);
});
