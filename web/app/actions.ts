"use server";

import axios from "axios";

export const getWeatherData = async (cities: string[]) => {
  const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const responses = await Promise.all(
    cities.map((city) =>
      axios.get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`),
    ),
  );
  //@ts-ignore
  return responses.map(
    (res) => `${res.data.name} ${Math.round(res.data.main.temp)}°C`,
  );
};
