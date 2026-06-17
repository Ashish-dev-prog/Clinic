// Clinic Profile Page JavaScript Logic
const clinicProfiles = {
  "human-1": {
    name: "Metro Care General Clinic",
    type: "General Medicine",
    isPet: false,
    address: "B-42, Connaught Place, Inner Circle, New Delhi",
    rating: 4.8,
    reviewsCount: 342,
    statusText: "Open • Available Today",
    statusBadge: "badge-success",
    phone: "+91 98123 45670",
    coords: [28.6294, 77.2157],
    about: "Metro Care General Clinic has been a leading medical services provider in Connaught Place for over 15 years. We house experienced pediatricians and general practitioners, offering top-tier diagnostic care, immunization cycles, and seasonal flu treatment.",
    services: ["General Health Checkup", "Pediatric Care", "Immunization", "Blood Pressure Monitoring", "Chronic Disease Management", "Flu Shot & Nebulizer"],
    facilities: [
      { icon: "fa-parking", name: "Free Parking" },
      { icon: "fa-wind", name: "Air Conditioned" },
      { icon: "fa-wheelchair", name: "Wheelchair Access" },
      { icon: "fa-credit-card", name: "UPI & Cards Accepted" }
    ],
    doctors: [
      { id: "doc-1", name: "Dr. Arvind Mehta", specialty: "Senior Consultant, General Medicine", exp: "18 Yrs Exp", avatar: "fa-user-doctor" },
      { id: "doc-2", name: "Dr. Shalini Sen", specialty: "Consulting Pediatrician", exp: "12 Yrs Exp", avatar: "fa-user-doctor" },
      { id: "doc-3", name: "Dr. Kabir Malhotra", specialty: "General Physician & Immunologist", exp: "8 Yrs Exp", avatar: "fa-user-doctor" }
    ],
    slots: {
      morning: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
      afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "04:00 PM", "04:30 PM"],
      evening: ["05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM"]
    }
  },
  "human-2": {
    name: "Aero Dental Care Center",
    type: "Dental Clinic",
    isPet: false,
    address: "Block G, Connaught Place, New Delhi",
    rating: 4.7,
    reviewsCount: 219,
    statusText: "Busy • 20m Waiting Queue",
    statusBadge: "badge-warning",
    phone: "+91 98234 56781",
    coords: [28.6324, 77.2197],
    about: "Aero Dental Care offers comprehensive oral hygiene, modern orthodontic solutions, implant surgery, and advanced cosmetic tooth bleaching. Equipped with modern dental machinery and specialized sanitization.",
    services: ["Root Canal Treatment", "Teeth Whitening & Scaling", "Orthodontic Braces", "Dental Implants", "Pediatric Dentistry", "Wisdom Tooth Extraction"],
    facilities: [
      { icon: "fa-wind", name: "Air Conditioned" },
      { icon: "fa-wheelchair", name: "Wheelchair Access" },
      { icon: "fa-wifi", name: "Free Guest Wi-Fi" },
      { icon: "fa-credit-card", name: "Digital Payment Support" }
    ],
    doctors: [
      { id: "doc-4", name: "Dr. Sarah Vance", specialty: "Senior Endodontist", exp: "14 Yrs Exp", avatar: "fa-user-doctor" },
      { id: "doc-5", name: "Dr. Rohan Goel", specialty: "Cosmetic Orthodontist", exp: "10 Yrs Exp", avatar: "fa-user-doctor" }
    ],
    slots: {
      morning: ["09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
      afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "02:30 PM", "03:30 PM", "04:00 PM", "04:30 PM"],
      evening: ["05:00 PM", "05:30 PM", "06:00 PM", "07:00 PM", "07:30 PM", "08:00 PM"]
    }
  },
  "pet-1": {
    name: "Happy Tails Vet Clinic",
    type: "Veterinary Care",
    isPet: true,
    address: "K-12, Outer Circle, Connaught Place, New Delhi",
    rating: 4.8,
    reviewsCount: 184,
    statusText: "Open • Vet On-Duty Today",
    statusBadge: "badge-success",
    phone: "+91 98345 67892",
    coords: [28.6284, 77.2177],
    about: "Happy Tails Vet Clinic provides high-quality diagnostics, medical therapies, and surgical solutions for companion animals. We love pets and treat each pet patient like family, featuring special cat rooms and custom dog treat stations.",
    services: ["Pet Vaccinations", "De-worming", "General Animal Surgery", "Pet Dermatology", "Nutritional Counseling", "Dental Scaling for Dogs/Cats"],
    facilities: [
      { icon: "fa-parking", name: "Valet Parking" },
      { icon: "fa-dog", name: "Pet Friendly Area" },
      { icon: "fa-wind", name: "AC & Deodorized Lobby" },
      { icon: "fa-credit-card", name: "Card & UPI" }
    ],
    doctors: [
      { id: "doc-6", name: "Dr. Ananya Iyer", specialty: "Senior Veterinarian & Surgeon", exp: "15 Yrs Exp", avatar: "fa-paw" },
      { id: "doc-7", name: "Dr. Kabir Malhotra", specialty: "Consultant (Exotic Animals)", exp: "7 Yrs Exp", avatar: "fa-paw" }
    ],
    slots: {
      morning: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
      afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "04:30 PM"],
      evening: ["05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"]
    }
  },
  "pet-3": {
    name: "PawCare 24/7 Vet Hospital",
    type: "Emergency Veterinary",
    isPet: true,
    address: "Block N, Radial Road 2, Connaught Place, New Delhi",
    rating: 4.7,
    reviewsCount: 312,
    statusText: "Open • 24/7 Emergency Vet Active",
    statusBadge: "badge-success",
    phone: "+91 98456 78903",
    coords: [28.6254, 77.2187],
    about: "PawCare 24/7 Veterinary Hospital is Delhi's premium round-the-clock emergency support for pets. We offer advanced critical care, blood banks, advanced imaging, and emergency surgical capabilities.",
    services: ["Emergency Trauma Surgery", "ICU Support & Oxygen", "Pet Blood Bank", "Pathology Lab 24/7", "General Checkup", "Fracture Bandaging"],
    facilities: [
      { icon: "fa-truck-medical", name: "24/7 Ambulance" },
      { icon: "fa-dog", name: "Pet Friendly" },
      { icon: "fa-wheelchair", name: "Wheelchair Access" },
      { icon: "fa-credit-card", name: "Insurance Claim Desk" }
    ],
    doctors: [
      { id: "doc-8", name: "Dr. Vivek Sen", specialty: "ER Trauma Vet Expert", exp: "20 Yrs Exp", avatar: "fa-paw" },
      { id: "doc-9", name: "Dr. Riya Kapoor", specialty: "Critical Care Specialist", exp: "9 Yrs Exp", avatar: "fa-paw" }
    ],
    slots: {
      morning: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
      afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "04:30 PM"],
      evening: ["05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"]
    }
  }
};

