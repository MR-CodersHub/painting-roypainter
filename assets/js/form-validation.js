/* ==========================================================================
   RoyPainter — Shared Form Validation (form-validation.js)
   Client-side validation, success toasts and newsletter handling for every
   form on the site (contact, newsletter, login, signup).
   ========================================================================== */
(function () {
    'use strict';

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var PHONE_RE = /^[\+\d][\d\s\-().]{6,19}$/;

    function $(sel, ctx) { return (ctx || document).querySelector(sel); }
    function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

    /* ------------------- toast system ------------------- */
    function ensureToastWrap() {
        var wrap = document.querySelector('.toast-wrap');
        if (!wrap) {
            wrap = document.createElement('div');
            wrap.className = 'toast-wrap';
            document.body.appendChild(wrap);
        }
        return wrap;
    }

    function showToast(type, title, message, duration) {
        var wrap = ensureToastWrap();
        wrap.classList.add('show');

        var icons = {
            success: 'fa-solid fa-circle-check',
            error: 'fa-solid fa-circle-exclamation',
            info: 'fa-solid fa-circle-info'
        };

        var toast = document.createElement('div');
        toast.className = 'toast ' + (type || 'info');
        toast.innerHTML =
            '<div class="toast-icon"><i class="' + (icons[type] || icons.info) + '"></i></div>' +
            '<div>' +
            '  <div class="toast-title"></div>' +
            '  <div class="toast-msg"></div>' +
            '</div>' +
            '<button class="toast-close" aria-label="Dismiss"><i class="fa-solid fa-xmark"></i></button>';

        toast.querySelector('.toast-title').textContent = title || 'Notification';
        toast.querySelector('.toast-msg').textContent = message || '';
        toast.querySelector('.toast-close').addEventListener('click', function () {
            toast.remove();
            if (!wrap.children.length) wrap.classList.remove('show');
        });

        wrap.appendChild(toast);

        if (!duration) duration = 4200;
        setTimeout(function () {
            if (toast.parentNode) {
                toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(12px)';
                setTimeout(function () { toast.remove(); }, 400);
            }
            if (!wrap.children.length) wrap.classList.remove('show');
        }, duration);
    }

    /* ------------------- validation ------------------- */
    function validateField(field) {
        var value = (field.value || '').trim();
        var errorEl = $('.field-error', field.parentNode);
        var ok = true;

        if (field.hasAttribute('required') && !value) {
            ok = false;
            if (errorEl) errorEl.textContent = 'This field is required.';
        } else if (field.getAttribute('data-type') === 'email' && value && !EMAIL_RE.test(value)) {
            ok = false;
            if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
        } else if (field.getAttribute('data-type') === 'tel' && value && !PHONE_RE.test(value)) {
            ok = false;
            if (errorEl) errorEl.textContent = 'Please enter a valid phone number.';
        } else if (field.hasAttribute('data-min') && value && value.length < parseInt(field.getAttribute('data-min'), 10)) {
            ok = false;
            if (errorEl) errorEl.textContent = 'Must be at least ' + field.getAttribute('data-min') + ' characters.';
        }

        field.classList.toggle('invalid', !ok);
        if (errorEl) errorEl.classList.toggle('show', !ok);
        return ok;
    }

    function validateForm(form) {
        var fields = $$('input, textarea, select', form).filter(function (f) {
            return f.getAttribute('data-validate') !== 'skip';
        });
        var allOk = true;
        fields.forEach(function (field) {
            if (field.disabled) return;
            if (!validateField(field)) allOk = false;
        });
        return allOk;
    }

    function initValidation(form) {
        // live re-validation on input / blur
        $$('input, textarea, select', form).forEach(function (field) {
            field.addEventListener('blur', function () {
                if (field.classList.contains('invalid')) validateField(field);
            });
            field.addEventListener('input', function () {
                if (field.classList.contains('invalid')) validateField(field);
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateForm(form)) {
                var firstInvalid = $('input.invalid, textarea.invalid, select.invalid', form);
                if (firstInvalid) firstInvalid.focus();
                showToast('error', 'Almost there!', 'Please correct the highlighted fields and try again.');
                return;
            }

            var title = form.getAttribute('data-success-title') || 'Thank you!';
            var msg = form.getAttribute('data-success-msg') || 'Your request has been received. We will get back to you shortly.';

            // fake async submit for a realistic acknowledgement
            var btn = form.querySelector('[type="submit"]');
            var original = null;
            if (btn) {
                original = btn.innerHTML;
                btn.disabled = true;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            }

            setTimeout(function () {
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fa-solid fa-circle-check" style="margin-right:0.5rem;"></i> Done!';
                    btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                    setTimeout(function () {
                        btn.innerHTML = original;
                        btn.style.background = '';
                    }, 2500);
                }

                showToast('success', title, msg);

                var details = {};
                $$('input, textarea, select', form).forEach(function (f) {
                    if (f.name) details[f.name] = f.value.trim();
                });
                form.dispatchEvent(new CustomEvent('rp:success', { detail: details }));

                form.reset();
                $$('input.invalid, textarea.invalid, select.invalid', form).forEach(function (f) {
                    f.classList.remove('invalid');
                });

                if (form.hasAttribute('data-success-close')) {
                    var overlay = document.querySelector('[data-auth-modal]');
                    if (overlay) {
                        overlay.classList.remove('open');
                        document.body.style.overflow = '';
                    }
                }
            }, 900);
        });
    }

    /* ------------------- init ------------------- */
    function initAll() {
        $$('form[data-validate]').forEach(function (form) {
            if (form.getAttribute('data-rp-bound')) return;
            form.setAttribute('data-rp-bound', '1');
            initValidation(form);
        });
        $$('form[data-newsletter]').forEach(function (form) {
            if (form.getAttribute('data-rp-bound')) return;
            form.setAttribute('data-rp-bound', '1');
            var emailInput = $('input[type="email"]', form) || $('input', form);
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (emailInput && !EMAIL_RE.test(emailInput.value.trim())) {
                    emailInput.classList.add('invalid');
                    emailInput.focus();
                    showToast('error', 'Invalid email', 'Please enter a valid email address to subscribe.');
                    return;
                }
                if (emailInput) emailInput.classList.remove('invalid');
                showToast('success', 'Subscribed!', 'Welcome to the RoyPainter décor circle. Expect colour tips soon.');
                form.reset();
                form.dispatchEvent(new CustomEvent('rp:newsletter'));
            });
        });
    }

    window.RPForms = { initAll: initAll, validateForm: validateForm, showToast: showToast };

    // auto-init once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();
