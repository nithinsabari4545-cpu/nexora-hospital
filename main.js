/**
 * Nexora Multi Speciality Hospital — Main JavaScript
 * Handles: Navigation, Specialities Grid, Scroll Animations, Forms, FAQ, Mobile Menu
 */

'use strict';

/* ============================================================
   SPECIALITIES DATA
   ============================================================ */
const SPECIALITIES = [
  {
    icon: '🩺',
    name: 'General Medicine',
    desc: 'Comprehensive diagnosis and management of a broad range of adult medical conditions and health concerns.',
    wa: 'General%20Medicine'
  },
  {
    icon: '❤️',
    name: 'Cardiology',
    desc: 'Specialist heart care covering cardiac assessment, management of heart conditions, and preventive cardiology.',
    wa: 'Cardiology'
  },
  {
    icon: '🦴',
    name: 'Orthopaedics',
    desc: 'Expert care for bone, joint, and musculoskeletal conditions including injury management and rehabilitation.',
    wa: 'Orthopaedics'
  },
  {
    icon: '🧠',
    name: 'Neurology',
    desc: 'Specialised evaluation and management of neurological conditions affecting the brain, spine, and nervous system.',
    wa: 'Neurology'
  },
  {
    icon: '👶',
    name: 'Paediatrics',
    desc: 'Compassionate healthcare for infants, children, and adolescents, from routine check-ups to specialised care.',
    wa: 'Paediatrics'
  },
  {
    icon: '🤱',
    name: 'Obstetrics & Gynaecology',
    desc: 'Comprehensive women\'s health services covering pregnancy, childbirth, and gynaecological care.',
    wa: 'Obstetrics%20and%20Gynaecology'
  },
  {
    icon: '✨',
    name: 'Dermatology',
    desc: 'Diagnosis and treatment of skin, hair, and nail conditions, including medical and cosmetic dermatology.',
    wa: 'Dermatology'
  },
  {
    icon: '👂',
    name: 'ENT',
    desc: 'Specialised care for conditions affecting the ear, nose, throat, and related structures of the head and neck.',
    wa: 'ENT'
  },
  {
    icon: '👁️',
    name: 'Ophthalmology',
    desc: 'Comprehensive eye care including vision assessment, diagnosis, and treatment of eye conditions.',
    wa: 'Ophthalmology'
  },
  {
    icon: '🔪',
    name: 'General Surgery',
    desc: 'Skilled surgical care for a range of conditions, with a focus on patient safety and recovery.',
    wa: 'General%20Surgery'
  },
  {
    icon: '🫁',
    name: 'Gastroenterology',
    desc: 'Diagnosis and management of conditions affecting the digestive system, including stomach, liver, and intestines.',
    wa: 'Gastroenterology'
  },
  {
    icon: '🚨',
    name: 'Emergency Care',
    desc: 'Immediate medical attention for urgent and emergency situations. Contact the hospital directly for emergency services.',
    wa: 'Emergency%20Care'
  }
];

/* ============================================================
   RENDER SPECIALITIES GRID
   ============================================================ */
function renderSpecialities() {
  const grid = document.getElementById('specialities-grid');
  if (!grid) return;

  grid.innerHTML = SPECIALITIES.map((spec, index) => {
    const delay = index % 4;
    const waMsg = `Hello%20Nexora%20Multi%20Speciality%20Hospital%2C%20I%20would%20like%20to%20enquire%20about%20the%20${spec.wa}%20department%20and%20appointment%20availability.`;
    const waUrl = `https://wa.me/919952647193?text=${waMsg}`;

    return `
      <div class="spec-card reveal ${delay > 0 ? 'reveal-delay-' + delay : ''}" data-dept="${spec.name}">
        <div class="spec-icon-wrap" aria-hidden="true">${spec.icon}</div>
        <h3 class="spec-name">${spec.name}</h3>
        <p class="spec-desc">${spec.desc}</p>
        <button class="spec-enquire-btn" onclick="openAppointmentWithDept('${spec.name}')" aria-label="Enquire about ${spec.name} department">
          Enquire About This Department &rarr;
        </button>
        <br><br>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
           class="spec-enquire-btn" style="color:#25D366;"
           aria-label="WhatsApp enquiry for ${spec.name}">
          &#128172; WhatsApp Enquiry &rarr;
        </a>
      </div>
    `;
  }).join('');

  // Re-observe newly rendered cards
  observeRevealElements();
}

