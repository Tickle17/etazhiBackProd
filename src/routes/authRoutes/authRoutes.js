const express = require("express");
const { authController } = require("./controller/authController");
const middleware = require("../middleware/middleware");
const router = express.Router();

router.post("/register", authController.registration);

router.post("/login", authController.login);
router.get(
  "/authentication/:userId",
  middleware,
  authController.authentication
);
router.get("/getLeaderWorkers", authController.getLeadWorkers);
router.post("/taskWorker", authController.taskWorker);

module.exports = router;
