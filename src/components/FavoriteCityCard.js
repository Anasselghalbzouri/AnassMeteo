import React from "react";
import { useDispatch } from "react-redux";
import { setVille } from "../slice";
import { removeFavorite } from "../sliceFavorites";
import WetherApi from "../api/apiwheter";
import { useNavigate } from "react-router-dom";

function FavoriteCityCard({ city }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { weather } = WetherApi(city);
  const temp = weather?.main?.temp;
  const country = weather?.sys?.country;
  function capitalizeCity(str) {
    if (!str) return "";
    return str.trim().split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  }

  return (
    <div
      onClick={() => {
        dispatch(setVille(city)); // Optional: keep updating state
        navigate(`/details/${city}`);
      }}
      className='group relative overflow-hidden glass bg-white/5 border-none rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-all'
    >
      <div className='flex items-center justify-between relative z-10'>
        <div className='flex flex-col'>
          <span className='text-white/40 text-xs font-medium uppercase'>
            {country || "—"}
          </span>
          <span className='text-white font-bold text-xl'>{capitalizeCity(city)}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-white text-2xl font-light'>
            {temp != null ? `${Math.round(temp)}°C` : "—"}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeFavorite(city));
            }}
            className='opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/20 text-white/60 hover:text-white transition-all'
            aria-label='Remove'
          >
            <span className='material-symbols-outlined text-lg'>close</span>
          </button>
        </div>
      </div>
      <div className='absolute -right-4 -bottom-4 size-24 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all' />
    </div>
  );
}

export default FavoriteCityCard;
