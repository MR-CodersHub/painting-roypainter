/* ==========================================================================
   RoyPainter — Enhanced Blog Details Page (blog-details.js)
   Renders full article layout, auto Table of Contents, interactive feedback,
   author bio spotlight, share actions, and related articles.
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

    var id = getParam('id') || 'color-trends-2026';
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

    document.title = post.title + ' | RoyPainter Journal';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.excerpt);

    var related = window.RPData.POSTS.filter(function (p) { return p.id !== post.id; });
    var sameCat = related.filter(function (p) { return p.category === post.category; });
    var sidebarPosts = (sameCat.length ? sameCat : related).slice(0, 3);
    var bottomRelated = related.slice(0, 3);

    // Extract headings for Table of Contents
    var tocItems = [];
    var headingIndex = 0;

    function blocksHTML() {
        return post.content.map(function (b) {
            if (b.type === 'h2') {
                headingIndex++;
                var anchorId = 'heading-' + headingIndex;
                tocItems.push({ id: anchorId, text: b.text });
                return '<h2 id="' + anchorId + '" style="scroll-margin-top:7rem;">' + escapeHTML(b.text) + '</h2>';
            }
            if (b.type === 'h3') {
                return '<h3>' + escapeHTML(b.text) + '</h3>';
            }
            if (b.type === 'p') {
                return '<p>' + escapeHTML(b.text) + '</p>';
            }
            if (b.type === 'list') {
                return '<ul>' + b.items.map(function (i) { return '<li>' + escapeHTML(i) + '</li>'; }).join('') + '</ul>';
            }
            if (b.type === 'quote') {
                return '<blockquote><i class="fa-solid fa-quote-left" style="color:var(--active-accent);margin-right:0.6rem;opacity:0.6;"></i>' + escapeHTML(b.text) + '</blockquote>';
            }
            if (b.type === 'callout') {
                return '<div class="callout"><h4><i class="fa-solid fa-lightbulb" style="margin-right:0.5rem;color:#F59E0B;"></i>' + escapeHTML(b.title) + '</h4><p>' + escapeHTML(b.text) + '</p></div>';
            }
            return '';
        }).join('');
    }

    var renderedBody = blocksHTML();

    var tocHTML = tocItems.length ? (
        '<div class="blog-toc">' +
        '  <div class="blog-toc-title"><i class="fa-solid fa-list-ul" style="color:var(--active-accent);"></i> In This Article</div>' +
        '  <ul class="blog-toc-list">' +
        tocItems.map(function (t) {
            return '<li><a href="#' + t.id + '"><i class="fa-solid fa-angle-right" style="font-size:0.75rem;color:var(--active-accent);"></i> ' + escapeHTML(t.text) + '</a></li>';
        }).join('') +
        '  </ul>' +
        '</div>'
    ) : '';

    wrap.innerHTML =
        '<div class="layout-sidebar">' +
        '  <div>' +
        '    <header class="article-header">' +
        '      <span class="chip chip-accent">' + escapeHTML(post.category) + '</span>' +
        '      <h1>' + escapeHTML(post.title) + '</h1>' +
        '      <div class="blog-meta">' +
        '        <span><i class="fa-regular fa-calendar"></i> ' + fmtDate(post.date) + '</span>' +
        '        <span><i class="fa-regular fa-clock"></i> ' + post.readTime + '</span>' +
        '        <span><i class="fa-solid fa-fire" style="color:#F59E0B;"></i> Master Guide</span>' +
        '      </div>' +
        '      <div class="blog-author" style="margin-top:1.2rem;padding-top:1.2rem;border-top:1px dashed var(--light-gray);">' +
        '        <img src="' + post.author.avatar + '" alt="' + escapeHTML(post.author.name) + '">' +
        '        <div><div class="name">' + escapeHTML(post.author.name) + '</div><div class="role">' + escapeHTML(post.author.role) + '</div></div>' +
        '      </div>' +
        '    </header>' +

        '    <div class="article-cover"><img src="' + post.image + '" alt="' + escapeHTML(post.title) + '"></div>' +

        '    <div class="article-body">' + renderedBody + '</div>' +

        '    <!-- Feedback Card -->' +
        '    <div class="article-feedback-card">' +
        '      <div><span style="font-weight:700;color:var(--text-dark);font-size:0.95rem;">Was this architectural guide helpful?</span><div style="font-size:0.82rem;color:var(--text-muted);">98% of homeowners found this useful</div></div>' +
        '      <div style="display:flex;gap:0.6rem;">' +
        '        <button class="feedback-btn" id="feedbackYes"><i class="fa-solid fa-thumbs-up"></i> Yes</button>' +
        '        <button class="feedback-btn" id="feedbackNo"><i class="fa-solid fa-thumbs-down"></i> No</button>' +
        '      </div>' +
        '    </div>' +

        '    <!-- Author Bio Spotlight -->' +
        '    <div class="author-bio-box">' +
        '      <img src="' + post.author.avatar + '" alt="' + escapeHTML(post.author.name) + '">' +
        '      <div>' +
        '        <div style="font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:var(--active-accent);margin-bottom:0.2rem;">Written by Master Artisan</div>' +
        '        <h4 style="font-family:\'Playfair Display\',serif;font-size:1.3rem;font-weight:700;color:var(--text-dark);margin-bottom:0.4rem;">' + escapeHTML(post.author.name) + '</h4>' +
        '        <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.6;">' + escapeHTML(post.author.role) + ' at RoyPainter Studios with 14+ years specifying luxury residential paint systems and fine-finish spray techniques.</p>' +
        '      </div>' +
        '    </div>' +

        '    <div class="article-tags">' +
        '      <span class="label"><i class="fa-solid fa-tags" style="margin-right:0.4rem;color:var(--active-accent);"></i>Tags:</span>' +
        post.tags.map(function (t) { return '<a class="tag" href="' + root + 'pages/blog.html">' + escapeHTML(t) + '</a>'; }).join('') +
        '    </div>' +

        '    <div class="share-row">' +
        '      <span class="label">Share this article:</span>' +
        '      <div class="share-btns">' +
        '        <a href="#" class="share-act" data-platform="facebook" aria-label="Share on Facebook"><i class="fa-brands fa-facebook-f"></i></a>' +
        '        <a href="#" class="share-act" data-platform="twitter" aria-label="Share on X"><i class="fa-brands fa-x-twitter"></i></a>' +
        '        <a href="#" class="share-act" data-platform="pinterest" aria-label="Share on Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>' +
        '        <a href="#" class="share-act" data-platform="linkedin" aria-label="Share on LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>' +
        '        <a href="#" class="share-act" data-platform="copy" aria-label="Copy link" title="Copy article link"><i class="fa-solid fa-link"></i></a>' +
        '      </div>' +
        '    </div>' +

        
        '  </div>' +

        '  <!-- Sidebar -->' +
        '  <aside>' +
        tocHTML +
        '    <div class="widget">' +
        '      <h3 class="widget-title">Latest Journal Entries</h3>' +
        sidebarPosts.map(function (p) {
            return '<a class="widget-post" href="' + root + 'pages/blog-details.html?id=' + p.id + '">' +
                '  <img src="' + p.image + '" alt="' + escapeHTML(p.title) + '" loading="lazy">' +
                '  <div><div class="t">' + escapeHTML(p.title) + '</div><div class="d">' + fmtDate(p.date) + ' · ' + p.readTime + '</div></div>' +
                '</a>';
        }).join('') +
        '    </div>' +
        '    <div class="widget">' +
        '      <h3 class="widget-title">Trending Topics</h3>' +
        '      <div class="widget-tags">' +
        (['Interior', 'Color Trends', 'Eco Paint', 'Preparation', 'Designer Finishes', 'Exterior', 'Pricing Guide', 'Sheen']).map(function (t) {
            return '<a class="tag" href="' + root + 'pages/blog.html">' + t + '</a>';
        }).join('') +
        '      </div>' +
        '    </div>' +
        '    <div class="widget widget-callout">' +
        '      <div style="font-size:2.2rem;margin-bottom:0.8rem;color:var(--active-accent);"><i class="fa-solid fa-envelope-open-text"></i></div>' +
        '      <h4 style="color:#ffffff !important;">Join 8,200+ Homeowners</h4>' +
        '      <p style="color:rgba(255,255,255,0.85) !important;">Get curated color trends, seasonal maintenance guides and exclusive paint offers monthly.</p>' +
        '      <form class="footer-newsletter" data-newsletter novalidate style="margin-top:1rem;background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.25);">' +
        '        <input type="email" name="email" placeholder="Your email address" required style="color:#ffffff;">' +
        '        <button type="submit" aria-label="Subscribe"><i class="fa-solid fa-paper-plane"></i></button>' +
        '      </form>' +
        '    </div>' +
        '  </aside>' +
        '</div>' +

        '<!-- Bottom Related Articles -->' +
        '<div style="margin-top:5rem;padding-top:4rem;border-top:1px solid var(--light-gray);">' +
        '  <div class="section-header" style="margin-bottom:2.5rem;">' +
        '    <span class="section-tag">Keep Reading</span>' +
        '    <h2 class="section-title">More From The Journal</h2>' +
        '  </div>' +
        '  <div class="grid grid-3">' +
        bottomRelated.map(function (p) {
            return '' +
                '<a class="blog-card" href="' + root + 'pages/blog-details.html?id=' + p.id + '">' +
                '  <div class="blog-card-img">' +
                '    <span class="chip chip-accent blog-card-tag">' + p.category + '</span>' +
                '    <img src="' + p.image + '" alt="' + escapeHTML(p.title) + '" loading="lazy">' +
                '  </div>' +
                '  <div class="blog-card-body">' +
                '    <div class="blog-meta">' +
                '      <span><i class="fa-regular fa-calendar"></i> ' + fmtDate(p.date) + '</span>' +
                '      <span><i class="fa-regular fa-clock"></i> ' + p.readTime + '</span>' +
                '    </div>' +
                '    <h3>' + escapeHTML(p.title) + '</h3>' +
                '    <p>' + escapeHTML(p.excerpt) + '</p>' +
                '  </div>' +
                '</a>';
        }).join('') +
        '  </div>' +
        '</div>';

    // Interactive Feedback Buttons
    var yesBtn = document.getElementById('feedbackYes');
    var noBtn = document.getElementById('feedbackNo');
    if (yesBtn && noBtn) {
        yesBtn.addEventListener('click', function () {
            yesBtn.classList.add('active');
            noBtn.classList.remove('active');
            if (window.RPForms && window.RPForms.showToast) {
                window.RPForms.showToast('success', 'Thank you!', 'Your feedback helps us write better guides.');
            }
        });
        noBtn.addEventListener('click', function () {
            noBtn.classList.add('active');
            yesBtn.classList.remove('active');
            if (window.RPForms && window.RPForms.showToast) {
                window.RPForms.showToast('info', 'Noted!', 'We will work on improving this guide.');
            }
        });
    }

    // Share Actions
    wrap.querySelectorAll('.share-act').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var platform = this.getAttribute('data-platform');
            if (platform === 'copy') {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                }
                if (window.RPForms && window.RPForms.showToast) {
                    window.RPForms.showToast('success', 'Copied!', 'Article link copied to clipboard.');
                }
            } else {
                if (window.RPForms && window.RPForms.showToast) {
                    window.RPForms.showToast('info', 'Shared', 'Opening share dialogue for ' + platform);
                }
            }
        });
    });

    // Wire up newsletter forms
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
