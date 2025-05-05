// Import necessary modules
const express = require("express");
const passport = require("passport"); // Don't forget to require passport if you're using it
const router = express.Router();

// Route for successful login
router.get("/login/success", (req, res) => {
  // If the user is authenticated (exists in req.user)
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully logged in",
      user: req.user, // Send back the user info
    });
  } else {
    // If not authenticated
    res.status(401).json({
      error: true,
      message: "Not logged in",
    });
  }
});

// Route for failed login
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failed",
  });
});

// Google OAuth callback route (called after Google authentication)
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/login/success", // Redirect here on success
    failureRedirect: "/auth/login/failed", // Redirect here on failure
  })
);

// Route to initiate Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Ask permission for profile and email
  })
);

// Logout route
router.get("/logout", (req, res) => {
  // Ends the user session
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: true, message: "Logout failed" });
    }
    res.redirect(process.env.CLIENT_URL); // Redirect to your client app
  });
});

// Export the router so it can be used in other parts of the app
module.exports = router;
