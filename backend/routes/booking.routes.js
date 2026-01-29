const express = require("express");
const router = express.Router();
const db = require("../db");

// POST - Create new booking
router.post("/", async (req, res) => {
  try {
    const {
      bookingReference,
      carId,
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      postalCode,
      licenseNumber,
      startDate,
      endDate
    } = req.body;

    // Validate required fields
    if (!bookingReference || !carId || !customerName || !customerEmail || !customerPhone || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // First, insert or get user
    const userQuery = `
      INSERT INTO users (full_name, email, phone, address, city, postal_code, license_number)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [userResult] = await db.promise().query(userQuery, [
      customerName,
      customerEmail,
      customerPhone,
      address || null,
      city || null,
      postalCode || null,
      licenseNumber || null
    ]);

    const userId = userResult.insertId;

    // Get vehicle price
    const [vehicle] = await db.promise().query(
      "SELECT price FROM vehicles WHERE id = ?",
      [carId]
    );

    if (vehicle.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    // Calculate total price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * vehicle[0].price;

    // Insert booking
    const bookingQuery = `
      INSERT INTO bookings (booking_reference, user_id, vehicle_id, start_date, end_date, total_price, status)
      VALUES (?, ?, ?, ?, ?, ?, 'confirmed')
    `;

    await db.promise().query(bookingQuery, [
      bookingReference,
      userId,
      carId,
      startDate,
      endDate,
      totalPrice
    ]);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        bookingReference,
        totalPrice,
        days
      }
    });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message
    });
  }
});

// GET - Get all bookings
router.get("/", async (req, res) => {
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
        v.name as vehicle_name,
        v.type as vehicle_type
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
    console.error("Get bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message
    });
  }
});

// GET - Get booking by reference
router.get("/:reference", async (req, res) => {
  try {
    const { reference } = req.params;

    const query = `
      SELECT 
        b.*,
        u.full_name,
        u.email,
        u.phone,
        u.address,
        u.city,
        u.postal_code,
        u.license_number,
        v.name as vehicle_name,
        v.type as vehicle_type,
        v.transmission,
        v.fuel
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id
      WHERE b.booking_reference = ?
    `;

    const [booking] = await db.promise().query(query, [reference]);

    if (booking.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      booking: booking[0]
    });

  } catch (error) {
    console.error("Get booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message
    });
  }
});

module.exports = router;
