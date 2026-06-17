// Force light theme immediately on script load to minimize flash
(function() {
  document.documentElement.setAttribute('data-theme', 'light');
})();

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar Effect on Scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile Nav Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileNavToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });
  }

  // Create Emergency Modal Overlay in DOM if it does not exist
  createEmergencyOverlay();

  // Emergency Button Logic
  const emergencyButtons = document.querySelectorAll('.btn-emergency, #emergency-trigger');
  const emergencyOverlay = document.getElementById('emergency-overlay');
  
  if (emergencyOverlay) {
    emergencyButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        emergencyOverlay.classList.add('active');
      });
    });

    const closeBtn = emergencyOverlay.querySelector('.close-overlay-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        emergencyOverlay.classList.remove('active');
      });
    }

    // Close when clicking outside of the card
    emergencyOverlay.addEventListener('click', (e) => {
      if (e.target === emergencyOverlay) {
        emergencyOverlay.classList.remove('active');
      }
    });
  }

  // Initialize Auth System
  initAuthSystem();

  // Initialize Global UI/UX Effects
  initThemeToggle();
  initScrollRevealObserver();
  injectWhatsAppSupportWidget();
  initAccordionFAQHandlers();
  initSmoothScrolling();
  initStatsStripObserver();
  initGlassCardSpotlight();
});

