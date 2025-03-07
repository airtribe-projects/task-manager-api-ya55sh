const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/", userController.hello);
router.get("/tasks", userController.getTasks);
router.get("/tasks/priority/:level", userController.getTasks);
router.get("/task/:id", userController.getTaskById);
router.post("/task", userController.createTask);
router.put("/task/:id", userController.updateTask);
router.delete("/task/:id", userController.deleteTask);

module.exports = router;
