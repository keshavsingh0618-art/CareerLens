
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const adminRoutes = require("./routes/adminRoutes");
const questionRoutes = require("./routes/questionRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("CareerLens API is running 🚀");
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    server: "running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
