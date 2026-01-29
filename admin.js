document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');
  const loginBtn = document.getElementById('login-btn');

  // Clear previous errors
  errorMessage.classList.remove('show');
  errorMessage.textContent = '';

  // Disable button
  loginBtn.disabled = true;
  loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

  try {
    const response = await fetch("http://localhost:3000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      // Store token
      localStorage.setItem("token", data.token);
      localStorage.setItem("adminEmail", data.admin.email);
      
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    } else {
      // Show error
      errorMessage.textContent = data.message || 'Login failed. Please try again.';
      errorMessage.classList.add('show');
      
      // Re-enable button
      loginBtn.disabled = false;
      loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.textContent = 'Connection error. Please make sure the server is running.';
    errorMessage.classList.add('show');
    
    // Re-enable button
    loginBtn.disabled = false;
    loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
  }
});
