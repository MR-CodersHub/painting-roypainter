/* ==========================================================================
   RoyPainter — Enhanced Blog Listing (blog.js)
   Features spotlight article, client-side search, topic filter, and pagination.
   ========================================================================== */
(function () {
    'use strict';

    var grid = document.getElementById('blogGrid');
    var spotlightContainer = document.getElementById('blogSpotlight');
    var searchInput = document.getElementById('blogSearch');
    var filterBar = document.getElementById('blogFilters');
    var countEl = document.getElementById('blogCount');
    var emptyEl = document.getElementById('blogEmpty');
    var loadMoreBtn = document.getElementById('blogLoadMore');
    if (!grid || !window.RPData) return;

    var POSTS = window.RPData.POSTS;
    var root = (document.currentScript && document.currentScript.getAttribute('src') || 'assets/js/blog.js').replace(/assets\/js\/blog\.js$/, '');
    var DETAIL_URL = root + 'pages/blog-details.html?id=';

    var PAGE_SIZE = 6;
    var state = { category: 'All', query: '', visible: PAGE_SIZE };

    function fmtDate(iso) {
        var d = new Date(iso);
        if (isNaN(d.getTime())) return iso;
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function matches(post) {
        if (state.category !== 'All' && post.category !== state.category) return false;
        if (!state.query) return true;
        var q = state.query.toLowerCase();
        return (post.title + ' ' + post.excerpt + ' ' + post.tags.join(' ') + ' ' + post.category + ' ' + post.author.name).toLowerCase().indexOf(q) !== -1;
    }

    // Render Featured Spotlight Article (first trending article)
    function renderSpotlight() {
        if (!spotlightContainer || !POSTS.length) return;
        var featured = POSTS[0];
        spotlightContainer.innerHTML =
            '<a class="blog-featured-banner" href="' + DETAIL_URL + featured.id + '">' +
            '  <div class="blog-featured-img">' +
            '    <span class="chip chip-accent" style="position:absolute;top:1.2rem;left:1.2rem;z-index:2;"><i class="fa-solid fa-fire"></i> Featured Guide</span>' +
            '    <img src="' + featured.image + '" alt="' + featured.title + '">' +
            '  </div>' +
            '  <div class="blog-featured-body">' +
            '    <div class="blog-meta">' +
            '      <span><i class="fa-solid fa-tag"></i> ' + featured.category + '</span>' +
            '      <span><i class="fa-regular fa-calendar"></i> ' + fmtDate(featured.date) + '</span>' +
            '      <span><i class="fa-regular fa-clock"></i> ' + featured.readTime + '</span>' +
            '    </div>' +
            '    <h2 style="font-family:\'Playfair Display\',serif;font-size:2rem;font-weight:800;color:var(--text-dark);line-height:1.25;">' + featured.title + '</h2>' +
            '    <p style="font-size:1rem;color:var(--text-muted);line-height:1.7;">' + featured.excerpt + '</p>' +
            '    <div class="blog-author" style="margin-top:0.4rem;">' +
            '      <img src="' + featured.author.avatar + '" alt="' + featured.author.name + '">' +
            '      <div><div class="name">' + featured.author.name + '</div><div class="role">' + featured.author.role + '</div></div>' +
            '    </div>' +
            '    <div style="display:inline-flex;align-items:center;gap:0.5rem;color:var(--active-accent);font-weight:700;margin-top:0.5rem;">' +
            '      Read Full Article <i class="fa-solid fa-arrow-right"></i>' +
            '    </div>' +
            '  </div>' +
            '</a>';
    }

    function cardHTML(post) {
        return '' +
            '<a class="blog-card" href="' + DETAIL_URL + post.id + '">' +
            '  <div class="blog-card-img">' +
            '    <span class="chip chip-accent blog-card-tag">' + post.category + '</span>' +
            '    <img src="' + post.image + '" alt="' + post.title + '" loading="lazy">' +
            '  </div>' +
            '  <div class="blog-card-body">' +
            '    <div class="blog-meta">' +
            '      <span><i class="fa-regular fa-calendar"></i> ' + fmtDate(post.date) + '</span>' +
            '      <span><i class="fa-regular fa-clock"></i> ' + post.readTime + '</span>' +
            '    </div>' +
            '    <h3>' + post.title + '</h3>' +
            '    <p>' + post.excerpt + '</p>' +
            '    <div class="blog-author">' +
            '      <img src="' + post.author.avatar + '" alt="' + post.author.name + '">' +
            '      <div><div class="name">' + post.author.name + '</div><div class="role">' + post.author.role + '</div></div>' +
            '    </div>' +
            '  </div>' +
            '</a>';
    }

    function render() {
        var list = POSTS.filter(matches);
        var shown = list.slice(0, state.visible);

        if (!shown.length) {
            grid.innerHTML = '';
            if (emptyEl) emptyEl.classList.add('show');
        } else {
            grid.innerHTML = shown.map(cardHTML).join('');
            if (emptyEl) emptyEl.classList.remove('show');
        }

        if (countEl) {
            countEl.innerHTML = 'Showing <b>' + shown.length + '</b> of <b>' + list.length + '</b> article' + (list.length === 1 ? '' : 's');
        }

        if (loadMoreBtn) {
            var hasMore = state.visible < list.length;
            loadMoreBtn.style.display = hasMore ? 'inline-flex' : 'none';
            loadMoreBtn.setAttribute('data-remaining', list.length - shown.length);
        }
    }

    function renderFilters() {
        if (!filterBar) return;
        var cats = ['All'].concat(window.RPData.categories());
        filterBar.innerHTML = cats.map(function (c, i) {
            var count = c === 'All' ? POSTS.length : POSTS.filter(function (p) { return p.category === c; }).length;
            return '<button class="tab-btn' + (i === 0 ? ' active' : '') + '" data-filter="' + c + '">' + c + ' <span style="opacity:0.65;font-weight:600;">(' + count + ')</span></button>';
        }).join('');

        filterBar.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-filter]');
            if (!btn) return;
            filterBar.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            state.category = btn.getAttribute('data-filter');
            state.visible = PAGE_SIZE;
            render();
        });
    }

    if (searchInput) {
        var debounce;
        searchInput.addEventListener('input', function () {
            clearTimeout(debounce);
            debounce = setTimeout(function () {
                state.query = searchInput.value.trim();
                state.visible = PAGE_SIZE;
                render();
            }, 220);
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            state.visible += PAGE_SIZE;
            render();
        });
    }

    renderSpotlight();
    renderFilters();
    render();
})();
