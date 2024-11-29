// models/cropDataModel.js
import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  state: { type: String, required: true, unique: true },
  crops: [
    {
      name: { type: String, required: true },
      profitShare: { type: Number, required: true }
    }
  ]
});

const CropData = mongoose.model('CropData', cropSchema);

export default CropData;