// Helper function to inject Emergency Overlay HTML
function createEmergencyOverlay() {
  if (document.getElementById('emergency-overlay')) return;

  const overlayHtml = `
    <div id="emergency-overlay" class="overlay">
      <div class="overlay-card">
        <div class="emergency-icon-container">
          <i class="fa-solid fa-truck-medical"></i>
        </div>
        <h2>EMERGENCY ACTIVE</h2>
        <p class="emergency-sub">Nearest Emergency Clinic Detected</p>
        <p class="emergency-details">City Care Hospital & 24/7 Trauma Center is located <strong>0.8 km</strong> away. ER response is ready.</p>
        
        <div class="emergency-action-card">
          <h3>PawCare Vet ER Support</h3>
          <span>For pets: PawCare Vet 24/7 is 1.4 km away</span>
        </div>

        <button class="phone-button" onclick="window.location.href='tel:+919876543210'">
          <i class="fa-solid fa-phone"></i> +91 98765 43210
        </button>
        <button class="close-overlay-btn">Dismiss Emergency Screen</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', overlayHtml);
}

// Global Toast System
window.showToast = function(message, duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check" style="color: var(--primary-teal)"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slide-out 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
};

// Add slide-out keyframes dynamically if not present
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes slide-out {
    to {
      transform: translateY(100px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleSheet);


/* ==========================================================================
   USER AUTHENTICATION SYSTEM (LOCALSTORAGE SESSION SIMULATOR)
   ========================================================================== */

function initAuthSystem() {
  // 1. Inject Auth Modal HTML into DOM
  createAuthModalOverlay();

  // 2. Refresh Navbar elements
  refreshNavbarAuth();

  // 3. Setup event triggers
  const authOverlay = document.getElementById('auth-overlay');
  if (authOverlay) {
    const closeBtn = authOverlay.querySelector('#close-auth-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        authOverlay.classList.remove('active');
      });
    }

    authOverlay.addEventListener('click', (e) => {
      if (e.target === authOverlay) {
        authOverlay.classList.remove('active');
      }
    });

    // Tab toggling logic
    const loginTab = authOverlay.querySelector('#tab-btn-login');
    const registerTab = authOverlay.querySelector('#tab-btn-register');
    const loginForm = authOverlay.querySelector('#auth-form-login-fields');
    const registerForm = authOverlay.querySelector('#auth-form-register-fields');
    const authSubmitBtn = authOverlay.querySelector('#auth-submit-btn');
    const authTitle = authOverlay.querySelector('#auth-card-title');
    
    let activeAuthMode = 'login'; // login vs register

    loginTab.addEventListener('click', () => {
      activeAuthMode = 'login';
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.style.display = 'flex';
      registerForm.style.display = 'none';
      authTitle.innerText = "Welcome Back";
      authSubmitBtn.innerText = "Sign In";
    });

    registerTab.addEventListener('click', () => {
      activeAuthMode = 'register';
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerForm.style.display = 'flex';
      loginForm.style.display = 'none';
      authTitle.innerText = "Create Account";
      authSubmitBtn.innerText = "Sign Up";
    });

    // Form submit controller
    const authForm = authOverlay.querySelector('#auth-modal-form');
    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (activeAuthMode === 'login') {
          const email = authForm.querySelector('#login-email').value.trim();
          const pass = authForm.querySelector('#login-pass').value;

          if (!email || !pass) {
            showToast("Please fill in email and password.");
            return;
          }

          // Simulate login check
          const username = email.split('@')[0];
          const capitalizedName = username.charAt(0).toUpperCase() + username.slice(1);
          
          const userSession = {
            name: capitalizedName,
            email: email,
            role: "Patient"
          };

          localStorage.setItem('pawcare_session', JSON.stringify(userSession));
          showToast(`Welcome back, ${capitalizedName}!`);
          authOverlay.classList.remove('active');
          refreshNavbarAuth();
          
          // Trigger custom login success event for page-specific intercepts
          document.dispatchEvent(new CustomEvent('authChange', { detail: userSession }));

        } else {
          // Register Mode
          const name = authForm.querySelector('#register-name').value.trim();
          const email = authForm.querySelector('#register-email').value.trim();
          const pass = authForm.querySelector('#register-pass').value;
          const role = authForm.querySelector('#register-role').value;

          if (!name || !email || !pass) {
            showToast("Please fill in all registration fields.");
            return;
          }

          const userSession = {
            name: name,
            email: email,
            role: role
          };

          localStorage.setItem('pawcare_session', JSON.stringify(userSession));
          showToast(`Account created successfully! Welcome ${name}.`);
          authOverlay.classList.remove('active');
          refreshNavbarAuth();
          
          document.dispatchEvent(new CustomEvent('authChange', { detail: userSession }));
        }
      });
    }
  }
}

// Inject Auth Modal overlay into DOM
function createAuthModalOverlay() {
  if (document.getElementById('auth-overlay')) return;

  const authHtml = `
    <div id="auth-overlay" class="overlay">
      <div class="auth-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h2 id="auth-card-title" style="font-size: 1.5rem; color: var(--text-dark);">Welcome Back</h2>
          <button id="close-auth-modal" style="background:none; border:none; font-size: 1.5rem; cursor:pointer; color: var(--text-grey);"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Tabs -->
        <div class="auth-tabs">
          <button type="button" class="auth-tab-btn active" id="tab-btn-login">Sign In</button>
          <button type="button" class="auth-tab-btn" id="tab-btn-register">Register</button>
        </div>

        <form id="auth-modal-form">
          <!-- Login fields container -->
          <div id="auth-form-login-fields" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-field">
              <label for="login-email">Email Address</label>
              <input type="email" id="login-email" placeholder="john@example.com" required>
            </div>
            <div class="form-field">
              <label for="login-pass">Password</label>
              <input type="password" id="login-pass" placeholder="••••••••" required>
            </div>
          </div>

          <!-- Register fields container -->
          <div id="auth-form-register-fields" style="display: none; flex-direction: column; gap: 1rem;">
            <div class="form-field">
              <label for="register-name">Full Name</label>
              <input type="text" id="register-name" placeholder="John Doe">
            </div>
            <div class="form-field">
              <label for="register-email">Email Address</label>
              <input type="email" id="register-email" placeholder="john@example.com">
            </div>
            <div class="form-field">
              <label for="register-pass">Password</label>
              <input type="password" id="register-pass" placeholder="••••••••">
            </div>
            <div class="form-field">
              <label for="register-role">Account Type</label>
              <select id="register-role">
                <option value="Patient">Patient / User</option>
                <option value="Pet Owner">Pet Owner</option>
                <option value="Clinic Owner">Clinic Administrator</option>
              </select>
            </div>
          </div>

          <button type="submit" id="auth-submit-btn" class="btn btn-primary" style="width:100%; margin-top: 1.5rem; padding: 0.9rem;">
            Sign In
          </button>
        </form>

        <div style="text-align: center; margin-top: 1.5rem; font-size: 0.8rem; color: var(--text-grey);">
          By signing in, you agree to our <a href="#" style="text-decoration: underline; color: var(--primary-teal)">Terms of Service</a>.
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', authHtml);
}

