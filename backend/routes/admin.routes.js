const express = require("express");
const router = express.Router();

// Admin login (example)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "admin123") {
    return res.json({
      success: true,
      message: "Admin logged in"
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

module.exports = router;
