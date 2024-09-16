const Payment = require("../models/Payment.model");
const User = require("../models/User.model");
const AppointmentRequest = require("../models/AppointmentRequest.model");
const AppointmentSchedule = require("../models/AppointmentSchedule.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller function to add a new appointment schedule
const addSchedule = async (req, res) => {
  try {
    const { date, timeslot, link, note, userId, status } = req.body;

    const expertId = req.user.id;

    // Validate required fields
    if (!date || !timeslot || !expertId || !userId) {
      return res.status(400).json({
        error: "All Fields are required",
      });
    }

    // Check if expert and user exist
    const expert = await User.findById(expertId);
    const user = await User.findById(userId);

    if (!expert) {
      return res.status(404).json({ error: "Expert not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create new appointment schedule
    const newSchedule = new AppointmentSchedule({
      date,
      timeslot,
      link,
      note,
      status,
      expertId,
      userId,
    });

    // Save the appointment schedule
    await newSchedule.save();

    res.status(201).json({
      message: "Appointment schedule created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating appointment schedule",
      error: error.message,
    });
  }
};

//Get All Schedules
const getAllSchedules = async (req, res) => {
  try {
    const expertId = req.user.id;

    // Find Schedules for the expert
    const appointments = await AppointmentSchedule.find()
      .populate({
        path: "expertId",
        select: "profilePicture firstName lastName email",
      })
      .populate({
        path: "userId",
        select: "profilePicture firstName lastName email",
      });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(401).json({
      error: "Error fetching requests",
    });
  }
};

//Get Expert Schedules
const getExpertSchedules = async (req, res) => {
  try {
    const expertId = req.user.id;

    // Find appointments for the expert
    const appointments = await AppointmentSchedule.find({
      expertId: expertId,
    }).populate("userId", "profilePicture firstName lastName");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(401).json({
      error: "Error fetching requests",
    });
  }
};

const getUserSchedules = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find appointments for the expert
    const appointments = await AppointmentSchedule.find({
      userId: userId,
    }).populate("expertId", "profilePicture firstName lastName");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(401).json({
      error: "Error fetching requests",
    });
  }
};

module.exports = {
  addSchedule,
  getAllSchedules,
  getExpertSchedules,
  getUserSchedules,
};
