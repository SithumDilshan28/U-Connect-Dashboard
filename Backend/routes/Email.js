const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const { addEmail, getAllNotes } = require("../controllers/emailController");

//REGISTER USER
router.post("/addEmail", addEmail);

// GET ALL USERS
router.get("/getAllNotes", protect, getAllNotes);

module.exports = router;
