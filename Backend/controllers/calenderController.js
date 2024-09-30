const Payment = require("../models/Payment.model");
const Note = require("../models/Note.model");
const Calender = require("../models/Calender.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller to create a new event
const createEvent = async (req, res) => {
  try {
    const { title, start, end, className, description } = req.body;

    // Create a new event
    const newEvent = new Calender({
      title,
      start,
      end,
      className,
      description,
    });

    // Save the event to the database
    const savedEvent = await newEvent.save();

    // Return success response
    res.status(201).json({
      message: "Event created successfully",
      event: savedEvent,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Failed to create event", error });
  }
};

// Get All Events
const getAllEvents = async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Calender.find(); // No filtering by userId

    // Send response with events data
    res.status(200).json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params; // Event ID from the URL parameters
    const { title, start, end, description, className } = req.body; // Data to update

    // Find the event by ID and update it
    const updatedEvent = await Calender.findByIdAndUpdate(
      id,
      { title, start, end, description, className },
      { new: true } // Return the updated document
    );

    // Check if the event was found and updated
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Send the updated event data as a response
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params; // To-Do ID from the URL

    // Find and delete the task by ID
    const deletedTodo = await Note.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Note not found." });
    }

    // Respond with success message
    res.status(200).json({
      message: "Note successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteNote,
};
