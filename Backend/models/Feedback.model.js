const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for Feedback
const feedbackSchema = new Schema(
  {
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the Expert model
      required: true,
    },
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Optional: Reference to the User model if tracking who submitted the feedback
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Feedback model
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
