// User Dashboard Page JavaScript Logic

// Mock Datasets
let upcomingAppointments = [
  {
    id: "appt-101",
    token: "#07",
    clinicName: "Metro Care General Clinic",
    doctorName: "Dr. Arvind Mehta",
    date: "Thursday, 18 June 2026",
    time: "10:30 AM",
    statusBadge: "badge-success",
    statusText: "Confirmed"
  },
  {
    id: "appt-102",
    token: "#12",
    clinicName: "Aero Dental Care Center",
    doctorName: "Dr. Sarah Vance",
    date: "Monday, 22 June 2026",
    time: "02:30 PM",
    statusBadge: "badge-warning",
    statusText: "In Queue"
  }
];

let pastAppointments = [
  {
    id: "appt-99",
    clinicName: "Skin & Cosmetology Hub",
    doctorName: "Dr. Shalini Sen",
    date: "12 May 2026",
    time: "04:30 PM",
    statusBadge: "badge-teal",
    statusText: "Completed",
    diagnosis: "Eczema Treatment"
  },
  {
    id: "appt-98",
    clinicName: "Happy Tails Vet Clinic",
    doctorName: "Dr. Ananya Iyer",
    date: "24 April 2026",
    time: "11:00 AM",
    statusBadge: "badge-teal",
    statusText: "Completed",
    diagnosis: "Puppy Vaccination cycle"
  }
];

let petProfiles = [
  {
    id: "pet-101",
    name: "Rocky",
    species: "dog",
    speciesName: "Dog",
    age: "2 Years",
    breed: "Golden Retriever",
    lastVisit: "24 April 2026",
    vaccineName: "Rabies Booster",
    vaccineStatus: "healthy",
    vaccineBadge: "badge-success",
    vaccineText: "Deworming & Rabies: Healthy"
  },
  {
    id: "pet-102",
    name: "Luna",
    species: "cat",
    speciesName: "Cat",
    age: "1 Year",
    breed: "Persian Cat",
    lastVisit: "08 March 2026",
    vaccineName: "FVRCP Vaccine",
    vaccineStatus: "overdue",
    vaccineBadge: "badge-danger",
    vaccineText: "FVRCP Booster: OVERDUE (5 June)"
  },
  {
    id: "pet-103",
    name: "Coco",
    species: "rabbit",
    speciesName: "Rabbit",
    age: "8 Months",
    breed: "Holland Lop",
    lastVisit: "None",
    vaccineName: "Myxomatosis",
    vaccineStatus: "due-soon",
    vaccineBadge: "badge-warning",
    vaccineText: "Myxomatosis: Due Soon (10 July)"
  }
];

let savedClinics = [
  {
    id: "human-1",
    name: "Metro Care General Clinic",
    type: "General Medicine",
    rating: 4.8,
    distance: 1.2,
    statusText: "Open Today"
  },
  {
    id: "pet-1",
    name: "Happy Tails Vet Clinic",
    type: "Veterinary Care",
    rating: 4.8,
    distance: 1.5,
    statusText: "Open Today"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Check user auth session and update sidebar card
  const sessionData = localStorage.getItem('pawcare_session');
  if (sessionData) {
    const user = JSON.parse(sessionData);
    const nameEl = document.querySelector('.dashboard-user-card h2');
    const avatarEl = document.querySelector('.user-avatar-large');
    
    if (nameEl) nameEl.innerText = user.name;
    if (avatarEl) {
      avatarEl.innerText = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }
    
    // Pre-populate settings inputs
    const setNameInput = document.getElementById('set-name');
    const setEmailInput = document.getElementById('set-email');
    if (setNameInput) setNameInput.value = user.name;
    if (setEmailInput) setEmailInput.value = user.email;
  }

  // Check URL query parameters (cancelled=true)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('cancelled') === 'true') {
    // Alert user
    setTimeout(() => {
      showToast("Appointment slot cancelled successfully. Refund initiated.");
    }, 500);
  }

  // Auto switch active tab if requested (e.g. ?tab=pet-profiles)
  const tabParam = urlParams.get('tab');
  if (tabParam) {
    const tabBtn = document.querySelector(`.dashboard-menu-btn[data-tab="${tabParam}"]`);
    if (tabBtn) {
      setTimeout(() => {
        tabBtn.click();
      }, 80);
    }
  }

  // Render all cards
  renderAppointments();
  renderPetProfiles();
  renderSavedClinics();

  // Sidebar Menu Tab switcher
  const menuButtons = document.querySelectorAll('.dashboard-menu-btn');
  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      menuButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panelId = `panel-${btn.dataset.tab}`;
      const panel = document.getElementById(panelId);
      if (panel) panel.classList.add('active');
    });
  });

  // Setup Add Pet Profile modal controls
  const addPetCardBtn = document.getElementById('add-pet-card-trigger');
  const addPetModal = document.getElementById('add-pet-modal');
  const closePetModal = document.getElementById('close-pet-modal');
  const petForm = document.getElementById('add-pet-details-form');

  if (addPetCardBtn && addPetModal && closePetModal) {
    addPetCardBtn.addEventListener('click', () => {
      addPetModal.classList.add('active');
    });

    closePetModal.addEventListener('click', () => {
      addPetModal.classList.remove('active');
    });

    // Close on background click
    addPetModal.addEventListener('click', (e) => {
      if (e.target === addPetModal) {
        addPetModal.classList.remove('active');
      }
    });
  }

  // Handle Form Submission
  if (petForm) {
    petForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('new-pet-name').value.trim();
      const species = document.getElementById('new-pet-species').value;
      const breed = document.getElementById('new-pet-breed').value.trim();
      const age = document.getElementById('new-pet-age').value.trim();
      const vaccineType = document.getElementById('new-pet-vaccine').value;

      if (!name || species === 'all' || !breed || !age) {
        showToast("Please fill in all pet profile fields.");
        return;
      }

      // Generate Vaccine tag details
      let vText = "Vaccination Up to Date";
      let vBadge = "badge-success";
      let vStatus = "healthy";

      if (vaccineType === 'due') {
        vText = "Booster Vaccine: Due Soon (July 2026)";
        vBadge = "badge-warning";
        vStatus = "due-soon";
      } else if (vaccineType === 'overdue') {
        vText = "Rabies Shot: OVERDUE (Expired)";
        vBadge = "badge-danger";
        vStatus = "overdue";
      }

      // Add to array
      const newPet = {
        id: `pet-${Date.now()}`,
        name: name,
        species: species,
        speciesName: species.charAt(0).toUpperCase() + species.slice(1),
        age: age,
        breed: breed,
        lastVisit: "None",
        vaccineName: "General Vaccine",
        vaccineStatus: vStatus,
        vaccineBadge: vBadge,
        vaccineText: vText
      };

      petProfiles.unshift(newPet);
      renderPetProfiles();
      
      // Reset & Close
      petForm.reset();
      addPetModal.classList.remove('active');
      showToast(`${name}'s profile has been created successfully!`);
    });
  }
});

