/**
 * CloudVize WhatsApp Chat Widget
 * Professional floating WhatsApp button — injected on all pages.
 * Vanilla JS — no dependencies.
 */
(function () {
  'use strict';

  var phone = '971504447857';
  var message = "Hi CloudVize, I'm interested in your growth services.";
  var whatsappUrl = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);

  // ── Inject keyframe animations ──────────────────────────────────
  var style = document.createElement('style');
  style.textContent =
    '@keyframes ww-fadeInUp {' +
      'from { opacity: 0; transform: translateY(24px); }' +
      'to   { opacity: 1; transform: translateY(0); }' +
    '}' +
    '@keyframes ww-softPulse {' +
      '0%, 100% { box-shadow: 0 8px 28px rgba(37,211,102,0.28); }' +
      '50%      { box-shadow: 0 8px 36px rgba(37,211,102,0.42); }' +
    '}';
  document.head.appendChild(style);

  // ── Create Widget Container ─────────────────────────────────────
  var widget = document.createElement('div');
  widget.id = 'whatsapp-widget';
  widget.className =
    'fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[80] flex items-center gap-3';
  // Entrance animation
  widget.style.animation = 'ww-fadeInUp 0.6s ease-out 0.3s both';

  // ── Label (desktop only) ────────────────────────────────────────
  var label = document.createElement('span');
  label.className =
    'hidden md:flex items-center bg-white/90 backdrop-blur-md text-slate-700 text-sm font-semibold ' +
    'px-4 py-2.5 rounded-2xl shadow-lg shadow-slate-900/8 ' +
    'border border-slate-200/50 whitespace-nowrap select-none';
  label.textContent = 'Chat with us';

  // ── WhatsApp Button ─────────────────────────────────────────────
  var button = document.createElement('a');
  button.href = whatsappUrl;
  button.target = '_blank';
  button.rel = 'noopener noreferrer';
  button.setAttribute('aria-label', 'Chat with CloudVize on WhatsApp');
  button.className =
    'flex items-center justify-center w-14 h-14 md:w-[58px] md:h-[58px] rounded-full ' +
    'shadow-lg hover:shadow-xl hover:-translate-y-[2px] active:scale-95 ' +
    'transition-all duration-300 ease-out';
  button.style.cssText =
    'background-color:#25D366;' +
    'animation:ww-softPulse 3s ease-in-out infinite;';

  // WhatsApp SVG icon
  button.innerHTML =
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="white">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
    '</svg>';

  // ── Assemble ────────────────────────────────────────────────────
  widget.appendChild(label);
  widget.appendChild(button);
  document.body.appendChild(widget);
})();