import fetchMarketData from '../utils/fetchMarketData.js';

export const getMarketDataController = async (req, res) => {
  const { state, district, market } = req.body;
  if (!state || !district || !market) {
    return res.status(400).json({
      status: 'failed',
      message: 'State, district, and market are required parameters',
    });
  }

  try {
    const marketData = await fetchMarketData(state, district, market);
    res.status(200).json({
      status: 'success',
      data: marketData,
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: `Unable to fetch market data: ${error.message}`,
    });
  }
};
