const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  addSchedule,
  getAllSchedules,
  getExpertSchedules,
  getUserSchedules,
} = require("../controllers/AppointmentSchedule");

//REGISTER USER
router.post("/addSchedule", protect, addSchedule);

// GET ALL USERS
router.get("/getAllSchedules", protect, getAllSchedules);

router.get("/getExpertSchedules", protect, getExpertSchedules);

router.get("/getUserSchedules", protect, getUserSchedules);

module.exports = router;
