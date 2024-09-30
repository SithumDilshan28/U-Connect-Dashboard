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
    // Step 1: Fetch all valid user and expert IDs
    const validUsers = await User.find().select("_id").lean();
    const validUserIds = validUsers.map((user) => user._id.toString());

    const validExperts = await User.find({ role: "expert" })
      .select("_id")
      .lean();
    const validExpertIds = validExperts.map((expert) => expert._id.toString());

    // Step 2: Find schedules for the expert
    const schedules = await AppointmentSchedule.find().lean();

    // Step 3: Filter schedules where userId and expertId are in validUserIds and validExpertIds
    const filteredSchedules = schedules.filter(
      (schedule) =>
        validUserIds.includes(schedule.userId.toString()) &&
        validExpertIds.includes(schedule.expertId.toString())
    );

    // Optionally, populate user and expert data for filtered schedules
    const schedulesWithUserData = await AppointmentSchedule.find({
      _id: { $in: filteredSchedules.map((s) => s._id) },
    })
      .populate({
        path: "expertId",
        select: "profilePicture firstName lastName email",
      })
      .populate({
        path: "userId",
        select: "profilePicture firstName lastName email",
      })
      .lean();

    res.status(200).json(schedulesWithUserData);
  } catch (error) {
    console.error(error.message); // Log error for debugging
    res.status(500).json({
      error: "Error fetching schedules",
    });
  }
};

//Get Expert Schedules
const getExpertSchedules = async (req, res) => {
  try {
    const expertId = req.user.id;

    // Step 1: Fetch all valid user IDs
    const validUsers = await User.find().select("_id").lean();
    const validUserIds = validUsers.map((user) => user._id.toString());

    // Step 2: Find schedules for the expert
    const schedules = await AppointmentSchedule.find({
      expertId: expertId,
    }).lean();

    // Step 3: Filter schedules where userId is in validUserIds
    const filteredSchedules = schedules.filter((schedule) =>
      validUserIds.includes(schedule.userId.toString())
    );

    // Optionally, populate user data for filtered schedules
    const schedulesWithUserData = await AppointmentSchedule.find({
      _id: { $in: filteredSchedules.map((s) => s._id) },
    })
      .populate({
        path: "userId",
        select: "profilePicture firstName lastName",
      })
      .lean();

    res.status(200).json(schedulesWithUserData);
  } catch (error) {
    console.error(error.message); // Log error for debugging
    res.status(500).json({
      error: "Error fetching schedules",
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
