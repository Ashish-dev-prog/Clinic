// Map Discovery Page JavaScript Logic
const clinicsData = [
  {
    id: "human-1",
    name: "Metro Care General Clinic",
    type: "general",
    typeName: "General Medicine",
    distance: 1.2,
    rating: 4.8,
    status: "open",
    statusText: "Open • Available",
    nextSlot: "9:30 AM",
    coords: [28.6294, 77.2157],
    isPet: false
  },
  {
    id: "human-2",
    name: "Aero Dental Care Center",
    type: "dental",
    typeName: "Dental Care",
    distance: 2.4,
    rating: 4.7,
    status: "busy",
    statusText: "Busy • 20m Wait",
    nextSlot: "11:30 AM",
    coords: [28.6324, 77.2197],
    isPet: false
  },
  {
    id: "human-3",
    name: "Skin & Cosmetology Hub",
    type: "skin",
    typeName: "Skin & Hair",
    distance: 3.1,
    rating: 4.9,
    status: "open",
    statusText: "Open • Available",
    nextSlot: "2:00 PM",
    coords: [28.6274, 77.2207],
    isPet: false
  },
  {
    id: "human-4",
    name: "Vision Plus Eye Care",
    type: "eye",
    typeName: "Eye Specialist",
    distance: 1.8,
    rating: 4.6,
    status: "closed",
    statusText: "Closed",
    nextSlot: "Tomorrow",
    coords: [28.6334, 77.2237],
    isPet: false
  },
  {
    id: "human-5",
    name: "City Care Hospital & ER",
    type: "emergency",
    typeName: "ER & Hospital",
    distance: 0.8,
    rating: 4.9,
    status: "open",
    statusText: "Open • ICU Available",
    nextSlot: "Immediate",
    coords: [28.6308, 77.2217],
    isPet: false
  },
  {
    id: "human-6",
    name: "OrthoCare Joint Clinic",
    type: "general",
    typeName: "Orthopedics",
    distance: 2.9,
    rating: 4.5,
    status: "busy",
    statusText: "Busy • 15m Wait",
    nextSlot: "12:00 PM",
    coords: [28.6264, 77.2137],
    isPet: false
  },
  {
    id: "pet-1",
    name: "Starlight Holistic Vet Care",
    type: "pet",
    typeName: "Veterinary Care",
    distance: 1.2,
    rating: 4.9,
    status: "open",
    statusText: "Open • Available",
    nextSlot: "10:00 AM",
    coords: [28.6284, 77.2177],
    isPet: true
  },
  {
    id: "pet-2",
    name: "Feline Friends Specialist",
    type: "pet",
    typeName: "Cat Specialist",
    distance: 2.7,
    rating: 4.9,
    status: "open",
    statusText: "Open • Available",
    nextSlot: "11:00 AM",
    coords: [28.6314, 77.2247],
    isPet: true
  },
  {
    id: "pet-3",
    name: "PawCare 24/7 Vet Hospital",
    type: "emergency",
    typeName: "Emergency Vet",
    distance: 1.4,
    rating: 4.7,
    status: "open",
    statusText: "Open • 24/7 ER",
    nextSlot: "Immediate",
    coords: [28.6254, 77.2187],
    isPet: true
  },
  {
    id: "pet-4",
    name: "Exotic Pets Care Clinic",
    type: "pet",
    typeName: "Exotic Pets",
    distance: 3.8,
    rating: 4.6,
    status: "busy",
    statusText: "Busy • 15m Wait",
    nextSlot: "3:30 PM",
    coords: [28.6344, 77.2167],
    isPet: true
  },
  {
    id: "pet-5",
    name: "Bark & Purr Dental Vet",
    type: "pet",
    typeName: "Pet Dentistry",
    distance: 2.2,
    rating: 4.5,
    status: "closed",
    statusText: "Closed",
    nextSlot: "Tomorrow",
    coords: [28.6298, 77.2227],
    isPet: true
  }
];

// Map References
let leafletMap = null;
let mapMarkers = {}; // stores markers indexed by clinic id
let rangeCircle = null;

