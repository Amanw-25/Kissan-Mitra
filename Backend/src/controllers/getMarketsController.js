import axios from "axios";
import { appconfig } from "../config/appconfig.js";

export const getMarketsController = async (req, res) => {
  const apiKey = appconfig.DATA_API_KEY;

  try {
    const { state, district } = req.body;

    if (!state || !district) {
      return res.status(400).json({
        status: "failed",
        message: "State and district are required parameters",
      });
    }

    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&filters[state]=${state}&filters[district]=${district}`;

    const response = await axios.get(url);

    if (response.status !== 200) {
      return res.status(response.status).json({
        status: "failed",
        message: `API request failed with status ${response.status}`,
      });
    }

    const { records } = response.data;

    if (!records || records.length === 0) {
      return res.status(404).json({
        status: "failed",
        message:
          "No markets found for the selected state and district. Please choose a different state and district.",
      });
    }

    const uniqueMarkets = [...new Set(records.map((record) => record.market))];

    res.status(200).json({
      status: "success",
      data: uniqueMarkets,
    });
  } catch (error) {
    console.error("Error fetching markets:", error);

    let errorMessage = "Failed to fetch markets.";
    if (error.response) {
      errorMessage += ` API responded with status ${error.response.status}: ${error.response.data.message}`;
    } else if (error.request) {
      errorMessage += " No response received from the API.";
    } else {
      errorMessage += ` Error: ${error.message}`;
    }

    res.status(500).json({
      status: "failed",
      message: errorMessage,
    });
  }
};
