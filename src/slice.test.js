import weatherReducer, { setVille } from "./slice";

test("setVille updates the selected city", () => {
  const state = weatherReducer({ ville: "" }, setVille("Casablanca"));
  expect(state.ville).toBe("Casablanca");
});
