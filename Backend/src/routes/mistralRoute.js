import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/crop-advice", async (req, res) => {
  try {
    const { crop } = req.body;

    if (!crop) {
      return res.status(400).json({ error: "Crop name is required." });
    }

    // Construct the message for Mistral AI
    const messageContent = `
    The user has selected the crop: ${crop}.
  Acting as an agriculturalist and specialist in farming practices and crops. Please provide 15 detailed and unique tips (about 100 words each) covering the following aspects for optimal growth and care of this crop:
    - Irrigation: Specify the amount of water needed in millimeters per week and the timing of irrigation.
    - Fertilizer: Include specific types of fertilizers and their application rates based on soil tests.
    - Storage: Describe the ideal storage conditions, including temperature and humidity levels.
    - Crop Management: Detail monitoring practices, including frequency and parameters to track.
    - Soil Quality: Provide specific soil tests and amendments needed for optimal growth.
    - Weather: Recommend planting times based on temperature ranges and seasonal weather patterns.
    - Pest Control: List specific pests, their thresholds, and management techniques.
    - Disease Management: Identify common diseases and detailed prevention and treatment strategies.
    - Harvesting Techniques: Include optimal moisture content for harvesting and equipment settings.
    - Planting Density: Suggest precise seeding rates and spacing based on soil and environmental conditions.
    - Crop Rotation: Recommend specific crops to include in rotation and their benefits.
    - Weed Control: Describe methods and timings for effective weed management.
    - Nutrient Management: Include specific nutrient management practices and schedules.
    - Field Preparation: Provide detailed steps for field preparation, including tillage and soil conditioning.
    - Climate Adaptation: Offer strategies for adapting to varying climate conditions, including drought management.

Do offer any extra precautionary advices or suggestions if you have.
`;

    // Call Mistral AI API
    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-small",
        messages: [
          {
            role: "user",
            content: messageContent,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send the response back to the client
    res.json({ response: response.data.choices[0].message.content });
  } catch (err) {
    console.error("Error processing crop advice request:", err);
    res
      .status(500)
      .json({
        error: "An error occurred while processing the crop advice request.",
      });
  }
});

export default router;
