const express = require("express");
const https = require("https");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes/authRoutes");
const taskRoutes = require("./routes/taskRoutes/taskRoutes");
const sequelize = require("./db/db");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const httpsOptions = {
  key: fs.readFileSync("/ramira/ssl/private.key"),
  cert: fs.readFileSync("/ramira/ssl/public.crt"),
};
const httpsServer = https.createServer(httpsOptions, app);

sequelize
  .sync({})
  .then(() => {
    console.log("Connected to the database and synchronized models.");

    httpsServer.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  })
  .catch((error) => {
    console.error("Error synchronizing models with the database:", error);
  });
