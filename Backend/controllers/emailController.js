const Payment = require("../models/Payment.model");
const Note = require("../models/Note.model");
const Email = require("../models/Email.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Add Payment Controller
const addEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate request body data
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Create new Note record
    const note = new Email({
      email,
    });

    // Save Note to the database
    const savedNote = await note.save();

    // Respond with success message
    res.status(201).json({
      message: "Email successfully added",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "An error occurred while adding the Email",
      error: error.message,
    });
  }
};

//Get All Payments
const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user contains the logged-in user's data

    // Fetch all todos for the logged-in user
    const todos = await Note.find({ userId }).populate(
      "userId",
      "firstName lastName"
    );

    // Send response with todos data
    res.status(200).json(todos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

module.exports = {
  addEmail,
  getAllNotes,
};
