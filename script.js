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
const API_KEY = 'your_airtable_api_key';
const BASE_ID = 'your_base_id';
const TABLE_NAME = 'School Calendar';

const today = new Date().toISOString().split('T')[0];

fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?maxRecords=10&view=Grid%20view`, {
  headers: {
    Authorization: `Bearer ${API_KEY}`
  }
})
  .then(response => response.json())
  .then(data => {
    const calendarBox = document.getElementById('calendar-box');
    calendarBox.innerHTML = `<h2>Today: ${new Date().toLocaleDateString()}</h2>`;

    data.records.forEach(record => {
      const eventDate = record.fields.Date;
      const isToday = eventDate === today;
      const eventItem = document.createElement('div');
      eventItem.className = isToday ? 'event today' : 'event';
      eventItem.innerHTML = `<strong>${record.fields.Date}</strong>: ${record.fields.Event}`;
      calendarBox.appendChild(eventItem);
    });
  });
fetch('events.json')
  .then(response => response.json())
  .then(events => {
    const today = new Date().toISOString().split('T')[0];
    const list = document.getElementById('event-list');

    events.forEach(event => {
      const li = document.createElement('li');
      li.textContent = `${event.date} – ${event.title}`;
      if (event.date === today) {
        li.style.backgroundColor = '#fff8e1';
        li.style.borderLeft = '5px solid #ffcc00';
      }
      list.appendChild(li);
    });
  });
const API_KEY = 'c52c6e36-fba9-4b1e-8d1f-57208e4397df';
const COUNTRY = 'ZA';
const YEAR = new Date().getFullYear();

fetch(`https://holidayapi.com/v1/holidays?key=${API_KEY}&country=${COUNTRY}&year=${YEAR}`)
  .then(response => response.json())
  .then(data => {
    const holidays = data.holidays;
    const list = document.getElementById('holiday-list');

    holidays.forEach(holiday => {
      const li = document.createElement('li');
      li.textContent = `${holiday.date} – ${holiday.name}`;
      list.appendChild(li);
    });
  })
  .catch(error => console.error('Error fetching holidays:', error));
