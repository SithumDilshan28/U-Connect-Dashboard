const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  createFeedback,
  getAllFeedbacks,
} = require("../controllers/feedbackController");

//REGISTER USER
router.post("/createFeedback", protect, createFeedback);

// GET ALL USERS
router.get("/getAllFeedbacks", protect, getAllFeedbacks);

module.exports = router;
