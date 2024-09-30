const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  addPayment,
  getAllPayments,
  getTotalSalesByPackage,
  getMonthlyPayments,
  getDailyPayments,
  checkUserPayment,
} = require("../controllers/paymentController");

//REGISTER USER
router.post("/addPayment", protect, addPayment);

// GET ALL USERS
router.get("/getAllPayments", protect, getAllPayments);

router.get("/getTotalSalesByPackage", protect, getTotalSalesByPackage);

router.get("/getMonthlyPayments", protect, getMonthlyPayments);

router.get("/getDailyPayments", protect, getDailyPayments);

router.get("/checkUserPayment", protect, checkUserPayment);

module.exports = router;
