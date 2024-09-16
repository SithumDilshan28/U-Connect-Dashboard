const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for the Note
const NoteSchema = new Schema({
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
  isFav: {
    type: Boolean,
    default: false, // Default value for isFav
  },
  tag: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

// Create the model from the schema
const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
