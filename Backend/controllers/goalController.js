const Goal = require("../models/Goal.model");

// Create a new goal
const addGoal = async (req, res) => {
  try {
    const { title, tasks } = req.body;

    const id = req.user.id;

    // Validate input
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Create a new goal
    const newGoal = new Goal({
      title,
      userId: id,
      tasks, // tasks should follow the structure in TaskSchema
    });

    // Save goal to the database
    const savedGoal = await newGoal.save();

    return res.status(201).json({
      message: "Goal created successfully",
      data: savedGoal,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating goal",
      error: error.message,
    });
  }
};

// Get all goals
const getAllGoals = async (req, res) => {
  try {
    const userId = req.user.id;

    const goals = await Goal.find({ userId: userId });

    return res.status(200).json(goals);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching goals",
      error: error.message,
    });
  }
};

// Get goal by ID
const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    return res.status(200).json(goal);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching goal",
      error: error.message,
    });
  }
};

// Update a goal
const updateGoal = async (req, res) => {
  try {
    const { title, tasks } = req.body;

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { title, tasks },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    return res.status(200).json({
      message: "Goal updated successfully",
      data: updatedGoal,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating goal",
      error: error.message,
    });
  }
};

// Controller to add a task to an existing goal
const addTaskToGoal = async (req, res) => {
  try {
    const { id } = req.params; // Goal ID from the URL
    const { title, description, date, tags } = req.body; // Task details from the request body

    // Validate task data
    if (!title || !description || !date) {
      return res.status(400).json({
        message: "Title, description, and date are required for the task.",
      });
    }

    // Find the goal by ID and add the new task
    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(404).json({ error: "Goal not found." });
    }

    // Add the new task to the goal's tasks array
    const newTask = { title, description, date, tags };
    goal.tasks.push(newTask);

    // Save the updated goal
    await goal.save();

    // Return success response with updated goal
    res.status(200).json({
      message: "Task added successfully to the goal",
      goal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { goalId, taskId } = req.params;

    // Find the goal by ID and remove the task by task ID
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    // Find the task within the goal and remove it
    const taskIndex = goal.tasks.findIndex(
      (task) => task._id.toString() === taskId
    );
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Remove the task from the tasks array
    goal.tasks.splice(taskIndex, 1);

    // Save the updated goal
    await goal.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the task" });
  }
};

const updateTaskInGoal = async (req, res) => {
  try {
    const { goalId, taskId } = req.params; // Get goalId and taskId from URL params
    const { title, description, date, tags } = req.body;

    // Validate input
    if (!title || !description || !date) {
      return res
        .status(400)
        .json({ message: "Title, description, and date are required" });
    }

    // Find the Goal by ID
    const goal = await Goal.findOne({ _id: goalId });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    // Find the task within the Goal's tasks array
    const taskIndex = goal.tasks.findIndex(
      (task) => task._id.toString() === taskId
    );
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the task fields
    goal.tasks[taskIndex] = {
      ...goal.tasks[taskIndex]._doc, // Spread existing task data
      title: title || goal.tasks[taskIndex].title,
      description: description || goal.tasks[taskIndex].description,
      date: date || goal.tasks[taskIndex].date,
      tags: tags !== undefined ? tags : goal.tasks[taskIndex].tags,
    };

    // Save the updated Goal document
    const updatedGoal = await goal.save();

    return res.status(200).json({
      message: "Task updated successfully",
      data: updatedGoal,
    });
  } catch (error) {
    console.error("Error updating task:", error.message);
    return res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const { goalId } = req.params; // Get goal ID from URL params

    // Find and delete the Goal by ID
    const deletedGoal = await Goal.findByIdAndDelete(goalId);

    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    return res.status(200).json({
      message: "Goal deleted successfully",
      data: deletedGoal,
    });
  } catch (error) {
    console.error("Error deleting goal:", error.message);
    return res.status(500).json({
      message: "Error deleting goal",
      error: error.message,
    });
  }
};

module.exports = {
  addGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  addTaskToGoal,
  deleteTask,
  updateTaskInGoal,
  deleteGoal,
};