// Global Selector States
let selectedClinicId = "human-1"; // fallback
let activeTab = "slots"; // default view to slot booking
let selectedDate = null;
let selectedTimePeriod = "morning";
let selectedSlotEl = null;
let miniMap = null; // Leaflet instance
let slotsTimeout = null;
let doctorsTimeout = null;

// Selected Slot Information
let currentBookingData = {
  clinicId: "",
  clinicName: "",
  doctorName: "",
  dateText: "",
  timeSlot: "",
  queueNo: 7,
  waitTime: "~35 minutes"
};

document.addEventListener('DOMContentLoaded', () => {
  // Parse Query Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id');
  if (idParam && clinicProfiles[idParam]) {
    selectedClinicId = idParam;
  }
  
  currentBookingData.clinicId = selectedClinicId;
  currentBookingData.clinicName = clinicProfiles[selectedClinicId].name;

  // Render Clinic Static Details
  renderClinicDetails();

  // Initialize Tab Switchers
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content-panel').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
      activeTab = btn.dataset.tab;

      // Invalidate and draw mini-map if Location tab is loaded
      if (activeTab === 'location') {
        setTimeout(() => {
          initMiniMap();
        }, 80);
      }
    });
  });

  // Share Button click
  const shareBtn = document.getElementById('share-clinic-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      showToast('Clinic details link copied to clipboard!');
    });
  }

  // Generate Date list row
  initDatePicker();

  // Period selectors (Morning/Afternoon/Evening)
  const periodBtns = document.querySelectorAll('.period-tab-btn');
  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      periodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTimePeriod = btn.dataset.period;
      renderSlotsGrid();
    });
  });

  // Doctor Select elements
  const docSelect = document.getElementById('doctor-select');
  if (docSelect) {
    docSelect.addEventListener('change', (e) => {
      currentBookingData.doctorName = e.target.value;
      updateBookingSummaryCard();
    });
  }

  // Proceed button logic with Authentication Gate intercept
  const proceedBtn = document.getElementById('proceed-booking-btn');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      if (!currentBookingData.timeSlot) {
        showToast('Please select a visual time slot first.');
        return;
      }

      // Check if user is logged in
      const session = localStorage.getItem('pawcare_session');
      if (!session) {
        showToast("Please login or register to book your consultation slot.");
        triggerAuthModal();

        // Listen for successful login trigger, then proceed
        const onLoginSuccess = (e) => {
          document.removeEventListener('authChange', onLoginSuccess);
          // Wait a split second for toast/animation, then auto trigger click
          setTimeout(() => {
            proceedBtn.click();
          }, 600);
        };
        document.addEventListener('authChange', onLoginSuccess);
        return;
      }
      
      // Build Redirect Query Params
      const params = new URLSearchParams({
        clinicId: currentBookingData.clinicId,
        clinicName: currentBookingData.clinicName,
        doctorName: currentBookingData.doctorName,
        date: currentBookingData.dateText,
        slot: currentBookingData.timeSlot,
        queue: currentBookingData.queueNo,
        wait: currentBookingData.waitTime,
        isPet: clinicProfiles[selectedClinicId].isPet ? "true" : "false"
      });
      window.location.href = `book.html?${params.toString()}`;
    });
  }
});

