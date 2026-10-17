export function capitalizeCity(str) {
  if (!str) return "";
  return str
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function kmhFromMps(mps) {
  if (mps == null) return null;
  return Math.round(mps * 3.6);
}

/** Formats a Unix timestamp in the city's local time (API timezone offset in seconds). */
export function formatCityTime(unixSeconds, timezoneOffsetSeconds) {
  if (unixSeconds == null) return "—";
  const shifted = new Date((unixSeconds + (timezoneOffsetSeconds || 0)) * 1000);
  return shifted.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function hasCity(list, city) {
  if (!city) return false;
  return list.some((c) => c.toLowerCase() === city.toLowerCase());
}

export function humidityLabel(humidity) {
  if (humidity == null) return "—";
  if (humidity < 40) return "Dry";
  if (humidity <= 70) return "Comfortable";
  return "Humid";
}

export function windLabel(kmh) {
  if (kmh == null) return "—";
  if (kmh < 5) return "Calm";
  if (kmh < 20) return "Breezy";
  if (kmh < 40) return "Windy";
  return "Gusty";
}