// Application State
let activeFilter = "all";
let searchKeyword = "";
let maxDistance = 10;
let sortBy = "nearest";
let activeClinicId = null;

document.addEventListener('DOMContentLoaded', () => {
  // Setup Leaflet map canvas
  initLeafletMap();

  // Parse Query Params if any (e.g. ?location=CP&type=pet)
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get('type');
  if (typeParam) {
    activeFilter = typeParam;
    // Highlight category tab
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      if (tab.dataset.type === typeParam) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  // Setup DOM Elements
  const searchInput = document.getElementById('map-search-input');
  const distanceSlider = document.getElementById('distance-slider');
  const distanceValueLabel = document.getElementById('distance-value-label');
  const sortSelect = document.getElementById('sort-select');
  const filterTabs = document.querySelectorAll('.filter-tab');

  // Load Initial setup
  renderApp();

  // Search Input Trigger
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value.toLowerCase().trim();
      renderApp();
    });
  }

  // Distance Slider Trigger
  if (distanceSlider) {
    distanceSlider.addEventListener('input', (e) => {
      maxDistance = parseFloat(e.target.value);
      distanceValueLabel.innerText = `${maxDistance.toFixed(1)} km`;
      renderApp();
    });
  }

  // Sort Dropdown Trigger
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderApp();
    });
  }

  // Category Tabs Trigger
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.type;
      renderApp();
    });
  });

  // Map Controls Buttons Logic
  const zoomIn = document.getElementById('zoom-in-btn');
  const zoomOut = document.getElementById('zoom-out-btn');
  const myLocation = document.getElementById('my-location-btn');
  const mapToggleMap = document.getElementById('toggle-map-view');
  const mapToggleSat = document.getElementById('toggle-sat-view');

  if (zoomIn && leafletMap) zoomIn.addEventListener('click', () => leafletMap.zoomIn());
  if (zoomOut && leafletMap) zoomOut.addEventListener('click', () => leafletMap.zoomOut());
  if (myLocation) {
    myLocation.addEventListener('click', () => {
      showToast('Centering on Connaught Place, Delhi...');
      if (searchInput) searchInput.value = "Connaught Place, Delhi";
      searchKeyword = "";
      if (leafletMap) {
        leafletMap.setView([28.6304, 77.2177], 15, { animate: true });
      }
      renderApp();
    });
  }
  if (mapToggleMap && mapToggleSat) {
    mapToggleMap.addEventListener('click', () => {
      mapToggleMap.classList.add('active');
      mapToggleSat.classList.remove('active');
      showToast('Switched to Map View');
    });
    mapToggleSat.addEventListener('click', () => {
      mapToggleSat.classList.add('active');
      mapToggleMap.classList.remove('active');
      showToast('Switched to Satellite View');
    });
  }
});

// Initialize Leaflet Map
function initLeafletMap() {
  if (!document.getElementById('map-canvas')) return;

  // Center coordinate Connaught Place, Delhi
  const cpDelhi = [28.6304, 77.2177];
  
  leafletMap = L.map('map-canvas', {
    zoomControl: false, // disable native controls to use custom buttons
    scrollWheelZoom: true
  }).setView(cpDelhi, 15);

  // Load CartoDB Dark Matter tiles (premium dark UI aesthetic)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(leafletMap);
}

// Render List and Markers based on filters
function renderApp() {
  const filteredClinics = clinicsData.filter(clinic => {
    // Search keyword match
    const matchesSearch = clinic.name.toLowerCase().includes(searchKeyword) || 
                          clinic.typeName.toLowerCase().includes(searchKeyword);
    
    // Category match
    let matchesCategory = false;
    if (activeFilter === "all") {
      matchesCategory = true;
    } else if (activeFilter === "emergency") {
      matchesCategory = clinic.type === "emergency";
    } else if (activeFilter === "pet") {
      matchesCategory = clinic.isPet === true;
    } else {
      matchesCategory = clinic.type === activeFilter;
    }

    // Distance match
    const matchesDistance = clinic.distance <= maxDistance;

    return matchesSearch && matchesCategory && matchesDistance;
  });

  // Sort
  if (sortBy === "nearest") {
    filteredClinics.sort((a, b) => a.distance - b.distance);
  } else if (sortBy === "rating") {
    filteredClinics.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "available") {
    const statusOrder = { open: 1, busy: 2, closed: 3 };
    filteredClinics.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  }

  // Update Clinic Count Labels
  const countLabel = document.getElementById('clinic-count-label');
  if (countLabel) {
    countLabel.innerText = `Showing ${filteredClinics.length} clinics within ${maxDistance}km`;
  }

  renderList(filteredClinics);
  renderMarkers(filteredClinics);
}

