(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');
  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const projectCards = [...document.querySelectorAll('.project-card')];
  const projectCount = document.querySelector('#project-count');
  const emptyState = document.querySelector('#project-empty');
  const year = document.querySelector('#year');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileQuery = window.matchMedia('(max-width: 820px)');
  let menuOpen = false;

  if (year) year.textContent = String(new Date().getFullYear());

  const focusableMenuItems = () => navigation
    ? [...navigation.querySelectorAll('a[href], button:not([disabled])')]
    : [];

  const setMenu = (open, { returnFocus = false } = {}) => {
    if (!menuButton || !navigation) return;
    menuOpen = Boolean(open && mobileQuery.matches);
    menuButton.setAttribute('aria-expanded', String(menuOpen));
    const label = menuButton.querySelector('.sr-only');
    if (label) label.textContent = menuOpen ? 'Close navigation' : 'Open navigation';
    navigation.classList.toggle('open', menuOpen);
    document.body.classList.toggle('menu-open', menuOpen);
    if (menuOpen) focusableMenuItems()[0]?.focus();
    if (!menuOpen && returnFocus) menuButton.focus();
  };

  menuButton?.addEventListener('click', () => setMenu(!menuOpen));
  navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('click', (event) => {
    if (!menuOpen || !navigation || !menuButton) return;
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (!menuOpen || !navigation) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenu(false, { returnFocus: true });
      return;
    }
    if (event.key !== 'Tab') return;
    const items = focusableMenuItems();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });

  const resetMenuForViewport = () => {
    if (!mobileQuery.matches) setMenu(false);
  };
  mobileQuery.addEventListener?.('change', resetMenuForViewport);
  window.addEventListener('resize', resetMenuForViewport, { passive: true });

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const active = link.hash === `#${id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  const syncActiveFromPosition = () => {
    if (!sections.length) return;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) { setActiveLink(sections[sections.length - 1].id); return; }
    const marker = window.scrollY + Math.max(120, window.innerHeight * .34);
    let active = sections[0];
    sections.forEach((section) => { if (section.offsetTop <= marker) active = section; });
    setActiveLink(active.id);
  };

  let activeFrame = 0;
  const requestActiveSync = () => {
    if (activeFrame) return;
    activeFrame = requestAnimationFrame(() => { activeFrame = 0; syncActiveFromPosition(); });
  };
  syncActiveFromPosition();
  window.addEventListener('scroll', requestActiveSync, { passive: true });
  window.addEventListener('resize', requestActiveSync, { passive: true });
  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (sections.some((section) => section.id === id)) setActiveLink(id);
    else syncActiveFromPosition();
  });
  window.addEventListener('popstate', requestActiveSync);

  const applyFilter = (selectedButton) => {
    const filter = selectedButton?.dataset.filter || 'all';
    filterButtons.forEach((button) => {
      const selected = button === selectedButton;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });

    let visible = 0;
    projectCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(/\s+/).filter(Boolean);
      const hidden = filter !== 'all' && !categories.includes(filter);
      card.classList.toggle('hidden', hidden);
      card.setAttribute('aria-hidden', String(hidden));
      card.querySelectorAll('a, button, summary, input, select, textarea').forEach((control) => {
        if (hidden) {
          if (!control.hasAttribute('data-previous-tabindex')) control.setAttribute('data-previous-tabindex', control.getAttribute('tabindex') ?? '');
          control.setAttribute('tabindex', '-1');
        } else {
          const previous = control.getAttribute('data-previous-tabindex');
          if (previous !== null) {
            if (previous === '') control.removeAttribute('tabindex'); else control.setAttribute('tabindex', previous);
            control.removeAttribute('data-previous-tabindex');
          }
        }
      });
      if (hidden) card.querySelectorAll('details[open]').forEach((details) => { details.open = false; });
      else visible += 1;
    });

    if (projectCount) projectCount.textContent = `Showing ${visible} ${visible === 1 ? 'project' : 'projects'}`;
    if (emptyState) emptyState.hidden = visible !== 0;
  };

  filterButtons.forEach((button) => button.addEventListener('click', () => applyFilter(button)));
  if (filterButtons.length) applyFilter(filterButtons.find((button) => button.classList.contains('active')) || filterButtons[0]);

  const handleImageError = (image, remove = false) => {
    image.addEventListener('error', () => {
      const visual = image.closest('.project-visual, .profile-frame');
      visual?.classList.add('image-missing');
      if (remove) image.remove(); else image.hidden = true;
    }, { once: true });
  };
  const profileImage = document.querySelector('.profile-frame img');
  if (profileImage) handleImageError(profileImage);
  document.querySelectorAll('.project-visual img').forEach((image) => handleImageError(image, true));

  const revealAll = () => document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: .06 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  }
  reducedMotion.addEventListener?.('change', (event) => { if (event.matches) revealAll(); });
})();
