import React from "react";
import { useDispatch } from "react-redux";
import { setVille } from "../slice";
import { removeFavorite } from "../sliceFavorites";
import { useWeather } from "../hooks/useWeather";
import { useNavigate } from "react-router-dom";
import { capitalizeCity } from "../utils/format";

function FavoriteCityCard({ city }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: weather, loading } = useWeather(city);
  const temp = weather?.main?.temp;
  const country = weather?.sys?.country;

  function openCity() {
    dispatch(setVille(city));
    navigate(`/details/${encodeURIComponent(city)}`);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${city}`}
      onClick={openCity}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openCity();
        }
      }}
      className="group relative overflow-hidden glass border-none rounded-xl p-4 cursor-pointer hover:bg-white/90 transition-all"
    >
      <div className="flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <span className="text-slate-400 text-xs font-medium uppercase">
            {country || "—"}
          </span>
          <span className="text-slate-900 font-bold text-xl">
            {capitalizeCity(city)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-800 text-2xl font-light">
            {loading && temp == null ? "…" : temp != null ? `${Math.round(temp)}°C` : "—"}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeFavorite(city));
            }}
            className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all"
            aria-label={`Remove ${city} from favorites`}
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              close
            </span>
          </button>
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 size-24 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all" />
    </div>
  );
}

export default FavoriteCityCard;
