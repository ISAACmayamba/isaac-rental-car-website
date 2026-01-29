const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupAdmin() {
  let connection;
  
  try {
    console.log('🔧 Setting up admin user...\n');

    // Connect to database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });

    console.log('✅ Connected to database');

    // Hash the password
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('✅ Password hashed');

    // Check if admin exists
    const [existing] = await connection.query(
      'SELECT id FROM admins WHERE email = ?',
      ['admin@easyrent.com']
    );

    if (existing.length > 0) {
      // Update existing admin
      await connection.query(
        'UPDATE admins SET password = ? WHERE email = ?',
        [hashedPassword, 'admin@easyrent.com']
      );
      console.log('✅ Admin user updated');
    } else {
      // Insert new admin
      await connection.query(
        'INSERT INTO admins (email, password) VALUES (?, ?)',
        ['admin@easyrent.com', hashedPassword]
      );
      console.log('✅ Admin user created');
    }

    console.log('\n📋 Admin Credentials:');
    console.log('   Email: admin@easyrent.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the password after first login!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupAdmin();
