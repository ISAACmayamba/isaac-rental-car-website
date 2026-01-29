# 🚀 START HERE - EasyRent Setup

## Quick Commands to Get Started

### 1️⃣ Install Backend Dependencies
```bash
cd backend
npm install
```

### 2️⃣ Configure Database
Edit `backend/.env` and set your MySQL password:
```env
DB_PASS=your_mysql_password
```

### 3️⃣ Create Database
```bash
mysql -u root -p < database.sql
```
(Enter your MySQL password when prompted)

### 4️⃣ Setup Admin User
```bash
node setup-admin.js
```

### 5️⃣ Start Backend Server
```bash
npm run dev
```
Keep this terminal open!

### 6️⃣ Start Frontend (New Terminal)
```bash
cd ..
python -m http.server 8000
```

### 7️⃣ Open Browser
- Customer Site: http://localhost:8000
- Admin Panel: http://localhost:8000/admin.html
  - Email: admin@easyrent.com
  - Password: admin123

## 📚 Documentation

- **QUICKSTART.md** - Detailed 5-minute setup guide
- **README.md** - Complete documentation
- **SETUP-COMPLETE.md** - Feature checklist
- **backend/README.md** - API documentation

## ✅ Verify Setup

Run the test suite:
```bash
cd backend
npm test
```

## 🎉 That's It!

Your full-stack car rental website is ready!

Need help? Check QUICKSTART.md for troubleshooting.
