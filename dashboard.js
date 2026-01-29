// Check if user is logged in
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'admin.html';
}

// Display admin email
const adminEmail = localStorage.getItem('adminEmail');
if (adminEmail) {
  document.getElementById('admin-email').textContent = adminEmail;
}

// Logout function
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('adminEmail');
  window.location.href = 'admin.html';
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Format currency
function formatCurrency(amount) {
  return `ZMW ${parseFloat(amount).toLocaleString('en-US', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  })}`;
}

// Load dashboard statistics
async function loadStats() {
  try {
    const response = await fetch('http://localhost:3000/api/dashboard/stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success) {
      const stats = data.stats;
      document.getElementById('total-bookings').textContent = stats.totalBookings;
      document.getElementById('total-revenue').textContent = formatCurrency(stats.totalRevenue);
      document.getElementById('total-vehicles').textContent = stats.totalVehicles;
      document.getElementById('total-customers').textContent = stats.totalCustomers;
    }
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

// Load bookings
async function loadBookings() {
  try {
    const response = await fetch('http://localhost:3000/api/dashboard/bookings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    const tbody = document.getElementById('bookings-body');

    if (data.success && data.bookings.length > 0) {
      tbody.innerHTML = data.bookings.map(booking => `
        <tr>
          <td><strong>${booking.booking_reference}</strong></td>
          <td>
            ${booking.full_name}<br>
            <small style="color: #666;">${booking.email}</small>
          </td>
          <td>${booking.car_name}</td>
          <td>${formatDate(booking.start_date)}</td>
          <td>${formatDate(booking.end_date)}</td>
          <td><strong>${formatCurrency(booking.total_price)}</strong></td>
          <td>
            <span class="status-badge ${booking.status}">
              ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </td>
        </tr>
      `).join('');
    } else {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="no-data">
            <i class="fas fa-inbox"></i><br>
            No bookings found
          </td>
        </tr>
      `;
    }
  } catch (error) {
    console.error('Error loading bookings:', error);
    const tbody = document.getElementById('bookings-body');
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="no-data" style="color: #e74c3c;">
          <i class="fas fa-exclamation-triangle"></i><br>
          Error loading bookings. Please make sure the server is running.
        </td>
      </tr>
    `;
  }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadBookings();
  
  // Refresh data every 30 seconds
  setInterval(() => {
    loadStats();
    loadBookings();
  }, 30000);
});
