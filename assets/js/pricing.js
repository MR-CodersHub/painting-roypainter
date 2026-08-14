/* ==========================================================================
   RoyPainter — Pricing page (pricing.html)
   Monthly / one-time billing toggle that swaps displayed plan prices.
   ========================================================================== */
(function () {
    'use strict';

    var toggle = document.getElementById('billingToggle');
    var monthlyGroup = document.querySelectorAll('[data-plan="monthly"]');
    var onetimeGroup = document.querySelectorAll('[data-plan="onetime"]');
    var labels = document.querySelectorAll('[data-billing-label]');

    if (!toggle) return;

    var state = localStorage.getItem('rp-billing') || 'onetime';

    function apply(mode) {
        state = mode;
        try { localStorage.setItem('rp-billing', mode); } catch (e) { /* ignore */ }
        monthlyGroup.forEach(function (el) { el.style.display = mode === 'monthly' ? '' : 'none'; });
        onetimeGroup.forEach(function (el) { el.style.display = mode === 'onetime' ? '' : 'none'; });
        toggle.checked = mode === 'monthly';
        labels.forEach(function (el) {
            var on = el.getAttribute('data-billing-label');
            if (on === 'monthly') el.style.fontWeight = mode === 'monthly' ? '800' : '500';
            if (on === 'onetime') el.style.fontWeight = mode === 'onetime' ? '800' : '500';
        });
    }

    toggle.addEventListener('change', function () {
        apply(toggle.checked ? 'monthly' : 'onetime');
    });

    document.querySelectorAll('[data-billing-switch]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            apply(btn.getAttribute('data-billing-switch'));
        });
    });

    apply(state);
})();