/* ============================================================
   OPEN APPOINTMENT WITH PREFILLED DEPARTMENT
   ============================================================ */
function openAppointmentWithDept(deptName) {
  const deptSelect = document.getElementById('appt-dept');
  if (deptSelect) {
    deptSelect.value = deptName;
  }
  const apptSection = document.getElementById('appointment');
  if (apptSection) {
    apptSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Global function for inline onclick handlers
window.openAppointmentWithDept = openAppointmentWithDept;

function prefillDept(el) {
  const dept = el.getAttribute('data-dept');
  if (dept) openAppointmentWithDept(dept);
}
window.prefillDept = prefillDept;

/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (isOpen) closeMenu(); else openMenu();
  });

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
}

/* ============================================================
   STICKY HEADER SHADOW ON SCROLL
   ============================================================ */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    },
    { rootMargin: '-72px 0px 0px 0px', threshold: 0 }
  );

  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
  document.body.prepend(sentinel);
  observer.observe(sentinel);
}

/* ============================================================
   SCROLL REVEAL ANIMATIONS
   ============================================================ */
let revealObserver;

function observeRevealElements() {
  const elements = document.querySelectorAll('.reveal:not(.visible)');
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
  }
  elements.forEach(el => revealObserver.observe(el));
}

/* ============================================================
   SCROLL TO TOP BUTTON
   ============================================================ */
function initScrollTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
function initFAQ() {
  const faqList = document.getElementById('faq-list');
  if (!faqList) return;

  faqList.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all others
      faqList.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/* ============================================================
   FORM VALIDATION HELPERS
   ============================================================ */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidMobile(mobile) {
  return /^[0-9+\s\-]{10,15}$/.test(mobile.trim());
}

function showError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.add('error');
  if (error) error.classList.add('show');
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.remove('error');
  if (error) error.classList.remove('show');
}

function clearErrorOnInput(inputId, errorId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', () => clearError(inputId, errorId));
  input.addEventListener('change', () => clearError(inputId, errorId));
}

/* ============================================================
   APPOINTMENT FORM
   ============================================================ */
