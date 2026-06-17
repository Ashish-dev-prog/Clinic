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
    bannerBadges: ["General Clinic", "Diagnostics", "24/7 ER Available"],
    stats: [
      { icon: "fa-user-injured", val: "25k+", label: "Patients Treated" },
      { icon: "fa-users", val: "8", label: "Specialists" },
      { icon: "fa-certificate", val: "NABL", label: "Accredited" },
      { icon: "fa-clock", val: "24 Hours", label: "Emergency" }
    ],
    doctors: [
      { id: "doc-1", name: "Dr. Arvind Mehta", specialty: "Senior Consultant, General Medicine", exp: "18 Yrs Exp", avatar: "images/doctor_avatar.png", badge: "Senior Consultant", fee: "₹500", avail: "Today, 10:30 AM" },
      { id: "doc-2", name: "Dr. Shalini Sen", specialty: "Consulting Pediatrician", exp: "12 Yrs Exp", avatar: "images/doctor_avatar.png", badge: "Pediatric Expert", fee: "₹600", avail: "Today, 11:00 AM" },
      { id: "doc-3", name: "Dr. Kabir Malhotra", specialty: "General Physician & Immunologist", exp: "8 Yrs Exp", avatar: "images/doctor_avatar.png", badge: "Physician & Immunologist", fee: "₹450", avail: "Today, 12:30 PM" }
    ],
    driveTime: "10 min drive from you",
    driveDesc: "Fastest route via Inner Ring Rd. Valet parking available.",
    openMapsUrl: "https://maps.google.com/?q=Connaught+Place+New+Delhi",
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
    bannerBadges: ["Dental Clinic", "Orthodontics", "Implants"],
    stats: [
      { icon: "fa-tooth", val: "10k+", label: "Teeth Cleaned" },
      { icon: "fa-users", val: "5", label: "Specialists" },
      { icon: "fa-certificate", val: "IDA", label: "Accredited" },
      { icon: "fa-clock", val: "9 AM - 8 PM", label: "Working Hours" }
    ],
    doctors: [
      { id: "doc-4", name: "Dr. Sarah Vance", specialty: "Senior Endodontist", exp: "14 Yrs Exp", avatar: "images/doctor_avatar.png", badge: "Senior Endodontist", fee: "₹700", avail: "Today, 11:30 AM" },
      { id: "doc-5", name: "Dr. Rohan Goel", specialty: "Cosmetic Orthodontist", exp: "10 Yrs Exp", avatar: "images/doctor_avatar.png", badge: "Orthodontist", fee: "₹650", avail: "Today, 02:30 PM" }
    ],
    driveTime: "8 min drive from you",
    driveDesc: "Fastest route via Radial Rd 4. Parking available on-site.",
    openMapsUrl: "https://maps.google.com/?q=Connaught+Place+New+Delhi",
    slots: {
      morning: ["09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
      afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "02:30 PM", "03:30 PM", "04:00 PM", "04:30 PM"],
      evening: ["05:00 PM", "05:30 PM", "06:00 PM", "07:00 PM", "07:30 PM", "08:00 PM"]
    }
  },
  "pet-1": {
    name: "Starlight Holistic Vet Care",
    type: "Veterinary Care",
    isPet: true,
    address: "42 Wellness Drive, Serenity Park, NY 10023",
    rating: 4.9,
    reviewsCount: 128,
    statusText: "Open • Vet On-Duty Today",
    statusBadge: "badge-success",
    phone: "+1 (555) 876-5432",
    coords: [28.6284, 77.2177],
    about: "Starlight Holistic Vet Care combines the rigor of modern veterinary medicine with an empathetic, wellness-first approach. Founded in 2012, our clinic has served over 15,000 pets with a focus on preventative care, advanced diagnostics, and surgical excellence. Our team of specialists is dedicated to creating a low-stress environment where your pets feel safe and loved.",
    services: ["Preventative Care", "Advanced Diagnostics", "Surgical Excellence", "Grooming & Hygiene", "General Pet Surgery", "Nutritional Counseling"],
    facilities: [
      { icon: "fa-parking", name: "Free Parking" },
      { icon: "fa-wind", name: "Air Conditioned" },
      { icon: "fa-wheelchair", name: "Wheelchair Access" },
      { icon: "fa-credit-card", name: "UPI & Cards Accepted" }
    ],
    bannerBadges: ["24/7 Care", "Surgery Center", "Grooming"],
    stats: [
      { icon: "fa-paw", val: "15k+", label: "Pets Treated" },
      { icon: "fa-users", val: "12", label: "Specialists" },
      { icon: "fa-certificate", val: "AAHA", label: "Certified" },
      { icon: "fa-clock", val: "24/7", label: "Emergency" }
    ],
    doctors: [
      { id: "doc-6", name: "Dr. Elena Vance", specialty: "Senior Veterinarian", exp: "18 yrs experience", avatar: "images/doctor_avatar.png", badge: "Primary Vet", fee: "$120", avail: "Today, 10:00 AM" },
      { id: "doc-7", name: "Dr. Arvind Mehta", specialty: "Holistic Health Specialist", exp: "15 yrs experience", avatar: "images/doctor_avatar.png", badge: "Holistic Expert", fee: "$100", avail: "Today, 11:30 AM" }
    ],
    driveTime: "12 min drive from you",
    driveDesc: "Fastest route via Central Ave. Parking available on-site.",
    openMapsUrl: "https://maps.google.com/?q=42+Wellness+Drive+Serenity+Park+NY",
    slots: {
      morning: ["08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
      afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"],
      evening: ["04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"]
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
    bannerBadges: ["24/7 ER Hospital", "Trauma Care", "ICU Support"],
    stats: [
      { icon: "fa-paw", val: "20k+", label: "Emergency Cases" },
      { icon: "fa-users", val: "15", label: "ER Surgeons" },
      { icon: "fa-certificate", val: "VECCS", label: "Certified" },
      { icon: "fa-clock", val: "24 Hours", label: "Emergency ER" }
    ],
    doctors: [
      { id: "doc-8", name: "Dr. Vivek Sen", specialty: "ER Trauma Vet Expert", exp: "20 Yrs Exp", avatar: "images/doctor_avatar.png", badge: "ER Trauma Expert", fee: "₹800", avail: "Today, 10:30 AM" },
      { id: "doc-9", name: "Dr. Riya Kapoor", specialty: "Critical Care Specialist", exp: "9 Yrs Exp", avatar: "images/doctor_avatar.png", badge: "Critical Care", fee: "₹750", avail: "Today, 12:00 PM" }
    ],
    driveTime: "15 min drive from you",
    driveDesc: "Fastest route via Connaught Circus. Ambulance support available.",
    openMapsUrl: "https://maps.google.com/?q=Connaught+Place+New+Delhi",
    slots: {
      morning: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
      afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "04:30 PM"],
      evening: ["05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"]
    }
  }
};

