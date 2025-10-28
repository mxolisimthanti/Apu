let galleryData = [];

fetch('gallery.json')
  .then(response => response.json())
  .then(data => {
    galleryData = data;
    displayGallery(data);
  });

function displayGallery(items) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
    `;
    gallery.appendChild(div);
  });
}

document.querySelectorAll('.filter-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    if (category === 'all') {
      displayGallery(galleryData);
    } else {
      const filtered = galleryData.filter(item => item.category === category);
      displayGallery(filtered);
    }
  });
});
function updateCalendarDate() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-ZA', options); // South African format

  document.getElementById('calendar-date').textContent = `Today is ${formattedDate}`;
}

updateCalendarDate();
setInterval(updateCalendarDate, 86400000); // Refresh every 24 hours
