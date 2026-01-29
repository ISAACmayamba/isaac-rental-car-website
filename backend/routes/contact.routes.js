const express = require("express");
const router = express.Router();
const db = require("../db");

// POST - Submit contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Insert contact message
    const query = `
      INSERT INTO contact_messages (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.promise().query(query, [
      name,
      email,
      phone || null,
      subject,
      message
    ]);

    res.status(201).json({
      success: true,
      message: "Message sent successfully! We will get back to you soon.",
      messageId: result.insertId
    });

  } catch (error) {
    console.error("Contact message error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message
    });
  }
});

// GET - Get all contact messages (admin only)
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT * FROM contact_messages
      ORDER BY created_at DESC
    `;

    const [messages] = await db.promise().query(query);

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

// PATCH - Update message status
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const query = "UPDATE contact_messages SET status = ? WHERE id = ?";
    await db.promise().query(query, [status, id]);

    res.json({
      success: true,
      message: "Status updated successfully"
    });

  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message
    });
  }
});

module.exports = router;
