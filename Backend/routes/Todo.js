const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  addTodo,
  getAllTodo,
  updateTaskStatus,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

//REGISTER USER
router.post("/addTodo", protect, addTodo);

// GET ALL USERS
router.get("/getAllTodo", protect, getAllTodo);

// GET ALL USERS
router.put("/updateTaskStatus/:id", protect, updateTaskStatus);

router.put("/updateTodo/:id", protect, updateTodo);

// GET ALL USERS
router.delete("/deleteTodo/:id", protect, deleteTodo);

module.exports = router;
