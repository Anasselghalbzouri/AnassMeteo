import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const CACHE_TTL_MS = 5 * 60 * 1000;

// Simple in-memory cache so several components showing the same city
// (e.g. the home panel + a favorite card) share a single request.
const cache = new Map();

/**
 * Fetches current weather for a city.
 * Returns { data, loading, error } instead of failing silently.
 */
export function useWeather(city, units = "metric") {
  const [state, setState] = useState({ data: null, loading: false, error: null });

  useEffect(() => {
    const trimmed = typeof city === "string" ? city.trim() : "";
    if (!trimmed) {
      setState({ data: null, loading: false, error: null });
      return undefined;
    }

    const cacheKey = `${trimmed.toLowerCase()}|${units}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
      setState({ data: cached.data, loading: false, error: null });
      return undefined;
    }

    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    axios
      .get(BASE_URL, {
        params: { q: trimmed, appid: API_KEY, units },
        signal: controller.signal,
      })
      .then((res) => {
        cache.set(cacheKey, { data: res.data, at: Date.now() });
        setState({ data: res.data, loading: false, error: null });
      })
      .catch((err) => {
        if (axios.isCancel(err) || err.code === "ERR_CANCELED") return;
        setState({
          data: null,
          loading: false,
          error:
            err.response && err.response.status === 404
              ? `City "${trimmed}" not found. Check the spelling and try again.`
              : "Unable to load weather data. Please try again.",
        });
      });

    // Abort in-flight requests when the city changes, so a slower
    // earlier response can never overwrite newer data.
    return () => controller.abort();
  }, [city, units]);

  return state;
}
