// Booking Details Form Page JavaScript Logic
let bookingParams = {
  clinicId: "human-1",
  clinicName: "Metro Care General Clinic",
  doctorName: "Dr. Arvind Mehta",
  date: "",
  slot: "",
  queue: "7",
  wait: "~35 minutes",
  isPet: false
};

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL Parameters
  const urlParams = new URLSearchParams(window.location.search);
  bookingParams.clinicId = urlParams.get('clinicId') || "human-1";
  bookingParams.clinicName = urlParams.get('clinicName') || "Metro Care General Clinic";
  bookingParams.doctorName = urlParams.get('doctorName') || "Dr. Arvind Mehta";
  bookingParams.date = urlParams.get('date') || "Today";
  bookingParams.slot = urlParams.get('slot') || "10:30 AM";
  bookingParams.queue = urlParams.get('queue') || "7";
  bookingParams.wait = urlParams.get('wait') || "~35 minutes";
  bookingParams.isPet = urlParams.get('isPet') === "true";

  // Render Sidebar Summary Card
  renderBookingSummary();

  // Elements
  const toggleHuman = document.getElementById('book-toggle-human');
  const togglePet = document.getElementById('book-toggle-pet');
  const humanForm = document.getElementById('form-human-fields');
  const petForm = document.getElementById('form-pet-fields');
  const payOnlineBtn = document.getElementById('pay-online-btn');
  const payClinicBtn = document.getElementById('pay-clinic-btn');

  // Set default form toggle state based on URL param
  if (bookingParams.isPet) {
    setBookingMode('pet', toggleHuman, togglePet, humanForm, petForm, payOnlineBtn, payClinicBtn);
  } else {
    setBookingMode('human', toggleHuman, togglePet, humanForm, petForm, payOnlineBtn, payClinicBtn);
  }

  // Pre-fill fields if user is signed in
  const sessionData = localStorage.getItem('pawcare_session');
  if (sessionData) {
    const userObj = JSON.parse(sessionData);
    const patName = document.getElementById('patient-name');
    const patEmail = document.getElementById('patient-email');
    const ownName = document.getElementById('pet-owner-name');
    
    if (patName) patName.value = userObj.name;
    if (patEmail) patEmail.value = userObj.email;
    if (ownName) ownName.value = userObj.name;
  }

  // Handle manual toggle switches
  toggleHuman.addEventListener('click', () => {
    setBookingMode('human', toggleHuman, togglePet, humanForm, petForm, payOnlineBtn, payClinicBtn);
  });
  togglePet.addEventListener('click', () => {
    setBookingMode('pet', toggleHuman, togglePet, humanForm, petForm, payOnlineBtn, payClinicBtn);
  });

  // Handle Checkout actions
  payOnlineBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateForm()) {
      proceedToConfirmation('online');
    }
  });

  payClinicBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateForm()) {
      proceedToConfirmation('clinic');
    }
  });
});

