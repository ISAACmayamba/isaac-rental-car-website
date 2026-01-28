const express = require("express");
const router = express.Router();

// POST booking
router.post("/", (req, res) => {
  const bookingData = req.body;

  console.log("New booking:", bookingData);

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: bookingData
  });
});

// GET all bookings (test)
router.get("/", (req, res) => {
  res.json({
    success: true,
    bookings: []
  });
});

module.exports = router;
