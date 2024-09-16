const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  addAppointment,
  getAllAppointments,
} = require("../controllers/AppointmentRequest");

//REGISTER USER
router.post("/addAppointment", protect, addAppointment);

// GET ALL USERS
router.get("/getAllAppointments", protect, getAllAppointments);

module.exports = router;
