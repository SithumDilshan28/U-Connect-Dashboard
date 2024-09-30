const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  addGoal,
  getAllGoals,
  updateGoal,
  addTaskToGoal,
  deleteTask,
  updateTaskInGoal,
  deleteGoal,
} = require("../controllers/goalController");

//REGISTER USER
router.post("/addGoal", protect, addGoal);

router.post("/addTaskToGoal/:id", protect, addTaskToGoal);

// GET ALL USERS
router.get("/getAllGoals", protect, getAllGoals);

// GET ALL USERS
router.patch("/updateGoal/:id", protect, updateGoal);

router.put("/updateTaskInGoal/:goalId/task/:taskId", protect, updateTaskInGoal);

router.delete("/goal/:goalId/task/:taskId", deleteTask);

router.delete("/deleteGoal/:goalId", deleteGoal);

module.exports = router;
