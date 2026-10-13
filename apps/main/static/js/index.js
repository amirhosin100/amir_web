// Populate page from central data source
function populateFromData() {
  // Header
  document.querySelector('#navbar .gradient-icon').textContent = PROFILE.initials;
  document.querySelector('#navbar .gradient-text').textContent = PROFILE.domain;

  // Hero badge
  document.querySelector('[data-badge]').textContent = PROFILE.badge;

  // Hero heading
  document.querySelector('#hero h1 span').textContent = PROFILE.firstName;

  // Hero description
  const descEl = document.querySelector('#hero p.text-base');
  descEl.innerHTML = PROFILE.description.replace(
    PROFILE.name,
    `<span class="text-accent-light font-semibold">${PROFILE.name}</span>`
  ).replace(
    PROFILE.mainFramework,
    `<span class="text-accent-light font-semibold">${PROFILE.mainFramework}</span>`
  ).replace(
    'REST API',
    `<span class="text-accent-light font-semibold">REST API</span>`
  );

  // Quick Highlights
  const highlights = document.querySelectorAll('#hero .grid-cols-3 > div');
  highlights[0].querySelector('.font-mono').textContent = PROFILE.experience;
  highlights[0].querySelector('.text-gray-400').textContent = PROFILE.experienceLabel;
  highlights[1].querySelector('.font-mono').textContent = PROFILE.locationShort;
  highlights[1].querySelector('.text-gray-400').textContent = PROFILE.basedInLabel;
  highlights[2].querySelector('.font-mono').textContent = PROFILE.mainFramework;
  highlights[2].querySelector('.text-gray-400').textContent = PROFILE.mainFrameworkLabel;

  // Terminal card
  document.querySelector('[data-terminal-header]').textContent = `${PROFILE.terminalUser}@backend:~`;
  document.querySelector('[data-whoami]').textContent = `${PROFILE.name} — ${PROFILE.role}`;
  document.querySelector('[data-profile-json]').textContent = JSON.stringify(PROFILE.profileJson, null, 2);

  // Footer
  document.querySelector('footer p').textContent = PROFILE.copyright;
}

// Theme management (Dark / Light)
const storedTheme = localStorage.getItem('theme') || 'dark';
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = storedTheme || (prefersLight ? 'light' : 'dark');
document.documentElement.setAttribute('data-theme', initialTheme);

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const icon = theme === 'light'
    ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>'
    : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
  const buttons = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];
  buttons.forEach(btn => {
    if (btn) btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + icon + '</svg>';
  });
}

setTheme(initialTheme);

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'light' ? 'dark' : 'light');
});
document.getElementById('theme-toggle-mobile')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'light' ? 'dark' : 'light');
});

// Navbar scroll effect (theme-aware via CSS variables)
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Background Interactive Canvas Animation (Tech / Network Nodes)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 1.5 + 0.5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.fillStyle = isLight ? 'rgba(249, 115, 22, 0.45)' : 'rgba(99, 102, 241, 0.4)';
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor((width * height) / 15000);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

initParticles();

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        ctx.strokeStyle = isLight ? `rgba(249, 115, 22, ${0.4 * (1 - dist / 120)})` : `rgba(99, 102, 241, ${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

// Initialize page from data source
document.addEventListener('DOMContentLoaded', populateFromData);
