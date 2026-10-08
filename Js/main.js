/* ============================================================
   NIaina.dev — Interactions
   ============================================================ */

// ---------- Curseur custom ----------
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});

function animateCursor(){
  cx += (mx - cx) * 0.15;
  cy += (my - cy) * 0.15;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Effet grow sur les éléments interactifs
document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// ---------- Header scroll ----------
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ---------- Reveal au scroll ----------
const reveals = document.querySelectorAll('.section-head, .card, .skill, .quote, .about-grid, .contact-grid');
reveals.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

// ---------- Burger menu ----------
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav ul');

toggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('active');
  toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-link').forEach(lien => {
  lien.addEventListener('click', () => menu.classList.remove('active'));
});

// ---------- Popup "projet perso" ----------
const popup = document.querySelector('#popup-overlay');
document.querySelectorAll('.perso').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    popup.classList.add('active');
  });
});
document.getElementById('close-popup')?.addEventListener('click', () => {
  popup.classList.remove('active');
});
popup?.addEventListener('click', e => {
  if(e.target === popup) popup.classList.remove('active');
});

// ---------- Formulaire contact (mailto) ----------
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

form?.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if(!name || !email || !message){
    statusEl.textContent = "❌ Tous les champs sont obligatoires.";
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    statusEl.textContent = "❌ Email invalide.";
    return;
  }

  statusEl.textContent = "📧 Ouverture de votre messagerie…";

  const subject = encodeURIComponent("Nouveau message depuis le site");
  const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const toEmail = "rafaltanjonaniaina@gmail.com";

  window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
});

// ---------- Smooth scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if(id.length > 1){
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});

// ---------- Année footer ----------
document.getElementById('year').textContent = new Date().getFullYear();