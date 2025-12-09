const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  await connectDB();
  
  app.use("/auth", require("./routes/authRoutes"));
  app.use("/tasks", require("./routes/taskRoutes"));
  
  app.listen(5000, () => console.log("Server running on 5000"));
};

startServer();
