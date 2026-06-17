// Booking Confirmation Page JavaScript Logic
let confirmationData = {
  clinicName: "Metro Care General Clinic",
  doctorName: "Dr. Arvind Mehta",
  date: "Thursday, 18 June",
  slot: "10:30 AM",
  queue: "7",
  wait: "~35 minutes",
  isPet: false,
  patientName: "John Doe",
  payment: "clinic"
};

// Queue Live simulation variables
let patientsAhead = 3;
let estMinutes = 35;
let timerSeconds = 0;
let liveInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  confirmationData.clinicName = urlParams.get('clinicName') || "Metro Care General Clinic";
  confirmationData.doctorName = urlParams.get('doctorName') || "Dr. Arvind Mehta";
  confirmationData.date = urlParams.get('date') || "Thursday, 18 June";
  confirmationData.slot = urlParams.get('slot') || "10:30 AM";
  confirmationData.queue = urlParams.get('queue') || "7";
  confirmationData.wait = urlParams.get('wait') || "~35 minutes";
  confirmationData.isPet = urlParams.get('isPet') === "true";
  confirmationData.patientName = urlParams.get('patientName') || "John Doe";
  confirmationData.payment = urlParams.get('payment') || "clinic";

  // Calculate patients ahead initially
  patientsAhead = Math.max(1, parseInt(confirmationData.queue) - 4);
  estMinutes = patientsAhead * 12 + 5; // ~12 mins per patient

  // Render Page Content
  renderConfirmationPage();

  // Start Live Queue Tracker ticking simulator (runs every 30 seconds)
  startLiveQueueTracker();

  // Action Buttons
  const cancelBtn = document.getElementById('cancel-appt-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const doubleCheck = confirm("Are you sure you want to cancel this appointment slot?");
      if (doubleCheck) {
        // Redirect to dashboard with query param
        window.location.href = "dashboard.html?cancelled=true";
      }
    });
  }

  const directionsBtn = document.getElementById('get-directions-btn');
  if (directionsBtn) {
    directionsBtn.addEventListener('click', () => {
      showToast("Routing directions to clinic using your location GPS...");
    });
  }

  const calendarBtn = document.getElementById('add-calendar-btn');
  if (calendarBtn) {
    calendarBtn.addEventListener('click', () => {
      showToast("Appointment successfully added to Google Calendar!");
    });
  }

  const shareBtn = document.getElementById('share-confirmed-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      showToast("Booking reference URL copied to clipboard!");
    });
  }
});

// Render Dynamic Elements
function renderConfirmationPage() {
  // Set Token Number
  const tokenNum = parseInt(confirmationData.queue);
  const formattedToken = tokenNum < 10 ? `0${tokenNum}` : tokenNum;
  document.getElementById('token-number-display').innerText = `#${formattedToken}`;

  // Set Details summary card
  document.getElementById('summary-clinic').innerText = confirmationData.clinicName;
  document.getElementById('summary-doctor').innerText = confirmationData.doctorName;
  document.getElementById('summary-datetime').innerText = `${confirmationData.date} at ${confirmationData.slot}`;
  document.getElementById('summary-patient').innerText = confirmationData.patientName;
  
  const statusLabel = confirmationData.payment === 'online' ? 'Paid Online (Verified)' : 'Pay at Clinic (Pending)';
  const statusBadge = confirmationData.payment === 'online' ? 'badge-success' : 'badge-warning';
  
  document.getElementById('summary-payment').className = `badge ${statusBadge}`;
  document.getElementById('summary-payment').innerText = statusLabel;

  // Swap to pet theme if isPet
  if (confirmationData.isPet) {
    // Change Checkmark colors
    const checkCircle = document.querySelector('.success-checkmark-svg circle');
    const checkPath = document.querySelector('.success-checkmark-svg path');
    if (checkCircle) checkCircle.style.stroke = "#8B5CF6";
    if (checkPath) checkPath.style.stroke = "#8B5CF6";

    // Change Token Box border
    const tokenBox = document.getElementById('token-highlight-box');
    if (tokenBox) {
      tokenBox.style.backgroundColor = "#F5F3FF";
      tokenBox.style.borderColor = "#8B5CF6";
    }
    
    // Change token text color
    const tokenText = document.getElementById('token-number-display');
    if (tokenText) tokenText.style.color = "#8B5CF6";

    // Change Active node in queue tracking
    const trackerProgressFill = document.querySelector('.queue-progress-fill');
    if (trackerProgressFill) trackerProgressFill.style.backgroundColor = "#8B5CF6";
    
    const activeNode = document.querySelector('.queue-progress-node.active');
    if (activeNode) activeNode.style.backgroundColor = "#8B5CF6";
  }

  updateTrackerUI();
}

// Update Tracker Text Content
function updateTrackerUI() {
  const aheadLabel = document.getElementById('queue-ahead-label');
  const estLabel = document.getElementById('queue-est-label');
  
  if (patientsAhead > 0) {
    aheadLabel.innerText = `${patientsAhead} patients ahead of you`;
    estLabel.innerText = `Estimated wait: ~${estMinutes} minutes`;
    
    // Set node statuses
    document.getElementById('progress-node-ahead').className = "queue-progress-node completed";
    document.getElementById('progress-node-you').className = "queue-progress-node active";
    document.getElementById('progress-node-doc').className = "queue-progress-node";
    
    // Progress fill percentage
    const fillPercent = 100 - (patientsAhead * 15);
    document.querySelector('.queue-progress-fill').style.width = `${Math.min(90, Math.max(30, fillPercent))}%`;
  } else {
    // You are next!
    aheadLabel.innerHTML = `<span style="color: var(--accent-green); font-weight: 700;"><i class="fa-solid fa-bell"></i> It's Your Turn!</span>`;
    estLabel.innerText = "Please proceed to Doctor's Cabin.";
    
    document.getElementById('progress-node-ahead').className = "queue-progress-node completed";
    document.getElementById('progress-node-you').className = "queue-progress-node completed";
    
    const docNode = document.getElementById('progress-node-doc');
    docNode.className = "queue-progress-node active";
    if (confirmationData.isPet) {
      docNode.style.backgroundColor = "#8B5CF6";
    } else {
      docNode.style.backgroundColor = "var(--primary-teal)";
    }

    document.querySelector('.queue-progress-fill').style.width = `100%`;
  }
}

// Timer Simulation
function startLiveQueueTracker() {
  const updateBadge = document.getElementById('tracker-live-indicator');
  const lastUpdatedText = document.getElementById('tracker-last-updated-text');
  
  liveInterval = setInterval(() => {
    timerSeconds += 30;
    
    // Decrement patients ahead every 30 seconds (for demo quick pacing)
    if (patientsAhead > 0) {
      patientsAhead -= 1;
      estMinutes = Math.max(0, estMinutes - 10);
      
      // Update DOM
      updateTrackerUI();
      
      // Flash indicator
      updateBadge.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.8)";
      setTimeout(() => {
        updateBadge.style.boxShadow = "none";
      }, 1000);
      
      showToast("Queue Status Updated: Patient ahead has completed visit.");
    }
    
    lastUpdatedText.innerText = "Last updated: just now";
    timerSeconds = 0;

  }, 30000);

  // Simple seconds ticker for "Last updated"
  setInterval(() => {
    if (timerSeconds > 0) {
      lastUpdatedText.innerText = `Last updated: ${timerSeconds} seconds ago`;
    }
    timerSeconds += 1;
  }, 1000);
}
