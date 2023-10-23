const { Sequelize } = require("sequelize");

const express = require("express");
const authRoutes = require("./routes/authRoutes/authRoutes");
const taskRoutes = require("./routes/taskRoutes/taskRoutes");
const sequelize = require("./db/db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connected to the database and synchronized models.");

    app.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  })
  .catch((error) => {
    console.error("Error synchronizing models with the database:", error);
  });
