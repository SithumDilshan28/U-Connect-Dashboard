const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
});

const GoalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [TaskSchema],
});

module.exports = mongoose.model("Goal", GoalSchema);
