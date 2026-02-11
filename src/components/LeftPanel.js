import React from "react";
import MiniStatsCard from "./MiniStatsCard";
import WetherApi from "../api/apiwheter";

import { useSelector } from "react-redux";

function capitalizeCity(str) {
  if (!str) return "";
  return str.trim().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

function LeftPanel() {
  const data = useSelector((state) => state.ville);
  const city = data?.ville || "Tangier";
  const { weather } = WetherApi(city);
  const temp = weather?.main?.temp;
  const tempMin = weather?.main?.temp_min;
  const tempMax = weather?.main?.temp_max;
  const description = weather?.weather?.[0]?.description;
  const apiCity = weather?.name;
  const countryCode = weather?.sys?.country;
  const locationLabel = capitalizeCity(apiCity || city);

  return (
    <div className='flex flex-col flex-1 justify-between py-12'>
      <div>
        {!data?.ville && (
          <div className='flex items-center gap-2 text-primary mb-4 glow-blue'>
            <span className='material-symbols-outlined'>location_on</span>
            <span className='text-sm font-semibold tracking-widest uppercase'>
              Current Location
            </span>
          </div>
        )}

        <h1 className='text-white tracking-light text-[64px] font-bold leading-none mb-2'>
          {locationLabel}{countryCode ? `, ${countryCode.toUpperCase()}` : ""}
        </h1>

        <div className='flex items-baseline gap-4'>
          <h1 className='text-white tracking-tighter text-[120px] font-thin leading-none'>
            {temp != null ? `${Math.round(temp)}°C` : "—°C"}
          </h1>
          <div className='flex flex-col'>
            <span className='text-white/60 text-xl capitalize'>
              {description || "—"}
            </span>
            <span className='text-white/40 text-lg'>
              H:{tempMax != null ? Math.round(tempMax) : "—"}° L:{tempMin != null ? Math.round(tempMin) : "—"}°
            </span>
          </div>
        </div>
      </div>

      <MiniStatsCard humidity={weather?.main?.humidity} windSpeed={weather?.wind?.speed} />
    </div>
  );
}

export default LeftPanel;
