import express from "express";
import multer from "multer";
import { Client } from "@gradio/client";
import { Buffer } from "buffer";

const router = express.Router();
const upload = multer();

// Initialize Hugging Face Client instances for each model
const cropPredictClient = await Client.connect("rjAnupam/kissan-mitra");
const yieldPredictClient = await Client.connect("rjAnupam/kissan-mitra");
const fertilizerPredictClient = await Client.connect("rjAnupam/kissan-mitra");
const diseasePredictClient = await Client.connect("rjAnupam/kissan-mitra");

// Crop Prediction Route
router.post("/crop-predict", async (req, res) => {
  try {
    const result = await cropPredictClient.predict("/predict", req.body);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Yield Prediction Route
router.post("/yield-predict", async (req, res) => {
  try {
    const result = await yieldPredictClient.predict("/predict_1", req.body);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fertilizer Recommendation Route
router.post("/fertilizer-predict", async (req, res) => {
  try {
    const result = await fertilizerPredictClient.predict("/predict_2", req.body);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Disease Prediction Route
router.post("/disease-predict", upload.single("file"), async (req, res) => {
  try {
    // Convert Buffer to Blob
    const fileBlob = new Blob([new Uint8Array(req.file.buffer)], { type: req.file.mimetype });

    const result = await diseasePredictClient.predict("/predict_3", {
      img: fileBlob,
    });
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