// Update Right Sticky summary card
function renderBookingSummary() {
  const summaryBox = document.getElementById('booking-details-summary');
  if (!summaryBox) return;

  const editLink = `clinic.html?id=${bookingParams.clinicId}`;

  summaryBox.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
        <h4 style="font-size: 1.1rem; font-weight: 700;">${bookingParams.clinicName}</h4>
        <a href="${editLink}" style="font-size: 0.85rem; color: var(--primary-teal); font-weight: 600; text-decoration: underline;"><i class="fa-solid fa-pen-to-square"></i> Edit</a>
      </div>
      <div class="booking-summary-row">
        <span class="label">Specialist</span>
        <span class="val">${bookingParams.doctorName}</span>
      </div>
      <div class="booking-summary-row">
        <span class="label">Schedule</span>
        <span class="val">${bookingParams.date} at ${bookingParams.slot}</span>
      </div>
      <div class="booking-summary-row">
        <span class="label">Lobby Queue</span>
        <span class="val">Token #${bookingParams.queue}</span>
      </div>
      <div class="booking-summary-row">
        <span class="label">Lobby Est. Wait</span>
        <span class="val">${bookingParams.wait}</span>
      </div>
      
      <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: 0.5rem;">
        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem;">Consultation Fees</h4>
        <div class="booking-summary-row">
          <span class="label">OPD Fee</span>
          <span class="val">₹200.00</span>
        </div>
        <div class="booking-summary-row">
          <span class="label">Booking Charge & GST</span>
          <span class="val">₹18.00</span>
        </div>
        <div class="booking-summary-row" style="border-top: 1px dashed var(--border-color); padding-top: 0.5rem; margin-top: 0.5rem; font-size: 1.1rem; font-weight: 700;">
          <span>Total Payable</span>
          <span style="color: var(--primary-teal);" id="summary-total-fee">₹218.00</span>
        </div>
      </div>
    </div>
  `;

  if (bookingParams.isPet) {
    const totalFee = document.getElementById('summary-total-fee');
    if (totalFee) totalFee.style.color = "#8B5CF6";
  }
}

// Switches form layouts between Patient and Pet
function setBookingMode(mode, toggleH, toggleP, formH, formP, btnOnline, btnClinic) {
  if (mode === 'human') {
    toggleH.classList.add('active');
    toggleH.classList.remove('pet-mode');
    toggleP.classList.remove('active', 'pet-mode');
    
    formH.style.display = 'grid';
    formP.style.display = 'none';

    // Style buttons back to primary Teal
    btnOnline.style.backgroundColor = "var(--primary-teal)";
    btnOnline.style.borderColor = "var(--primary-teal)";
    btnOnline.classList.remove('pet-bg');
    
    bookingParams.isPet = false;
  } else {
    toggleP.classList.add('active', 'pet-mode');
    toggleH.classList.remove('active');
    
    formP.style.display = 'grid';
    formH.style.display = 'none';

    // Style buttons to Purple
    btnOnline.style.backgroundColor = "#8B5CF6";
    btnOnline.style.borderColor = "#8B5CF6";
    btnOnline.classList.add('pet-bg');
    
    bookingParams.isPet = true;
  }
  
  // Re-run summary render to update coloring
  renderBookingSummary();
}

// Client field validation
function validateForm() {
  const isPetForm = bookingParams.isPet;
  let isValid = true;
  let message = "";

  if (isPetForm) {
    const petName = document.getElementById('pet-name').value.trim();
    const species = document.getElementById('pet-species').value;
    const breed = document.getElementById('pet-breed').value.trim();
    const age = document.getElementById('pet-age').value.trim();
    const ownerName = document.getElementById('pet-owner-name').value.trim();
    const ownerPhone = document.getElementById('pet-owner-phone').value.trim();

    if (!petName || species === 'all' || !breed || !age || !ownerName || !ownerPhone) {
      isValid = false;
      message = "Please fill in all veterinary patient details.";
    }
  } else {
    const name = document.getElementById('patient-name').value.trim();
    const age = document.getElementById('patient-age').value.trim();
    const gender = document.getElementById('patient-gender').value;
    const phone = document.getElementById('patient-phone').value.trim();
    const email = document.getElementById('patient-email').value.trim();

    if (!name || !age || gender === 'all' || !phone || !email) {
      isValid = false;
      message = "Please fill in all human patient details.";
    }
  }

  if (!isValid) {
    showToast(message);
    return false;
  }

  // Verify Checkboxes
  const check1 = document.getElementById('check-early').checked;
  const check2 = document.getElementById('check-reports').checked;
  const check3 = document.getElementById('check-confirmed').checked;

  if (!check1 || !check2 || !check3) {
    showToast("Please acknowledge the pre-visit guidelines checklists.");
    return false;
  }

  return true;
}

// Redirects to confirmed page
function proceedToConfirmation(paymentType) {
  const isPet = bookingParams.isPet;
  let patientName = "";
  if (isPet) {
    patientName = document.getElementById('pet-name').value;
  } else {
    patientName = document.getElementById('patient-name').value;
  }

  const params = new URLSearchParams({
    clinicName: bookingParams.clinicName,
    doctorName: bookingParams.doctorName,
    date: bookingParams.date,
    slot: bookingParams.slot,
    queue: bookingParams.queue,
    wait: bookingParams.wait,
    isPet: isPet ? "true" : "false",
    patientName: patientName,
    payment: paymentType
  });

  window.location.href = `confirmed.html?${params.toString()}`;
}
