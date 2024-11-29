import axios from "axios";
import { appconfig } from "../config/appconfig.js";

async function getStateFromCoordinates(latitude, longitude) {
  try {
    const response = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: `${latitude},${longitude}`,
          key: appconfig.OPENCAGE_API_KEY,
          limit: 1,
        },
      }
    );

    const results = response.data.results;
    if (results.length > 0) {
      const state = results[0].components.state;
      return state;
    } else {
      throw new Error("No results found for the provided coordinates");
    }
  } catch (error) {
    console.error("Error fetching state from coordinates:", error.message);
    throw new Error("Unable to fetch state from coordinates");
  }
}

export default getStateFromCoordinates;
