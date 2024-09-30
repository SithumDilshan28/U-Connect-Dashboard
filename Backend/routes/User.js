const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  getRole,
  registerUser,
  registerExpert,
  login,
  getAllUsers,
  getAllExperts,
  deleteUser,
  updateUser,
  updateExpert,
  getNewToken,
  downProfileSummery,
  getCurrentUser,
  viewProfile,
  deleteAccount,
  googleLogin,
} = require("../controllers/userController");

// GET ROLE
router.get("/getRole", protect, getRole);

//REGISTER USER
router.post("/register", registerUser);

//REGISTER EXPERT
router.post("/registerExpert", registerExpert);

// GET CURRENT USER
router.get("/getCurrentUser", protect, getCurrentUser);

// GET ONE USER
router.get("/viewProfile/:id", protect, viewProfile);

// GET ALL USERS
router.get("/getAllUsers", protect, getAllUsers);

// GET ALL EXPERTS
router.get("/getAllExperts", protect, getAllExperts);

// UPDATE USER DETAILS
router.put("/updateUser", protect, updateUser);

// UPDATE EXPERT DETAILS
router.put("/updateExpert/:id", updateExpert);

// DELETE USER
router.delete("/deleteUser/:id", deleteUser);

router.delete("/deleteAccount", protect, deleteAccount);

//LOGIN
router.post("/login", login);

router.post("/auth/google", googleLogin);

//GET NEW TOKEN
router.post("/token/:id", getNewToken);

// DOWNLOAD A SUMMERY REPORT OF THE USER
router.get("/downProfileSummery/:id", downProfileSummery);

module.exports = router;
