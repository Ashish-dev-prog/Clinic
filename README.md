# 🐾 PawCare — Unified Clinic Discovery & Slot Booking Platform

PawCare is a modern, responsive frontend demo website that provides a unified search and booking engine for both **Human Medical Clinics** and **Pet Veterinary Care**. It features interactive map searches inspired by Google Maps and RedBus-style visual appointment slot bookings, with premium UI/UX micro-interactions.

This project is built using a pure client-side stack: **HTML5**, **Vanilla CSS3**, and **ES6+ JavaScript**, with no external build system dependencies.

---

## 🚀 Live Features & Interactive Mechanics

### 1. 🗺️ Leaflet.js Map Discovery Search
- **Dynamic Map Tiling**: Embeds an interactive map canvas (powered by CartoDB Dark Matter) centered on Connaught Place, Delhi (`[28.6304, 77.2177]`).
- **Linked Pin Selection**: Map pins denote clinic types (Teal for human, Violet for pet, Red for ER). Clicking a marker pans the map, opens an information popup, and highlights the corresponding clinic card in the sidebar list.
- **Search Range Distance Slider**: Allows users to filter clinics by distance dynamically. The map renders a corresponding dotted boundary circle (`L.circle`) that resizes in real-time, removing markers and sidebar cards outside the selection.

### 2. 🗓️ RedBus-Style Visual Slot Booking
- **Horizontal Date Picker**: Simulates a 7-day scrollable selector starting from "Today". Selecting dates randomized and simulates slot availability to prevent stale checkout flows.
- **Period Filter Switches**: Filter slots by Morning, Afternoon, or Evening periods.
- **tactile Slot Selection**: Available, booked, and nearly full states are displayed visually. Selected slots show a checkmark badge.
- **Lobby Wait Time Estimator**: Provides a live estimation of the user's queue token number and wait time based on the selected slot.

### 3. 🔐 Glassmorphic Session Authenticator
- **Global Auth Gate Modal**: Appended dynamically to the DOM across all pages. Clicking "Proceed to Book" intercepts checkout, prompting users to register or sign in.
- **State Persistence**: Sessions (`pawcare_session`) are persisted in `localStorage`.
- **Responsive Dropdowns**: The navbar dynamically displays user session status, rendering a responsive action dropdown on login.
- **Auto-Fill Data**: Authentication details are parsed and pre-filled in patient detail forms automatically.

### 4. 💫 Premium UI/UX Animations & Skeleton Loaders
- **Shimmer Skeletons**: Displays grey animated loading skeleton columns (`.skeleton`) during tab switching, date changes, and clinic list switches.
- **Intersection Scroll Reveals**: Main layout blocks smoothly fade and translate up as they enter the viewport.
- **Focus Outlines & Translations**: Form inputs translate upwards by `1px` and present a glowing teal shadow ring when active.
- **Animated SVG Success Indicators**: Displays a smooth SVG circular stroke and checkmark animation upon reservation confirmation.
- **WhatsApp Support Widget**: Fixed bottom-left float badge with wave animation trigger. Launches a mock agent chat card.
- **FAQ Accordion**: Heights slide dynamically using CSS transition properties.

---

## 📁 Repository Structure

```tree
project 2/
├── index.html            # Landing / Home Page
├── find.html             # Clinic Discovery Map Page
├── clinic.html           # Clinic Profile & Slot Selector Page
├── book.html             # Patient Details Checkout Form
├── confirmed.html        # Ticket Tracker & Live Queue Timeline
├── dashboard.html        # User panel (saved vets, pet list, settings)
├── css/
│   ├── style.css         # Global variables, base reset, widgets
│   ├── page-specific.css # Component cards, layout grids, inputs
│   └── map.css           # Map viewport layouts & Leaflet overrides
├── js/
│   ├── app.js            # Global auth, WhatsApp modal, scroll reveals
│   ├── find.js           # Map markers, distance slider math
│   ├── clinic.js         # Date calculation, slots, doctor loader
│   ├── book.js           # Pre-fills, checkout routing validation
│   ├── confirmed.js      # Live queue ticks, calendar integration
│   └── dashboard.js      # Bookmark lists, pet profile modals
└── images/
    ├── hero_clinic.png   # Custom header illustration
    ├── clinic_banner.png # Clinic lobby banner
    └── doctor_avatar.png # Doctor cards avatar
```

---

## 🛠️ Quick Start

No installations, Node servers, or compilers are needed:

1. Clone or download this repository.
2. Double-click [index.html](index.html) (or use VS Code **Live Server**) to open the application in your browser.
3. To test the checkout gate, select a slot on [clinic.html](clinic.html) and click **Proceed to Patient Details**. Register an account to see the pre-filled checkout screen.

---

## 🌿 Technical Highlights

- **CSS Variables**: Core tokens defined in `:root` (Teal `#0D9488`, Violet `#8B5CF6`, Emergency Red `#EF4444`).
- **Aesthetic Overrides**: Custom Leaflet popup wrappers styled with `backdrop-filter: blur(8px)` and dark-theme tile presets.
- **Fluid Layouts**: Built entirely using flexbox, grid, and CSS media queries. Fully responsive on mobile, tablet, and desktop screens.
