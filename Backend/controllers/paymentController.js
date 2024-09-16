const Payment = require("../models/Payment.model");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Add Payment Controller
const addPayment = async (req, res) => {
  try {
    const { amount, paymentMethod, packageType } = req.body;

    // Validate request body data
    if (!amount || !paymentMethod || !packageType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userId = req.user.id;

    const paymentDate = new Date();

    // Create new payment record
    const payment = new Payment({
      paymentDate,
      amount,
      paymentMethod,
      paymentStatus: "Paid",
      packageType,
      userId,
    });

    // Save payment to the database
    const savedPayment = await payment.save();

    // Respond with success message
    res.status(201).json({
      message: "Payment successfully added",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding the payment",
      error: error.message,
    });
  }
};

//Get All Payments

const getAllPayments = async (req, res) => {
  try {
    // Fetch all payments from the database
    const payments = await Payment.find().populate(
      "userId",
      "profilePicture firstName lastName"
    );

    // Send response with payment data
    res.status(200).json(payments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

module.exports = {
  addPayment,
  getAllPayments,
};
