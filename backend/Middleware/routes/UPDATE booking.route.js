const overlapQuery = `
  SELECT * FROM bookings
  WHERE vehicle_id = ?
  AND (start_date <= ? AND end_date >= ?)
`;

db.query(overlapQuery, [carId, endDate, startDate], (err, results) => {
  if (results.length > 0) {
    return res.status(400).json({ message: "Car not available" });
  }
});
