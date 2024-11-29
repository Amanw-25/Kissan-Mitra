import StateModel from "../models/stateModel.js";

export const getStateNameController = async (req, res) => {
  try {
    const stateData = await StateModel.find();

    res.status(200).json({
      status: "success",
      data: stateData,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `${error.message}`,
    });
  }
};
