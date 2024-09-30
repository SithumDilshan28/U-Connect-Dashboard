const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteNote,
} = require("../controllers/calenderController");

//REGISTER USER
router.post("/createEvent", createEvent);

// GET ALL USERS
router.get("/getAllEvents", getAllEvents);

// GET ALL USERS
router.put("/updateEvent/:id", updateEvent);

// GET ALL USERS
router.delete("/deleteNote/:id", protect, deleteNote);

module.exports = router;
