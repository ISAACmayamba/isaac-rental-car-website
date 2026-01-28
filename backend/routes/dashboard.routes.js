const express = require("express");
const router = express.Router();

// Dashboard stats (example)
router.get("/", (req, res) => {
  res.json({
    success: true,
    stats: {
      totalBookings: 0,
      totalVehicles: 0,
      totalUsers: 0
    }
  });
});

module.exports = router;
