const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const { submit, getAllNotes } = require("../controllers/contactController");

//REGISTER USER
router.post("/submit", submit);

// GET ALL USERS
router.get("/getAllNotes", protect, getAllNotes);

module.exports = router;
