fetch("http://localhost:3000/api/dashboard/bookings", {
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token")
  }
})
.then(res => res.json())
.then(data => {
  bookings.innerHTML = data.map(b => `
    <tr>
      <td>${b.full_name}</td>
      <td>${b.car_name}</td>
      <td>${b.start_date} → ${b.end_date}</td>
      <td>$${b.total_price}</td>
    </tr>
  `).join("");
});
