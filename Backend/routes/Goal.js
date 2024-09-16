const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  addGoal,
  getAllGoals,
  updateGoal,
  deleteGoal,
  addTaskToGoal,
  deleteTask,
} = require("../controllers/goalController");

//REGISTER USER
router.post("/addGoal", protect, addGoal);

router.post("/addTaskToGoal/:id", protect, addTaskToGoal);

// GET ALL USERS
router.get("/getAllGoals", protect, getAllGoals);

// GET ALL USERS
router.patch("/updateGoal/:id", protect, updateGoal);

// GET ALL USERS
router.delete("/deleteGoal/:id", protect, deleteGoal);

router.delete("/goal/:goalId/task/:taskId", deleteTask);

module.exports = router;
