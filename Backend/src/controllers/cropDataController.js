import CropData from "../models/cropDataModel.js";
import getStateFromCoordinates from "../utils/geocode.js";

export async function getCropsByCoordinates(req, res) {
  try {
    const { latitude, longitude } = req.params;

    const state = await getStateFromCoordinates(latitude, longitude);

    const cropData = await CropData.findOne({ state }).exec();

    if (cropData) {
      res.status(200).json(cropData.crops);
    } else {
      res.status(404).json({ message: "No crop data found for this state" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
