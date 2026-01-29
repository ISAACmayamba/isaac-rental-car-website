const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
let authToken = '';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(name, method, url, data = null, headers = {}) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers,
      data
    };

    const response = await axios(config);
    log(`✅ ${name}`, 'green');
    return response.data;
  } catch (error) {
    log(`❌ ${name}`, 'red');
    if (error.response) {
      log(`   Status: ${error.response.status}`, 'red');
      log(`   Message: ${error.response.data.message || 'Unknown error'}`, 'red');
    } else {
      log(`   Error: ${error.message}`, 'red');
    }
    return null;
  }
}

async function runTests() {
  log('\n🧪 Starting API Tests...\n', 'blue');

  // Test 1: Server Health
  log('📋 Testing Server Health...', 'yellow');
  await testEndpoint('Server is running', 'GET', '/');

  // Test 2: Get Vehicles
  log('\n📋 Testing Vehicle Endpoints...', 'yellow');
  const vehicles = await testEndpoint('Get all vehicles', 'GET', '/api/vehicles');
  
  if (vehicles && vehicles.vehicles && vehicles.vehicles.length > 0) {
    const vehicleId = vehicles.vehicles[0].id;
    await testEndpoint('Get vehicle by ID', 'GET', `/api/vehicles/${vehicleId}`);
  }

  // Test 3: Admin Login
  log('\n📋 Testing Admin Authentication...', 'yellow');
  const loginData = {
    email: 'admin@easyrent.com',
    password: 'admin123'
  };
  
  const loginResponse = await testEndpoint(
    'Admin login',
    'POST',
    '/api/admin/login',
    loginData
  );

  if (loginResponse && loginResponse.token) {
    authToken = loginResponse.token;
    log(`   Token received: ${authToken.substring(0, 20)}...`, 'green');
  }

  // Test 4: Dashboard Stats (Protected)
  if (authToken) {
    log('\n📋 Testing Protected Dashboard Endpoints...', 'yellow');
    await testEndpoint(
      'Get dashboard stats',
      'GET',
      '/api/dashboard/stats',
      null,
      { Authorization: `Bearer ${authToken}` }
    );

    await testEndpoint(
      'Get dashboard bookings',
      'GET',
      '/api/dashboard/bookings',
      null,
      { Authorization: `Bearer ${authToken}` }
    );

    await testEndpoint(
      'Get contact messages',
      'GET',
      '/api/dashboard/messages',
      null,
      { Authorization: `Bearer ${authToken}` }
    );
  }

  // Test 5: Create Booking
  log('\n📋 Testing Booking Endpoints...', 'yellow');
  const bookingData = {
    bookingReference: `BK-TEST-${Date.now()}`,
    carId: 1,
    customerName: 'Test Customer',
    customerEmail: 'test@example.com',
    customerPhone: '1234567890',
    address: '123 Test St',
    city: 'Test City',
    postalCode: '12345',
    licenseNumber: 'TEST123',
    startDate: '2024-02-01',
    endDate: '2024-02-05'
  };

  const booking = await testEndpoint(
    'Create booking',
    'POST',
    '/api/bookings',
    bookingData
  );

  if (booking && booking.data && booking.data.bookingReference) {
    await testEndpoint(
      'Get booking by reference',
      'GET',
      `/api/bookings/${booking.data.bookingReference}`
    );
  }

  // Test 6: Contact Form
  log('\n📋 Testing Contact Endpoints...', 'yellow');
  const contactData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    subject: 'Test Message',
    message: 'This is a test message from the API test script.'
  };

  await testEndpoint(
    'Submit contact message',
    'POST',
    '/api/contact',
    contactData
  );

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  log('🎉 API Tests Completed!', 'green');
  log('='.repeat(50) + '\n', 'blue');
}

// Run tests
runTests().catch(error => {
  log('\n❌ Test suite failed:', 'red');
  log(error.message, 'red');
  process.exit(1);
});
