const Feedback = require("../models/Feedback.model");
const Note = require("../models/Note.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller to create a new feedback review
const createFeedback = async (req, res) => {
  try {
    const { expertId, rating, review } = req.body;

    userId = req.user.id;

    // Create a new feedback document
    const newFeedback = new Feedback({
      expertId,
      rating,
      review,
      userId,
    });

    // Save the feedback document to the database
    const savedFeedback = await newFeedback.save();

    // Respond with the created feedback document
    res.status(201).json({ message: "Feedback Sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating feedback" });
  }
};

// Controller to get all feedback reviews
const getAllFeedbacks = async (req, res) => {
  try {
    // Fetch all feedback reviews from the database
    const feedbacks = await Feedback.find()
      .populate("expertId", "profilePicture firstName lastName field") // Optionally populate expert details if needed
      .populate("userId", "firstName lastName") // Optionally populate user details if needed
      .exec();

    // Respond with the list of feedback reviews
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching feedbacks" });
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
};
