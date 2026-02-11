import axios from "axios";
import { useState, useEffect } from "react";
function WetherApi(pay) {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const API_KEY = "c5f77dea6f75e59d6d03c4b7d173fdb7";

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${pay}&appid=${API_KEY}&units=metric`
      )
      .then((res) => {
        setWeather(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [pay]);
  return { weather };
}
export default WetherApi;