// Render Upcoming & Past Appointments lists
function renderAppointments() {
  const upcomingBox = document.getElementById('upcoming-appointments-list');
  const pastBox = document.getElementById('past-appointments-list');

  // 1. Upcoming Appointments
  if (upcomingBox) {
    if (upcomingAppointments.length === 0) {
      upcomingBox.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; border: 1px dashed var(--border-color); border-radius: var(--radius-md); background-color: var(--white); color: var(--text-grey);">
          <i class="fa-solid fa-calendar-xmark" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
          <p>No upcoming appointments found.</p>
        </div>
      `;
    } else {
      upcomingBox.innerHTML = upcomingAppointments.map(appt => `
        <div class="sidebar-clinic-item" style="cursor: default; margin-bottom: 1rem;" id="card-${appt.id}">
          <div class="clinic-item-header">
            <div class="clinic-item-title">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-grey);">TOKEN ${appt.token}</span>
              <h3>${appt.clinicName}</h3>
              <div class="clinic-item-meta" style="margin-top: 0.25rem;">
                <span><i class="fa-solid fa-user-doctor"></i> ${appt.doctorName}</span>
                <span><i class="fa-solid fa-clock"></i> ${appt.date} at ${appt.time}</span>
              </div>
            </div>
            <span class="badge ${appt.statusBadge}">${appt.statusText}</span>
          </div>
          <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 0.5rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
            <button class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; border-radius: var(--radius-sm);" onclick="viewApptDetails('${appt.id}')">View Details</button>
            <button class="btn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; border-radius: var(--radius-sm); background-color: #FEE2E2; color: var(--emergency-red); border: none;" onclick="cancelUpcomingAppt('${appt.id}')">Cancel Appointment</button>
          </div>
        </div>
      `).join('');
    }
  }

  // 2. Past Appointments
  if (pastBox) {
    pastBox.innerHTML = pastAppointments.map(appt => `
      <div class="sidebar-clinic-item" style="cursor: default; margin-bottom: 1rem; border-left: 4px solid var(--border-color);">
        <div class="clinic-item-header">
          <div class="clinic-item-title">
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-grey);">${appt.date}</span>
            <h3 style="font-size: 1.05rem;">${appt.clinicName}</h3>
            <div class="clinic-item-meta" style="margin-top: 0.2rem;">
              <span><i class="fa-solid fa-user-doctor"></i> ${appt.doctorName}</span>
              <span><i class="fa-solid fa-notes-medical"></i> Diagnosis: ${appt.diagnosis}</span>
            </div>
          </div>
          <span class="badge ${appt.statusBadge}">${appt.statusText}</span>
        </div>
        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 0.5rem;">
          <button class="btn btn-outline-teal" style="padding: 0.35rem 0.75rem; font-size: 0.8rem; border-radius: var(--radius-sm);" onclick="showToast('Loading digital prescription...')"><i class="fa-solid fa-file-invoice-dollar"></i> Receipt & Rx</button>
        </div>
      </div>
    `).join('');
  }
}

// Render Pet Profiles tab
function renderPetProfiles() {
  const grid = document.getElementById('pet-profiles-grid');
  if (!grid) return;

  let profileHtml = petProfiles.map(pet => {
    let petIcon = "fa-dog";
    if (pet.species === "cat") petIcon = "fa-cat";
    if (pet.species === "rabbit") petIcon = "fa-otter";
    if (pet.species === "bird") petIcon = "fa-crow";

    return `
      <div class="pet-profile-card">
        <div class="pet-card-header">
          <div class="pet-avatar-circle">
            <i class="fa-solid ${petIcon}"></i>
          </div>
          <div>
            <h3 style="font-size: 1.15rem; margin-bottom: 0.15rem;">${pet.name}</h3>
            <span class="badge badge-purple" style="font-size: 0.75rem; padding: 0.1rem 0.4rem;">${pet.speciesName} • ${pet.breed}</span>
          </div>
        </div>
        <div class="pet-card-body">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-grey); margin-bottom: 0.5rem;">
            <span>Age: <strong>${pet.age}</strong></span>
            <span>Last Visit: <strong>${pet.lastVisit}</strong></span>
          </div>
          <div class="vaccine-due-alert">
            <span style="color: var(--text-grey);">Vaccines:</span>
            <span class="alert-tag ${pet.vaccineBadge}">${pet.vaccineText}</span>
          </div>
        </div>
        <button class="btn btn-outline-teal" style="width: 100%; font-size: 0.85rem; padding: 0.5rem; border-color: #8B5CF6; color: #8B5CF6;" onclick="window.location.href='find.html?type=pet'">
          <i class="fa-solid fa-calendar-plus"></i> Book Vet Visit
        </button>
      </div>
    `;
  }).join('');

  // Add the Create Card box at the end
  grid.innerHTML = profileHtml + `
    <div id="add-pet-card-trigger" style="border: 2px dashed var(--border-color); border-radius: var(--radius-lg); background-color: var(--light-grey); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem; cursor: pointer; transition: var(--transition-normal); text-align: center;">
      <i class="fa-solid fa-circle-plus" style="font-size: 3rem; color: var(--text-grey); margin-bottom: 1rem;"></i>
      <h3 style="font-size: 1.2rem; color: var(--text-dark); margin-bottom: 0.25rem;">Add Pet Profile</h3>
      <p style="font-size: 0.8rem; color: var(--text-grey);">Create medical vaccine cards for dogs, cats, or exotic animals.</p>
    </div>
  `;

  // Re-bind the click event because we wiped the DOM
  const addPetCardBtn = document.getElementById('add-pet-card-trigger');
  const addPetModal = document.getElementById('add-pet-modal');
  if (addPetCardBtn && addPetModal) {
    addPetCardBtn.addEventListener('click', () => {
      addPetModal.classList.add('active');
    });
  }
}

// Render Saved Clinics bookmarked grid
function renderSavedClinics() {
  const container = document.getElementById('saved-clinics-grid');
  if (!container) return;

  if (savedClinics.length === 0) {
    container.innerHTML = `
      <div style="grid-column: span 2; padding: 3rem; text-align: center; border: 1px dashed var(--border-color); border-radius: var(--radius-md); background-color: var(--white); color: var(--text-grey);">
        <i class="fa-solid fa-heart-crack" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
        <p>No saved clinics found.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = savedClinics.map(clinic => `
    <div class="clinic-card" id="saved-${clinic.id}" style="margin-bottom: 1rem;">
      <div class="clinic-content">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span class="clinic-type">${clinic.type}</span>
            <h3 class="clinic-name" style="font-size: 1.15rem; margin-top: 0.15rem;">${clinic.name}</h3>
            <p style="font-size: 0.8rem; color: var(--text-grey);"><i class="fa-solid fa-location-dot"></i> ${clinic.distance} km away • ${clinic.statusText}</p>
          </div>
          <div class="clinic-rating">
            <i class="fa-solid fa-star"></i> ${clinic.rating}
          </div>
        </div>
        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.25rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
          <button class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="removeSavedClinic('${clinic.id}')">Remove</button>
          <a href="clinic.html?id=${clinic.id}" class="btn btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">Book Clinic</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Interactive cancellation triggers
window.cancelUpcomingAppt = function(apptId) {
  const doubleCheck = confirm("Are you sure you want to cancel this appointment slot?");
  if (doubleCheck) {
    upcomingAppointments = upcomingAppointments.filter(a => a.id !== apptId);
    renderAppointments();
    showToast("Appointment cancelled successfully.");
  }
};

window.viewApptDetails = function(apptId) {
  const appt = upcomingAppointments.find(a => a.id === apptId);
  if (appt) {
    alert(`Appointment Details:\nClinic: ${appt.clinicName}\nDoctor: ${appt.doctorName}\nSchedule: ${appt.date} at ${appt.time}\nToken Number: ${appt.token}\nStatus: ${appt.statusText}`);
  }
};

// Interactive saved list triggers
window.removeSavedClinic = function(clinicId) {
  savedClinics = savedClinics.filter(c => c.id !== clinicId);
  renderSavedClinics();
  showToast("Clinic removed from saved bookmarks.");
};
