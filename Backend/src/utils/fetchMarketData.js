import axios from "axios";
import { appconfig } from "../config/appconfig.js";

const fetchMarketData = async (state, district, market) => {
  const apiKey = appconfig.DATA_API_KEY;

  if (!apiKey) {
    throw new Error("API key is not set");
  }
  const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&filters[state]=${state}&filters[district]=${district}&filters[market]=${market}`;

  try {
    const response = await axios.get(url);
    const records = response.data.records;

    const marketData = records.map((record) => ({
      Commodity: record.commodity,
      Variety: record.variety,
      MinPrice: record.min_price,
      MaxPrice: record.max_price,
      ArrivalDate: record.arrival_date,
      Grade: record.grade,
    }));

    return marketData;
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw new Error(`Unable to fetch market data: ${error.message}`);
  }
};

export default fetchMarketData;
