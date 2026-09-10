/* piyushthesingh.com */

document.documentElement.classList.add('js');

/* Failsafe first: if anything below throws, the reveal animation must never
   leave the page invisible. This runs independently of the main script. */
window.setTimeout(function () {
  var hidden = document.querySelectorAll('.reveal:not(.is-in)');
  for (var i = 0; i < hidden.length; i++) hidden[i].classList.add('is-in');
}, 1500);

(function () {
  'use strict';

  /* ---- Sticky nav state ---- */
  var nav = document.getElementById('nav');
  if (nav) {
    var setStuck = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 24);
    };
    setStuck();
    window.addEventListener('scroll', setStuck, { passive: true });
  }

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  if (toggle && menu) {
    var closeMenu = function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }


  /* ---- Skills tabs ---- */
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.tab-panel');

  var selectTab = function (key) {
    tabs.forEach(function (t) {
      var on = t.dataset.tab === key;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(function (p) {
      p.classList.toggle('is-active', p.dataset.panel === key);
    });
  };

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t.dataset.tab); });
    t.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (next) { e.preventDefault(); next.focus(); selectTab(next.dataset.tab); }
    });
  });

  /* ---- Read more on experience cards ---- */
  document.querySelectorAll('.read-more').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', function () {
      var open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.firstChild.nodeValue = open ? 'Read less ' : 'Read more ';
    });
  });

  /* ---- Reveal on scroll ----
     Content is present and readable without JS. This only adds the fade.
     Anything still hidden after 1.2s is forced visible so nothing can get stuck. */
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var showAll = function () {
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
  };

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  for (var j = 0; j < items.length; j++) io.observe(items[j]);

})();
