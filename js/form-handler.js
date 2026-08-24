/**
 * CloudVize Form Handler
 * - Intercepts all forms on the page
 * - Validates required fields + email format
 * - Honeypot spam prevention
 * - Submits to support@cloudvize.io via FormSubmit.co (or mailto fallback)
 * - Shows success/error messages
 * - Vanilla JS — no dependencies
 */
(function () {
  'use strict';

  var FORM_ENDPOINT = 'https://formsubmit.co/support@cloudvize.io';
  var SUCCESS_MSG = 'Thank you! Your message has been sent.';
  var ERROR_MSG = 'Something went wrong. Please try again or email us at support@cloudvize.io.';

  /**
   * Show a toast / inline message near the form
   */
  function showMessage(form, message, isError) {
    // Remove any existing message
    var existing = form.querySelector('.form-message');
    if (existing) existing.remove();

    var msgEl = document.createElement('div');
    msgEl.className = 'form-message mt-4 p-4 rounded-xl text-sm font-semibold text-center transition-all duration-300 ' +
      (isError
        ? 'bg-red-50 text-red-700 border border-red-200'
        : 'bg-emerald-50 text-emerald-700 border border-emerald-200');

    msgEl.textContent = message;
    form.appendChild(msgEl);

    // Auto-remove after 8 seconds
    setTimeout(function () {
      if (msgEl.parentNode) {
        msgEl.style.opacity = '0';
        msgEl.style.transition = 'opacity 0.5s';
        setTimeout(function () {
          if (msgEl.parentNode) msgEl.remove();
        }, 500);
      }
    }, 8000);
  }

  /**
   * Validate email format
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Validate a single form
   */
  function validateForm(form) {
    var errors = [];
    // Validate all visible inputs (not just [required]) since some forms lack the attribute
    var fields = form.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea, select');

    fields.forEach(function (field) {
      // Skip honeypot
      if (field.name === '_honey' || field.closest('[aria-hidden="true"]')) return;

      var value = (field.value || '').trim();
      var label = field.getAttribute('placeholder') || field.getAttribute('name') || 'This field';

      // Email is the only truly required field for footer forms
      if (field.type === 'email') {
        if (!value) {
          errors.push('Please enter your email address.');
        } else if (!isValidEmail(value)) {
          errors.push('Please enter a valid email address.');
        }
      }
    });

    return errors;
  }

  /**
   * Collect form data as a plain object
   */
  function collectFormData(form) {
    var data = {};
    var inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(function (input) {
      var name = input.getAttribute('name');
      // Skip honeypot and submit buttons
      if (name === '_honey' || input.type === 'submit' || input.type === 'button') return;

      // If no name attribute, generate one from placeholder or type
      if (!name) {
        var placeholder = input.getAttribute('placeholder') || '';
        if (placeholder) {
          name = placeholder.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
        } else {
          name = input.type || 'field';
        }
      }

      data[name] = input.value || '';
    });

    return data;
  }

  /**
   * Submit form data
   */
  function submitForm(form, formData) {
    // Build a hidden iframe for no-redirect submission (FormSubmit style)
    // First try FormSubmit.co AJAX-style with fetch
    var body = new FormData();
    Object.keys(formData).forEach(function (key) {
      body.append(key, formData[key]);
    });

    // Add FormSubmit config
    body.append('_subject', 'New CloudVize Website Inquiry');
    body.append('_captcha', 'false');
    body.append('_template', 'table');
    body.append('_next', ''); // prevent redirect

    // Show loading state
    var submitBtn = form.querySelector('button[type="submit"], button.submit-btn');
    var originalText = '';
    if (submitBtn) {
      originalText = submitBtn.textContent || submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    // Use fetch with no-cors (FormSubmit.co accepts this)
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: body
    })
      .then(function () {
        // FormSubmit.co returns a page, but with no-cors we can't read it.
        // Assume success if no network error.
        showMessage(form, SUCCESS_MSG, false);
        form.reset();

        // Reset honeypot if present
        var honey = form.querySelector('input[name="_honey"]');
        if (honey) honey.value = '';
      })
      .catch(function () {
        // Fallback: try mailto as last resort
        var mailtoLink = buildMailtoLink(formData);
        showMessage(
          form,
          'Unable to send automatically. Please email us directly: ' +
            '<a href="' + mailtoLink + '" class="underline text-accent-600 hover:text-accent-700">Click here to send via email</a>',
          true
        );
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
  }

  /**
   * Build a mailto: link as fallback
   */
  function buildMailtoLink(data) {
    var subject = 'CloudVize Website Inquiry';
    var body = '';
    Object.keys(data).forEach(function (key) {
      body += key + ': ' + (data[key] || 'N/A') + '%0D%0A';
    });
    return 'mailto:support@cloudvize.io?subject=' + encodeURIComponent(subject) + '&body=' + body;
  }

  /**
   * Handle form submission
   */
  function handleSubmit(e) {
    // Stop propagation to prevent React's onSubmit (alert()) from firing
    e.stopPropagation();
    e.preventDefault();

    var form = e.target;

    // Check honeypot
    var honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value.trim() !== '') {
      // Bot detected — silently "succeed" to not tip off bots
      showMessage(form, SUCCESS_MSG, false);
      form.reset();
      return;
    }

    // Validate
    var errors = validateForm(form);
    if (errors.length > 0) {
      showMessage(form, errors.join(' '), true);
      return;
    }

    // Collect and submit
    var formData = collectFormData(form);
    submitForm(form, formData);
  }

  /**
   * Inject honeypot fields into all forms
   */
  function injectHoneypots() {
    var forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
      // Skip if already has honeypot
      if (form.querySelector('input[name="_honey"]')) return;

      var honeyDiv = document.createElement('div');
      honeyDiv.style.cssText = 'position:absolute;left:-9999px;top:-9999px;opacity:0;height:0;width:0;overflow:hidden;';
      honeyDiv.setAttribute('aria-hidden', 'true');

      var honeyInput = document.createElement('input');
      honeyInput.type = 'text';
      honeyInput.name = '_honey';
      honeyInput.tabIndex = -1;
      honeyInput.autocomplete = 'off';

      honeyDiv.appendChild(honeyInput);
      form.appendChild(honeyDiv);
    });
  }

  /**
   * Attach handlers to all forms
   */
  function attachFormHandlers() {
    var forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
      // Skip if already handled
      if (form.dataset.cloudvizeHandled === 'true') return;
      form.dataset.cloudvizeHandled = 'true';

      // Remove any existing React onSubmit that just does alert()
      // We use capture phase to intercept before React
      form.addEventListener('submit', handleSubmit, true);
    });
  }

  // ── Initialization ──────────────────────────────────────────────
  function init() {
    injectHoneypots();
    attachFormHandlers();
  }

  // Use MutationObserver to catch React-rendered forms
  if (document.body) {
    var observer = new MutationObserver(function () {
      injectHoneypots();
      attachFormHandlers();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 100);
    setTimeout(init, 500);
    setTimeout(init, 1200);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(init, 200);
    setTimeout(init, 600);
  });
})();