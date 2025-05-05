const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // From your .env file
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // From your .env file
      callbackURL: "/auth/google/callback", // Redirect URL after authentication
    },
    function (accessToken, refreshToken, profile, callback) {
      // In a real app, you'd store the user info in a database here
      return callback(null, profile); // Send user profile to the session
    }
  )
);

// Serialize the user to the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize the user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});
