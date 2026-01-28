const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
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
        endDate,
        totalPrice
    } = req.body;

    const userSql = `
        INSERT INTO users 
        (full_name, email, phone, address, city, postal_code, license_number)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        userSql,
        [customerName, customerEmail, customerPhone, address, city, postalCode, licenseNumber],
        (err, userResult) => {
            if (err) return res.status(500).json(err);

            const bookingSql = `
                INSERT INTO bookings
                (booking_reference, user_id, vehicle_id, start_date, end_date, total_price)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(
                bookingSql,
                [bookingReference, userResult.insertId, carId, startDate, endDate, totalPrice],
                (err) => {
                    if (err) return res.status(500).json(err);
                    res.json({ message: "Booking saved successfully" });
                }
            );
        }
    );
});

module.exports = router;
