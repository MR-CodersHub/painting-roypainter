/* ==========================================================================
   RoyPainter — Home Page 2 (home-2.html) interactions
   Niche residential landing: animated counters, gallery, reveal + mini FAQ.
   ========================================================================== */
(function () {
    'use strict';

    /* ---------- Animated counters ---------- */
    var counters = document.querySelectorAll('[data-counter]');
    function animateCount(el) {
        var target = parseFloat(el.getAttribute('data-counter'));
        var suffix = el.getAttribute('data-suffix') || '';
        var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
        var duration = 1600;
        var start = null;
        function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var value = target * eased;
            el.textContent = value.toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toFixed(decimals) + suffix;
        }
        requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window && counters.length) {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        counters.forEach(function (c) { obs.observe(c); });
    } else {
        counters.forEach(function (c) {
            c.textContent = c.getAttribute('data-counter') + (c.getAttribute('data-suffix') || '');
        });
    }

    /* ---------- Before / After slider ---------- */
    var baSlider = document.getElementById('beforeAfter');
    if (baSlider) {
        var range = baSlider.querySelector('input[type="range"]');
        var img = baSlider.querySelector('.ba-after');
        function updateBA() {
            var val = range ? parseInt(range.value, 10) : 50;
            if (img) img.style.clipPath = 'inset(0 0 0 ' + val + '%)';
        }
        if (range) range.addEventListener('input', updateBA);
        updateBA();
    }

    /* ---------- Hero estimator ---------- */
    var roomSlider = document.getElementById('roomSlider');
    var sliderLabel = document.getElementById('sliderLabel');
    var priceValue = document.getElementById('priceValue');

    function updateEstimator() {
        if (!roomSlider) return;
        var sqft = parseInt(roomSlider.value, 10);
        var est = Math.round(sqft * 2.85);
        if (sliderLabel) sliderLabel.textContent = sqft + ' sq ft';
        if (priceValue) priceValue.innerHTML = '$' + est.toLocaleString() + '<span> est.</span>';
    }
    if (roomSlider) {
        roomSlider.addEventListener('input', updateEstimator);
        updateEstimator();
    }

    /* ---------- FAQ accordion ---------- */
    var faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length) {
        faqItems.forEach(function (item) {
            item.querySelector('.faq-question').addEventListener('click', function () {
                var isOpen = item.classList.contains('open');
                faqItems.forEach(function (other) {
                    other.classList.remove('open');
                    var a = other.querySelector('.faq-answer');
                    if (a) a.style.maxHeight = null;
                });
                if (!isOpen) {
                    item.classList.add('open');
                    var answer = item.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    /* ---------- Scroll reveal ---------- */
    var revealEls = document.querySelectorAll('.process-step, .stat-card, .service-card, .blog-card, .testimonial-card, .mission-card, .gallery-item');
    if ('IntersectionObserver' in window && revealEls.length) {
        var robs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    robs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealEls.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(22px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            robs.observe(el);
        });
    }
})();
