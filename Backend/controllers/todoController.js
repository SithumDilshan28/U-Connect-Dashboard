const Payment = require("../models/Payment.model");
const Todo = require("../models/todo.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Add Payment Controller
const addTodo = async (req, res) => {
  try {
    const { title, description, tag, priority, date, time } = req.body;

    // Validate request body data
    if (!title || !description || !date || !time) {
      return res
        .status(400)
        .json({ message: "Title, description, date, and time are required." });
    }

    const userId = req.user.id;

    // Create new Todo record
    const todo = new Todo({
      title,
      description,
      tag,
      priority,
      status: "",
      date,
      time,
      userId,
    });

    // Save Todo to the database
    const savedTodo = await todo.save();

    // Respond with success message
    res.status(201).json({
      message: "Task successfully added",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding the To-Do",
      error: error.message,
    });
  }
};

//Get All Payments
const getAllTodo = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user contains the logged-in user's data

    // Fetch all todos for the logged-in user
    const todos = await Todo.find({ userId }).populate(
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

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params; // Task ID from the URL
    const { status } = req.body; // New status from the request body

    // Validate the status value
    if (
      status !== "trash" &&
      status !== "important" &&
      status !== "complete" &&
      status !== ""
    ) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    // If status is an empty string, clear the value but keep the field
    const updateData = { status: status === "" ? "" : status };

    // Find the task by ID and update the status (or clear the value)
    const updatedTask = await Todo.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Respond with success message and updated task
    res.status(200).json({
      message: "Task status updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params; // To-Do ID from the URL

    // Find and delete the task by ID
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "To-Do not found." });
    }

    // Respond with success message
    res.status(200).json({
      message: "To-Do successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tag, priority, date, time } = req.body;

    // Validate request body data
    if (!title || !description || !date || !time) {
      return res
        .status(400)
        .json({ message: "Title, description, date, and time are required." });
    }

    // Find the Todo item by ID and ensure it belongs to the user
    const todo = await Todo.findOne({ _id: id, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: "To-Do item not found." });
    }

    // Update the Todo item with new data
    todo.title = title;
    todo.description = description;
    todo.tag = tag || todo.tag;
    todo.priority = priority || todo.priority;
    todo.date = date;
    todo.time = time;
    todo.status = "";

    // Save the updated Todo item to the database
    const updatedTodo = await todo.save();

    // Respond with success message
    res.status(200).json({
      message: "Task successfully updated",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the To-Do",
      error: error.message,
    });
  }
};

module.exports = {
  addTodo,
  getAllTodo,
  updateTaskStatus,
  deleteTodo,
  updateTodo,
};
