import mongoose from "mongoose";

// Define the sender schema
const senderSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: null,
  },
});

// Define the message schema
const messageSchema = new mongoose.Schema({
  sender: {
    type: senderSchema,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  messageType: {
    type: String,
    enum: ["text"],
    required: true,
  },
  content: {
    type: String,
    required: function () {
      return this.messageType === "text";
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  savedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Create the model from the schema
const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
