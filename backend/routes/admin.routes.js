const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

// POST - Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find admin by email
    const [admins] = await db.promise().query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const admin = admins[0];

    // Compare password
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        email: admin.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
});

// POST - Register new admin (protected - only for initial setup)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Check if admin already exists
    const [existing] = await db.promise().query(
      "SELECT id FROM admins WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin
    const [result] = await db.promise().query(
      "INSERT INTO admins (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      adminId: result.insertId
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
});

module.exports = router;
