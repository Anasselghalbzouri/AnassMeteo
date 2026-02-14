import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "../sliceFavorites";
import villeReducer from "../slice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {

    favorites: favoritesReducer,
    ville: villeReducer,
    auth: authReducer,
  },
});
