// عناصر DOM
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const header = document.querySelector('header');
const hero = document.querySelector('.hero');

// ---------- 1. نظام الوضع الليلي/النهاري ----------
function setTheme(mode) {
  if (mode === 'dark') {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

function toggleTheme() {
  const current = body.classList.contains('dark') ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

themeToggle.addEventListener('click', toggleTheme);

// ضبط الوضع حسب الوقت أو الإعداد المحفوظ
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const hour = new Date().getHours();
  if (hour >= 18 || hour < 6) setTheme('dark');
  else setTheme('light');
}

// ---------- 2. خلفية متحركة خفيفة ----------
const canvas = document.createElement('canvas');
canvas.classList.add('background-animation');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];
const numParticles = 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.8 - 0.4;
    this.speedY = Math.random() * 0.8 - 0.4;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = body.classList.contains('dark')
      ? 'rgba(255,255,255,0.15)'
      : 'rgba(0,0,0,0.1)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// ---------- 3. تأثيرات التمرير (Scroll animations) ----------
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.fade-in, .slide-up, .slide-left').forEach(el => {
  observer.observe(el);
});

// ---------- 4. تأثير التمرير في الهيدر ----------
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
