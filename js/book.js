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
    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-center border-b border-slate-200/50 dark:border-white/10 pb-4">
        <h4 class="font-headline-md text-base font-extrabold text-on-surface">${bookingParams.clinicName}</h4>
        <a href="${editLink}" class="text-xs font-bold text-primary hover:underline flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">edit</span> Edit</a>
      </div>
      <div class="flex justify-between items-center text-xs font-semibold">
        <span class="text-on-surface-variant">Specialist</span>
        <span class="text-on-surface font-extrabold">${bookingParams.doctorName}</span>
      </div>
      <div class="flex justify-between items-center text-xs font-semibold">
        <span class="text-on-surface-variant">Schedule</span>
        <span class="text-on-surface font-extrabold">${bookingParams.date} at ${bookingParams.slot}</span>
      </div>
      <div class="flex justify-between items-center text-xs font-semibold">
        <span class="text-on-surface-variant">Lobby Queue</span>
        <span class="text-on-surface font-extrabold">Token #${bookingParams.queue}</span>
      </div>
      <div class="flex justify-between items-center text-xs font-semibold">
        <span class="text-on-surface-variant">Lobby Est. Wait</span>
        <span class="text-on-surface font-extrabold">${bookingParams.wait}</span>
      </div>
      
      <div class="border-t border-slate-200/50 dark:border-white/10 pt-4 mt-2">
        <h4 class="font-headline-md text-xs font-extrabold text-on-surface uppercase tracking-wider mb-3">Consultation Fees</h4>
        <div class="flex justify-between items-center text-xs font-semibold mb-2">
          <span class="text-on-surface-variant">OPD Fee</span>
          <span class="text-on-surface">₹200.00</span>
        </div>
        <div class="flex justify-between items-center text-xs font-semibold mb-3">
          <span class="text-on-surface-variant">Booking Charge & GST</span>
          <span class="text-on-surface">₹18.00</span>
        </div>
        <div class="flex justify-between items-center font-bold text-sm border-t border-dashed border-slate-200/80 dark:border-white/20 pt-3 mt-1">
          <span class="text-on-surface">Total Payable</span>
          <span class="${bookingParams.isPet ? 'text-purple-600 dark:text-purple-400' : 'text-primary'} font-extrabold text-base" id="summary-total-fee">₹218.00</span>
        </div>
      </div>
    </div>
  `;
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
    document.body.classList.remove('pet-mode-active');
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
    document.body.classList.add('pet-mode-active');
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
