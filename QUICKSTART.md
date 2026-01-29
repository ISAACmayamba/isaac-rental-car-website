# 🚀 Quick Start Guide - EasyRent

Get your car rental website up and running in 5 minutes!

## Prerequisites Check

✅ Node.js installed? Check with: `node --version`  
✅ MySQL installed? Check with: `mysql --version`  
✅ npm installed? Check with: `npm --version`

If any are missing, install them first!

## Step-by-Step Setup

### 1️⃣ Install Backend Dependencies (2 minutes)

```bash
cd backend
npm install
```

Wait for all packages to install...

### 2️⃣ Configure Database (1 minute)

Open `backend/.env` and update your MySQL password:

```env
DB_PASS=your_mysql_password_here
```

### 3️⃣ Create Database (1 minute)

**Windows:**
```bash
mysql -u root -p < database.sql
```

**Mac/Linux:**
```bash
mysql -u root -p < database.sql
```

Enter your MySQL password when prompted.

### 4️⃣ Setup Admin User (30 seconds)

```bash
node setup-admin.js
```

You should see:
```
✅ Admin user created
Email: admin@easyrent.com
Password: admin123
```

### 5️⃣ Start Backend Server (30 seconds)

```bash
npm run dev
```

You should see:
```
✅ Server running on http://localhost:3000
MySQL connected
```

**Keep this terminal open!**

### 6️⃣ Open Frontend (30 seconds)

Open a **NEW terminal** and run:

```bash
# Go back to project root
cd ..

# Start a simple web server
python -m http.server 8000
```

Or if you have VS Code:
- Right-click `index.html`
- Select "Open with Live Server"

### 7️⃣ Test Everything! 🎉

Open your browser and visit:

**Customer Site:**
- Homepage: `http://localhost:8000`
- Fleet: `http://localhost:8000/cars.html`
- Booking: `http://localhost:8000/booking.html`
- Contact: `http://localhost:8000/contact.html`

**Admin Panel:**
- Login: `http://localhost:8000/admin.html`
  - Email: `admin@easyrent.com`
  - Password: `admin123`
- Dashboard: `http://localhost:8000/dashboard.html`

## ✅ Verification Checklist

Test these features:

- [ ] Homepage loads correctly
- [ ] Can view car listings
- [ ] Can click "View Details" on a car
- [ ] Can submit a booking
- [ ] Can submit contact form
- [ ] Can login to admin panel
- [ ] Can view dashboard statistics
- [ ] Can see bookings in dashboard

## 🐛 Common Issues

### Issue: "Cannot connect to MySQL"
**Fix:** 
1. Make sure MySQL is running
2. Check password in `.env` file
3. Verify database was created: `mysql -u root -p -e "SHOW DATABASES;"`

### Issue: "Port 3000 already in use"
**Fix:**
1. Change PORT in `.env` to 3001
2. Update frontend API URLs to use port 3001

### Issue: "Admin login fails"
**Fix:**
```bash
cd backend
node setup-admin.js
```

### Issue: "CORS error in browser"
**Fix:**
- Make sure backend is running on port 3000
- Check browser console for exact error

## 🎯 Next Steps

1. **Change Admin Password**: Login and change from default
2. **Add More Cars**: Use the admin panel or database
3. **Customize**: Update colors, images, and content
4. **Deploy**: Follow deployment guide in README.md

## 📞 Need Help?

- Check the full README.md for detailed documentation
- Check backend/README.md for API documentation
- Review error messages in terminal
- Check browser console for frontend errors

## 🎉 Success!

If everything works, you now have a fully functional car rental website!

**What you can do:**
- Customers can browse and book cars
- Admin can manage bookings
- Contact form saves to database
- All data persists in MySQL

Enjoy your new car rental platform! 🚗💨
