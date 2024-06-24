const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbConfig = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Database Connection
dbConfig();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
