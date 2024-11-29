import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
    },
    districts: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const StateModel = mongoose.model("state", stateSchema);

export default StateModel;
