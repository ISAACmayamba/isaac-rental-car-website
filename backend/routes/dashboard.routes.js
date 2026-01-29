const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require("../Middleware/auth");

// GET - Dashboard statistics (protected)
router.get("/stats", authenticateToken, async (req, res) => {
  try {
    // Get total bookings
    const [bookingsCount] = await db.promise().query(
      "SELECT COUNT(*) as total FROM bookings"
    );

    // Get total revenue
    const [revenue] = await db.promise().query(
      "SELECT SUM(total_price) as total FROM bookings WHERE status = 'confirmed' OR status = 'completed'"
    );

    // Get total vehicles
    const [vehiclesCount] = await db.promise().query(
      "SELECT COUNT(*) as total FROM vehicles"
    );

    // Get total customers
    const [customersCount] = await db.promise().query(
      "SELECT COUNT(*) as total FROM users"
    );

    // Get recent bookings
    const [recentBookings] = await db.promise().query(`
      SELECT 
        b.booking_reference,
        b.start_date,
        b.end_date,
        b.total_price,
        b.status,
        u.full_name,
        v.name as vehicle_name
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id
      ORDER BY b.created_at DESC
      LIMIT 5
    `);

    res.json({
      success: true,
      stats: {
        totalBookings: bookingsCount[0].total,
        totalRevenue: revenue[0].total || 0,
        totalVehicles: vehiclesCount[0].total,
        totalCustomers: customersCount[0].total,
        recentBookings
      }
    });

  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message
    });
  }
});

// GET - All bookings for dashboard (protected)
router.get("/bookings", authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT 
        b.id,
        b.booking_reference,
        b.start_date,
        b.end_date,
        b.total_price,
        b.status,
        b.created_at,
        u.full_name,
        u.email,
        u.phone,
        v.name as car_name,
        v.type as car_type
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id
      ORDER BY b.created_at DESC
    `;

    const [bookings] = await db.promise().query(query);

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });

  } catch (error) {
    console.error("Get dashboard bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message
    });
  }
});

// GET - All contact messages (protected)
router.get("/messages", authenticateToken, async (req, res) => {
  try {
    const [messages] = await db.promise().query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      count: messages.length,
      messages
    });

  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error: error.message
    });
  }
});

// PATCH - Update booking status (protected)
router.patch("/bookings/:id/status", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    await db.promise().query(
      "UPDATE bookings SET status = ? WHERE id = ?",
      [status, id]
    );

    res.json({
      success: true,
      message: "Booking status updated successfully"
    });

  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
      error: error.message
    });
  }
});

module.exports = router;
