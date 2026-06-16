const API = 'http://localhost:3000/api';

function getToken()    { return localStorage.getItem('sb_token'); }
function getUser()     { try { return JSON.parse(localStorage.getItem('sb_user')); } catch { return null; } }
function setAuth(t, u) { localStorage.setItem('sb_token', t); localStorage.setItem('sb_user', JSON.stringify(u)); }
function clearAuth()   { localStorage.removeItem('sb_token'); localStorage.removeItem('sb_user'); }
function isLoggedIn()  { return !!getToken(); }

function escapeHTML(str) {
  if (!str) return '';
  return str
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function updateNav() {
  const el = document.getElementById('nav-actions');
  const navBookings = document.getElementById('nav-bookings');
  const user = getUser();
  if (isLoggedIn() && user) {
    const safeFullName = escapeHTML(user.full_name);
    const initials = safeFullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
    el.innerHTML = `
      <div class="nav-user">
        <div class="nav-avatar">${initials}</div>
        <span class="nav-user-name">${safeFullName.split(' ')[0]}</span>
        <button class="btn-logout" onclick="logout()">Déconnexion</button>
      </div>`;
    navBookings.style.display = 'block';
  } else {
    el.innerHTML = `
      <button class="btn-login" onclick="showPage('login')">→ Login</button>
      <button class="btn-register" onclick="showPage('register')">👤 Register</button>`;
    navBookings.style.display = 'none';
  }
}

function logout() {
  clearAuth();
  updateNav();
  showToast('👋 À bientôt !', 'success');
  showPage('home');
}

function goToBookings() {
  if (!isLoggedIn()) { showPage('login'); return; }
  showPage('bookings');
}

async function apiFetch(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (getToken()) headers['Authorization'] = 'Bearer ' + getToken();
  const res = await fetch(API + path, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erreur serveur');
  return data;
}

const tagColors = { yoga:'tag-yoga', cardio:'tag-cardio', football:'tag-football', fitness:'tag-fitness' };
const tagLabels = { yoga:'Yoga', cardio:'Cardio', football:'Football', fitness:'Fitness' };

function formatDate(d) {
  if (!d) return '';
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const [y,m,day] = d.split('T')[0].split('-');
  return months[parseInt(m)-1]+' '+parseInt(day)+', '+y;
}

function formatTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':');
  const hour = parseInt(h);
  return (hour > 12 ? hour-12 : hour)+':'+(m||'00')+' '+(hour >= 12 ? 'PM' : 'AM');
}

function buildCard(s) {
  const sport     = (s.sport_slug || s.sport || '').toLowerCase();
  const status    = s.status || (s.available_spots === 0 ? 'full' : s.fill_pct >= 80 ? 'almost_full' : 'available');
  const fillClass = status === 'full' ? 'red' : status === 'almost_full' ? 'yellow' : '';
  const spotsLabel = status === 'full'
    ? `0 / ${s.total_spots} spots available`
    : `${s.available_spots} / ${s.total_spots} spots available`;
  const urgent = s.available_spots <= 3 && status !== 'full';
  return `
    <div class="session-card reveal" data-id="${s.id}">
      <div class="card-tags">
        <span class="tag ${tagColors[sport]}">${tagLabels[sport] || escapeHTML(sport)}</span>
        ${status === 'almost_full' ? '<span class="tag tag-almost-full">Almost Full</span>' : ''}
        ${status === 'full'        ? '<span class="tag tag-full">Full</span>' : ''}
      </div>
      <div>
        <div class="card-title">${escapeHTML(s.title)}</div>
        <div class="card-instructor">with ${escapeHTML(s.instructor)}</div>
      </div>
      <div class="card-info">
        <div class="card-info-row">📅 ${formatDate(s.session_date)}</div>
        <div class="card-info-row">🕐 ${formatTime(s.start_time)} (${s.duration_min} min)</div>
        <div class="card-info-row">📍 ${escapeHTML(s.location)}</div>
        <div class="card-info-row">👥 <span class="spots-text ${urgent?'urgent':''}" id="spots-${s.id}">${spotsLabel}</span></div>
      </div>
      <div class="progress-bar"><div class="progress-fill ${fillClass}" id="bar-${s.id}" style="width:${s.fill_pct||0}%"></div></div>
      ${status === 'full'
        ? `<button class="btn-full">Session Full</button>`
        : `<button class="btn-book" id="book-btn-${s.id}" onclick="bookSession(${s.id})">Book Now</button>`}
    </div>`;
}