// Render Sidebar List Items
function renderList(clinics) {
  const listContainer = document.getElementById('sidebar-clinic-list');
  if (!listContainer) return;

  if (clinics.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-grey);">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem; color: var(--warning-yellow); margin-bottom: 1rem;"></i>
        <p style="font-weight: 600;">No Clinics Found</p>
        <p style="font-size: 0.85rem; margin-top: 0.25rem;">Try adjusting your filters or location search range.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = clinics.map(clinic => {
    let statusClass = "bg-green-500/10 text-green-600";
    if (clinic.status === "busy") statusClass = "bg-amber-500/10 text-amber-600";
    if (clinic.status === "closed") statusClass = "bg-red-500/10 text-red-600";

    const petIcon = clinic.isPet ? `<span class="bg-purple-500/10 text-purple-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-tighter flex items-center gap-0.5"><span class="material-symbols-outlined text-[10px] fill-purple-600">pets</span> Pet</span>` : "";

    const isHighlighted = activeClinicId === clinic.id;
    const highlightClasses = isHighlighted ? "border-primary/60 bg-primary/5 shadow-lg scale-[1.01]" : "";

    return `
      <div class="glass-card p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] hover:bg-white/80 active:scale-[0.99] flex flex-col gap-3 border border-white/40 dark:border-white/10 ${highlightClasses} animate-fade-in-up" id="item-${clinic.id}" onclick="selectClinic('${clinic.id}')">
        <div class="flex justify-between items-start gap-2">
          <div>
            <h3 class="font-headline-md text-sm font-bold text-on-surface flex items-center gap-2 flex-wrap">
              ${clinic.name}
              ${petIcon}
            </h3>
            <div class="flex gap-4 mt-2 text-xs font-semibold text-on-surface-variant flex-wrap">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-primary">stethoscope</span> ${clinic.typeName}</span>
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-primary">distance</span> ${clinic.distance} km</span>
            </div>
          </div>
          <div class="flex items-center gap-1 text-xs font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
            <span class="material-symbols-outlined text-[14px] fill-amber-500">star</span> ${clinic.rating}
          </div>
        </div>
        <div class="flex justify-between items-center mt-2 pt-2 border-t border-slate-200/50 dark:border-white/10 flex-wrap gap-2">
          <span class="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${statusClass}">${clinic.statusText}</span>
          <div class="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">Next: ${clinic.nextSlot}</div>
          <button class="px-4 py-1.5 rounded-full font-label-sm text-label-sm bg-primary text-on-primary shadow-md hover:scale-105 active:scale-95 transition-all" onclick="event.stopPropagation(); window.location.href='clinic.html?id=${clinic.id}'">Book</button>
        </div>
      </div>
    `;
  }).join('');
}

// Helper to choose fontawesome class
function getMarkerIcon(type, isPet) {
  if (isPet) return "fa-paw";
  if (type === "dental") return "fa-tooth";
  if (type === "eye") return "fa-eye";
  if (type === "skin") return "fa-hand-holding-medical";
  if (type === "emergency") return "fa-truck-medical";
  return "fa-house-medical";
}

