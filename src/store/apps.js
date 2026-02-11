import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "../sliceFavorites";
import villeReducer from "../slice";

export const store = configureStore({
  reducer: {

    favorites: favoritesReducer,
    ville: villeReducer,
  },
});
