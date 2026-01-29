const mysql = require('mysql2/promise');
require('dotenv').config();

async function resetDatabase() {
  let connection;
  
  try {
    console.log('🔧 Resetting database...\n');

    // Connect without database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      multipleStatements: true
    });

    console.log('✅ Connected to MySQL');

    // Drop database if exists
    console.log('🗑️  Dropping old database if exists...');
    await connection.query('DROP DATABASE IF EXISTS car_rental');
    
    // Create fresh database
    console.log('📝 Creating fresh database...');
    await connection.query('CREATE DATABASE car_rental');
    await connection.query('USE car_rental');

    // Create tables
    console.log('📊 Creating tables...');
    
    // Admins table
    await connection.query(`
      CREATE TABLE admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Users table
    await connection.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        address VARCHAR(150),
        city VARCHAR(50),
        postal_code VARCHAR(20),
        license_number VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Vehicles table
    await connection.query(`
      CREATE TABLE vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        transmission VARCHAR(50),
        fuel VARCHAR(50),
        image VARCHAR(255),
        description TEXT,
        available BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Bookings table
    await connection.query(`
      CREATE TABLE bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        booking_reference VARCHAR(50) UNIQUE NOT NULL,
        user_id INT NOT NULL,
        vehicle_id INT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
      )
    `);

    // Contact messages table
    await connection.query(`
      CREATE TABLE contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(30),
        subject VARCHAR(200),
        message TEXT NOT NULL,
        status ENUM('new', 'read', 'replied') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ All tables created successfully');

    // Insert sample vehicles
    console.log('🚗 Inserting sample vehicles...');
    await connection.query(`
      INSERT INTO vehicles (name, type, price, transmission, fuel, image, description) VALUES
      ('Luxury SUV', 'SUV', 5000.00, 'Automatic', 'Petrol', 'assets/images/suv.png', 'A spacious and powerful SUV, perfect for family trips and off-road adventures. Features premium leather seats and advanced safety systems.'),
      ('Compact City Car', 'Hatchback', 4000.00, 'Manual', 'Electric', 'assets/images/compact.png', 'Efficient and easy to park, this compact car is ideal for navigating busy city streets. Eco-friendly and cost-effective.'),
      ('Executive Sedan', 'Sedan', 6500.00, 'Automatic', 'Hybrid', 'assets/images/interior.jpg', 'Elegant and comfortable, the executive sedan is perfect for business trips and long-distance travel. Smooth handling and great fuel economy.'),
      ('Family Minivan', 'Minivan', 7500.00, 'Automatic', 'Diesel', 'assets/images/fleet-banner.jpg', 'Plenty of room for everyone! This minivan offers comfortable seating for up to 7 passengers and ample luggage space.')
    `);

    console.log('✅ Sample vehicles inserted');

    console.log('\n🎉 Database Reset Complete!');
    console.log('\nDatabase: car_rental');
    console.log('Tables created:');
    console.log('  ✅ admins');
    console.log('  ✅ users');
    console.log('  ✅ vehicles (4 sample cars)');
    console.log('  ✅ bookings');
    console.log('  ✅ contact_messages');

    console.log('\n📝 Next step: Run "node setup-admin.js" to create admin user');

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Fix: Check your MySQL credentials in the .env file');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Fix: Make sure MySQL server is running');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

resetDatabase();
