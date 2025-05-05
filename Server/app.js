// Load environment variables from .env file
require("dotenv").config();

// Core dependencies
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const logger = require("morgan");
const passportSetup = require("./passport");
// Route handlers
const UserRouter = require("./routes/userRoutes");

const app = express();

// Middleware for logging HTTP requests (dev-friendly format)
app.use(logger("dev"));

// Configure session using cookie-session
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"], // You can store this in .env for better security
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Initialize passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS to allow requests from the frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow sending cookies across domains
  })
);

// User-related API routes
app.use("/users", UserRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// General error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

module.exports = app;