// Render Leaflet Map Markers
function renderMarkers(clinics) {
  if (!leafletMap) return;

  // Clear existing markers
  for (let id in mapMarkers) {
    leafletMap.removeLayer(mapMarkers[id]);
  }
  mapMarkers = {};

  // Clear/draw search distance circle boundary
  if (rangeCircle) {
    leafletMap.removeLayer(rangeCircle);
  }
  
  // Set boundary circle color based on filters
  let boundaryColor = "var(--primary-teal)";
  if (activeFilter === "pet") boundaryColor = "#8B5CF6";
  if (activeFilter === "emergency") boundaryColor = "var(--emergency-red)";

  rangeCircle = L.circle([28.6304, 77.2177], {
    color: boundaryColor,
    fillColor: boundaryColor,
    fillOpacity: 0.05,
    weight: 1.5,
    dashArray: "4 4",
    radius: maxDistance * 1000 // Leaflet takes radius in meters
  }).addTo(leafletMap);

  clinics.forEach(clinic => {
    const markerHtml = `
      <div class="custom-leaflet-marker marker-${clinic.status} marker-${clinic.isPet ? 'pet' : 'human'} ${clinic.type === 'emergency' ? 'marker-emergency' : ''}" id="leaflet-marker-${clinic.id}">
        <i class="fa-solid ${getMarkerIcon(clinic.type, clinic.isPet)}"></i>
      </div>
    `;

    const customIcon = L.divIcon({
      html: markerHtml,
      className: 'leaflet-custom-marker-parent',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -35]
    });

    // Build custom Leaflet native popup card content (styled via CSS override)
    let btnColor = clinic.isPet ? "#8B5CF6" : "var(--primary-teal)";
    const popupHtml = `
      <div style="font-family: var(--font-body); width: 230px;">
        <h4 style="font-weight: 800; font-size: 1rem; margin-bottom: 0.35rem; font-family: var(--font-heading);">${clinic.name}</h4>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-grey); margin-bottom: 0.6rem; font-weight: 500;">
          <span>${clinic.distance} km away</span>
          <span><i class="fa-solid fa-star" style="color: var(--warning-yellow)"></i> ${clinic.rating}</span>
        </div>
        <div style="font-size: 0.8rem; margin-bottom: 0.75rem; font-weight: 500;">
          Next slot: <strong style="color: ${btnColor}; font-weight: 700;">${clinic.nextSlot}</strong>
        </div>
        <button class="btn btn-primary" style="width:100%; padding:0.45rem; font-size:0.8rem; border-radius:6px; background-color: ${btnColor}; border: none;" onclick="window.location.href='clinic.html?id=${clinic.id}'">Book Appointment</button>
      </div>
    `;

    const marker = L.marker(clinic.coords, { icon: customIcon })
      .bindPopup(popupHtml)
      .addTo(leafletMap);

    // Bind selection hook
    marker.on('click', () => {
      selectClinic(clinic.id, false); // select it, but don't pan map in a loop
    });

    mapMarkers[clinic.id] = marker;
  });
}

// Select clinic, center map, open Leaflet native popup
window.selectClinic = function(clinicId, triggerMapPan = true) {
  activeClinicId = clinicId;
  const clinic = clinicsData.find(c => c.id === clinicId);
  if (!clinic) return;

  // 1. Highlight sidebar card
  document.querySelectorAll('#sidebar-clinic-list [id^="item-"]').forEach(item => {
    item.classList.remove('border-primary/60', 'bg-primary/5', 'shadow-lg', 'scale-[1.01]');
  });

  const item = document.getElementById(`item-${clinicId}`);
  if (item) {
    item.classList.add('border-primary/60', 'bg-primary/5', 'shadow-lg', 'scale-[1.01]');
    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // 2. Open Leaflet popup programmatically & pan map
  const marker = mapMarkers[clinicId];
  if (marker && leafletMap) {
    if (triggerMapPan) {
      leafletMap.setView(clinic.coords, 16, { animate: true, duration: 1 });
    }
    
    // Add glowing active effect to the marker HTML element
    document.querySelectorAll('.custom-leaflet-marker').forEach(m => m.classList.remove('active'));
    const markerDom = document.getElementById(`leaflet-marker-${clinicId}`);
    if (markerDom) {
      markerDom.classList.add('active');
    }
    
    // Delay opening popup slightly to let map pan finish smoothly
    setTimeout(() => {
      marker.openPopup();
    }, triggerMapPan ? 300 : 0);
  }
};
