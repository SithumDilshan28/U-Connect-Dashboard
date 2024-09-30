const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for the Email
const EmailSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model from the schema
const Email = mongoose.model("Email", EmailSchema);

module.exports = Email;
