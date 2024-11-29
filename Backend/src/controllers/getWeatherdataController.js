import mongoose from "mongoose";
import axios from "axios";
import { appconfig } from "../config/appconfig.js";
import get5daysData from "../utils/get5daysData.js";
import get3hoursData from "../utils/get3hourData.js";

export const getWeatherdataController = async (req, res) => {
  try {
    const UserId = req.user._id;
    const { latitude, longitude } = req.params;

    const isValid = mongoose.Types.ObjectId.isValid(UserId.toString());

    if (!isValid) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid user",
      });
    }

    if (!latitude || !longitude) {
      return res.status(404).json({
        status: "failed",
        message: "Location not found",
      });
    }

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${appconfig.WEATHER_API_KEY}`
    );

    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${appconfig.WEATHER_API_KEY}`
    );

    const currentWeatherData = {
      city: weatherResponse.data.name,
      temperature: weatherResponse.data.main.temp,
      wind: weatherResponse.data.wind.speed,
      humidity: weatherResponse.data.main.humidity,
      pressure: weatherResponse.data.main.pressure,
      weather: weatherResponse.data.weather,
    };

    const ForeCastData = get5daysData(forecastResponse);
    const ThreeHoursData = get3hoursData(forecastResponse);

    res.status(200).json({
      status: "success",
      CurrentWeatherData: currentWeatherData,
      Next5DaysWeatherData: ForeCastData,
      ThreeHoursWeatherData: ThreeHoursData,
    });
    
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to fetch weather data: ${error.message}`,
    });
  }
};
