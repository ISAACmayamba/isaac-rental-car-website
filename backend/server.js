

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ROUTES
const bookingRoutes = require("./routes/booking.routes");
const contactRoutes = require("./routes/contact.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const adminRoutes = require("./routes/admin.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);

// TEST ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message
  });
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

