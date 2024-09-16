const mongoose = require("mongoose");

// Define the Appointment schema
const AppointmentSchema = new mongoose.Schema(
  {
    requestedDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      required: true,
      trim: true,
    },
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AppointmentRequest = mongoose.model(
  "AppointmentRequest",
  AppointmentSchema
);

module.exports = AppointmentRequest;
