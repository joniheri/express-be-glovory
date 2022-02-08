const express = require("express");

const router = express.Router();

// TodosRouter
const {
  getTodos,
  getTodoById,
  getTodoByTitle,
} = require("../controllers/controllerExp/Todo");

router.get("/todos", getTodos);
router.get("/todo-by-id/:id", getTodoById);
router.get("/todo-by-title/:title", getTodoByTitle);
// EndTodosRouter

module.exports = router;
