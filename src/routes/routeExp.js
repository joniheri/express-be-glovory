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

// User
const {
  authRegister,
  authLogin,
} = require("../controllers/controllerExp/Auth");

router.post("/register", authRegister);
router.post("/login", authLogin);
// EndUser
module.exports = router;
