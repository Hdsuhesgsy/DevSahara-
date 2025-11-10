// === Dynamic Theme Switcher ===
const toggleButton = document.createElement('button');
toggleButton.classList.add('toggle-theme');
toggleButton.innerHTML = '🌗';
document.querySelector('.header .actions')?.appendChild(toggleButton);

// Automatically detect time for initial theme
const hour = new Date().getHours();
const body = document.body;
if (hour >= 6 && hour < 18) {
  body.classList.add('light-mode');
} else {
  body.classList.remove('light-mode');
}

// Manual toggle theme
toggleButton.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Load last user preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') body.classList.add('light-mode');
if (savedTheme === 'dark') body.classList.remove('light-mode');

// === Smooth Section Reveal Animation ===
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.8s ease';
  observer.observe(card);
});