// Refresh navbar based on session
function refreshNavbarAuth() {
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  // Clear existing login trigger or dropdown
  const oldLoginTrigger = document.getElementById('auth-login-trigger');
  const oldDropdown = document.querySelector('.user-menu-container');
  if (oldLoginTrigger) oldLoginTrigger.remove();
  if (oldDropdown) oldDropdown.remove();

  const sessionData = localStorage.getItem('pawcare_session');

  if (sessionData) {
    // Logged In state
    const user = JSON.parse(sessionData);
    const dropdownHtml = `
      <div class="user-menu-container">
        <button class="user-menu-btn" id="user-dropdown-trigger">
          <i class="fa-solid fa-circle-user"></i> Hello, ${user.name} <i class="fa-solid fa-chevron-down" style="font-size:0.75rem"></i>
        </button>
        <div class="user-dropdown-menu" id="user-dropdown-menu">
          <div class="user-dropdown-item" onclick="window.location.href='dashboard.html'"><i class="fa-solid fa-chart-line"></i> My Dashboard</div>
          <div class="user-dropdown-item" onclick="window.location.href='dashboard.html'"><i class="fa-solid fa-paw"></i> Pet Profiles</div>
          <div class="user-dropdown-item" id="auth-logout-btn"><i class="fa-solid fa-right-from-bracket"></i> Logout</div>
        </div>
      </div>
    `;
    
    // Inject at the beginning of actions panel
    navActions.insertAdjacentHTML('afterbegin', dropdownHtml);

    // Setup Dropdown toggle logic
    const dropdownTrigger = document.getElementById('user-dropdown-trigger');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    if (dropdownTrigger && dropdownMenu) {
      dropdownTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        dropdownMenu.classList.remove('active');
      });
    }

    // Bind logout button click
    const logoutBtn = document.getElementById('auth-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('pawcare_session');
        showToast("Logged out successfully.");
        refreshNavbarAuth();
        // Redirect to index page to reset auth context cleanly
        if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('book.html')) {
          window.location.href = "index.html";
        }
      });
    }

  } else {
    // Logged Out state
    const loginBtnHtml = `
      <button class="btn btn-secondary" id="auth-login-trigger">
        <i class="fa-solid fa-user-lock"></i> Login
      </button>
    `;
    navActions.insertAdjacentHTML('afterbegin', loginBtnHtml);

    const loginTrigger = document.getElementById('auth-login-trigger');
    if (loginTrigger) {
      loginTrigger.addEventListener('click', () => {
        const authOverlay = document.getElementById('auth-overlay');
        if (authOverlay) {
          authOverlay.classList.add('active');
        }
      });
    }
  }
}

// Global helper to prompt auth modal
window.triggerAuthModal = function() {
  const authOverlay = document.getElementById('auth-overlay');
  if (authOverlay) {
    authOverlay.classList.add('active');
  }
};


/* ==========================================================================
   GLOBAL UI/UX EFFECTS: SCROLL REVEALS, WHATSAPP FLOATER, FAQS & COUNTERS
   ========================================================================== */

function initScrollRevealObserver() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before crossing
  });

  revealElements.forEach(el => observer.observe(el));
}

