const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Error handling for missing directories or routes
app.use((req, res, next) => {
  res.status(404).send('Directory or route not found. Check your paths.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});