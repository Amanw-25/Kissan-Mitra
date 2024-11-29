import MessageModel from "../models/messageModel.js";

const getAllCommunityMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({}).sort({ timestamp: 1 });
    res.status(200).json({
      status: "success",
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching all community messages:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to find messages!",
    });
  }
};

const getLikedMessages = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is available in req.user
    const likedMessages = await MessageModel.find({ likedBy: userId });
    res.status(200).json({
      status: "success",
      data: likedMessages,
    });
  } catch (error) {
    console.error("Error fetching liked messages:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to find liked messages!",
    });
  }
};

const getSavedMessages = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is available in req.user
    const savedMessages = await MessageModel.find({ savedBy: userId });
    res.status(200).json({
      status: "success",
      data: savedMessages,
    });
  } catch (error) {
    console.error("Error fetching saved messages:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to find saved messages!",
    });
  }
};

export { getAllCommunityMessages, getLikedMessages, getSavedMessages };