// Global Selector States
let selectedClinicId = "human-1"; // fallback
let activeTab = "overview"; // default view to About/Overview
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
  } else if (idParam === "pet-1") {
    selectedClinicId = "pet-1";
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
      updateSidebarDoctorCard(e.target.value);
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

  // Render map immediately
  setTimeout(() => {
    initMiniMap();
  }, 100);
});

// Render Static Page Profile Header, Overview, Doctors & Location Map
function renderClinicDetails() {
  const data = clinicProfiles[selectedClinicId];
  if (!data) return;

  // Header Elements
  document.getElementById('profile-title').innerText = data.name;
  document.getElementById('profile-address').innerHTML = `<i class="fa-solid fa-location-dot" style="color: ${data.isPet ? '#8B5CF6' : 'var(--accent-green)'}"></i> ${data.address}`;
  
  // Rating stars & reviews count
  let headerStarsHtml = "";
  const floorHeaderRating = Math.floor(data.rating);
  for (let i = 0; i < floorHeaderRating; i++) {
    headerStarsHtml += `<i class="fa-solid fa-star"></i>`;
  }
  if (data.rating % 1 !== 0) {
    headerStarsHtml += `<i class="fa-solid fa-star-half-stroke"></i>`;
  }
  document.getElementById('profile-rating-span').innerHTML = `${headerStarsHtml} <span style="margin-left: 0.25rem;">${data.rating} (${data.reviewsCount} reviews)</span>`;
  
  // Render Banner Badges
  const badgesBox = document.getElementById('banner-badges-container');
  if (badgesBox && data.bannerBadges) {
    badgesBox.innerHTML = data.bannerBadges.map(badge => `
      <span class="badge" style="background: rgba(255, 255, 255, 0.25); color: #FFFFFF; backdrop-filter: blur(8px); padding: 0.5rem 1rem; border: none; font-weight: 700; border-radius: var(--radius-sm);">${badge}</span>
    `).join('');
  }

  // Dynamic Background Image load
  const banner = document.getElementById('profile-banner');
  if (banner) {
    if (data.isPet) {
      banner.style.backgroundImage = "url('images/hero_clinic.png')";
    } else {
      banner.style.backgroundImage = "url('images/clinic_banner.png')";
    }
    banner.style.backgroundSize = "cover";
    banner.style.backgroundPosition = "center";
  }

  // Theme styling overrides for Pet vs Human clinic
  if (data.isPet) {
    document.getElementById('proceed-booking-btn').style.backgroundColor = "#8B5CF6";
    document.getElementById('proceed-booking-btn').style.borderColor = "#8B5CF6";
    document.body.classList.add('pet-mode-active');
  } else {
    document.getElementById('proceed-booking-btn').style.backgroundColor = "var(--primary-teal)";
    document.getElementById('proceed-booking-btn').style.borderColor = "var(--primary-teal)";
    document.body.classList.remove('pet-mode-active');
  }

  // Overview Tab details (About)
  document.getElementById('about-text').innerText = data.about;
  
  // Render Dynamic Stats Grid
  const statsBox = document.getElementById('about-stats-box');
  if (statsBox && data.stats) {
    statsBox.innerHTML = data.stats.map(s => `
      <div class="glass-card p-4 rounded-2xl border border-white/40 dark:border-white/10 text-center flex flex-col items-center gap-1 bg-white/40 dark:bg-white/5">
        <i class="fa-solid ${s.icon} text-lg mb-1" style="color: ${data.isPet ? '#8B5CF6' : 'var(--primary-teal)'};"></i>
        <span class="text-base font-extrabold text-on-surface leading-tight">${s.val}</span>
        <span class="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">${s.label}</span>
      </div>
    `).join('');
  }

  // Set Legend Colors
  const legendColor = document.getElementById('legend-avail-color');
  const legendLbl = document.getElementById('legend-avail-lbl');
  if (legendColor && legendLbl) {
    if (data.isPet) {
      legendColor.style.backgroundColor = 'rgba(139, 92, 246, 0.08)';
      legendColor.style.borderColor = '#8B5CF6';
      legendLbl.style.color = '#8B5CF6';
    } else {
      legendColor.style.backgroundColor = 'var(--light-teal-bg)';
      legendColor.style.borderColor = 'var(--primary-teal)';
      legendLbl.style.color = 'var(--primary-teal)';
    }
  }

  // Render Reviews tab elements
  const reviewsTabBtn = document.getElementById('reviews-tab-btn');
  const reviewsRatingBig = document.getElementById('reviews-rating-big');
  const reviewsCountBig = document.getElementById('reviews-count-big');
  const reviewsStars = document.getElementById('reviews-rating-stars');
  
  if (reviewsTabBtn) reviewsTabBtn.innerText = `Reviews (${data.reviewsCount})`;
  if (reviewsRatingBig) reviewsRatingBig.innerText = data.rating;
  if (reviewsCountBig) reviewsCountBig.innerText = `${data.reviewsCount} reviews`;
  if (reviewsStars) reviewsStars.innerHTML = headerStarsHtml;

  const reviewsCardsBox = document.getElementById('reviews-cards-list');
  if (reviewsCardsBox) {
    if (data.isPet) {
      reviewsCardsBox.innerHTML = `
        <div class="pb-6 border-b border-slate-200/50 dark:border-white/10 last:border-b-0 last:pb-0">
          <div class="flex justify-between items-center mb-1">
            <h4 class="font-bold text-sm text-on-surface">Sarah Miller</h4>
            <span class="text-xs text-on-surface-variant/75">15 June 2026</span>
          </div>
          <div class="text-amber-500 text-xs mb-2 flex gap-0.5">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">"Starlight has the most caring veterinary team I have ever encountered. Dr. Elena Vance took her time checking Rocky and explained the preventive steps so well."</p>
        </div>
        <div class="pb-6 border-b border-slate-200/50 dark:border-white/10 last:border-b-0 last:pb-0">
          <div class="flex justify-between items-center mb-1">
            <h4 class="font-bold text-sm text-on-surface">James Henderson</h4>
            <span class="text-xs text-on-surface-variant/75">5 June 2026</span>
          </div>
          <div class="text-amber-500 text-xs mb-2 flex gap-0.5">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">"Very clean and calm environment. My cat Luna is usually extremely anxious during vet visits, but the low-stress lobby design worked like a charm."</p>
        </div>
      `;
    } else {
      reviewsCardsBox.innerHTML = `
        <div class="pb-6 border-b border-slate-200/50 dark:border-white/10 last:border-b-0 last:pb-0">
          <div class="flex justify-between items-center mb-1">
            <h4 class="font-bold text-sm text-on-surface">Meera Vasudevan</h4>
            <span class="text-xs text-on-surface-variant/75">12 June 2026</span>
          </div>
          <div class="text-amber-500 text-xs mb-2 flex gap-0.5">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">"Dr. Arvind Mehta is incredibly patient and answered all my health queries with great clarity. Booking system was completely visual and smooth."</p>
        </div>
      `;
    }
  }

  // Location & driving directions updates
  document.getElementById('location-drive-time').innerText = data.driveTime || "12 min drive from you";
  document.getElementById('location-drive-desc').innerText = data.driveDesc || "Fastest route via Central Ave. Parking available on-site.";
  if (data.isPet) {
    document.getElementById('location-drive-icon').style.color = '#8B5CF6';
  } else {
    document.getElementById('location-drive-icon').style.color = 'var(--primary-teal)';
  }
  const openMapsLink = document.getElementById('open-maps-link');
  if (openMapsLink && data.openMapsUrl) {
    openMapsLink.href = data.openMapsUrl;
  }
  
  // Services
  const servicesBox = document.getElementById('services-list-container');
  servicesBox.innerHTML = data.services.map(s => `<span class="px-3.5 py-1.5 rounded-full font-label-sm text-label-sm bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 text-on-surface-variant">${s}</span>`).join('');

  // Facilities
  const facilitiesBox = document.getElementById('facilities-list-container');
  facilitiesBox.innerHTML = data.facilities.map(f => `
    <div class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 font-semibold text-xs text-on-surface-variant">
      <i class="fa-solid ${f.icon}" style="color: ${data.isPet ? '#8B5CF6' : 'var(--primary-teal)'}"></i>
      <span>${f.name}</span>
    </div>
  `).join('');

  // Doctors
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
  `;
  
  doctorsTimeout = setTimeout(() => {
    doctorsBox.innerHTML = data.doctors.map(doc => `
      <div class="glass-card p-4 rounded-2xl border border-white/40 dark:border-white/10 flex gap-4 items-center animate-fade-in-up">
        <div class="w-14 h-14 rounded-xl bg-cover bg-center border border-white/60 shadow-sm flex-shrink-0" style="background-image: url('${doc.avatar}');"></div>
        <div class="flex-grow">
          <h4 class="font-headline-md text-sm font-bold text-on-surface leading-tight">${doc.name}</h4>
          <p class="text-xs text-on-surface-variant font-medium mt-1">${doc.specialty} • <strong class="text-primary font-bold">${doc.exp}</strong></p>
        </div>
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-600 flex items-center gap-1"><span class="material-symbols-outlined text-[12px] fill-green-600">check_circle</span> Available</span>
      </div>
    `).join('');
  }, 600);

  // Populate doctors dropdown selector
  docSelect.innerHTML = data.doctors.map(doc => `<option value="${doc.name}">${doc.name}</option>`).join('');
  currentBookingData.doctorName = data.doctors[0].name; // default selection
  
  // Initialize dynamic doctor card details in the sidebar
  updateSidebarDoctorCard(data.doctors[0].name);
}

// Update the Sidebar Doctor card details dynamically
function updateSidebarDoctorCard(doctorName) {
  const data = clinicProfiles[selectedClinicId];
  const doc = data.doctors.find(d => d.name === doctorName) || data.doctors[0];
  
  document.getElementById('sidebar-doctor-name').innerText = doc.name;
  document.getElementById('sidebar-doctor-spec').innerText = doc.specialty;
  document.getElementById('sidebar-doctor-exp').innerHTML = `<i class="fa-solid fa-circle-check"></i> ${doc.exp}`;
  document.getElementById('sidebar-doctor-fee').innerText = doc.fee || "$120";
  document.getElementById('sidebar-doctor-avail').innerText = doc.avail || "Today, 10:00 AM";
  document.getElementById('sidebar-doctor-badge').innerText = doc.badge || (data.isPet ? "Primary Vet" : "Doctor");
  
  // Update sidebar message button
  const msgBtn = document.getElementById('sidebar-message-btn');
  if (msgBtn) {
    const docFirstName = doc.name.split(' ')[0] + ' ' + (doc.name.split(' ')[1] || '');
    msgBtn.innerHTML = `<i class="fa-solid fa-message"></i> Message ${docFirstName.trim()}`;
    if (data.isPet) {
      msgBtn.style.backgroundColor = '#8B5CF6';
      msgBtn.style.borderColor = '#8B5CF6';
    } else {
      msgBtn.style.backgroundColor = 'var(--primary-teal)';
      msgBtn.style.borderColor = 'var(--primary-teal)';
    }
  }

  // Update avatar
  const avatarEl = document.getElementById('sidebar-doctor-avatar');
  if (avatarEl) {
    avatarEl.style.backgroundImage = `url('${doc.avatar || "images/doctor_avatar.png"}')`;
  }

  // Practitioner selector label/icon style
  const practIcon = document.getElementById('practitioner-icon');
  if (practIcon) {
    practIcon.className = `fa-solid ${data.isPet ? 'fa-paw' : 'fa-user-md'}`;
    practIcon.style.color = data.isPet ? '#8B5CF6' : 'var(--primary-teal)';
  }
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
      
      const curMonthEl = document.getElementById('calendar-current-month');
      if (curMonthEl) {
        curMonthEl.innerText = formattedDate;
      }
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
  
  const curMonthEl = document.getElementById('calendar-current-month');
  if (curMonthEl) {
    curMonthEl.innerText = dateStr;
  }
  
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
      
      if (selectedClinicId === "pet-1") {
        // Map exact states from the mockup image for pet-1
        if (selectedTimePeriod === "morning") {
          const morningStates = ["available", "booked", "available", "almost-full", "available", "available", "booked", "available"];
          state = morningStates[idx % morningStates.length];
        } else if (selectedTimePeriod === "afternoon") {
          const afternoonStates = ["closed", "closed", "available", "available", "almost-full", "available", "available", "booked"];
          state = afternoonStates[idx % afternoonStates.length];
        } else if (selectedTimePeriod === "evening") {
          const eveningStates = ["available", "available", "available", "available", "available", "booked", "almost-full", "available"];
          state = eveningStates[idx % eveningStates.length];
        }
      } else {
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
        statusLabel = "Busy"; // Matches mockup label
      } else if (state === "closed") {
        boxClass = "closed";
        statusLabel = "Closed";
        disabledAttr = "disabled";
      }

      // If this slot was selected previously, keep active state
      if (currentBookingData.timeSlot === time) {
        boxClass += " selected";
      }

      // Override colors for pet theme slots
      let customStyle = "";
      if (data.isPet && state === "available") {
        customStyle = `border-color: rgba(139, 92, 246, 0.3); color: #8B5CF6;`;
      }

      return `
        <div class="slot-box ${boxClass} animate-fade-in-up" ${disabledAttr} onclick="selectSlot(this, '${time}', '${state}')" style="animation-delay: ${idx * 0.03}s; ${customStyle}">
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
  
  // Custom theme background for selected slot
  const isPet = clinicProfiles[selectedClinicId].isPet;
  if (isPet) {
    element.style.backgroundColor = "#8B5CF6";
    element.style.borderColor = "#8B5CF6";
  } else {
    element.style.backgroundColor = "var(--primary-teal)";
    element.style.borderColor = "var(--primary-teal)";
  }
  
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
      <div style="text-align: center; color: var(--text-grey); padding: 0.5rem 0;">
        <i class="fa-solid fa-clock" style="font-size: 1.5rem; color: var(--border-color); margin-bottom: 0.35rem;"></i>
        <p style="font-size: 0.85rem; font-weight: 600;">No slot selected yet.</p>
        <p style="font-size: 0.75rem; color: var(--text-grey);">Click an available slot in the calendar grid to proceed.</p>
      </div>
    `;
    if (proceedBtn) proceedBtn.disabled = true;
    return;
  }

  if (proceedBtn) proceedBtn.disabled = false;

  const data = clinicProfiles[selectedClinicId];

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 0.75rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem; font-size: 0.85rem;" class="animate-fade-in">
      <div class="booking-summary-row" style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
        <span class="label" style="color:var(--text-grey);">Practitioner</span>
        <span class="val" style="font-weight:700; color:var(--text-dark);">${currentBookingData.doctorName}</span>
      </div>
      <div class="booking-summary-row" style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
        <span class="label" style="color:var(--text-grey);">Schedule</span>
        <span class="val" style="font-weight:700; color:var(--text-dark);">${currentBookingData.dateText}</span>
      </div>
      <div class="booking-summary-row" style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
        <span class="label" style="color:var(--text-grey);">Time Slot</span>
        <span class="val" style="color: ${data.isPet ? '#8B5CF6' : 'var(--primary-teal)'}; font-weight: 800;">${currentBookingData.timeSlot}</span>
      </div>
      
      <div class="booking-wait-estimator" style="background-color: ${data.isPet ? 'rgba(139, 92, 246, 0.08)' : 'var(--light-teal-bg)'}; border-radius: var(--radius-md); padding: 0.85rem; display: flex; gap: 0.5rem; margin-top: 0.5rem; border: 1px solid var(--border-color);">
        <i class="fa-solid fa-users" style="color: ${data.isPet ? '#8B5CF6' : 'var(--primary-teal)'}; font-size: 1.1rem; margin-top: 0.15rem;"></i>
        <div>
          <h4 style="color: ${data.isPet ? '#8B5CF6' : 'var(--dark-teal)'}; font-size: 0.85rem; font-weight: 750; margin: 0 0 0.15rem 0;">Queue Token Estimation</h4>
          <p style="margin: 0; font-size: 0.75rem; line-height: 1.4; color: var(--text-dark);">You will be <strong>#${currentBookingData.queueNo}</strong> in queue. Lobby wait time: <strong>${currentBookingData.waitTime}</strong>.</p>
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
    zoomControl: false,
    scrollWheelZoom: false
  }).setView(data.coords, 16);

  // CartoDB Dark Matter tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(miniMap);

  // Custom pin Icon
  const markerHtml = `
    <div class="custom-leaflet-marker marker-open marker-${data.isPet ? 'pet' : 'human'}">
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
