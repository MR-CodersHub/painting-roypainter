/* ==========================================================================
   RoyPainter — Home Page 1 (index.html) interactions
   Palette switcher, room tint, 3D tilt, scroll reveal, hero estimator.
   ========================================================================== */
(function () {
    'use strict';

    /* ---------- Scroll effects on the shared navbar ---------- */
    // handled globally inside navbar.js

    /* ---------- Interactive color palette switcher ---------- */
    var swatchButtons = document.querySelectorAll('.color-swatch-btn');
    var activeSwatchTag = document.getElementById('activeSwatchTag');
    var roomColorTint = document.getElementById('roomColorTint');
    var previewBadgeText = document.getElementById('previewBadgeText');
    var heroHighlight = document.getElementById('heroHighlight');
    var heroGlow = document.getElementById('heroGlow');
    var serviceAccent = document.getElementById('serviceAccent');
    var priceAccent = document.querySelectorAll('[data-dynamic-accent]');

    function applyAccent(color) {
        priceAccent.forEach(function (el) { el.style.color = color; });
    }

    if (swatchButtons.length && activeSwatchTag) {
        swatchButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                swatchButtons.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');

                var color = this.getAttribute('data-color');
                var rgb = this.getAttribute('data-rgb');
                var name = this.getAttribute('data-name');

                document.documentElement.style.setProperty('--active-accent', color);
                document.documentElement.style.setProperty('--active-accent-rgb', rgb);

                if (activeSwatchTag) activeSwatchTag.textContent = name + ' \u2022 ' + color;
                if (previewBadgeText) previewBadgeText.textContent = 'Live Finish: ' + name;
                if (roomColorTint) roomColorTint.style.backgroundColor = color;
                if (serviceAccent) serviceAccent.style.backgroundColor = color;
                applyAccent(color);
            });
        });
    }

    /* ---------- 3D interactive tilt on hero card ---------- */
    var heroVisualWrap = document.getElementById('heroVisualWrap');
    var heroMainCard = document.getElementById('heroMainCard');

    if (heroVisualWrap && heroMainCard) {
        heroVisualWrap.addEventListener('mousemove', function (e) {
            var rect = heroVisualWrap.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            var rotateX = (-y / rect.height) * 16;
            var rotateY = (x / rect.width) * 16;
            heroMainCard.style.transform = 'perspective(1000px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) scale3d(1.02, 1.02, 1.02)';
        });
        heroVisualWrap.addEventListener('mouseleave', function () {
            heroMainCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }

    /* ---------- Smooth scroll for in-page anchors ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---------- Hero estimator ---------- */
    var roomSlider = document.getElementById('roomSlider');
    var sliderLabel = document.getElementById('sliderLabel');
    var priceValue = document.getElementById('priceValue');

    function updateEstimator() {
        if (!roomSlider) return;
        var sqft = parseInt(roomSlider.value, 10);
        var rate = 2.85;
        var est = Math.round(sqft * rate);
        if (sliderLabel) sliderLabel.textContent = sqft + ' sq ft';
        if (priceValue) {
            priceValue.innerHTML = '$' + est.toLocaleString() + '<span> est.</span>';
        }
    }
    if (roomSlider) {
        roomSlider.addEventListener('input', updateEstimator);
        updateEstimator();
    }

    /* ---------- Scroll reveal ---------- */
    var revealEls = document.querySelectorAll('.feature-card, .service-item, .stat, .brand-item, .process-step, .stat-card, .service-card, .blog-card, .testimonial-card, .team-card, .pricing-card');
    if ('IntersectionObserver' in window && revealEls.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealEls.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(22px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
})();
