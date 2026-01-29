# EasyRent - Full Stack Car Rental Website

A modern, responsive, and fully functional car rental website built with HTML, CSS, JavaScript (frontend) and Node.js, Express, MySQL (backend).

## 🚀 Features

### Frontend
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Dynamic Car Listings**: Cars loaded from database via API
- **Interactive Booking System**: Complete booking flow with validation
- **Contact Form**: Integrated with backend API
- **Admin Dashboard**: Manage bookings and view statistics
- **Professional UI**: Clean, modern design with smooth animations

### Backend
- **RESTful API**: Complete API for all operations
- **MySQL Database**: Robust data storage
- **JWT Authentication**: Secure admin authentication
- **Password Hashing**: Bcrypt for secure password storage
- **CORS Enabled**: Cross-origin resource sharing
- **Error Handling**: Comprehensive error handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL Server** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/)
- **npm** (comes with Node.js)

## 🛠️ Installation & Setup

### Step 1: Clone or Download the Project

```bash
cd isaac-rental-car-website
```

### Step 2: Backend Setup

#### 2.1 Install Dependencies

```bash
cd backend
npm install
```

#### 2.2 Configure Environment Variables

The `.env` file is already created. Update it with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password_here
DB_NAME=car_rental
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=3000
```

#### 2.3 Create Database and Tables

**Option 1: Using MySQL Command Line**

```bash
# Login to MySQL
mysql -u root -p

# Run the database script
source database.sql

# Exit MySQL
exit
```

**Option 2: Using MySQL Workbench or phpMyAdmin**

1. Open MySQL Workbench or phpMyAdmin
2. Create a new SQL tab
3. Copy and paste the contents of `backend/database.sql`
4. Execute the script

#### 2.4 Setup Admin User

Run the setup script to create the admin user with proper password hashing:

```bash
node setup-admin.js
```

This will create an admin user with:
- **Email**: admin@easyrent.com
- **Password**: admin123

⚠️ **Important**: Change this password after first login!

#### 2.5 Start the Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# OR Production mode
npm start
```

You should see:
```
✅ Server running on http://localhost:3000
MySQL connected
```

### Step 3: Frontend Setup

The frontend is static HTML/CSS/JavaScript, so no build process is needed!

#### 3.1 Open the Website

**Option 1: Using Live Server (Recommended)**

If you have VS Code with Live Server extension:
1. Right-click on `index.html`
2. Select "Open with Live Server"

**Option 2: Using Python HTTP Server**

```bash
# From the project root directory
python -m http.server 8000

# OR with Python 3
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

**Option 3: Using Node.js HTTP Server**

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run from project root
http-server -p 8000
```

Then open: `http://localhost:8000`

## 🎯 Usage

### For Customers

1. **Browse Cars**: Visit the homepage or Fleet page
2. **View Details**: Click on any car to see detailed information
3. **Make Booking**: 
   - Click "Rent Now"
   - Fill in the booking form
   - Submit to create a booking
4. **Contact**: Use the contact form to send messages

### For Admins

1. **Login**: Navigate to `http://localhost:8000/admin.html`
2. **Credentials**:
   - Email: admin@easyrent.com
   - Password: admin123
3. **Dashboard**: View statistics and manage bookings
4. **Logout**: Click logout button when done

## 📁 Project Structure

```
isaac-rental-car-website/
│
├── backend/                    # Backend API
│   ├── routes/                # API route handlers
│   │   ├── admin.routes.js
│   │   ├── booking.routes.js
│   │   ├── contact.routes.js
│   │   ├── dashboard.routes.js
│   │   └── vehicle.routes.js
│   ├── Middleware/            # Custom middleware
│   │   └── auth.js           # JWT authentication
│   ├── server.js             # Main server file
│   ├── db.js                 # Database connection
│   ├── database.sql          # Database schema
│   ├── setup-admin.js        # Admin setup script
│   ├── package.json          # Dependencies
│   ├── .env                  # Environment variables
│   └── README.md             # Backend documentation
│
├── css/
│   └── style.css             # All styling
│
├── js/
│   ├── main.js               # Main functionality
│   ├── booking.js            # Booking page logic
│   └── data.js               # Car data (optional)
│
├── assets/
│   └── images/               # Car images
│
├── index.html                # Home page
├── cars.html                 # Fleet listing
├── booking.html              # Booking page
├── contact.html              # Contact page
├── admin.html                # Admin login
├── dashboard.html            # Admin dashboard
├── admin.js                  # Admin login logic
├── dashboard.js              # Dashboard logic
└── README.md                 # This file
```

## 🔌 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vehicles` | Get all vehicles |
| GET | `/api/vehicles/:id` | Get vehicle by ID |
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings/:reference` | Get booking by reference |
| POST | `/api/contact` | Submit contact message |

### Admin Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/dashboard/stats` | Dashboard statistics |
| GET | `/api/dashboard/bookings` | All bookings |
| GET | `/api/dashboard/messages` | Contact messages |
| PATCH | `/api/dashboard/bookings/:id/status` | Update booking status |

## 🗄️ Database Schema

### Tables

1. **admins** - Admin users with hashed passwords
2. **users** - Customer information
3. **vehicles** - Car inventory with details
4. **bookings** - Rental bookings with status
5. **contact_messages** - Contact form submissions

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ SQL injection prevention (parameterized queries)
- ✅ Input validation
- ✅ CORS configuration
- ✅ Error handling

## 🧪 Testing

### Test the Backend

```bash
# Check if server is running
curl http://localhost:3000

# Get all vehicles
curl http://localhost:3000/api/vehicles

# Admin login
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@easyrent.com","password":"admin123"}'
```

### Test the Frontend

1. Open the website in a browser
2. Navigate through all pages
3. Try making a booking
4. Submit a contact form
5. Login to admin dashboard

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Database connection error
- **Solution**: Check MySQL is running and credentials in `.env` are correct

**Problem**: Port 3000 already in use
- **Solution**: Change PORT in `.env` or kill the process using port 3000

**Problem**: Admin login fails
- **Solution**: Run `node setup-admin.js` to reset admin credentials

### Frontend Issues

**Problem**: API calls fail (CORS errors)
- **Solution**: Ensure backend server is running on port 3000

**Problem**: Images not loading
- **Solution**: Check that image files exist in `assets/images/`

**Problem**: Booking doesn't work
- **Solution**: Check browser console for errors and ensure backend is running

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Backend Deployment

1. Choose a hosting provider (Heroku, DigitalOcean, AWS, etc.)
2. Set up MySQL database
3. Configure environment variables
4. Deploy backend code
5. Run database migrations

### Frontend Deployment

1. Choose a hosting provider (Netlify, Vercel, GitHub Pages, etc.)
2. Update API URLs to point to deployed backend
3. Deploy static files

## 🔄 Future Enhancements

- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] User authentication for customers
- [ ] Booking history for customers
- [ ] Advanced search and filters
- [ ] Reviews and ratings
- [ ] Multi-language support
- [ ] Real-time availability checking
- [ ] Mobile app

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

EasyRent Development Team

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, email info@easyrent.co.zm or call 0974387444

---

**Version**: 2.0.0  
**Last Updated**: January 2024  
**Status**: Production Ready ✅
