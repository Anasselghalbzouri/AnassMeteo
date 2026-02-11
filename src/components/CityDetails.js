import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import WetherApi from "../api/apiwheter";
import DetailCard from "./DetailCard";

function capitalizeCity(str) {
  if (!str) return "";
  return str.trim().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

function CityDetails() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const { weather } = WetherApi(cityName);

  const temp = weather?.main?.temp;
  const tempMin = weather?.main?.temp_min;
  const tempMax = weather?.main?.temp_max;
  const description = weather?.weather?.[0]?.description;
  const apiCity = weather?.name;
  const countryCode = weather?.sys?.country;
  const locationLabel = capitalizeCity(apiCity || cityName);

  return (
    <div className='flex flex-col flex-1 justify-between py-12 px-12'>
      <button 
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-white/60 hover:text-white mb-6 w-fit transition-colors"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back to Home
      </button>

      <div>
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

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full'>
        <DetailCard icon="thermostat" label="Feels Like" value={weather?.main?.feels_like ? `${Math.round(weather.main.feels_like)}°` : "—"} />
        <DetailCard icon="water_drop" label="Humidity" value={weather?.main?.humidity ? `${weather.main.humidity}%` : "—"} />
        <DetailCard icon="air" label="Wind" value={weather?.wind?.speed ? `${Math.round(weather.wind.speed * 3.6)} km/h` : "—"} />
        <DetailCard icon="compress" label="Pressure" value={weather?.main?.pressure ? `${weather.main.pressure} hPa` : "—"} />
        <DetailCard icon="visibility" label="Visibility" value={weather?.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : "—"} />
        <DetailCard icon="wb_twilight" label="Sunrise" value={weather?.sys?.sunrise ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "—"} />
        <DetailCard icon="wb_twilight" label="Sunset" value={weather?.sys?.sunset ? new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "—"} />
        <DetailCard icon="cloud" label="Cloudiness" value={weather?.clouds?.all ? `${weather.clouds.all}%` : "—"} />
      </div>
    </div>
  );
}

export default CityDetails;
