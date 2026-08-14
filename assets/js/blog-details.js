/* ==========================================================================
   RoyPainter — Blog Article page (blog-details.html)
   Reads ?id= from the URL, renders the matching article from RPData with a
   sidebar of related posts, popular tags and a newsletter callout.
   ========================================================================== */
(function () {
    'use strict';

    var root = (document.currentScript && document.currentScript.getAttribute('src') || 'assets/js/blog-details.js').replace(/assets\/js\/blog-details\.js$/, '');

    function getParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    function escapeHTML(str) {
        var div = document.createElement('div');
        div.textContent = str == null ? '' : String(str);
        return div.innerHTML;
    }

    function fmtDate(iso) {
        var d = new Date(iso);
        if (isNaN(d.getTime())) return iso;
        return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    var id = getParam('id');
    var post = window.RPData && window.RPData.getPost(id);

    var wrap = document.getElementById('articleWrap');
    if (!post || !wrap) {
        if (wrap) {
            wrap.innerHTML = '<div class="section"><div class="container" style="text-align:center;padding:6rem 1rem;">' +
                '  <div style="font-size:4rem;color:var(--active-accent);margin-bottom:1rem;"><i class="fa-solid fa-circle-question"></i></div>' +
                '  <h2 style="font-family:\'Playfair Display\',serif;font-size:2.2rem;color:var(--text-dark);margin-bottom:0.8rem;">Article not found</h2>' +
                '  <p style="color:var(--text-muted);margin-bottom:1.6rem;">The article you requested is unavailable or was moved.</p>' +
                '  <a href="' + root + 'pages/blog.html" class="cta-button">Back to Blog</a>' +
                '</div></div>';
        }
        document.title = 'Article Not Found | RoyPainter';
        return;
    }

    document.title = post.title + ' | RoyPainter Blog';
    document.querySelector('meta[name="description"]').setAttribute('content', post.excerpt);

    var related = window.RPData.POSTS.filter(function (p) { return p.id !== post.id; });
    var sameCat = related.filter(function (p) { return p.category === post.category; });
    var sidebarPosts = (sameCat.length ? sameCat : related).slice(0, 3);

    function blocksHTML() {
        return post.content.map(function (b) {
            if (b.type === 'h2') return '<h2>' + escapeHTML(b.text) + '</h2>';
            if (b.type === 'h3') return '<h3>' + escapeHTML(b.text) + '</h3>';
            if (b.type === 'p') return '<p>' + escapeHTML(b.text) + '</p>';
            if (b.type === 'list') return '<ul>' + b.items.map(function (i) { return '<li>' + escapeHTML(i) + '</li>'; }).join('') + '</ul>';
            if (b.type === 'quote') return '<blockquote>' + escapeHTML(b.text) + '</blockquote>';
            if (b.type === 'callout') return '<div class="callout"><h4><i class="fa-solid fa-lightbulb" style="margin-right:0.5rem;color:#FBBF24;"></i>' + escapeHTML(b.title) + '</h4><p>' + escapeHTML(b.text) + '</p></div>';
            return '';
        }).join('');
    }

    wrap.innerHTML =
        '<div class="layout-sidebar">' +
        '  <div>' +
        '    <nav class="breadcrumb" style="justify-content:flex-start;margin-top:0;">' +
        '      <a href="' + root + 'index.html">Home</a><span class="sep"><i class="fa-solid fa-chevron-right"></i></span>' +
        '      <a href="' + root + 'pages/blog.html">Blog</a><span class="sep"><i class="fa-solid fa-chevron-right"></i></span>' +
        '      <span class="current">' + post.category + '</span>' +
        '    </nav>' +
        '    <header class="article-header">' +
        '      <span class="chip chip-accent">' + post.category + '</span>' +
        '      <h1>' + escapeHTML(post.title) + '</h1>' +
        '      <div class="blog-meta">' +
        '        <span><i class="fa-regular fa-calendar"></i> ' + fmtDate(post.date) + '</span>' +
        '        <span><i class="fa-regular fa-clock"></i> ' + post.readTime + '</span>' +
        '        <span><i class="fa-regular fa-eye"></i> ' + (320 + Math.floor(Math.random() * 900)) + ' views</span>' +
        '      </div>' +
        '      <div class="blog-author" style="margin-top:1.2rem;padding-top:1.2rem;border-top:1px dashed var(--light-gray);">' +
        '        <img src="' + post.author.avatar + '" alt="' + post.author.name + '">' +
        '        <div><div class="name">' + post.author.name + '</div><div class="role">' + post.author.role + '</div></div>' +
        '      </div>' +
        '    </header>' +
        '    <div class="article-cover"><img src="' + post.image + '" alt="' + post.title + '"></div>' +
        '    <div class="article-body">' + blocksHTML() + '</div>' +

        '    <div class="article-tags">' +
        '      <span class="label"><i class="fa-solid fa-tags" style="margin-right:0.4rem;color:var(--active-accent);"></i>Tags:</span>' +
        post.tags.map(function (t) { return '<a class="tag" href="' + root + 'pages/blog.html">' + t + '</a>'; }).join('') +
        '    </div>' +

        '    <div class="share-row">' +
        '      <span class="label">Share this article:</span>' +
        '      <div class="share-btns">' +
        '        <a href="#" aria-label="Share on Facebook"><i class="fa-brands fa-facebook-f"></i></a>' +
        '        <a href="#" aria-label="Share on X"><i class="fa-brands fa-x-twitter"></i></a>' +
        '        <a href="#" aria-label="Share on Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>' +
        '        <a href="#" aria-label="Share via LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>' +
        '      </div>' +
        '    </div>' +

        '    <div class="cta-banner" style="margin-top:1rem;">' +
        '      <div class="cta-glow"></div>' +
        '      <h2>Ready to transform your walls?</h2>' +
        '      <p>Get a free color consultation and an instant quote from our master painters.</p>' +
        '      <div class="hero-actions">' +
        '        <a href="' + root + 'pages/contact.html" class="cta-button"><i class="fa-solid fa-calendar-check"></i> Free Quote</a>' +
        '        <a href="' + root + 'pages/pricing.html" class="cta-button-secondary" style="background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.25);">View Pricing</a>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +

        '  <aside>' +
        '    <div class="widget">' +
        '      <h3 class="widget-title">Latest Articles</h3>' +
        sidebarPosts.map(function (p) {
            return '<a class="widget-post" href="' + root + 'pages/blog-details.html?id=' + p.id + '">' +
                '  <img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
                '  <div><div class="t">' + p.title + '</div><div class="d">' + fmtDate(p.date) + ' · ' + p.readTime + '</div></div>' +
                '</a>';
        }).join('') +
        '    </div>' +
        '    <div class="widget">' +
        '      <h3 class="widget-title">Popular Tags</h3>' +
        '      <div class="widget-tags">' +
        (['Color', 'Guides', 'Eco Paint', 'Preparation', 'Design', 'Exterior', 'Pricing', 'Sheen']).map(function (t) {
            return '<a class="tag" href="' + root + 'pages/blog.html">' + t + '</a>';
        }).join('') +
        '      </div>' +
        '    </div>' +
        '    <div class="widget widget-callout">' +
        '      <div style="font-size:2rem;margin-bottom:0.8rem;"><i class="fa-solid fa-envelope-open-text"></i></div>' +
        '      <h4>Décor tips, monthly</h4>' +
        '      <p>Join 8,000+ subscribers getting colour trends and maintenance checklists.</p>' +
        '      <form class="footer-newsletter" data-newsletter novalidate>' +
        '        <input type="email" name="email" placeholder="Your email address" required>' +
        '        <button type="submit" aria-label="Subscribe"><i class="fa-solid fa-paper-plane"></i></button>' +
        '      </form>' +
        '    </div>' +
        '  </aside>' +
        '</div>';

    // re-init newsletter forms injected after load
    if (window.RPForms && window.RPForms.initAll) {
        document.querySelectorAll('form[data-newsletter]').forEach(function (form) {
            if (form.getAttribute('data-rp-bound')) return;
            form.setAttribute('data-rp-bound', '1');
            var input = form.querySelector('input[type="email"]') || form.querySelector('input');
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (input && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
                    input.classList.add('invalid');
                    input.focus();
                    if (window.RPForms.showToast) window.RPForms.showToast('error', 'Invalid email', 'Please enter a valid email address.');
                    return;
                }
                if (input) input.classList.remove('invalid');
                if (window.RPForms.showToast) window.RPForms.showToast('success', 'Subscribed!', 'Welcome to the RoyPainter décor circle.');
                form.reset();
            });
        });
    }
})();