function buildBookingCard(b) {
  const sport = (b.sport_slug || '').toLowerCase();
  const bookedAt = b.booked_at ? new Date(b.booked_at).toLocaleDateString('fr-FR', { day:'numeric', month:'short', year:'numeric' }) : '';
  return `
    <div class="session-card reveal">
      <div class="card-tags">
        <span class="tag ${tagColors[sport]}">${tagLabels[sport] || escapeHTML(sport)}</span>
        <span class="tag tag-confirmed">✓ Confirmée</span>
      </div>
      <div>
        <div class="card-title">${escapeHTML(b.title)}</div>
        <div class="card-instructor">with ${escapeHTML(b.instructor)}</div>
      </div>
      <div class="card-info">
        <div class="card-info-row">📅 ${formatDate(b.session_date)}</div>
        <div class="card-info-row">🕐 ${formatTime(b.start_time)} (${b.duration_min} min)</div>
        <div class="card-info-row">📍 ${escapeHTML(b.location)}</div>
        <div class="card-info-row">🗓️ Réservé le ${bookedAt}</div>
      </div>
      <button class="btn-cancel" onclick="cancelBooking(${b.booking_id}, this)">Annuler la réservation</button>
    </div>`;
}

async function loadFeatured() {
  try {
    const data = await apiFetch('/sessions/featured');
    const sessions = Array.isArray(data) ? data : data.sessions || [];
    document.getElementById('featured-cards').innerHTML = sessions.map(buildCard).join('');
    observeReveal();
  } catch {
    document.getElementById('featured-cards').innerHTML = `<div class="no-results"><div class="no-results-icon">⚠️</div><h3>Impossible de charger les sessions</h3><p>Vérifie que le serveur tourne sur localhost:3000</p></div>`;
  }
}

let filterTimer = null;
async function loadSessions(params = {}) {
  const grid  = document.getElementById('sessions-grid');
  const errEl = document.getElementById('sessions-api-error');
  errEl.style.display = 'none';
  const qs = new URLSearchParams();
  if (params.sport)  qs.set('sport',  params.sport);
  if (params.date)   qs.set('date',   params.date);
  if (params.search) qs.set('search', params.search);
  try {
    const data = await apiFetch('/sessions?' + qs.toString());
    const sessions = data.sessions || [];
    document.getElementById('sessions-count-num').textContent = sessions.length;
    grid.innerHTML = sessions.length
      ? sessions.map(buildCard).join('')
      : `<div class="no-results"><div class="no-results-icon">🔍</div><h3>No sessions found</h3><p>Try adjusting your filters</p></div>`;
    observeReveal();
  } catch {
    document.getElementById('sessions-error-msg').textContent = 'Impossible de charger les sessions.';
    errEl.style.display = 'flex';
    grid.innerHTML = '';
    document.getElementById('sessions-count-num').textContent = '0';
  }
}

async function loadBookings() {
  const grid  = document.getElementById('bookings-grid');
  const errEl = document.getElementById('bookings-api-error');
  const countEl = document.getElementById('bookings-count');
  errEl.style.display = 'none';
  grid.innerHTML = `
    <div class="skeleton-card"><div class="skeleton skeleton-line" style="width:40%"></div><div class="skeleton skeleton-line" style="width:70%;height:18px"></div><div class="skeleton skeleton-line" style="width:55%"></div><div class="skeleton skeleton-line" style="width:100%;height:40px;margin-top:8px"></div></div>
    <div class="skeleton-card"><div class="skeleton skeleton-line" style="width:40%"></div><div class="skeleton skeleton-line" style="width:70%;height:18px"></div><div class="skeleton skeleton-line" style="width:55%"></div><div class="skeleton skeleton-line" style="width:100%;height:40px;margin-top:8px"></div></div>
    <div class="skeleton-card"><div class="skeleton skeleton-line" style="width:40%"></div><div class="skeleton skeleton-line" style="width:70%;height:18px"></div><div class="skeleton skeleton-line" style="width:55%"></div><div class="skeleton skeleton-line" style="width:100%;height:40px;margin-top:8px"></div></div>`;
  try {
    const data = await apiFetch('/bookings/me');
    const bookings = data.bookings || [];
    document.getElementById('bookings-count-num').textContent = bookings.length;
    countEl.style.display = 'block';
    if (!bookings.length) {
      grid.innerHTML = `<div class="no-results" style="grid-column:1/-1"><div class="no-results-icon">📭</div><h3>Aucune réservation</h3><p>Vous n'avez pas encore réservé de session.</p></div>`;
    } else {
      grid.innerHTML = bookings.map(buildBookingCard).join('');
      observeReveal();
    }
  } catch (err) {
    document.getElementById('bookings-error-msg').textContent = err.message;
    errEl.style.display = 'flex';
    grid.innerHTML = '';
  }
}

