const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the AppointmentSchedules schema
const appointmentScheduleSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    timeslot: {
      type: Date,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    status: {
      type: String,
    },
    expertId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the model from the schema
const AppointmentSchedule = mongoose.model(
  "AppointmentSchedule",
  appointmentScheduleSchema
);

module.exports = AppointmentSchedule;