// Render Static Page Profile Header, Overview, Doctors & Location Map
function renderClinicDetails() {
  const data = clinicProfiles[selectedClinicId];
  if (!data) return;

  // Header Elements
  document.getElementById('profile-title').innerText = data.name;
  document.getElementById('profile-type-badge').innerText = data.type;
  document.getElementById('profile-address').innerText = data.address;
  document.getElementById('profile-rating-span').innerHTML = `<i class="fa-solid fa-star"></i> ${data.rating} (${data.reviewsCount} reviews)`;
  
  const statusBadge = document.getElementById('profile-status');
  statusBadge.className = `badge ${data.statusBadge}`;
  statusBadge.innerText = data.statusText;
  
  // Dynamic Background Image load
  const banner = document.getElementById('profile-banner');
  if (banner) {
    banner.style.backgroundImage = "url('images/clinic_banner.png')";
    banner.style.backgroundSize = "cover";
    banner.style.backgroundPosition = "center";
  }

  // Theme styling swap for Pet vs Human clinic
  if (data.isPet) {
    document.getElementById('profile-type-badge').classList.add('badge-purple');
    document.getElementById('proceed-booking-btn').style.backgroundColor = "#8B5CF6";
    document.getElementById('proceed-booking-btn').style.borderColor = "#8B5CF6";
  }

  // Overview Tab details
  document.getElementById('about-text').innerText = data.about;
  document.getElementById('contact-phone').innerText = data.phone;
  
  // Services
  const servicesBox = document.getElementById('services-list-container');
  servicesBox.innerHTML = data.services.map(s => `<span class="clinic-tag">${s}</span>`).join('');

  // Facilities
  const facilitiesBox = document.getElementById('facilities-list-container');
  facilitiesBox.innerHTML = data.facilities.map(f => `
    <div style="display: flex; align-items: center; gap: 0.5rem; background-color: var(--light-grey); padding: 0.5rem 1rem; border-radius: var(--radius-md); font-weight: 500; font-size: 0.9rem;">
      <i class="fa-solid ${f.icon}" style="color: ${data.isPet ? '#8B5CF6' : 'var(--primary-teal)'}"></i>
      <span>${f.name}</span>
    </div>
  `).join('');

  // Doctors - Using the newly generated doctor_avatar image
  const doctorsBox = document.getElementById('doctors-list-container');
  const docSelect = document.getElementById('doctor-select');
  
  if (doctorsTimeout) clearTimeout(doctorsTimeout);
  
  // Render doctor skeleton shimmers first
  doctorsBox.innerHTML = `
    <div class="doctor-card">
      <div class="skeleton" style="width: 60px; height: 60px; border-radius: 50%;"></div>
      <div class="doctor-info" style="flex: 1;">
        <div class="skeleton" style="width: 50%; height: 20px; margin-bottom: 0.5rem;"></div>
        <div class="skeleton" style="width: 80%; height: 16px;"></div>
      </div>
      <div class="skeleton" style="width: 100px; height: 24px; border-radius: 9999px;"></div>
    </div>
    <div class="doctor-card">
      <div class="skeleton" style="width: 60px; height: 60px; border-radius: 50%;"></div>
      <div class="doctor-info" style="flex: 1;">
        <div class="skeleton" style="width: 55%; height: 20px; margin-bottom: 0.5rem;"></div>
        <div class="skeleton" style="width: 75%; height: 16px;"></div>
      </div>
      <div class="skeleton" style="width: 100px; height: 24px; border-radius: 9999px;"></div>
    </div>
  `;
  
  doctorsTimeout = setTimeout(() => {
    doctorsBox.innerHTML = data.doctors.map(doc => `
      <div class="doctor-card animate-fade-in-up">
        <div class="doctor-avatar-circle" style="background-image: url('images/doctor_avatar.png'); background-size: cover; background-position: center; border: 1.5px solid var(--border-color);">
        </div>
        <div class="doctor-info">
          <h4>${doc.name}</h4>
          <p>${doc.specialty} • <strong>${doc.exp}</strong></p>
        </div>
        <span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Available Today</span>
      </div>
    `).join('');
  }, 600);

  // Populate doctors dropdown selector
  docSelect.innerHTML = data.doctors.map(doc => `<option value="${doc.name}">${doc.name}</option>`).join('');
  currentBookingData.doctorName = data.doctors[0].name; // default selection
}

