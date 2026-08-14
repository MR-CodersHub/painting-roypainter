/* ==========================================================================
   RoyPainter — Service Details page (service-details.html)
   Reads ?id= from the URL, loads the matching service from RPData and
   renders the full page dynamically (one physical file, many services).
   ========================================================================== */
(function () {
    'use strict';

    var root = (document.currentScript && document.currentScript.getAttribute('src') || 'assets/js/service-details.js').replace(/assets\/js\/service-details\.js$/, '');
    var SERVICE_URL = root + 'pages/service-details.html?id=';

    function getParam(name) {
        var params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    function escapeHTML(str) {
        var div = document.createElement('div');
        div.textContent = str == null ? '' : String(str);
        return div.innerHTML;
    }

    var id = getParam('id');
    var data = window.RPData && window.RPData.getService(id);

    if (!data) {
        document.getElementById('serviceContent').innerHTML =
            '<div class="section"><div class="container" style="text-align:center;padding:6rem 1rem;">' +
            '  <div style="font-size:4rem;color:var(--active-accent);margin-bottom:1rem;"><i class="fa-solid fa-circle-question"></i></div>' +
            '  <h2 style="font-family:\'Playfair Display\',serif;font-size:2.2rem;color:var(--text-dark);margin-bottom:0.8rem;">Service not found</h2>' +
            '  <p style="color:var(--text-muted);margin-bottom:1.6rem;">The service "' + escapeHTML(id || '') + '" does not exist or has been moved.</p>' +
            '  <a href="' + root + 'pages/services.html" class="cta-button">Browse All Services</a>' +
            '</div></div>';
        document.title = 'Service Not Found | RoyPainter';
        return;
    }

    document.title = data.title + ' | RoyPainter';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.desc.slice(0, 155));

    var related = window.RPData.SERVICES.filter(function (s) { return s.id !== data.id; }).slice(0, 3);

    var featuresList = data.features.map(function (f) {
        return '<li style="display:flex;align-items:flex-start;gap:0.75rem;font-size:0.98rem;color:var(--text-muted);"><i class="fa-solid fa-circle-check" style="color:#16A34A;margin-top:0.3rem;"></i>' + escapeHTML(f) + '</li>';
    }).join('');

    var pricingCards = data.pricing.map(function (plan, i) {
        return '' +
            '<div class="pricing-card' + (i === 1 ? ' popular' : '') + '">' +
            (i === 1 ? '<div class="popular-ribbon">Most Popular</div>' : '') +
            '  <span class="plan-name">' + escapeHTML(plan.plan) + '</span>' +
            '  <div class="plan-price">' + escapeHTML(plan.price) + '</div>' +
            '  <div style="color:var(--text-light);font-size:0.85rem;font-weight:600;margin-top:-0.6rem;">' + escapeHTML(plan.unit) + '</div>' +
            '  <ul class="plan-features">' +
            plan.features.map(function (f) { return '<li><i class="fa-solid fa-check"></i>' + escapeHTML(f) + '</li>'; }).join('') +
            '  </ul>' +
            '  <a href="' + root + 'pages/contact.html?service=' + encodeURIComponent(data.id) + '" class="cta-button" style="justify-content:center;padding:0.9rem 1.5rem;font-size:0.88rem;">Choose Plan</a>' +
            '</div>';
    }).join('');

    var faqBlocks = data.faqs.map(function (f) {
        return '' +
            '<div class="faq-item">' +
            '  <button class="faq-question"><span class="q">' + escapeHTML(f.q) + '</span><span class="faq-icon"><i class="fa-solid fa-plus"></i></span></button>' +
            '  <div class="faq-answer"><div class="faq-answer-inner">' + escapeHTML(f.a) + '</div></div>' +
            '</div>';
    }).join('');

    var relatedCards = related.map(function (r) {
        return '<article class="service-card"><div class="icon-tile"><i class="' + r.icon + '"></i></div><h3>' + escapeHTML(r.title) + '</h3><p>' + escapeHTML(r.short) + '</p><a class="card-link" href="' + SERVICE_URL + r.id + '">Explore Service <i class="fa-solid fa-arrow-right"></i></a></article>';
    }).join('');

    document.getElementById('serviceContent').innerHTML =
        '<nav class="breadcrumb" aria-label="Breadcrumb">' +
        '  <a href="' + root + 'index.html">Home</a>' +
        '  <span class="sep"><i class="fa-solid fa-chevron-right"></i></span>' +
        '  <a href="' + root + 'pages/services.html">Services</a>' +
        '  <span class="sep"><i class="fa-solid fa-chevron-right"></i></span>' +
        '  <span class="current">' + escapeHTML(data.title) + '</span>' +
        '</nav>' +

        '<div class="grid grid-2" style="align-items:center;gap:3.5rem;margin-top:2.5rem;">' +
        '  <div>' +
        '    <span class="chip chip-accent"><i class="' + data.icon + '"></i> Service ' + data.num + '</span>' +
        '    <h1 style="font-family:\'Playfair Display\',serif;font-size:3rem;font-weight:800;color:var(--text-dark);line-height:1.15;margin:1.2rem 0;">' + escapeHTML(data.title) + '</h1>' +
        '    <p style="font-size:1.08rem;color:var(--text-muted);line-height:1.8;">' + escapeHTML(data.desc) + '</p>' +
        '    <div class="about-stats" style="margin-top:2rem;">' +
        '      <div class="stat"><span class="stat-number">' + escapeHTML(data.meta.rating) + '</span><span class="stat-label">Client Rating</span></div>' +
        '      <div class="stat"><span class="stat-number">' + escapeHTML(data.meta.duration) + '</span><span class="stat-label">Typical Timeline</span></div>' +
        '      <div class="stat"><span class="stat-number">' + escapeHTML(data.meta.warranty) + '</span><span class="stat-label">Warranty</span></div>' +
        '    </div>' +
        '    <a href="' + root + 'pages/contact.html?service=' + encodeURIComponent(data.id) + '" class="cta-button" style="margin-top:0.5rem;"><i class="fa-solid fa-calendar-check"></i> Book This Service</a>' +
        '  </div>' +
        '  <div>' +
        '    <div class="services-image" style="height:430px;"><div class="watercolor-accent" style="background:var(--active-accent);"></div><img src="' + data.image + '" alt="' + escapeHTML(data.title) + '"></div>' +
        '  </div>' +
        '</div>' +

        '<div class="grid grid-2" style="gap:3.5rem;align-items:start;margin-top:5rem;">' +
        '  <div>' +
        '    <span class="section-tag">Everything Included</span>' +
        '    <h2 style="font-family:\'Playfair Display\',serif;font-size:2.2rem;font-weight:700;color:var(--text-dark);margin:0.6rem 0 1.6rem;">What You Get With Every Project</h2>' +
        '    <ul class="plan-features" style="list-style:none;display:flex;flex-direction:column;gap:0.9rem;margin:0;padding:0;">' + featuresList + '</ul>' +
        '    <div class="services-image" style="height:300px;margin-top:2.2rem;"><img src="' + data.gallery[1] + '" alt="' + escapeHTML(data.title) + ' gallery"></div>' +
        '  </div>' +
        '  <div>' +
        '    <span class="section-tag">Process</span>' +
        '    <h2 style="font-family:\'Playfair Display\',serif;font-size:2.2rem;font-weight:700;color:var(--text-dark);margin:0.6rem 0 1.6rem;">How We Deliver</h2>' +
        '    <div class="timeline">' +
        '      <div class="timeline-item"><span class="year">Step 01</span><h4>Consultation & Measure</h4><p>Free on-site visit, color psychology chat, and accurate square-footage assessment.</p></div>' +
        '      <div class="timeline-item"><span class="year">Step 02</span><h4>Prep & Protection</h4><p>Furniture wrapping, floor covers, surface prep and priming to the master standard.</p></div>' +
        '      <div class="timeline-item"><span class="year">Step 03</span><h4>Finish Application</h4><p>Crews spray, roll and hand-cut in the specified system with rigorous QA checkpoints.</p></div>' +
        '      <div class="timeline-item"><span class="year">Step 04</span><h4>White-Glove Cleanup</h4><p>HEPA vacuum, tape removal and a walkthrough with your project lead before sign-off.</p></div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +

        '<div style="margin-top:5rem;">' +
        '  <div class="section-header">' +
        '    <span class="section-tag">Transparent Pricing</span>' +
        '    <h2 class="section-title">Pricing Plans for ' + escapeHTML(data.title) + '</h2>' +
        '    <p class="section-sub">Every plan includes premium coatings, certified crews and our signature cleanup. Final quotes confirm on-site.</p>' +
        '  </div>' +
        '  <div class="grid grid-3" style="align-items:stretch;">' + pricingCards + '</div>' +
        '</div>' +

        '<div style="margin-top:5rem;">' +
        '  <div class="section-header">' +
        '    <span class="section-tag">Common Questions</span>' +
        '    <h2 class="section-title">FAQs about ' + escapeHTML(data.title) + '</h2>' +
        '  </div>' +
        '  <div class="faq-list" style="max-width:820px;margin:0 auto;">' + faqBlocks + '</div>' +
        '</div>' +

        '<div class="section" style="background:var(--white);margin-top:5rem;padding-left:0;padding-right:0;">' +
        '  <div class="container">' +
        '    <div class="section-header">' +
        '      <span class="section-tag">Keep Exploring</span>' +
        '      <h2 class="section-title">Related Services</h2>' +
        '    </div>' +
        '    <div class="grid grid-3">' + relatedCards + '</div>' +
        '  </div>' +
        '</div>';

    // Wire up FAQ accordion for the dynamically injected FAQ block
    var faqItems = document.querySelectorAll('.faq-item');
    function closeAll(except) {
        faqItems.forEach(function (item) {
            if (item === except) return;
            item.classList.remove('open');
            var answer = item.querySelector('.faq-answer');
            if (answer) answer.style.maxHeight = null;
        });
    }
    faqItems.forEach(function (item) {
        item.querySelector('.faq-question').addEventListener('click', function () {
            var isOpen = item.classList.contains('open');
            closeAll();
            if (!isOpen) {
                item.classList.add('open');
                var answer = item.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Scroll reveal for injected cards
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.pricing-card, .service-card, .timeline-item').forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(22px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
})();
