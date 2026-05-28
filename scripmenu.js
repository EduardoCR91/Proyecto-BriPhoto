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

  const modal = document.getElementById('video-modal') || document.getElementById('media-modal');
  const modalBody = document.getElementById('video-modal-body');
  const videoTriggers = document.querySelectorAll('.video-trigger, .photo-trigger');

  if (modal && modalBody && videoTriggers.length) {
    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      modalBody.innerHTML = '';
      document.body.style.overflow = '';
    };

    videoTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const type = trigger.dataset.type || 'image';
        const src = trigger.dataset.src;
        const alt = trigger.dataset.alt || 'Vista ampliada';
        if (!src) return;

        if (type === 'youtube') {
          modalBody.innerHTML = `<iframe src="${src}" title="Video de muestra" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else if (type === 'local') {
          modalBody.innerHTML = `<video controls autoplay><source src="${src}" type="video/webm">Tu navegador no soporta video.</video>`;
        } else {
          modalBody.innerHTML = `<img src="${src}" alt="${alt}">`;
        }

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    modal.addEventListener('click', (event) => {
      if (event.target.closest('[data-close-modal="true"]')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }
});
