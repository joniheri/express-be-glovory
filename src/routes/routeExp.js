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
// End TodosRouter

// Auth
const {
  authRegister,
  authLogin,
} = require("../controllers/controllerExp/Auth");

router.post("/register", authRegister);
router.post("/login", authLogin);
// End Auth

// User
const {
  getUsers,
  getUsersHasManyAddress,
} = require("../controllers/controllerExp/User");

router.get("/users", getUsers);
router.get("/users-address", getUsersHasManyAddress);
// End User

// Address
const {
  getAddress,
  getAddressBelongsToUser,
  getAddressById,
  addAddress,
} = require("../controllers/controllerExp/Address");

router.get("/address", getAddress);
router.get("/address-user", getAddressBelongsToUser);
router.get("/address-user-byid/:idParam", getAddressById);
router.post("/add-address", addAddress);
// En Address

module.exports = router;
