import authReducer, {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "./authSlice";

const user = { email: "user@example.com", name: "Test User" };
const token = "mock-jwt-token";

beforeEach(() => {
  localStorage.clear();
});

test("loginStart enables the loading flag", () => {
  const state = authReducer(undefined, loginStart());
  expect(state.loading).toBe(true);
  expect(state.error).toBeNull();
});

test("loginSuccess stores the user and token", () => {
  const state = authReducer(undefined, loginSuccess({ token, user }));
  expect(state.isAuthenticated).toBe(true);
  expect(state.user).toEqual(user);
  expect(state.token).toBe(token);
  expect(localStorage.getItem("token")).toBe(token);
});

test("loginFailure records the error", () => {
  const state = authReducer(
    { ...authReducer(undefined, {}), loading: true },
    loginFailure("Bad credentials")
  );
  expect(state.loading).toBe(false);
  expect(state.error).toBe("Bad credentials");
  expect(state.isAuthenticated).toBe(false);
});

test("logout clears the session", () => {
  const loggedIn = authReducer(undefined, loginSuccess({ token, user }));
  const state = authReducer(loggedIn, logout());
  expect(state.user).toBeNull();
  expect(state.token).toBeNull();
  expect(state.isAuthenticated).toBe(false);
  expect(localStorage.getItem("token")).toBeNull();
});
