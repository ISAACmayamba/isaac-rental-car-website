// ============================================
// BOOKING PAGE FUNCTIONALITY
// ============================================

// Cars data is imported from main.js

// ============================================
// DOM ELEMENTS
// ============================================

let bookingForm, successModal, summaryCarImage, summaryCarName, summaryCarType;
let summaryStartDate, summaryEndDate, summaryDuration, summaryDailyRate, summaryTotalPrice;

// Initialize DOM elements
function initializeDOMElements() {
    bookingForm = document.getElementById('booking-form');
    successModal = document.getElementById('success-modal');
    summaryCarImage = document.getElementById('summary-car-image');
    summaryCarName = document.getElementById('summary-car-name');
    summaryCarType = document.getElementById('summary-car-type');
    summaryStartDate = document.getElementById('summary-start-date');
    summaryEndDate = document.getElementById('summary-end-date');
    summaryDuration = document.getElementById('summary-duration');
    summaryDailyRate = document.getElementById('summary-daily-rate');
    summaryTotalPrice = document.getElementById('summary-total-price');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get car by ID
 */
function getCarById(id) {
    return cars.find(car => car.id === parseInt(id));
}

/**
 * Calculate days between two dates
 */
function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(diffDays, 1);
}

/**
 * Calculate total rental price
 */
function calculateTotalPrice(dailyRate, days) {
    return dailyRate * days;
}

/**
 * Format date to readable format
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

/**
 * Validate postal code
 */
function isValidPostalCode(postalCode) {
    return postalCode.length >= 3;
}

/**
 * Generate booking reference
 */
function generateBookingReference() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `BK-${timestamp}-${random}`;
}

/**
 * Show error message
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        errorElement.closest('.form-group').classList.add('error');
    }
}

/**
 * Clear all errors
 */
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
    document.querySelectorAll('.form-group').forEach(el => {
        el.classList.remove('error');
    });
}

/**
 * Update rental summary
 */
function updateRentalSummary() {
    const startDateInput = document.querySelector('input[name="startDate"]');
    const endDateInput = document.querySelector('input[name="endDate"]');

    if (!startDateInput || !endDateInput || !summaryStartDate || !summaryEndDate || !summaryDuration || !summaryTotalPrice) {
        return;
    }

    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (startDate && endDate) {
        const days = calculateDays(startDate, endDate);
        const dailyRateText = summaryDailyRate.textContent.replace(/,/g, '');
        const dailyRate = parseInt(dailyRateText);
        const totalPrice = calculateTotalPrice(dailyRate, days);

        summaryStartDate.textContent = formatDate(startDate);
        summaryEndDate.textContent = formatDate(endDate);
        summaryDuration.textContent = days;
        summaryTotalPrice.textContent = totalPrice.toLocaleString();
    }
}

/**
 * Load selected car data
 */
function loadSelectedCar() {
    const selectedCarId = localStorage.getItem('selectedCarId');

    // Use default car if no car selected
    let car;
    if (!selectedCarId) {
        car = cars[0]; // Use first car as default
    } else {
        car = getCarById(selectedCarId);
        if (!car) {
            car = cars[0]; // Fallback to first car
        }
    }

    // Update summary
    summaryCarImage.src = car.image;
    summaryCarName.textContent = car.name;
    summaryCarType.textContent = car.type;
    summaryDailyRate.textContent = car.price.toLocaleString();

    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    const startDateInput = document.querySelector('input[name="startDate"]');
    const endDateInput = document.querySelector('input[name="endDate"]');

    if (startDateInput) {
        startDateInput.setAttribute('min', today);
    }
    if (endDateInput) {
        endDateInput.setAttribute('min', today);
    }

    // Update summary on date change
    if (startDateInput) {
        startDateInput.addEventListener('change', updateRentalSummary);
    }
    if (endDateInput) {
        endDateInput.addEventListener('change', updateRentalSummary);
    }

    // Set default dates
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (startDateInput && !startDateInput.value) {
        startDateInput.value = today;
    }
    if (endDateInput && !endDateInput.value) {
        endDateInput.value = tomorrowStr;
    }

    updateRentalSummary();
}

/**
 * Show success modal
 */
function showSuccessModal(email, bookingRef) {
    document.getElementById('confirmation-email').textContent = email;
    document.getElementById('booking-reference').textContent = bookingRef;
    successModal.classList.add('active');
}

/**
 * Close success modal
 */
function closeSuccessModal() {
    successModal.classList.remove('active');
}

// ============================================
// EVENT LISTENERS
// ============================================

// Booking form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Clear previous errors
        clearErrors();

        // Get form data
        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const postalCode = document.getElementById('postal-code').value.trim();
        const licenseNumber = document.getElementById('license-number').value.trim();
        const termsAccepted = document.getElementById('terms').checked;

        let isValid = true;

        // Validate full name
        if (!fullName || fullName.length < 2) {
            showError('error-full-name', 'Please enter a valid full name');
            isValid = false;
        }

        // Validate email
        if (!email || !isValidEmail(email)) {
            showError('error-email', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone
        if (!phone || !isValidPhone(phone)) {
            showError('error-phone', 'Please enter a valid phone number');
            isValid = false;
        }

        // Validate address
        if (!address || address.length < 5) {
            showError('error-address', 'Please enter a valid address');
            isValid = false;
        }

        // Validate city
        if (!city || city.length < 2) {
            showError('error-city', 'Please enter a valid city');
            isValid = false;
        }

        // Validate postal code
        if (!postalCode || !isValidPostalCode(postalCode)) {
            showError('error-postal-code', 'Please enter a valid postal code');
            isValid = false;
        }

        // Validate license number
        if (!licenseNumber || licenseNumber.length < 3) {
            showError('error-license-number', 'Please enter a valid driver\'s license number');
            isValid = false;
        }

        // Validate terms
        if (!termsAccepted) {
            showError('error-terms', 'You must accept the terms and conditions');
            isValid = false;
        }

        if (isValid) {
            // Store booking data in localStorage
            const selectedCarId = localStorage.getItem('selectedCarId');
            const car = getCarById(selectedCarId);
            const bookingRef = generateBookingReference();

            const bookingData = {
                bookingReference: bookingRef,
                carId: selectedCarId,
                carName: car.name,
                customerName: fullName,
                customerEmail: email,
                customerPhone: phone,
                address: address,
                city: city,
                postalCode: postalCode,
                licenseNumber: licenseNumber,
                startDate: document.querySelector('input[name="startDate"]').value,
                endDate: document.querySelector('input[name="endDate"]').value,
                totalPrice: document.getElementById('summary-total-price').textContent,
                bookingDate: new Date().toISOString()
            };

            // Save to localStorage
            const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
            existingBookings.push(bookingData);
            localStorage.setItem('bookings', JSON.stringify(existingBookings));

            // Show success modal
            showSuccessModal(email, bookingRef);

            // Scroll to modal
            successModal.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Reset form
            bookingForm.reset();
        }
    });
}

// Close success modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === successModal) {
        closeSuccessModal();
    }
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDOMElements();
    loadSelectedCar();
});
