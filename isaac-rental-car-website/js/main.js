// ============================================
// CAR DATA
// ============================================

const cars = [
    {
        id: 1,
        name: "Luxury SUV",
        type: "SUV",
        price: 850000,
        transmission: "Automatic",
        fuel: "Petrol",
        image: "assets/images/suv.png",
        description: "A spacious and powerful SUV, perfect for family trips and off-road adventures. Features premium leather seats and advanced safety systems."
    },
    {
        id: 2,
        name: "Compact City Car",
        type: "Hatchback",
        price: 450000,
        transmission: "Manual",
        fuel: "Electric",
        image: "assets/images/compact.png",
        description: "Efficient and easy to park, this compact car is ideal for navigating busy city streets. Eco-friendly and cost-effective."
    },
    {
        id: 3,
        name: "Executive Sedan",
        type: "Sedan",
        price: 650000,
        transmission: "Automatic",
        fuel: "Hybrid",
        image: "assets/images/interior.jpg",
        description: "Elegant and comfortable, the executive sedan is perfect for business trips and long-distance travel. Smooth handling and great fuel economy."
    },
    {
        id: 4,
        name: "Family Minivan",
        type: "Minivan",
        price: 750000,
        transmission: "Automatic",
        fuel: "Diesel",
        image: "assets/images/fleet-banner.jpg",
        description: "Plenty of room for everyone! This minivan offers comfortable seating for up to 7 passengers and ample luggage space."
    }
];

// ============================================
// DOM ELEMENTS
// ============================================

const featuredCarsGrid = document.getElementById('featured-cars-grid');
const carsGrid = document.getElementById('cars-grid');
const filterTypeSelect = document.getElementById('filter-type');
const carModal = document.getElementById('car-modal');
const closeBtn = document.querySelector('.close-btn');
const contactForm = document.getElementById('contact-form');

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create a car card element
 */
function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="car-card-image">
        <div class="car-card-content">
            <h3>${car.name}</h3>
            <span class="car-type">${car.type}</span>
            <div class="car-specs">
                <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
            </div>
            <div class="car-price">ZMW ${car.price.toLocaleString()}<small>/day</small></div>
            <div class="car-card-actions">
                <button class="btn-view-details" onclick="openCarModal(${car.id})">View Details</button>
                <button class="btn-rent" onclick="selectCarForBooking(${car.id})">Rent Now</button>
            </div>
        </div>
    `;
    return card;
}

/**
 * Render cars to a grid
 */
function renderCars(carsToRender, gridElement) {
    if (!gridElement) return;
    gridElement.innerHTML = '';
    carsToRender.forEach(car => {
        gridElement.appendChild(createCarCard(car));
    });
}

/**
 * Get car by ID
 */
function getCarById(id) {
    return cars.find(car => car.id === parseInt(id));
}

/**
 * Filter cars by type
 */
function filterCarsByType(type) {
    if (!type) return cars;
    return cars.filter(car => car.type === type);
}

/**
 * Open car details modal
 */
function openCarModal(carId) {
    const car = getCarById(carId);
    if (!car) return;

    document.getElementById('modal-car-image').src = car.image;
    document.getElementById('modal-car-name').textContent = car.name;
    document.getElementById('modal-car-description').textContent = car.description;
    document.getElementById('modal-car-type').textContent = car.type;
    document.getElementById('modal-car-transmission').textContent = car.transmission;
    document.getElementById('modal-car-fuel').textContent = car.fuel;
    document.getElementById('modal-car-price').textContent = `ZMW ${car.price.toLocaleString()}/day`;
    document.getElementById('modal-rent-btn').onclick = () => selectCarForBooking(carId);

    carModal.classList.add('active');
}

/**
 * Close modal
 */
function closeModal() {
    carModal.classList.remove('active');
}

/**
 * Select car for booking and redirect
 */
function selectCarForBooking(carId) {
    localStorage.setItem('selectedCarId', carId);
    window.location.href = 'booking.html';
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
 * Generate booking reference
 */
function generateBookingReference() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `BK-${timestamp}-${random}`;
}

// ============================================
// EVENT LISTENERS
// ============================================

// Close modal when clicking close button
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside the modal
window.addEventListener('click', (event) => {
    if (event.target === carModal) {
        closeModal();
    }
});

// Filter cars by type
if (filterTypeSelect) {
    filterTypeSelect.addEventListener('change', (event) => {
        const filteredCars = filterCarsByType(event.target.value);
        renderCars(filteredCars, carsGrid);
    });
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form data
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));

        let isValid = true;

        // Validate name
        if (!name || name.length < 2) {
            showError('error-contact-name', 'Please enter a valid name');
            isValid = false;
        }

        // Validate email
        if (!email || !isValidEmail(email)) {
            showError('error-contact-email', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate subject
        if (!subject || subject.length < 3) {
            showError('error-contact-subject', 'Please enter a subject');
            isValid = false;
        }

        // Validate message
        if (!message || message.length < 10) {
            showError('error-contact-message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            const formMessage = document.getElementById('form-message');
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }, 5000);
        }
    });
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

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Render featured cars on home page
    if (featuredCarsGrid) {
        renderCars(cars.slice(0, 3), featuredCarsGrid);
    }

    // Render all cars on fleet page
    if (carsGrid) {
        renderCars(cars, carsGrid);
    }

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});
