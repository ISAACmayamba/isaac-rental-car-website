const express = require("express");
const router = express.Router();

/**
 * POST /api/bookings
 * Save a new booking
 */
router.post("/", (req, res) => {
  const booking = req.body;

  // Basic validation
  if (
    !booking.customerName ||
    !booking.customerEmail ||
    !booking.startDate ||
    !booking.endDate
  ) {
    return res.status(400).json({
      message: "Missing required booking fields"
    });
  }

  // For now, just log the booking (later we save to MySQL)
  console.log("📦 New Booking Received:");
  console.log(booking);

  // Respond to frontend
  res.status(201).json({
    message: "Booking created successfully",
    bookingReference: booking.bookingReference
  });
});

module.exports = router;
