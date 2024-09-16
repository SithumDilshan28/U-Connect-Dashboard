const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Yearly", "Monthly"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      required: true,
      default: "Paid",
    },
    packageType: {
      type: String,
      enum: ["Regular", "Premium"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
