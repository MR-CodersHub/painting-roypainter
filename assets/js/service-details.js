/* ==========================================================================
   RoyPainter — Enhanced Service Details Page (service-details.js)
   Renders rich interactive service showcase, gallery switcher, live color preview,
   sheen guide, cost calculator, pricing tiers, FAQs and related services.
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

    var id = getParam('id') || 'interior-painting';
    var data = window.RPData && window.RPData.getService(id);

    var container = document.getElementById('serviceContent');
    if (!container) return;

    if (!data) {
        container.innerHTML =
            '<div class="section"><div class="container" style="text-align:center;padding:6rem 1rem;">' +
            '  <div style="font-size:4rem;color:var(--active-accent);margin-bottom:1rem;"><i class="fa-solid fa-circle-question"></i></div>' +
            '  <h2 style="font-family:\'Playfair Display\',serif;font-size:2.2rem;color:var(--text-dark);margin-bottom:0.8rem;">Service not found</h2>' +
            '  <p style="color:var(--text-muted);margin-bottom:1.6rem;">The service "' + escapeHTML(id || '') + '" does not exist or has been moved.</p>' +
            '  <a href="' + root + 'pages/services.html" class="cta-button">Browse All Services</a>' +
            '</div></div>';
        document.title = 'Service Not Found | RoyPainter';
        return;
    }

    document.title = data.title + ' | Master-Grade Architectural Painting';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.desc.slice(0, 155));

    var related = window.RPData.SERVICES.filter(function (s) { return s.id !== data.id; }).slice(0, 3);

    // Gallery images list
    var galleryImgs = data.gallery && data.gallery.length ? data.gallery : [data.image, data.image, data.image];

    // Features markup
    var featuresList = data.features.map(function (f) {
        return '<li style="display:flex;align-items:flex-start;gap:0.85rem;font-size:1rem;color:var(--text-muted);"><i class="fa-solid fa-circle-check" style="color:#16A34A;margin-top:0.35rem;font-size:1.1rem;flex-shrink:0;"></i><span>' + escapeHTML(f) + '</span></li>';
    }).join('');

    // Pricing cards markup
    var pricingCards = data.pricing.map(function (plan, i) {
        var isPop = i === 1;
        return '' +
            '<div class="pricing-card' + (isPop ? ' popular' : '') + '">' +
            (isPop ? '<div class="popular-ribbon">Most Popular</div>' : '') +
            '  <span class="plan-name">' + escapeHTML(plan.plan) + '</span>' +
            '  <div class="plan-price">' + escapeHTML(plan.price) + '</div>' +
            '  <div style="color:var(--text-light);font-size:0.85rem;font-weight:600;margin-top:-0.6rem;">' + escapeHTML(plan.unit) + '</div>' +
            '  <ul class="plan-features">' +
            plan.features.map(function (f) { return '<li><i class="fa-solid fa-check"></i>' + escapeHTML(f) + '</li>'; }).join('') +
            '  </ul>' +
            '  <a href="' + root + 'pages/contact.html?service=' + encodeURIComponent(data.id) + '&plan=' + encodeURIComponent(plan.plan) + '" class="cta-button" style="justify-content:center;padding:0.95rem 1.5rem;font-size:0.9rem;">Choose ' + escapeHTML(plan.plan) + '</a>' +
            '</div>';
    }).join('');

    // FAQ blocks markup
    var faqBlocks = data.faqs.map(function (f) {
        return '' +
            '<div class="faq-item">' +
            '  <button class="faq-question"><span class="q">' + escapeHTML(f.q) + '</span><span class="faq-icon"><i class="fa-solid fa-plus"></i></span></button>' +
            '  <div class="faq-answer"><div class="faq-answer-inner">' + escapeHTML(f.a) + '</div></div>' +
            '</div>';
    }).join('');

    // Related cards markup (modern image based)
    var relatedCards = related.map(function (r) {
        var startPrice = (r.pricing && r.pricing[0] && r.pricing[0].price) ? r.pricing[0].price : '$350';
        return '' +
            '<article class="service-card">' +
            '  <div class="service-card-image-wrap">' +
            '    <img src="' + r.image + '" alt="' + escapeHTML(r.title) + '" class="service-card-img" loading="lazy">' +
            '    <div class="service-card-overlay"></div>' +
            '    <span class="service-num-badge">#' + r.num + '</span>' +
            '    <div class="service-floating-icon"><i class="' + r.icon + '"></i></div>' +
            '  </div>' +
            '  <div class="service-card-content">' +
            '    <div class="service-card-meta">' +
            '      <span><i class="fa-solid fa-star" style="color:#F59E0B;"></i> ' + (r.meta ? r.meta.rating : '4.9/5') + '</span>' +
            '      <span><i class="fa-solid fa-shield-halved" style="color:var(--active-accent);"></i> ' + (r.meta ? r.meta.warranty : '10 Yr') + '</span>' +
            '    </div>' +
            '    <h3 class="service-card-title">' + escapeHTML(r.title) + '</h3>' +
            '    <p class="service-card-desc">' + escapeHTML(r.short) + '</p>' +
            '    <div class="service-card-footer">' +
            '      <div class="service-price-tag">' +
            '        <span class="price-from">Starting</span>' +
            '        <span class="price-val">' + startPrice + '</span>' +
            '      </div>' +
            '      <a class="service-action-btn" href="' + SERVICE_URL + r.id + '">View Details <i class="fa-solid fa-arrow-right"></i></a>' +
            '    </div>' +
            '  </div>' +
            '</article>';
    }).join('');

    container.innerHTML =
        '<div class="container">' +
        '  <!-- Section 1: Hero Showcase Grid -->' +
        '  <div class="grid grid-2" style="align-items:center;gap:3.8rem;margin-top:1.5rem;">' +
        '    <div>' +
        '      <div style="display:flex;align-items:center;gap:0.6rem;flex-wrap:wrap;margin-bottom:1rem;">' +
        '        <span class="chip chip-accent"><i class="' + data.icon + '"></i> Service #' + data.num + '</span>' +
        '        <span class="chip" style="background:rgba(22,163,74,0.1);color:#16A34A;font-weight:700;"><i class="fa-solid fa-certificate"></i> Certified Artisans</span>' +
        '      </div>' +
        '      <h1 style="font-family:\'Playfair Display\',serif;font-size:3.2rem;font-weight:800;color:var(--text-dark);line-height:1.12;margin-bottom:1.2rem;letter-spacing:-0.5px;">' + escapeHTML(data.title) + '</h1>' +
        '      <p style="font-size:1.1rem;color:var(--text-muted);line-height:1.8;margin-bottom:1.8rem;">' + escapeHTML(data.desc) + '</p>' +
        '      <div class="about-stats" style="margin:1.8rem 0;">' +
        '        <div class="stat"><span class="stat-number">' + escapeHTML(data.meta.rating) + '</span><span class="stat-label">Verified Rating</span></div>' +
        '        <div class="stat"><span class="stat-number">' + escapeHTML(data.meta.duration) + '</span><span class="stat-label">Avg. Timeline</span></div>' +
        '        <div class="stat"><span class="stat-number">' + escapeHTML(data.meta.warranty) + '</span><span class="stat-label">Warranty</span></div>' +
        '      </div>' +
        '      <div class="hero-actions" style="margin-top:2rem;">' +
        '        <a href="' + root + 'pages/contact.html?service=' + encodeURIComponent(data.id) + '" class="cta-button"><i class="fa-solid fa-calendar-check"></i> Book Consultation & Quote</a>' +
        '        <a href="#pricingSection" class="cta-button-secondary"><i class="fa-solid fa-tags"></i> View Pricing Plans</a>' +
        '      </div>' +
        '    </div>' +
        '    <div class="service-hero-gallery">' +
        '      <div class="service-main-viewport" id="mainGalleryBox">' +
        '        <img src="' + galleryImgs[0] + '" alt="' + escapeHTML(data.title) + '" class="service-main-img" id="activeMainGalleryImg">' +
        '        <div class="service-tint-overlay" id="serviceTintOverlay"></div>' +
        '        <div class="room-preview-badge" style="top:1.2rem;left:1.2rem;"><span class="live-dot"></span><span>RoyPainter Studio Quality</span></div>' +
        '      </div>' +
        '      <div class="service-thumbs-row">' +
        galleryImgs.map(function (img, idx) {
            return '<div class="service-thumb-item' + (idx === 0 ? ' active' : '') + '" data-img-src="' + img + '"><img src="' + img + '" alt="' + escapeHTML(data.title) + ' thumb"></div>';
        }).join('') +
        '      </div>' +
        '    </div>' +
        '  </div>' +

        '  <!-- Section 2: Inclusions & Process -->' +
        '  <div class="grid grid-2" style="gap:4rem;align-items:start;margin-top:6rem;">' +
        '    <div>' +
        '      <span class="section-tag">Master Specifications</span>' +
        '      <h2 style="font-family:\'Playfair Display\',serif;font-size:2.3rem;font-weight:700;color:var(--text-dark);margin:0.6rem 0 1.6rem;">Everything Included In Our Standard</h2>' +
        '      <ul style="list-style:none;display:flex;flex-direction:column;gap:1.1rem;margin:0 0 2rem;padding:0;">' + featuresList + '</ul>' +
        '      <div style="background:var(--cream);border:1px solid var(--light-gray);border-radius:var(--radius-md);padding:1.6rem;display:flex;align-items:center;gap:1.2rem;">' +
        '        <div style="width:50px;height:50px;border-radius:12px;background:rgba(var(--active-accent-rgb),0.12);color:var(--active-accent);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;"><i class="fa-solid fa-award"></i></div>' +
        '        <div><div style="font-weight:800;color:var(--text-dark);font-size:1rem;">100% Satisfaction & Touch-Up Guarantee</div><div style="color:var(--text-muted);font-size:0.88rem;">If you notice any touch-up needs within 60 days, we return free of charge.</div></div>' +
        '      </div>' +
        '    </div>' +
        '    <div>' +
        '      <span class="section-tag">Methodology</span>' +
        '      <h2 style="font-family:\'Playfair Display\',serif;font-size:2.3rem;font-weight:700;color:var(--text-dark);margin:0.6rem 0 1.6rem;">The 4-Stage Execution Journey</h2>' +
        '      <div class="timeline">' +
        '        <div class="timeline-item"><span class="year">Stage 01</span><h4>Light Mapping & Digital Spec</h4><p>On-site assessment of natural light vectors, architectural trims, and customized paint sheen mapping.</p></div>' +
        '        <div class="timeline-item"><span class="year">Stage 02</span><h4>Surgical Masking & Furniture Shield</h4><p>Heavy-duty poly floor runners, taped edge seals, HEPA dust containment and zero-bleed lines.</p></div>' +
        '        <div class="timeline-item"><span class="year">Stage 03</span><h4>Multi-Coat Application & Curing</h4><p>Dual-pass precision rolling and airless fine-finish spraying with interim sanding between coats.</p></div>' +
        '        <div class="timeline-item"><span class="year">Stage 04</span><h4>White-Glove Walkthrough & Warranty</h4><p>Detailed halogen light inspection, clean-up, and issuance of your stamped 10-year warranty certificate.</p></div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +

        '  <!-- Section 3: Interactive Cost Estimator -->' +
        '  <div style="margin-top:6rem;">' +
        '    <div class="section-header">' +
        '      <span class="section-tag">Interactive Pricing Engine</span>' +
        '      <h2 class="section-title">Calculate Your Estimate for ' + escapeHTML(data.title) + '</h2>' +
        '      <p class="section-sub">Adjust your room square footage to calculate projected materials, crew size, and labor cost.</p>' +
        '    </div>' +
        '    <div class="service-calc-card" style="max-width:860px;margin:0 auto;">' +
        '      <div class="grid grid-2" style="gap:2.5rem;align-items:center;">' +
        '        <div>' +
        '          <label style="font-weight:700;font-size:0.9rem;text-transform:uppercase;color:var(--text-dark);display:flex;justify-content:space-between;margin-bottom:0.6rem;">' +
        '            <span>Total Area (Square Feet):</span>' +
        '            <span id="sqftDisplay" style="color:var(--active-accent);font-weight:800;font-size:1.1rem;">1,200 sq ft</span>' +
        '          </label>' +
        '          <input type="range" min="200" max="4000" step="50" value="1200" id="detailSqftSlider" class="room-slider" style="width:100%;margin-bottom:1.5rem;" aria-label="Area in square feet">' +
        '          <label style="font-weight:700;font-size:0.85rem;text-transform:uppercase;color:var(--text-dark);display:block;margin-bottom:0.5rem;">Surface Condition Level:</label>' +
        '          <select id="conditionSelect" style="width:100%;padding:0.8rem 1rem;border-radius:var(--radius-sm);border:1px solid var(--light-gray);background:var(--cream);font-family:inherit;font-size:0.95rem;color:var(--text-dark);margin-bottom:1rem;">' +
        '            <option value="1">Standard Prep (Clean walls, minor touchups)</option>' +
        '            <option value="1.2">Moderate Repair (Patches, hairline cracks, caulking)</option>' +
        '            <option value="1.45">Extensive Restoration (Water marks, skim coat, old paint peeling)</option>' +
        '          </select>' +
        '        </div>' +
        '        <div style="background:var(--cream);border-radius:var(--radius-md);padding:1.8rem;text-align:center;border:1px dashed var(--light-gray);">' +
        '          <div style="font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-light);margin-bottom:0.4rem;">Projected Investment</div>' +
        '          <div id="calculatedPriceVal" style="font-size:2.8rem;font-weight:800;color:var(--navy-blue);line-height:1.1;margin-bottom:0.4rem;">$2,880</div>' +
        '          <div id="calculatedTimeline" style="font-size:0.88rem;font-weight:600;color:var(--active-accent);margin-bottom:1.4rem;"><i class="fa-regular fa-clock"></i> Estimated: 3–4 Days Duration</div>' +
        '          <a id="bookEstimateBtn" href="' + root + 'pages/contact.html?service=' + encodeURIComponent(data.id) + '&sqft=1200&est=2880" class="cta-button" style="width:100%;justify-content:center;">Book with This Estimate</a>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +

        '  <!-- Section 4: Sheen & Finish Selection Guide -->' +
        '  <div style="margin-top:6rem;">' +
        '    <div class="section-header">' +
        '      <span class="section-tag">Finish Knowledge</span>' +
        '      <h2 class="section-title">Architectural Sheen Spectrum</h2>' +
        '      <p class="section-sub">Choose the ideal sheen for your lighting, traffic level, and washability requirements.</p>' +
        '    </div>' +
        '    <div class="grid grid-4" style="gap:1.5rem;">' +
        '      <div class="sheen-card"><span class="sheen-badge">0–3% Gloss</span><h3 style="font-size:1.15rem;font-weight:700;margin-bottom:0.4rem;color:var(--text-dark);">Flat / Matte</h3><p style="font-size:0.85rem;color:var(--text-muted);line-height:1.6;">Absorbs glare and hides drywall imperfections. Best for master bedrooms & ceilings.</p></div>' +
        '      <div class="sheen-card"><span class="sheen-badge">10–15% Gloss</span><h3 style="font-size:1.15rem;font-weight:700;margin-bottom:0.4rem;color:var(--text-dark);">Eggshell</h3><p style="font-size:0.85rem;color:var(--text-muted);line-height:1.6;">Soft velvety glow with moderate washability. Perfect for living rooms & hallways.</p></div>' +
        '      <div class="sheen-card"><span class="sheen-badge">25–35% Gloss</span><h3 style="font-size:1.15rem;font-weight:700;margin-bottom:0.4rem;color:var(--text-dark);">Satin / Pearl</h3><p style="font-size:0.85rem;color:var(--text-muted);line-height:1.6;">High moisture resistance and easy wipe-down. Ideal for kitchens & family rooms.</p></div>' +
        '      <div class="sheen-card"><span class="sheen-badge">40–60% Gloss</span><h3 style="font-size:1.15rem;font-weight:700;margin-bottom:0.4rem;color:var(--text-dark);">Semi-Gloss</h3><p style="font-size:0.85rem;color:var(--text-muted);line-height:1.6;">Maximum scrubbability and radiant highlight. Used on doors, trims, and cabinets.</p></div>' +
        '    </div>' +
        '  </div>' +

        '  <!-- Section 5: Transparent Pricing Plans -->' +
        '  <div id="pricingSection" style="margin-top:6rem;">' +
        '    <div class="section-header">' +
        '      <span class="section-tag">Clear Pricing</span>' +
        '      <h2 class="section-title">Pricing Packages for ' + escapeHTML(data.title) + '</h2>' +
        '      <p class="section-sub">Fixed scopes, no hidden fees, and transparent material allowances on every contract.</p>' +
        '    </div>' +
        '    <div class="grid grid-3" style="align-items:stretch;">' + pricingCards + '</div>' +
        '  </div>' +

        '  <!-- Section 6: Certified Paint House Partners -->' +
        '  <div style="margin-top:6rem;background:var(--cream);border-radius:var(--radius-lg);padding:3rem 2rem;border:1px solid var(--light-gray);">' +
        '    <div style="text-align:center;font-size:0.82rem;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:var(--text-light);margin-bottom:1.8rem;">' +
        '      <i class="fa-solid fa-certificate" style="color:var(--primary-red);margin-right:0.4rem;"></i> Authorized Application Partner for Leading Houses' +
        '    </div>' +
        '    <div class="brand-logos" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:2rem;">' +
        '      <span class="brand-item brand-1">BENJAMIN MOORE</span>' +
        '      <span class="brand-item brand-2">SHERWIN-WILLIAMS</span>' +
        '      <span class="brand-item brand-3">Farrow &amp; Ball</span>' +
        '      <span class="brand-item brand-4">DULUX</span>' +
        '      <span class="brand-item brand-6">PPG</span>' +
        '    </div>' +
        '  </div>' +

        '  <!-- Section 7: FAQs -->' +
        '  <div style="margin-top:6rem;">' +
        '    <div class="section-header">' +
        '      <span class="section-tag">Frequently Asked Questions</span>' +
        '      <h2 class="section-title">Common Questions about ' + escapeHTML(data.title) + '</h2>' +
        '    </div>' +
        '    <div class="faq-list" style="max-width:840px;margin:0 auto;">' + faqBlocks + '</div>' +
        '  </div>' +

        '  <!-- Section 8: Related Services -->' +
        '  <div style="margin-top:6rem;margin-bottom:4rem;">' +
        '    <div class="section-header">' +
        '      <span class="section-tag">Explore More</span>' +
        '      <h2 class="section-title">Related Finishing Services</h2>' +
        '    </div>' +
        '    <div class="grid grid-3" style="align-items:stretch;">' + relatedCards + '</div>' +
        '  </div>' +
        '</div>';

    // 1. Gallery Thumbnail Interaction
    var thumbItems = container.querySelectorAll('.service-thumb-item');
    var activeMainImg = document.getElementById('activeMainGalleryImg');
    thumbItems.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
            thumbItems.forEach(function (t) { t.classList.remove('active'); });
            this.classList.add('active');
            var newSrc = this.getAttribute('data-img-src');
            if (activeMainImg && newSrc) {
                activeMainImg.style.opacity = '0.3';
                setTimeout(function () {
                    activeMainImg.src = newSrc;
                    activeMainImg.style.opacity = '1';
                }, 180);
            }
        });
    });

    // 2. Interactive Calculator Logic
    var slider = document.getElementById('detailSqftSlider');
    var sqftDisplay = document.getElementById('sqftDisplay');
    var conditionSelect = document.getElementById('conditionSelect');
    var priceDisplay = document.getElementById('calculatedPriceVal');
    var timelineDisplay = document.getElementById('calculatedTimeline');
    var bookBtn = document.getElementById('bookEstimateBtn');

    function updateCalc() {
        if (!slider || !priceDisplay) return;
        var sqft = parseInt(slider.value, 10);
        var condition = parseFloat(conditionSelect ? conditionSelect.value : 1);
        var baseRate = 2.40; // baseline sq ft rate
        var est = Math.round(sqft * baseRate * condition);
        var days = Math.max(1, Math.round(sqft / 400));

        if (sqftDisplay) sqftDisplay.textContent = sqft.toLocaleString() + ' sq ft';
        priceDisplay.textContent = '$' + est.toLocaleString();
        if (timelineDisplay) timelineDisplay.innerHTML = '<i class="fa-regular fa-clock"></i> Estimated: ' + days + '–' + (days + 1) + ' Days Duration';
        if (bookBtn) {
            bookBtn.href = root + 'pages/contact.html?service=' + encodeURIComponent(data.id) + '&sqft=' + sqft + '&est=' + est;
        }
    }

    if (slider) slider.addEventListener('input', updateCalc);
    if (conditionSelect) conditionSelect.addEventListener('change', updateCalc);
    updateCalc();

    // 3. FAQ Accordion Logic
    var faqItems = container.querySelectorAll('.faq-item');
    function closeAllFaqs(except) {
        faqItems.forEach(function (item) {
            if (item === except) return;
            item.classList.remove('open');
            var answer = item.querySelector('.faq-answer');
            if (answer) answer.style.maxHeight = null;
        });
    }
    faqItems.forEach(function (item) {
        var qBtn = item.querySelector('.faq-question');
        if (qBtn) {
            qBtn.addEventListener('click', function () {
                var isOpen = item.classList.contains('open');
                closeAllFaqs();
                if (!isOpen) {
                    item.classList.add('open');
                    var answer = item.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // 4. Scroll Reveal Observer
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
        container.querySelectorAll('.pricing-card, .service-card, .sheen-card, .timeline-item').forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(22px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
})();
