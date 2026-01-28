# Easyrent Website

A modern, responsive, and user-friendly car rental website built with vanilla HTML, CSS, and JavaScript.

## Overview

Easyrent is a static website designed to help customers browse available vehicles, view detailed information, and submit booking requests online. The website is optimized for both mobile and desktop devices with a clean, professional design.

## Features

### Core Features

- **Responsive Design**: Mobile-first approach with full responsiveness across all devices
- **Dynamic Car Listings**: Cars are loaded dynamically using JavaScript arrays
- **Car Details Modal**: View detailed information about each vehicle in an interactive modal
- **Booking System**: Complete booking form with date selection and price calculation
- **Form Validation**: Comprehensive client-side validation for all forms
- **Contact Form**: Easyrent contact form with validation
- **LocalStorage Integration**: Temporary storage of booking data
- **Professional UI**: Clean, modern design with smooth animations

### Pages

1. **Home Page** (`index.html`)
   - Hero section with call-to-action
   - Service overview with feature cards
   - Featured car listings
   - Quick navigation to booking

2. **Fleet Page** (`cars.html`)
   - Complete list of available vehicles
   - Filter by car type
   - Car cards with specifications
   - Modal for detailed car information

3. **Booking Page** (`booking.html`)
   - Rental summary with selected car details
   - Date selection for rental period
   - Automatic price calculation
   - Customer information form
   - Booking confirmation with reference number

4. **Contact Page** (`contact.html`)
   - Contact information (phone, email, WhatsApp)
   - Business hours and address
   - Contact form with validation
   - Social media links

## Project Structure

```
rental-car-website/
│
├── index.html                 # Home page
├── cars.html                  # Fleet listing page
├── booking.html               # Booking page
├── contact.html               # Contact page
│
├── css/
│   └── style.css              # All styling (responsive)
│
├── js/
│   ├── main.js                # Main functionality (car loading, modal, filtering)
│   ├── booking.js             # Booking page specific logic
│   └── data.js                # Car data (optional)
│
├── assets/
│   └── images/                # Car images and assets
│
└── README.md                  # This file
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Responsive design with Flexbox and Grid
- **JavaScript (Vanilla)**: No frameworks, pure JavaScript
- **Font Awesome**: Icon library (CDN)
- **Google Fonts**: Typography (optional)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for development)

### Installation

1. Clone or download the project files
2. Navigate to the project directory
3. Start a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if installed)
npx http-server
```

4. Open your browser and navigate to `http://localhost:8000`

## Usage

### Browsing Cars

1. Click on "Fleet" in the navigation menu
2. View all available cars or filter by type
3. Click "View Details" to see more information about a car
4. Click "Rent Now" to proceed to booking

### Making a Booking

1. Select a car from the fleet
2. Fill in the rental dates (start and end date)
3. Enter your personal information
4. Review the rental summary and total price
5. Accept terms and conditions
6. Click "Confirm Booking"
7. Receive a booking confirmation with reference number

### Contacting Support

1. Click on "Contact" in the navigation menu
2. Choose your preferred contact method (phone, email, WhatsApp)
3. Or fill out the contact form and submit your message

## Features in Detail

### Responsive Design

The website uses CSS media queries to ensure optimal viewing on:
- Desktop (1200px and above)
- Tablet (768px to 1199px)
- Mobile (below 768px)

### Form Validation

All forms include validation for:
- Required fields
- Email format
- Phone number format
- Minimum character length
- Postal code format

### Price Calculation

The booking system automatically calculates:
- Rental duration based on selected dates
- Total price based on daily rate and duration
- Real-time updates as dates change

### LocalStorage

Booking data is stored in the browser's LocalStorage for:
- Temporary storage of selected car
- Booking history (can be extended)
- Session persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Adding New Cars

Edit the `cars` array in `js/main.js`:

```javascript
const cars = [
    {
        id: 5,
        name: "Your Car Name",
        type: "Car Type",
        price: 99,
        transmission: "Automatic",
        fuel: "Petrol",
        image: "assets/images/your-image.jpg",
        description: "Car description here"
    }
];
```

### Changing Colors

Update the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #e74c3c;
    --accent-color: #3498db;
    /* ... other colors ... */
}
```

### Updating Contact Information

Edit the contact details in:
- `index.html` (footer)
- `contact.html` (contact section)

## Performance Optimization

- Minified CSS and JavaScript (recommended for production)
- Optimized images for web
- Lazy loading for images (can be implemented)
- Efficient DOM manipulation
- No external dependencies except Font Awesome

## Future Enhancements

- Backend integration for real bookings
- User authentication and account management
- Payment gateway integration
- Email confirmation system
- Advanced search and filtering
- User reviews and ratings
- Multi-language support
- Real-time availability checking

---

**Version**: 1.0.0  
**Last Updated**: 22nd January 2026
