const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  addPayment,
  getAllPayments,
} = require("../controllers/paymentController");

//REGISTER USER
router.post("/addPayment", protect, addPayment);

// GET ALL USERS
router.get("/getAllPayments", protect, getAllPayments);

module.exports = router;