async function cancelBooking(bookingId, btn) {
  if (!confirm('Annuler cette réservation ?')) return;
  btn.textContent = '⏳ Annulation...';
  btn.disabled = true;
  try {
    await apiFetch('/bookings/' + bookingId, { method: 'DELETE' });
    showToast('✅ Réservation annulée', 'success');
    loadBookings();
  } catch (err) {
    btn.textContent = 'Annuler la réservation';
    btn.disabled = false;
    showToast('❌ ' + err.message, 'error');
  }
}

function filterSessions() {
  clearTimeout(filterTimer);
  filterTimer = setTimeout(() => {
    loadSessions({
      search: document.getElementById('filter-search').value,
      sport:  document.getElementById('filter-sport').value,
      date:   document.getElementById('filter-date').value,
    });
  }, 300);
}

function heroSearch() {
  const sport = document.getElementById('hero-sport').value;
  const date  = document.getElementById('hero-date').value;
  showPage('sessions');
  setTimeout(() => {
    if (sport) document.getElementById('filter-sport').value = sport;
    if (date)  document.getElementById('filter-date').value  = date;
    filterSessions();
  }, 50);
}

async function bookSession(id) {
  if (!isLoggedIn()) { showToast('🔒 Connecte-toi pour réserver', 'error'); showPage('login'); return; }
  const btn = document.getElementById('book-btn-' + id);
  if (btn) { btn.textContent = '⏳ Booking...'; btn.disabled = true; }
  try {
    const data = await apiFetch('/bookings', { method: 'POST', body: JSON.stringify({ session_id: id }) });
    const s = data.session;
    const status = s.status;
    const spotsEl = document.getElementById('spots-' + id);
    const barEl   = document.getElementById('bar-'   + id);
    if (spotsEl) spotsEl.textContent = `${s.available_spots} / ${s.total_spots} spots available`;
    if (barEl)   { barEl.style.width = s.fill_pct + '%'; barEl.className = 'progress-fill ' + (status==='full'?'red':status==='almost_full'?'yellow':''); }
    if (btn && status === 'full') btn.outerHTML = `<button class="btn-full">Session Full</button>`;
    else if (btn) { btn.textContent = 'Book Now'; btn.disabled = false; }
    showToast('✅ ' + (data.message || 'Réservation confirmée !'), 'success');
  } catch (err) {
    if (btn) { btn.textContent = 'Book Now'; btn.disabled = false; }
    showToast('❌ ' + err.message, 'error');
  }
}

function validateLoginField(field) {
  if (field === 'email') {
    const v = document.getElementById('login-email').value;
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    document.getElementById('login-email-error').textContent = v && !ok ? 'Email invalide' : '';
    document.getElementById('login-email').className = v ? (ok?'input-ok':'input-error') : '';
    return ok;
  }
  if (field === 'password') {
    const v = document.getElementById('login-password').value;
    const ok = v.length >= 6;
    document.getElementById('login-password-error').textContent = v && !ok ? 'Minimum 6 caractères' : '';
    document.getElementById('login-password').className = v ? (ok?'input-ok':'input-error') : '';
    return ok;
  }
}

