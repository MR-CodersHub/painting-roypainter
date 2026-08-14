/* ==========================================================================
   RoyPainter — Services listing page (services.html)
   Renders service cards from RPData and provides client-side filtering.
   ========================================================================== */
(function () {
    'use strict';

    var container = document.getElementById('servicesGrid');
    var filterBar = document.getElementById('serviceFilters');
    var resultCount = document.getElementById('serviceCount');
    if (!container || !window.RPData) return;

    var SERVICES = window.RPData.SERVICES;
    var root = (document.currentScript && document.currentScript.getAttribute('src') || 'assets/js/services.js').replace(/assets\/js\/services\.js$/, '');
    var DETAIL_URL = root + 'pages/service-details.html?id=';

    var CATEGORY_MAP = {
        'interior-painting': 'Interior',
        'exterior-painting': 'Exterior',
        'wall-restoration': 'Restoration',
        'designer-finishes': 'Finishes',
        'faux-decorative': 'Finishes',
        'surface-preparation': 'Preparation',
        'cabinet-staining': 'Woodwork',
        'commercial-painting': 'Commercial',
        'color-consultation': 'Consultation'
    };

    var CATEGORIES = ['All', 'Interior', 'Exterior', 'Restoration', 'Preparation', 'Finishes', 'Woodwork', 'Commercial', 'Consultation'];

    function categoryOf(service) {
        return CATEGORY_MAP[service.id] || 'Interior';
    }

    function cardHTML(s) {
        var startPrice = (s.pricing && s.pricing[0] && s.pricing[0].price) ? s.pricing[0].price : 'Custom';
        var warranty = (s.meta && s.meta.warranty) ? s.meta.warranty : '10 Years';
        var rating = (s.meta && s.meta.rating) ? s.meta.rating : '4.9/5';

        return '' +
            '<article class="service-card" data-category="' + categoryOf(s) + '" data-id="' + s.id + '">' +
            '  <div class="service-card-image-wrap">' +
            '    <img src="' + s.image + '" alt="' + s.title + '" class="service-card-img" loading="lazy">' +
            '    <div class="service-card-overlay"></div>' +
            '    <span class="service-num-badge">#' + s.num + '</span>' +
            '    <span class="chip chip-accent service-cat-chip">' + categoryOf(s) + '</span>' +
            '    <div class="service-floating-icon"><i class="' + s.icon + '"></i></div>' +
            '  </div>' +
            '  <div class="service-card-content">' +
            '    <div class="service-card-meta">' +
            '      <span><i class="fa-solid fa-star" style="color:#F59E0B;"></i> ' + rating + '</span>' +
            '      <span><i class="fa-solid fa-shield-halved" style="color:var(--active-accent);"></i> ' + warranty + '</span>' +
            '    </div>' +
            '    <h3 class="service-card-title">' + s.title + '</h3>' +
            '    <p class="service-card-desc">' + s.short + '</p>' +
            '    <div class="service-card-footer">' +
            '      <div class="service-price-tag">' +
            '        <span class="price-from">Starting</span>' +
            '        <span class="price-val">' + startPrice + '</span>' +
            '      </div>' +
            '      <a class="service-action-btn" href="' + DETAIL_URL + s.id + '">Explore Service <i class="fa-solid fa-arrow-right"></i></a>' +
            '    </div>' +
            '  </div>' +
            '</article>';
    }

    function render(filter) {
        var list = SERVICES.filter(function (s) {
            return filter === 'All' || categoryOf(s) === filter;
        });
        container.innerHTML = list.map(cardHTML).join('');
        if (resultCount) {
            resultCount.innerHTML = 'Showing <b>' + list.length + '</b> of ' + SERVICES.length + ' services';
        }
    }

    function renderFilters() {
        if (!filterBar) return;
        filterBar.innerHTML = CATEGORIES.map(function (c, i) {
            var count = c === 'All' ? SERVICES.length : SERVICES.filter(function (s) { return categoryOf(s) === c; }).length;
            return '<button class="tab-btn' + (i === 0 ? ' active' : '') + '" data-filter="' + c + '">' + c + ' <span style="opacity:0.65;font-weight:600;">(' + count + ')</span></button>';
        }).join('');

        filterBar.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-filter]');
            if (!btn) return;
            filterBar.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            render(btn.getAttribute('data-filter'));
        });
    }

    renderFilters();
    render('All');
})();