function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  const successEl = document.getElementById('form-success');
  const submitBtn = document.getElementById('appt-submit-btn');
  if (!form) return;

  // Set minimum date to today
  const dateInput = document.getElementById('appt-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Clear errors on input
  clearErrorOnInput('appt-name', 'appt-name-error');
  clearErrorOnInput('appt-mobile', 'appt-mobile-error');
  clearErrorOnInput('appt-email', 'appt-email-error');
  clearErrorOnInput('appt-dept', 'appt-dept-error');
  clearErrorOnInput('appt-date', 'appt-date-error');
  clearErrorOnInput('appt-time', 'appt-time-error');

  const consentCheck = document.getElementById('appt-consent');
  if (consentCheck) {
    consentCheck.addEventListener('change', () => {
      clearError('appt-consent', 'appt-consent-error');
    });
  }

  let submitted = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitted) return; // Prevent duplicate submission

    let valid = true;

    // Validate name
    const name = document.getElementById('appt-name').value.trim();
    if (!name || name.length < 2) {
      showError('appt-name', 'appt-name-error');
      valid = false;
    } else {
      clearError('appt-name', 'appt-name-error');
    }

    // Validate mobile
    const mobile = document.getElementById('appt-mobile').value.trim();
    if (!mobile || !isValidMobile(mobile)) {
      showError('appt-mobile', 'appt-mobile-error');
      valid = false;
    } else {
      clearError('appt-mobile', 'appt-mobile-error');
    }

    // Validate email (if provided)
    const email = document.getElementById('appt-email').value.trim();
    if (email && !isValidEmail(email)) {
      showError('appt-email', 'appt-email-error');
      valid = false;
    } else {
      clearError('appt-email', 'appt-email-error');
    }

    // Validate department
    const dept = document.getElementById('appt-dept').value;
    if (!dept) {
      showError('appt-dept', 'appt-dept-error');
      valid = false;
    } else {
      clearError('appt-dept', 'appt-dept-error');
    }

    // Validate date
    const date = document.getElementById('appt-date').value;
    if (!date) {
      showError('appt-date', 'appt-date-error');
      valid = false;
    } else {
      clearError('appt-date', 'appt-date-error');
    }

    // Validate time slot
    const time = document.getElementById('appt-time').value;
    if (!time) {
      showError('appt-time', 'appt-time-error');
      valid = false;
    } else {
      clearError('appt-time', 'appt-time-error');
    }

    // Validate consent
    const consent = document.getElementById('appt-consent').checked;
    if (!consent) {
      showError('appt-consent', 'appt-consent-error');
      valid = false;
    } else {
      clearError('appt-consent', 'appt-consent-error');
    }

    if (!valid) {
      // Focus first error field
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Simulate submission
    submitted = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    setTimeout(() => {
      form.style.display = 'none';
      if (successEl) successEl.classList.add('show');
    }, 600);
  });
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('contact-success');
  const submitBtn = document.getElementById('contact-submit-btn');
  if (!form) return;

  clearErrorOnInput('contact-name', 'contact-name-error');
  clearErrorOnInput('contact-mobile', 'contact-mobile-error');
  clearErrorOnInput('contact-subject', 'contact-subject-error');
  clearErrorOnInput('contact-message', 'contact-message-error');

  let submitted = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitted) return;

    let valid = true;

    const name = document.getElementById('contact-name').value.trim();
    if (!name || name.length < 2) {
      showError('contact-name', 'contact-name-error');
      valid = false;
    } else {
      clearError('contact-name', 'contact-name-error');
    }

    const mobile = document.getElementById('contact-mobile').value.trim();
    if (!mobile || !isValidMobile(mobile)) {
      showError('contact-mobile', 'contact-mobile-error');
      valid = false;
    } else {
      clearError('contact-mobile', 'contact-mobile-error');
    }

    const subject = document.getElementById('contact-subject').value.trim();
    if (!subject) {
      showError('contact-subject', 'contact-subject-error');
      valid = false;
    } else {
      clearError('contact-subject', 'contact-subject-error');
    }

    const message = document.getElementById('contact-message').value.trim();
    if (!message || message.length < 10) {
      showError('contact-message', 'contact-message-error');
      valid = false;
    } else {
      clearError('contact-message', 'contact-message-error');
    }

    if (!valid) return;

    submitted = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      form.querySelectorAll('.form-group, .form-row, .form-submit-row').forEach(el => {
        el.style.display = 'none';
      });
      if (successEl) successEl.classList.add('show');
    }, 600);
  });
}

/* ============================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
      const targetY = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          link.style.fontWeight = '';
        });
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.style.color = 'var(--teal-dark)';
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));
}

/* ============================================================
   SET CURRENT YEAR IN FOOTER
   ============================================================ */
function setCurrentYear() {
  const yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* ============================================================
   INIT ALL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderSpecialities();
  initMobileNav();
  initHeaderScroll();
  observeRevealElements();
  initScrollTop();
  initFAQ();
  initAppointmentForm();
  initContactForm();
  initSmoothScroll();
  initActiveNav();
  setCurrentYear();
});
