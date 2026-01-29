CREATE DATABASE IF NOT EXISTS car_rental;
USE car_rental;

-- ADMINS TABLE
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USERS / CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    address VARCHAR(150),
    city VARCHAR(50),
    postal_code VARCHAR(20),
    license_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- VEHICLES TABLE
CREATE TABLE IF NOT EXISTS vehicles (
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
);

-- BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
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
);

-- CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
-- Password is hashed using bcrypt
INSERT INTO admins (email, password) VALUES 
('admin@easyrent.com', '$2a$10$rZ5qYXKz5qYXKz5qYXKz5.N5qYXKz5qYXKz5qYXKz5qYXKz5qYXK')
ON DUPLICATE KEY UPDATE email=email;

-- Insert sample vehicles
INSERT INTO vehicles (name, type, price, transmission, fuel, image, description) VALUES
('Luxury SUV', 'SUV', 5000.00, 'Automatic', 'Petrol', 'assets/images/suv.png', 'A spacious and powerful SUV, perfect for family trips and off-road adventures. Features premium leather seats and advanced safety systems.'),
('Compact City Car', 'Hatchback', 4000.00, 'Manual', 'Electric', 'assets/images/compact.png', 'Efficient and easy to park, this compact car is ideal for navigating busy city streets. Eco-friendly and cost-effective.'),
('Executive Sedan', 'Sedan', 6500.00, 'Automatic', 'Hybrid', 'assets/images/interior.jpg', 'Elegant and comfortable, the executive sedan is perfect for business trips and long-distance travel. Smooth handling and great fuel economy.'),
('Family Minivan', 'Minivan', 7500.00, 'Automatic', 'Diesel', 'assets/images/fleet-banner.jpg', 'Plenty of room for everyone! This minivan offers comfortable seating for up to 7 passengers and ample luggage space.');

