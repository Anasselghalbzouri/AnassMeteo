// Mock authentication service.
// Replace the internals with real API calls in production —
// currently any valid-looking token in localStorage grants access
// (see ProtectedRoute), so do not rely on this for security.
export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "user@example.com" && password === "password") {
        const token = "mock-jwt-token-1234567890";
        const user = { email, name: "Test User" };
        resolve({ token, user });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};
