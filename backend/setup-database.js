const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🔧 Setting up database...\n');

    // First connect without database to create it
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      multipleStatements: true
    });

    console.log('✅ Connected to MySQL');

    // Read and execute the SQL file
    const sqlFile = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
    
    console.log('📝 Executing database script...');
    await connection.query(sqlFile);

    console.log('✅ Database created successfully');
    console.log('✅ Tables created successfully');
    console.log('✅ Sample data inserted');

    console.log('\n📊 Database Setup Complete!');
    console.log('\nDatabase: car_rental');
    console.log('Tables created:');
    console.log('  - admins');
    console.log('  - users');
    console.log('  - vehicles (4 sample cars)');
    console.log('  - bookings');
    console.log('  - contact_messages');

    console.log('\n⚠️  Note: Run "node setup-admin.js" next to create admin user with proper password hashing');

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

setupDatabase();
