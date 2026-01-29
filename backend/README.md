# EasyRent Backend API

Complete Node.js + Express + MySQL backend for the EasyRent car rental website.

## Features

- ✅ RESTful API endpoints
- ✅ MySQL database integration
- ✅ JWT authentication for admin
- ✅ Password hashing with bcrypt
- ✅ CORS enabled
- ✅ Error handling middleware
- ✅ Complete CRUD operations

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Database

1. Make sure MySQL is running on your system
2. Update the `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=car_rental
JWT_SECRET=your_super_secret_jwt_key
PORT=3000
```

### 3. Create Database and Tables

Run the SQL script to create the database and tables:

```bash
# Login to MySQL
mysql -u root -p

# Then run the database.sql file
source database.sql
```

Or manually execute the SQL commands from `database.sql` in your MySQL client.

### 4. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Public Endpoints

#### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID

#### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:reference` - Get booking by reference

#### Contact
- `POST /api/contact` - Submit contact message

### Admin Endpoints (Require Authentication)

#### Admin Authentication
- `POST /api/admin/login` - Admin login (returns JWT token)
- `POST /api/admin/register` - Register new admin

#### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/bookings` - Get all bookings
- `GET /api/dashboard/messages` - Get all contact messages
- `PATCH /api/dashboard/bookings/:id/status` - Update booking status

#### Vehicle Management
- `POST /api/vehicles` - Add new vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

## Default Admin Credentials

**Email:** admin@easyrent.com  
**Password:** admin123

⚠️ **Important:** Change these credentials in production!

## Database Schema

### Tables

1. **admins** - Admin users
2. **users** - Customers
3. **vehicles** - Car inventory
4. **bookings** - Rental bookings
5. **contact_messages** - Contact form submissions

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All endpoints return JSON responses with the following structure:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Testing the API

You can test the API using:
- Postman
- cURL
- Thunder Client (VS Code extension)
- The frontend application

### Example cURL Commands

**Get all vehicles:**
```bash
curl http://localhost:3000/api/vehicles
```

**Admin login:**
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@easyrent.com","password":"admin123"}'
```

**Create booking:**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "bookingReference": "BK-123456",
    "carId": 1,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "1234567890",
    "startDate": "2024-02-01",
    "endDate": "2024-02-05"
  }'
```

## Troubleshooting

### Common Issues

1. **Database connection error**
   - Check if MySQL is running
   - Verify credentials in `.env` file
   - Ensure database exists

2. **Port already in use**
   - Change PORT in `.env` file
   - Kill process using port 3000

3. **CORS errors**
   - CORS is enabled for all origins in development
   - Configure specific origins for production

## Production Deployment

1. Set strong JWT_SECRET in `.env`
2. Change default admin password
3. Configure CORS for specific origins
4. Use environment variables for sensitive data
5. Enable HTTPS
6. Set up proper logging
7. Use process manager (PM2)

## License

MIT License - See LICENSE file for details
