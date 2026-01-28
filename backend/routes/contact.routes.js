const express = require("express");
const router = express.Router();

// POST contact message
router.post("/", (req, res) => {
  const contactData = req.body;

  console.log("Contact message:", contactData);

  res.status(201).json({
    success: true,
    message: "Message received successfully"
  });
});

module.exports = router;
