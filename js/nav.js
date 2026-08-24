/**
 * CloudVize Mobile Navigation
 * Injects hamburger menu + mobile overlay into React-rendered nav.
 * Vanilla JS — no dependencies.
 */
(function () {
  'use strict';

  var initialized = false;

  function createMobileNav() {
    if (initialized) return;
    var nav = document.querySelector('nav');
    if (!nav) return;

    var container = nav.querySelector('.container');
    if (!container) return;

    initialized = true;

    // ── Hamburger Button ──────────────────────────────────────────
    var hamburger = document.createElement('button');
    hamburger.id = 'mobile-hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.className =
      'md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-slate-700 hover:text-accent-600 hover:bg-accent-50 transition-all z-[60] relative shrink-0 ml-auto';

    hamburger.innerHTML =
      '<svg class="hamburger-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
        '<line x1="3" y1="6" x2="21" y2="6"></line>' +
        '<line x1="3" y1="12" x2="21" y2="12"></line>' +
        '<line x1="3" y1="18" x2="21" y2="18"></line>' +
      '</svg>' +
      '<svg class="close-icon hidden" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
        '<line x1="18" y1="6" x2="6" y2="18"></line>' +
        '<line x1="6" y1="6" x2="18" y2="18"></line>' +
      '</svg>';

    // ── Mobile Menu Overlay ───────────────────────────────────────
    var mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className =
      'fixed inset-0 z-50 bg-white/98 backdrop-blur-xl flex flex-col transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] transform translate-x-full pointer-events-none';
    mobileMenu.setAttribute('aria-hidden', 'true');

    // Build menu HTML
    // Close button inside overlay (top-right, always visible)
    var menuHTML =
      '<button id="mobile-menu-close" class="absolute top-5 right-5 z-[70] w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all shadow-sm" aria-label="Close menu">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<line x1="18" y1="6" x2="6" y2="18"></line>' +
          '<line x1="6" y1="6" x2="18" y2="18"></line>' +
        '</svg>' +
      '</button>';
    menuHTML += '<div class="flex-1 overflow-y-auto pt-24 pb-8 px-6">';
    menuHTML += '<nav class="flex flex-col gap-1">';

    // Home
    menuHTML +=
      '<a href="index.html" class="mobile-nav-link flex items-center gap-3 px-4 py-4 rounded-2xl text-lg font-semibold text-slate-800 hover:text-accent-600 hover:bg-accent-50 transition-all">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>' +
        'Home' +
      '</a>';

    // Services (accordion)
    menuHTML += '<div class="mobile-services-group">';
    menuHTML +=
      '<button class="mobile-services-toggle w-full flex items-center justify-between gap-3 px-4 py-4 rounded-2xl text-lg font-semibold text-slate-800 hover:text-accent-600 hover:bg-accent-50 transition-all">' +
        '<span class="flex items-center gap-3">' +
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>' +
          'Services' +
        '</span>' +
        '<svg class="mobile-services-chevron transition-transform duration-300" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
      '</button>';
    menuHTML += '<div class="mobile-services-submenu hidden pl-4 space-y-1 pb-2">';

    var services = [
      { label: 'Paid Advertising', href: 'paid-advertising.html' },
      { label: 'SEO & Content', href: 'seo-content.html' },
      { label: 'Web Development', href: 'web-development.html' },
      { label: 'Creative Studio', href: 'creative-studio.html' },
      { label: 'Email Marketing', href: 'email-marketing.html' },
      { label: 'CRO & Analytics', href: 'cro-analytics.html' }
    ];

    services.forEach(function (s) {
      menuHTML +=
        '<a href="' + s.href + '" class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-accent-600 hover:bg-accent-50 transition-all">' +
          '<span class="w-1.5 h-1.5 rounded-full bg-accent-400"></span>' +
          s.label +
        '</a>';
    });

    menuHTML += '</div></div>';

    // About Us
    menuHTML +=
      '<a href="about.html" class="mobile-nav-link flex items-center gap-3 px-4 py-4 rounded-2xl text-lg font-semibold text-slate-800 hover:text-accent-600 hover:bg-accent-50 transition-all">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>' +
        'About Us' +
      '</a>';

    // Contact
    menuHTML +=
      '<a href="contact.html" class="mobile-nav-link flex items-center gap-3 px-4 py-4 rounded-2xl text-lg font-semibold text-slate-800 hover:text-accent-600 hover:bg-accent-50 transition-all">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>' +
        'Contact' +
      '</a>';

    menuHTML += '</nav></div>';

    // CTA at bottom
    menuHTML +=
      '<div class="px-6 pb-10 pt-4 border-t border-slate-100">' +
        '<a href="#footer-form" class="mobile-cta-btn flex items-center justify-center gap-2 w-full bg-slate-900 text-white px-6 py-4 rounded-2xl text-base font-bold hover:bg-accent-600 transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98]">' +
          'Get Growth Plan' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' +
        '</a>' +
      '</div>';

    mobileMenu.innerHTML = menuHTML;

    // ── Insert into DOM ───────────────────────────────────────────
    // Place hamburger before the desktop links container
    var desktopLinks = container.querySelector('.hidden.md\\:flex');
    if (desktopLinks) {
      container.insertBefore(hamburger, desktopLinks);
    } else {
      container.appendChild(hamburger);
    }

    document.body.appendChild(mobileMenu);

    // ── State & Event Handlers ────────────────────────────────────
    var isOpen = false;
    var servicesOpen = false;

    var hamburgerIcon = hamburger.querySelector('.hamburger-icon');
    var closeIcon = hamburger.querySelector('.close-icon');
    var servicesToggle = mobileMenu.querySelector('.mobile-services-toggle');
    var servicesSubmenu = mobileMenu.querySelector('.mobile-services-submenu');
    var servicesChevron = mobileMenu.querySelector('.mobile-services-chevron');
    var allNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    var ctaBtn = mobileMenu.querySelector('.mobile-cta-btn');

    function openMenu() {
      isOpen = true;
      hamburger.setAttribute('aria-expanded', 'true');
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      mobileMenu.classList.remove('translate-x-full', 'pointer-events-none');
      mobileMenu.classList.add('translate-x-0');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      isOpen = false;
      hamburger.setAttribute('aria-expanded', 'false');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenu.classList.add('translate-x-full', 'pointer-events-none');
      mobileMenu.classList.remove('translate-x-0');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // Also close services submenu
      if (servicesOpen) {
        servicesOpen = false;
        servicesSubmenu.classList.add('hidden');
        servicesChevron.classList.remove('rotate-180');
      }
    }

    function toggleServices() {
      servicesOpen = !servicesOpen;
      if (servicesOpen) {
        servicesSubmenu.classList.remove('hidden');
        servicesChevron.classList.add('rotate-180');
      } else {
        servicesSubmenu.classList.add('hidden');
        servicesChevron.classList.remove('rotate-180');
      }
    }

    hamburger.addEventListener('click', function () {
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Close button inside overlay
    var overlayCloseBtn = mobileMenu.querySelector('#mobile-menu-close');
    if (overlayCloseBtn) {
      overlayCloseBtn.addEventListener('click', closeMenu);
    }

    servicesToggle.addEventListener('click', toggleServices);

    // Close menu when any nav link is clicked
    allNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // CTA button: close menu and scroll to footer form
    if (ctaBtn) {
      ctaBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeMenu();
        var footer = document.getElementById('footer-form');
        if (footer) {
          setTimeout(function () {
            footer.scrollIntoView({ behavior: 'smooth' });
          }, 350);
        }
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Trap focus inside mobile menu when open
    mobileMenu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        hamburger.focus();
      }
    });
  }

  // ── Initialization ──────────────────────────────────────────────
  function tryInit() {
    if (!initialized) createMobileNav();
  }

  // Use MutationObserver to detect when React renders the nav
  if (document.body) {
    var observer = new MutationObserver(function () {
      tryInit();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Also try on DOM ready and with a delay (React may already be rendered)
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(tryInit, 50);
    setTimeout(tryInit, 300);
    setTimeout(tryInit, 800);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(tryInit, 100);
    setTimeout(tryInit, 500);
  });
})();