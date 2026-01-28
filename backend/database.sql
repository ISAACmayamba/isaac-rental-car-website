CREATE DATABASE IF NOT EXISTS car_rental;
USE car_rental;

-- USERS / CUSTOMERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(30),
    address VARCHAR(150),
    city VARCHAR(50),
    postal_code VARCHAR(20),
    license_number VARCHAR(50)
);

-- VEHICLES
CREATE TABLE vehicles (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50),
    price INT,
    image VARCHAR(255)
);

-- BOOKINGS
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_reference VARCHAR(50),
    user_id INT,
    vehicle_id INT,
    start_date DATE,
    end_date DATE,
    total_price INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- CONTACT MESSAGES
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

