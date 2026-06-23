/* nav.js — shared across all three pages */

/* ── ACTIVE NAV LINK ─────────────────────────
   Each page sets window.ACTIVE_PAGE before loading this script.
   e.g. <script> window.ACTIVE_PAGE = 'about'; </script>           */
document.addEventListener('DOMContentLoaded', function () {
  var page = window.ACTIVE_PAGE || '';
  var link = document.getElementById('nav-' + page);
  if (link) link.classList.add('active');
});

/* ── NAVBAR SCROLL SHADOW ───────────────────── */
window.addEventListener('scroll', function () {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

/* ── MOBILE MENU ────────────────────────────── */
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ── CONTACT MODAL ──────────────────────────── */
function openModal() {
  // Reset form and messages every time the modal opens
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  var error = document.getElementById('formError');
  var btn = document.getElementById('submitBtn');
  if (form) form.reset();
  if (form) form.style.display = 'block';
  if (success) success.style.display = 'none';
  if (error) error.style.display = 'none';
  if (btn) { btn.textContent = 'Send Message'; btn.disabled = false; }
  document.getElementById('contactModal').classList.add('open');
}
function closeModal() {
  document.getElementById('contactModal').classList.remove('open');
}
function closeModalOutside(e) {
  if (e.target === document.getElementById('contactModal')) closeModal();
}
 
/* ── FORMSPREE SUBMIT ───────────────────────── */
async function handleFormSubmit(e) {
  e.preventDefault();
  var form = document.getElementById('contactForm');
  var btn = document.getElementById('submitBtn');
  var success = document.getElementById('formSuccess');
  var error = document.getElementById('formError');
 
  btn.textContent = 'Sending…';
  btn.disabled = true;
  error.style.display = 'none';
 
  try {
    var response = await fetch('https://formspree.io/f/xlgydyvp', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
 
    if (response.ok) {
      form.style.display = 'none';
      success.style.display = 'block';
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    error.style.display = 'block';
  }
}
 

/* ── FADE-UP ON SCROLL ──────────────────────── */
function observeFadeUps() {
  var els = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { obs.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('visible'); });
  }
}
document.addEventListener('DOMContentLoaded', observeFadeUps);

/* ── PRICING TABS (pricing.html only) ──────── */
function switchTab(panel, btn) {
  document.querySelectorAll('.pricing-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelectorAll('.pricing-tab').forEach(function (t) { t.classList.remove('active'); });
  var el = document.getElementById('panel-' + panel);
  if (el) el.classList.add('active');
  if (btn) btn.classList.add('active');
}

/* ── MARQUEE (index.html only) ──────────────── */
function buildMarquee() {
  var inner = document.getElementById('marqueeInner');
  if (!inner) return;
  var items = ['Website Creation','Brand Identity','Logo Design','Social Media','Theme Design','Kingston, ON','Small Business Focus','Creative Strategy'];
  var html = '';
  for (var i = 0; i < 3; i++) {
    items.forEach(function (item) { html += '<div class="strip-item">' + item + '</div>'; });
  }
  inner.innerHTML = html;
}
document.addEventListener('DOMContentLoaded', buildMarquee);
