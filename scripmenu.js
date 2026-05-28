document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const submenuHost = document.querySelector('.has-submenu');
  const submenuToggle = document.querySelector('.submenu-toggle');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (submenuHost && submenuToggle) {
    submenuToggle.addEventListener('click', () => {
      const isOpen = submenuHost.classList.toggle('open');
      submenuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.addEventListener('click', (event) => {
    if (submenuHost && !submenuHost.contains(event.target)) {
      submenuHost.classList.remove('open');
      submenuToggle.setAttribute('aria-expanded', 'false');
    }

    if (navLinks && navToggle && !event.target.closest('.nav')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -6% 0px'
      }
    );

    reveals.forEach((item) => observer.observe(item));
  }
});