function injectWhatsAppSupportWidget() {
  if (document.getElementById('whatsapp-widget')) return;

  const waHtml = `
    <!-- WhatsApp Popup Box -->
    <div id="whatsapp-popup" class="whatsapp-popup">
      <div class="whatsapp-popup-header">
        <img src="images/doctor_avatar.png" alt="Dr. Bruno Avatar" class="agent-avatar">
        <div class="agent-info">
          <h4>Dr. Bruno (Support)</h4>
          <span>Online • Typically replies instantly</span>
        </div>
        <button id="whatsapp-close" class="whatsapp-close-btn"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="whatsapp-popup-body">
        <div class="agent-msg-bubble">
          Hi there! 👋 I am Dr. Bruno, your PawCare support assistant. How can I help you discover clinics or book slots today?
        </div>
      </div>
      <div class="whatsapp-popup-footer">
        <button class="btn btn-primary" onclick="window.location.href='https://wa.me/919876543210'" style="width: 100%; padding: 0.65rem 1rem; border-radius: var(--radius-sm); border: none; background-color: #25D366; color: var(--white); font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
          <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i> Start Chat on WhatsApp
        </button>
      </div>
    </div>

    <!-- Floating Circular WhatsApp Trigger -->
    <div id="whatsapp-widget" class="whatsapp-float">
      <i class="fa-brands fa-whatsapp"></i>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', waHtml);

  const floatBtn = document.getElementById('whatsapp-widget');
  const popup = document.getElementById('whatsapp-popup');
  const closeBtn = document.getElementById('whatsapp-close');

  if (floatBtn && popup && closeBtn) {
    floatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.toggle('active');
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.remove('active');
    });

    // Close popup on click outside
    document.addEventListener('click', (e) => {
      if (!popup.contains(e.target) && e.target !== floatBtn) {
        popup.classList.remove('active');
      }
    });
  }
}

function initAccordionFAQHandlers() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const isActive = parentItem.classList.contains('active');
      
      // Close all other FAQ items for a clean accordion effect
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parentItem.classList.add('active');
      }
    });
  });
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if active
        const navLinks = document.querySelector('.nav-links');
        const mobileToggle = document.querySelector('.mobile-nav-toggle i');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          if (mobileToggle) mobileToggle.className = 'fa-solid fa-bars';
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for sticky header
          behavior: 'smooth'
        });
      }
    });
  });
}

function initStatsStripObserver() {
  const statsSection = document.querySelector('.stats-strip');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStatsCounter();
        obs.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.2 });

  observer.observe(statsSection);
}

function animateStatsCounter() {
  const numbers = document.querySelectorAll('.stat-number');
  numbers.forEach(el => {
    const origText = el.innerText;
    const target = parseInt(origText.replace(/[^0-9.]/g, ''));
    if (isNaN(target)) return;

    const suffix = origText.replace(/[0-9.]/g, ''); // e.g. "+", "/5", etc.
    let current = 0;
    const duration = 2000; // 2 seconds
    const intervalTime = 30; // 30ms ticks
    const stepsCount = duration / intervalTime;
    const incrementStep = target / stepsCount;

    const counterInterval = setInterval(() => {
      current += incrementStep;
      if (current >= target) {
        el.innerText = target + suffix;
        clearInterval(counterInterval);
      } else {
        el.innerText = Math.floor(current) + suffix;
      }
    }, intervalTime);
  });
}

function initThemeToggle() {
  // Always force light mode
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('pawcare_theme', 'light');

  // Inject ambient background elements
  injectAmbientOrbs();
}

function injectAmbientOrbs() {
  if (document.getElementById('ambient-orbs-container')) return;

  const orbsHtml = `
    <div id="ambient-orbs-container" class="bg-ambient-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
      <div class="particles-wrapper" id="ambient-particles-box"></div>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', orbsHtml);

  // Generate luxury anti-gravity particles
  const particlesBox = document.getElementById('ambient-particles-box');
  if (particlesBox) {
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesBox);
    }
  }
}

function createParticle(parent) {
  const particle = document.createElement('div');
  particle.className = 'translucent-particle';
  
  const size = Math.random() * 5 + 2; // 2px to 7px
  const left = Math.random() * 100; // 0% to 100%
  const duration = Math.random() * 20 + 20; // slow drift: 20s to 40s
  const delay = Math.random() * -40; // start immediately
  const opacity = Math.random() * 0.3 + 0.15; // 0.15 to 0.45
  const drift = Math.random() * 60 - 30; // -30px to 30px
  
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${left}%`;
  particle.style.opacity = opacity;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;
  particle.style.setProperty('--drift-x', `${drift}px`);
  
  // High-end medical health palette: white, sky blue, teal, soft aqua
  const colors = [
    'rgba(255, 255, 255, 0.55)', // white
    'rgba(125, 211, 252, 0.45)', // sky blue (#7DD3FC)
    'rgba(45, 212, 191, 0.45)',  // teal (#2DD4BF)
    'rgba(153, 246, 228, 0.45)'   // soft aqua (#99F6E4)
  ];
  const randColor = colors[Math.floor(Math.random() * colors.length)];
  particle.style.backgroundColor = randColor;
  
  parent.appendChild(particle);
}

function initGlassCardSpotlight() {
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.glass-card');
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  });
}
