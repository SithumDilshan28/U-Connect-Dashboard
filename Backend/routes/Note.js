const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
  updateNoteDetails,
} = require("../controllers/noteController");

//REGISTER USER
router.post("/addNote", protect, addNote);

// GET ALL USERS
router.get("/getAllNotes", protect, getAllNotes);

// GET ALL USERS
router.patch("/updateNote/:id", protect, updateNote);

router.put("/updateNoteDetails/:id", protect, updateNoteDetails);

// GET ALL USERS
router.delete("/deleteNote/:id", protect, deleteNote);

module.exports = router;
