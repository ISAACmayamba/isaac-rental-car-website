



document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");

  // 🛑 Stop if this page has no booking form
  if (!bookingForm) return;

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const bookingData = {
      bookingReference: "BK-" + Date.now(),
      carId: localStorage.getItem("selectedCarId"),
      customerName: document.getElementById("full-name").value.trim(),
      customerEmail: document.getElementById("email").value.trim(),
      customerPhone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
      city: document.getElementById("city").value.trim(),
      postalCode: document.getElementById("postal-code").value.trim(),
      licenseNumber: document.getElementById("license-number").value.trim(),
      startDate: document.getElementById("start-date").value,
      endDate: document.getElementById("end-date").value,
      bookingDate: new Date().toISOString()
    };

    // Validate terms
    if (!document.getElementById("terms").checked) {
      alert("You must accept the terms and conditions.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      alert("✅ Booking successful!");
      bookingForm.reset();

    } catch (error) {
      console.error(error);
      alert("❌ Booking failed. Please try again.");
    }
  });
});
