const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
const { taskController } = require("./controller/taskController");

router.post("/createTask", taskController.createTask);
router.put("/updateTask/:taskId", taskController.updateTask);

router.get("/leader/:leaderId", middleware, taskController.getLeaderTasks);

router.get("/user/:userId", middleware, taskController.getUserTasks);

module.exports = router;
