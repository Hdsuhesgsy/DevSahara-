// =============================
//  Hybrid Theme + Animations JS
// =============================

// عناصر من الصفحة
const themeToggleBtn = document.querySelector('.theme-toggle');
const body = document.body;
const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('main');
const header = document.querySelector('header');

// =============================
//  نظام التبديل التلقائي بين الوضعين
// =============================
function setTheme(mode) {
  if (mode === 'dark') {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}

// الكشف عن الوقت الحالي لتحديد الوضع
function detectSystemTheme() {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 19) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

// عند التحميل الأول
if (localStorage.getItem('theme')) {
  setTheme(localStorage.getItem('theme'));
} else {
  detectSystemTheme();
}

// عند الضغط على الزر
themeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }

  // حركة الزر
  themeToggleBtn.classList.add('clicked');
  setTimeout(() => {
    themeToggleBtn.classList.remove('clicked');
  }, 400);
});

// =============================
//  حركة الظهور التدريجي للمحتوى
// =============================
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card, .header, .sidebar, main').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'all 0.7s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 150);
  });
});

// =============================
//  حركة الشريط الجانبي (عند الشاشات الصغيرة)
// =============================
const menuBtn = document.querySelector('.menu-toggle');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

// =============================
//  تأثيرات Hover للأزرار والبطاقات
// =============================
document.querySelectorAll('button, .card').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    el.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    el.style.transform = 'translateY(-3px) scale(1.02)';
    el.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translateY(0) scale(1)';
    el.style.boxShadow = 'none';
  });
});
