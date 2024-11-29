export const get5daysData = (forecastResponse) => {
  const forecastData = forecastResponse.data.list;
  
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  const dailyForecast = forecastData.reduce((acc, entry) => {
    const date = new Date(entry.dt * 1000).toISOString().split("T")[0];
    const time = new Date(entry.dt * 1000).getUTCHours();

    if (time === 9) {
      if (!acc[date]) {
        const rainvalue = entry.rain?.["3h"] || 0;
        acc[date] = {
          _id: entry.dt,
          date,
          day: getDayName(entry.dt * 1000),
          temperature: entry.main.temp,
          weather_description: entry.weather[0].description,
          humidity: entry.main.humidity,
          rain: rainvalue,
          wind_speed: entry.wind.speed,
          icon: entry.weather[0].icon,
        };
      }
    }
    return acc;
  }, {});

  const result = Object.values(dailyForecast);

  return result;
};

export default get5daysData;
