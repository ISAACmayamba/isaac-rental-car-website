const express = require("express");
const router = express.Router();
const db = require("../db");

// GET - Get all vehicles
router.get("/", async (req, res) => {
  try {
    const { type, available } = req.query;
    
    let query = "SELECT * FROM vehicles WHERE 1=1";
    const params = [];

    // Filter by type if provided
    if (type) {
      query += " AND type = ?";
      params.push(type);
    }

    // Filter by availability if provided
    if (available !== undefined) {
      query += " AND available = ?";
      params.push(available === 'true' ? 1 : 0);
    }

    query += " ORDER BY id ASC";

    const [vehicles] = await db.promise().query(query, params);

    res.json({
      success: true,
      count: vehicles.length,
      vehicles
    });

  } catch (error) {
    console.error("Get vehicles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles",
      error: error.message
    });
  }
});

// GET - Get vehicle by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [vehicle] = await db.promise().query(
      "SELECT * FROM vehicles WHERE id = ?",
      [id]
    );

    if (vehicle.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    res.json({
      success: true,
      vehicle: vehicle[0]
    });

  } catch (error) {
    console.error("Get vehicle error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicle",
      error: error.message
    });
  }
});

// POST - Add new vehicle (admin only)
router.post("/", async (req, res) => {
  try {
    const { name, type, price, transmission, fuel, image, description } = req.body;

    if (!name || !type || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const query = `
      INSERT INTO vehicles (name, type, price, transmission, fuel, image, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.promise().query(query, [
      name,
      type,
      price,
      transmission || null,
      fuel || null,
      image || null,
      description || null
    ]);

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicleId: result.insertId
    });

  } catch (error) {
    console.error("Add vehicle error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add vehicle",
      error: error.message
    });
  }
});

// PUT - Update vehicle
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, price, transmission, fuel, image, description, available } = req.body;

    const query = `
      UPDATE vehicles 
      SET name = ?, type = ?, price = ?, transmission = ?, fuel = ?, image = ?, description = ?, available = ?
      WHERE id = ?
    `;

    await db.promise().query(query, [
      name,
      type,
      price,
      transmission,
      fuel,
      image,
      description,
      available !== undefined ? available : 1,
      id
    ]);

    res.json({
      success: true,
      message: "Vehicle updated successfully"
    });

  } catch (error) {
    console.error("Update vehicle error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update vehicle",
      error: error.message
    });
  }
});

// DELETE - Delete vehicle
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.promise().query("DELETE FROM vehicles WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Vehicle deleted successfully"
    });

  } catch (error) {
    console.error("Delete vehicle error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete vehicle",
      error: error.message
    });
  }
});

module.exports = router;
