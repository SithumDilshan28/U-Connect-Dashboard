const Payment = require("../models/Payment.model");
const Note = require("../models/Note.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Add Payment Controller
const addNote = async (req, res) => {
  try {
    const { title, description, tag, date } = req.body;

    // Validate request body data
    if (!title || !description || !date) {
      return res
        .status(400)
        .json({ message: "Title, description, and date are required." });
    }

    const userId = req.user.id;

    // Create new Note record
    const note = new Note({
      title,
      description,
      tag,
      date,
      isFav: false,
      userId,
    });

    // Save Note to the database
    const savedNote = await note.save();

    // Respond with success message
    res.status(201).json({
      message: "Note successfully added",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "An error occurred while adding the Note",
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

const updateNote = async (req, res) => {
  try {
    const { id } = req.params; // Note ID from the URL
    const { isFav } = req.body; // New `isFav` status from the request body

    // Validate the `isFav` value
    if (typeof isFav !== "boolean") {
      return res.status(400).json({
        message: "Invalid value for isFav. It must be a boolean.",
      });
    }

    // Find the note by ID and update the `isFav` field
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { isFav },
      { new: true } // Return the updated document
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    // Respond with success message and updated note
    res.status(200).json({
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "An error occurred while updating the note",
      error: error.message,
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

const updateNoteDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tag, date, isFav } = req.body;

    // Validate request body data
    if (!title || !description || !date) {
      return res
        .status(400)
        .json({ message: "Title, description, and date are required." });
    }

    // Find the Note item by ID and ensure it belongs to the user
    const note = await Note.findOne({ _id: id, userId: req.user.id });
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    // Update the Note item with new data
    note.title = title;
    note.description = description;
    note.tag = tag || note.tag;
    note.date = date;
    note.isFav = isFav !== undefined ? isFav : note.isFav;

    // Save the updated Note item to the database
    const updatedNote = await note.save();

    // Respond with success message
    res.status(200).json({
      message: "Note successfully updated",
      note: updatedNote,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "An error occurred while updating the Note",
      error: error.message,
    });
  }
};

module.exports = {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
  updateNoteDetails,
};
