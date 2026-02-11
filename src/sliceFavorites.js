import { createSlice } from "@reduxjs/toolkit";
import initialFavorites from "./data/favoriteCities.json";

function loadFavorites() {
  try {
    const s = localStorage.getItem("favoriteCities");
    if (s) return JSON.parse(s);
  } catch (_) {}
  return initialFavorites;
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { cities: loadFavorites() },
  reducers: {
    addFavorite(state, action) {
      const city = action.payload?.trim();
      if (city && !state.cities.includes(city)) {
        state.cities.push(city);
      }
    },
    removeFavorite(state, action) {
      state.cities = state.cities.filter((c) => c !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
