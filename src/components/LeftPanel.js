import React from "react";
import MiniStatsCard from "./MiniStatsCard";
import { useWeather } from "../hooks/useWeather";
import { useSelector } from "react-redux";
import { capitalizeCity } from "../utils/format";

function LeftPanel() {
  const data = useSelector((state) => state.ville);
  const city = data?.ville?.trim() || "Tangier";
  const { data: weather, loading, error } = useWeather(city);

  const temp = weather?.main?.temp;
  const tempMin = weather?.main?.temp_min;
  const tempMax = weather?.main?.temp_max;
  const description = weather?.weather?.[0]?.description;
  const apiCity = weather?.name;
  const countryCode = weather?.sys?.country;
  const locationLabel = capitalizeCity(apiCity || city);

  return (
    <div className="flex flex-col flex-1 justify-between py-6 md:py-12">
      <div>
        {!data?.ville && (
          <div className="flex items-center gap-2 text-primary mb-4 glow-blue">
            <span className="material-symbols-outlined" aria-hidden="true">
              location_on
            </span>
            <span className="text-sm font-semibold tracking-widest uppercase">
              Current Location
            </span>
          </div>
        )}

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

      <MiniStatsCard
        humidity={weather?.main?.humidity}
        windSpeed={weather?.wind?.speed}
      />
    </div>
  );
}

export default LeftPanel;