async function submitLogin() {
  const errCard = document.getElementById('login-api-error');
  errCard.style.display = 'none';
  const emailOk = validateLoginField('email');
  const passOk  = validateLoginField('password');
  const email = document.getElementById('login-email').value;
  const pass  = document.getElementById('login-password').value;
  if (!email) { document.getElementById('login-email-error').textContent = 'Email requis'; document.getElementById('login-email').className='input-error'; }
  if (!pass)  { document.getElementById('login-password-error').textContent = 'Mot de passe requis'; document.getElementById('login-password').className='input-error'; }
  if (!emailOk || !passOk) return;
  const btn = document.getElementById('login-btn');
  btn.textContent = '⏳ Connexion...'; btn.disabled = true;
  try {
    const data = await apiFetch('/auth/login', { method:'POST', body: JSON.stringify({ email, password: pass }) });
    setAuth(data.token, data.user);
    updateNav();
    showToast('✅ Bienvenue ' + data.user.full_name.split(' ')[0] + ' !', 'success');
    showPage('home');
  } catch (err) {
    errCard.textContent = '❌ ' + err.message;
    errCard.style.display = 'block';
  } finally {
    btn.textContent = '→ Sign In'; btn.disabled = false;
  }
}

function passwordStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

function validateRegField(field) {
  if (field === 'name') {
    const v = document.getElementById('reg-name').value.trim();
    const ok = v.length >= 2;
    document.getElementById('reg-name-error').textContent = v && !ok ? 'Minimum 2 caractères' : '';
    document.getElementById('reg-name').className = v ? (ok?'input-ok':'input-error') : '';
    return ok && v.length > 0;
  }
  if (field === 'email') {
    const v = document.getElementById('reg-email').value;
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    document.getElementById('reg-email-error').textContent = v && !ok ? 'Email invalide' : '';
    document.getElementById('reg-email').className = v ? (ok?'input-ok':'input-error') : '';
    return ok;
  }
  if (field === 'password') {
    const v = document.getElementById('reg-password').value;
    const score = passwordStrength(v);
    const bar = document.getElementById('pw-strength-bar');
    bar.style.width = v ? (score*25)+'%' : '0%';
    bar.style.background = ['','#ef4444','#f59e0b','#22c55e','#16a34a'][score] || '';
    const ok = v.length >= 6;
    document.getElementById('reg-password-error').textContent = v && !ok ? 'Minimum 6 caractères' : '';
    document.getElementById('reg-password').className = v ? (ok?'input-ok':'input-error') : '';
    if (document.getElementById('reg-confirm').value) validateRegField('confirm');
    return ok;
  }
  if (field === 'confirm') {
    const pw = document.getElementById('reg-password').value;
    const v  = document.getElementById('reg-confirm').value;
    const ok = v === pw && v.length > 0;
    document.getElementById('reg-confirm-error').textContent = v && !ok ? 'Les mots de passe ne correspondent pas' : '';
    document.getElementById('reg-confirm').className = v ? (ok?'input-ok':'input-error') : '';
    return ok;
  }
  if (field === 'terms') {
    const checked = document.getElementById('terms').checked;
    document.getElementById('reg-terms-error').textContent = checked ? '' : 'Vous devez accepter les conditions';
    return checked;
  }
}

async function submitRegister() {
  const errCard = document.getElementById('reg-api-error');
  errCard.style.display = 'none';
  const nameOk    = validateRegField('name');
  const emailOk   = validateRegField('email');
  const passOk    = validateRegField('password');
  const confirmOk = validateRegField('confirm');
  const termsOk   = validateRegField('terms');
  if (!nameOk || !emailOk || !passOk || !confirmOk || !termsOk) return;
  const btn = document.getElementById('reg-btn');
  btn.textContent = '⏳ Création...'; btn.disabled = true;
  try {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ full_name: document.getElementById('reg-name').value.trim(), email: document.getElementById('reg-email').value, password: document.getElementById('reg-password').value })
    });
    setAuth(data.token, data.user);
    updateNav();
    showToast('🎉 Compte créé ! Bienvenue ' + data.user.full_name.split(' ')[0] + ' !', 'success');
    showPage('home');
  } catch (err) {
    errCard.textContent = '❌ ' + err.message;
    errCard.style.display = 'block';
  } finally {
    btn.textContent = '👤 Create Account'; btn.disabled = false;
  }
}

function observeReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const start  = performance.now();
  function step(now) {
    const p = Math.min((now - start) / 1400, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function observeCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(c => obs.observe(c));
}

let toastTimer;
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');
  window.scrollTo(0, 0);
  if (name === 'sessions') loadSessions();
  if (name === 'bookings') loadBookings();
  setTimeout(observeReveal, 50);
}

document.addEventListener('DOMContentLoaded', () => {
  updateNav();
  loadFeatured();
  observeCounters();
  setTimeout(observeReveal, 100);
});
