    document.getElementById("year").textContent = new Date().getFullYear();

    /* ========== VIEW MORE — Projects ========== */
    (function () {
      const BATCH = 2; // how many cards to reveal per click
      const btn = document.getElementById('btn-view-more');
      const wrap = document.getElementById('view-more-wrap');

      function updateButton() {
        const hidden = document.querySelectorAll('.project-card.project-hidden');
        if (hidden.length === 0) {
          wrap.style.display = 'none'; // no more cards to show
        }
      }

      // Hide button initially if there are no hidden cards
      updateButton();

      if (btn) {
        btn.addEventListener('click', function () {
          const hiddenCards = document.querySelectorAll('.project-card.project-hidden');
          const toReveal = Array.from(hiddenCards).slice(0, BATCH);
          toReveal.forEach(function (card) {
            card.classList.remove('project-hidden');
            card.classList.add('project-revealed');
          });
          updateButton();
        });
      }
    })();

    /* ========== SCROLL REVEAL ========== */
(function () {
  if (typeof window === 'undefined') return;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    document.querySelectorAll(
      '.hero__inner, .hero__photo-placeholder, .about-text, .skills__icons, .lang-card, .studies-card, .experience__card, .project-card, .contact__card, .section-title'
    ).forEach(el => {
      el.classList.add('in-view');
    });
    return;
  }

  const targets = [];

  const heroPhoto = document.querySelector('.hero__photo-placeholder');
  if (heroPhoto) targets.push({el: heroPhoto, cls: 'reveal-left'});

  const heroInner = document.querySelector('.hero__inner');
  if (heroInner) targets.push({el: heroInner, cls: 'reveal-up'});

  const aboutText = document.querySelector('.about-text');
  if (aboutText) targets.push({el: aboutText, cls: 'reveal-right'});

  const aboutCard = document.querySelector('.hero__about-card');
  if (aboutCard) {
    aboutCard.classList.add('card-lift');
    targets.push({el: aboutCard, cls: 'reveal-up'});
  }

  const skillsGroup = document.querySelector('.skills__icons');
  if (skillsGroup) {
    skillsGroup.classList.add('reveal-stagger');
    targets.push({el: skillsGroup, cls: 'reveal-up'});
  }

  document.querySelectorAll('.lang-card, .studies-card').forEach(node => {
    node.classList.add('card-lift');
    targets.push({el: node, cls: 'reveal-up'});
  });

  document.querySelectorAll('.experience__card').forEach(node => {
    node.classList.add('card-lift');
    targets.push({el: node, cls: 'reveal-right'});
  });

      document.querySelectorAll('.project-card:not(.project-hidden)').forEach((node, i) => {
    node.classList.add('card-lift');
    const cls = (i % 2 === 0) ? 'reveal-left' : 'reveal-right';
    targets.push({el: node, cls});
  });

  const contactCard = document.querySelector('.contact__card');
  if (contactCard) {
    contactCard.classList.add('card-lift');
    targets.push({el: contactCard, cls: 'reveal-up'});
  }

  document.querySelectorAll('.section-title').forEach(node => {
    targets.push({el: node, cls: 'reveal-up'});
  });

  targets.forEach(t => {
    if (!t.el) return;
    if (!t.el.classList.contains('reveal') && !t.el.classList.contains('reveal-left') && !t.el.classList.contains('reveal-right') && !t.el.classList.contains('reveal-up')) {
      t.el.classList.add('reveal', t.cls);
    } else {
      t.el.classList.add(t.cls);
    }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('in-view');
        io.unobserve(el);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.12
  });

  targets.forEach(t => {
    if (t.el) io.observe(t.el);
  });
})();