// Generate Horizontally Scrollable Dates list
function initDatePicker() {
  const dateRow = document.getElementById('date-picker-row');
  if (!dateRow) return;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  let dateHtml = "";
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const dayName = days[nextDate.getDay()];
    const dateNum = nextDate.getDate();
    const monthName = months[nextDate.getMonth()];
    
    const formattedDate = `${dayName}, ${dateNum} ${monthName}`;
    const activeClass = i === 0 ? "active" : "";

    if (i === 0) {
      selectedDate = formattedDate;
      currentBookingData.dateText = formattedDate;
    }

    dateHtml += `
      <div class="date-item-btn ${activeClass}" onclick="selectBookingDate(this, '${formattedDate}')">
        <span class="day">${i === 0 ? 'Today' : dayName}</span>
        <span class="num">${dateNum}</span>
        <span class="day">${monthName}</span>
      </div>
    `;
  }
  
  dateRow.innerHTML = dateHtml;
  
  // Render Slot Grid for default date
  renderSlotsGrid();
}

window.selectBookingDate = function(element, dateStr) {
  document.querySelectorAll('.date-item-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  
  selectedDate = dateStr;
  currentBookingData.dateText = dateStr;
  
  // Reset selected slot state upon date change to prevent stale slots
  currentBookingData.timeSlot = "";
  updateBookingSummaryCard();

  // Dynamic slot simulation: Re-render slots with randomized availability for the new date
  renderSlotsGrid(true);
};

// Render slot items into Grid
function renderSlotsGrid(simulateRandom = false) {
  const grid = document.getElementById('slots-grid-container');
  if (!grid) return;

  const data = clinicProfiles[selectedClinicId];
  const list = data.slots[selectedTimePeriod];

  if (slotsTimeout) clearTimeout(slotsTimeout);

  // Render slot skeleton shimmers first
  grid.innerHTML = `
    <div class="slot-box skeleton" style="height: 62px; border: none; border-radius: var(--radius-sm);"></div>
    <div class="slot-box skeleton" style="height: 62px; border: none; border-radius: var(--radius-sm);"></div>
    <div class="slot-box skeleton" style="height: 62px; border: none; border-radius: var(--radius-sm);"></div>
    <div class="slot-box skeleton" style="height: 62px; border: none; border-radius: var(--radius-sm);"></div>
    <div class="slot-box skeleton" style="height: 62px; border: none; border-radius: var(--radius-sm);"></div>
    <div class="slot-box skeleton" style="height: 62px; border: none; border-radius: var(--radius-sm);"></div>
  `;

  if (!list || list.length === 0) {
    slotsTimeout = setTimeout(() => {
      grid.innerHTML = `<p style="grid-column: span 4; text-align: center; color: var(--text-grey); padding: 2rem;">No slots scheduled for this period.</p>`;
    }, 600);
    return;
  }

  slotsTimeout = setTimeout(() => {
    let seed = selectedDate.charCodeAt(0) + selectedDate.charCodeAt(selectedDate.length - 1) + selectedTimePeriod.charCodeAt(0);

    grid.innerHTML = list.map((time, idx) => {
      let state = "available";
      
      if (simulateRandom) {
        const rand = (seed + idx) % 5;
        if (rand === 0) state = "booked";
        else if (rand === 1) state = "almost-full";
        else if (rand === 2) state = "closed";
      } else {
        if (idx % 4 === 1) state = "booked";
        else if (idx % 4 === 3) state = "almost-full";
        else if (idx === 6) state = "closed";
      }

      let boxClass = "available";
      let statusLabel = "Available";
      let disabledAttr = "";

      if (state === "booked") {
        boxClass = "booked";
        statusLabel = "Booked";
        disabledAttr = "disabled";
      } else if (state === "almost-full") {
        boxClass = "almost-full";
        statusLabel = "1 slot left";
      } else if (state === "closed") {
        boxClass = "closed";
        statusLabel = "Closed";
        disabledAttr = "disabled";
      }

      return `
        <div class="slot-box ${boxClass} animate-fade-in-up" ${disabledAttr} onclick="selectSlot(this, '${time}', '${state}')" style="animation-delay: ${idx * 0.03}s">
          <span class="time">${time}</span>
          <span class="status-text">${statusLabel}</span>
        </div>
      `;
    }).join('');
  }, 600);
}

// Select specific slot box
window.selectSlot = function(element, timeVal, state) {
  if (state === "booked" || state === "closed") return;

  document.querySelectorAll('.slot-box').forEach(box => box.classList.remove('selected'));
  
  element.classList.add('selected');
  selectedSlotEl = element;
  
  currentBookingData.timeSlot = timeVal;
  
  const hour = parseInt(timeVal);
  const queueEstimation = (hour % 6) + 2; 
  currentBookingData.queueNo = queueEstimation;
  currentBookingData.waitTime = `~${queueEstimation * 5 + 10} minutes`;

  updateBookingSummaryCard();
}

function updateBookingSummaryCard() {
  const container = document.getElementById('booking-summary-widget');
  if (!container) return;

  const proceedBtn = document.getElementById('proceed-booking-btn');

  if (!currentBookingData.timeSlot) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-grey); padding: 1rem 0;">
        <i class="fa-solid fa-clock" style="font-size: 2rem; color: var(--border-color); margin-bottom: 0.5rem;"></i>
        <p>No slot selected yet.</p>
        <p style="font-size: 0.8rem;">Click an available slot in the calendar grid to proceed.</p>
      </div>
    `;
    if (proceedBtn) proceedBtn.disabled = true;
    return;
  }

  if (proceedBtn) proceedBtn.disabled = false;

  const data = clinicProfiles[selectedClinicId];

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1rem;" class="animate-fade-in">
      <div class="booking-summary-row">
        <span class="label">Clinic</span>
        <span class="val">${currentBookingData.clinicName}</span>
      </div>
      <div class="booking-summary-row">
        <span class="label">Doctor</span>
        <span class="val">${currentBookingData.doctorName}</span>
      </div>
      <div class="booking-summary-row">
        <span class="label">Date</span>
        <span class="val">${currentBookingData.dateText}</span>
      </div>
      <div class="booking-summary-row">
        <span class="label">Time Slot</span>
        <span class="val" style="color: ${data.isPet ? '#8B5CF6' : 'var(--primary-teal)'}; font-weight: 700;">${currentBookingData.timeSlot}</span>
      </div>
      
      <div class="booking-wait-estimator" style="background-color: ${data.isPet ? '#F5F3FF' : 'var(--light-teal-bg)'}">
        <i class="fa-solid fa-users" style="color: ${data.isPet ? '#8B5CF6' : 'var(--primary-teal)'}"></i>
        <div>
          <h4 style="color: ${data.isPet ? '#8B5CF6' : 'var(--dark-teal)'}">Queue Token Estimation</h4>
          <p>You will be <strong>#${currentBookingData.queueNo}</strong> in queue. Estimated lobby wait time: <strong>${currentBookingData.waitTime}</strong>.</p>
        </div>
      </div>
    </div>
  `;
}

// Leaflet Mini Map drawing
function initMiniMap() {
  const data = clinicProfiles[selectedClinicId];
  if (!data || !document.getElementById('mini-map-canvas')) return;

  if (miniMap) {
    miniMap.invalidateSize();
    return;
  }

  // Draw Leaflet map centered at clinic coordinates
  miniMap = L.map('mini-map-canvas', {
    zoomControl: true,
    scrollWheelZoom: false
  }).setView(data.coords, 16);

  // CartoDB Dark Matter tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(miniMap);

  // Custom pin Icon
  const markerHtml = `
    <div class="custom-leaflet-marker status-open type-${data.isPet ? 'pet' : 'human'}">
      <i class="fa-solid ${data.isPet ? 'fa-paw' : 'fa-house-medical'}"></i>
    </div>
  `;
  const customIcon = L.divIcon({
    html: markerHtml,
    className: 'leaflet-custom-marker-parent',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  L.marker(data.coords, { icon: customIcon }).addTo(miniMap);
}
