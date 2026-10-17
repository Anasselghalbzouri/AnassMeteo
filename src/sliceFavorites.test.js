import favoritesReducer, {
  addFavorite,
  removeFavorite,
} from "./sliceFavorites";

test("addFavorite trims and deduplicates cities", () => {
  let state = favoritesReducer({ cities: [] }, addFavorite("  Paris  "));
  expect(state.cities).toEqual(["Paris"]);

  state = favoritesReducer(state, addFavorite("paris"));
  expect(state.cities).toEqual(["Paris"]);

  state = favoritesReducer(state, addFavorite("London"));
  expect(state.cities).toEqual(["Paris", "London"]);
});

test("addFavorite ignores empty values", () => {
  const state = favoritesReducer({ cities: [] }, addFavorite("   "));
  expect(state.cities).toEqual([]);
});

test("removeFavorite removes the city", () => {
  const state = favoritesReducer(
    { cities: ["Paris", "London"] },
    removeFavorite("Paris")
  );
  expect(state.cities).toEqual(["London"]);
});
