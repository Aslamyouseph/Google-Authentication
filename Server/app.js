require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const logger = require("morgan");
require("./passport"); // This loads and configures passport
const UserRouter = require("./routes/userRoutes");

const app = express();

// Logger
app.use(logger("dev"));

// Cookie Session
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY], // .env: SESSION_KEY=your_key_here
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/users", UserRouter);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// General Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

module.exports = app;
