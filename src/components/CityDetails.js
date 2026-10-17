import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useWeather } from "../hooks/useWeather";
import { addFavorite, removeFavorite } from "../sliceFavorites";
import DetailCard from "./DetailCard";
import { capitalizeCity, formatCityTime, kmhFromMps, hasCity } from "../utils/format";

function CityDetails() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites?.cities ?? []);
  const { data: weather, loading, error } = useWeather(cityName);

  const isFavorite = hasCity(favorites, cityName);
  const temp = weather?.main?.temp;
  const tempMin = weather?.main?.temp_min;
  const tempMax = weather?.main?.temp_max;
  const description = weather?.weather?.[0]?.description;
  const apiCity = weather?.name;
  const countryCode = weather?.sys?.country;
  const locationLabel = capitalizeCity(apiCity || cityName);
  const windKmh = kmhFromMps(weather?.wind?.speed);

  return (
    <div className="flex flex-col flex-1 justify-between py-6 md:py-12">
      <div>
        <div className="flex items-center justify-between mb-6 gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 w-fit transition-colors"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            Back to Home
          </button>
          <button
            onClick={() =>
              dispatch(isFavorite ? removeFavorite(cityName) : addFavorite(cityName))
            }
            aria-pressed={isFavorite}
            className="glass rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-white/90 transition-all"
          >
            <span
              className="material-symbols-outlined text-lg align-middle mr-2"
              aria-hidden="true"
            >
              star
            </span>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>

        <h1 className="text-slate-900 tracking-light text-4xl md:text-[64px] font-bold leading-none mb-2">
          {locationLabel}
          {countryCode ? `, ${countryCode.toUpperCase()}` : ""}
        </h1>

        <div className="flex items-baseline gap-4">
          <h1 className="text-slate-900 tracking-tighter text-[76px] md:text-[120px] font-thin leading-none">
            {loading && temp == null
              ? "…"
              : temp != null
              ? `${Math.round(temp)}°C`
              : "—°C"}
          </h1>
          <div className="flex flex-col">
            {loading && !description && (
              <span className="text-slate-400 text-lg">Loading…</span>
            )}
            <span className="text-slate-500 text-xl capitalize">
              {description || "—"}
            </span>
            <span className="text-slate-400 text-lg">
              H:{tempMax != null ? Math.round(tempMax) : "—"}° L:
              {tempMin != null ? Math.round(tempMin) : "—"}°
            </span>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-red-500 text-sm font-medium">
            {error}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full">
        <DetailCard
          icon="thermostat"
          label="Feels Like"
          value={
            weather?.main?.feels_like != null
              ? `${Math.round(weather.main.feels_like)}°`
              : "—"
          }
        />
        <DetailCard
          icon="water_drop"
          label="Humidity"
          value={
            weather?.main?.humidity != null ? `${weather.main.humidity}%` : "—"
          }
        />
        <DetailCard
          icon="air"
          label="Wind"
          value={windKmh != null ? `${windKmh} km/h` : "—"}
        />
        <DetailCard
          icon="compress"
          label="Pressure"
          value={
            weather?.main?.pressure != null ? `${weather.main.pressure} hPa` : "—"
          }
        />
        <DetailCard
          icon="visibility"
          label="Visibility"
          value={
            weather?.visibility != null
              ? `${(weather.visibility / 1000).toFixed(1)} km`
              : "—"
          }
        />
        <DetailCard
          icon="wb_twilight"
          label="Sunrise"
          value={formatCityTime(weather?.sys?.sunrise, weather?.timezone)}
        />
        <DetailCard
          icon="wb_twilight"
          label="Sunset"
          value={formatCityTime(weather?.sys?.sunset, weather?.timezone)}
        />
        <DetailCard
          icon="cloud"
          label="Cloudiness"
          value={weather?.clouds?.all != null ? `${weather.clouds.all}%` : "—"}
        />
      </div>
    </div>
  );
}

export default CityDetails;
