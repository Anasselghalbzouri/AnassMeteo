import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../sliceFavorites";
import { hasCity } from "../utils/format";
import FavoriteCityCard from "./FavoriteCityCard";

const STORAGE_KEY = "favoriteCities";

function RightSidebar() {
  const dispatch = useDispatch();
  const currentCity = useSelector((state) => state.ville?.ville?.trim());
  const favorites = useSelector((state) => state.favorites?.cities ?? []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (_) {}
  }, [favorites]);

  function handleAddCity() {
    if (currentCity) dispatch(addFavorite(currentCity));
  }

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-6">
      <div className="glass flex-1 rounded-2xl p-6 flex flex-col border-white/5">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-slate-900 font-semibold text-lg">Favorite Cities</h3>
        </div>

        <div className="flex flex-col gap-4">
          {favorites.map((city) => (
            <FavoriteCityCard key={city} city={city} />
          ))}

          <button
            onClick={handleAddCity}
            disabled={!currentCity || hasCity(favorites, currentCity)}
            className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-xl p-6 text-slate-400 hover:text-slate-700 hover:border-slate-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              add
            </span>
            <span className="text-sm font-medium">Add City</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
