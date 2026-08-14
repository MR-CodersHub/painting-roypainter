/* ==========================================================================
   RoyPainter — Shared Navbar & Footer (navbar.js)
   Injects the identical floating-glass navbar, footer, back-to-top button,
   theme/RTL toggles and the auth modal into every page.
   ========================================================================== */
(function () {
    'use strict';

    /* ---- resolve project-root relative prefix from this script's src ---- */
    var scriptSrc = document.currentScript && document.currentScript.getAttribute('src');
    var ROOT = (scriptSrc || '').replace(/assets\/js\/navbar\.js$/, '');
    function p(path) {
        return ROOT + path;
    }
    function currentFile() {
        var parts = window.location.pathname.split('/');
        return parts[parts.length - 1] || 'index.html';
    }
    function isActive(path) {
        var file = path.split('/').pop();
        return file === currentFile();
    }

    /* ---------------------------------------------------------------------
       THEME (dark / light with system-preference detection)
    --------------------------------------------------------------------- */
    var THEME_KEY = 'rp-theme';
    function getSystemTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    function getSavedTheme() {
        try {
            return localStorage.getItem(THEME_KEY);
        } catch (e) { return null; }
    }
    function applyTheme(theme, persist) {
        var root = document.documentElement;
        if (theme === 'dark' || theme === 'light') {
            root.setAttribute('data-theme', theme);
        } else {
            root.removeAttribute('data-theme');
        }
        if (persist !== false) {
            try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
        }
        updateThemeIcons();
    }
    function updateThemeIcons() {
        var saved = getSavedTheme();
        var theme = saved === 'dark' || saved === 'light' ? saved : getSystemTheme();
        document.querySelectorAll('[data-theme-toggle] i').forEach(function (icon) {
            icon.className = theme === 'dark'
                ? 'fa-solid fa-sun'
                : 'fa-solid fa-moon';
        });
    }
    function initTheme() {
        var saved = getSavedTheme();
        var theme = saved === 'dark' || saved === 'light' ? saved : getSystemTheme();
        applyTheme(theme, false);
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-theme-toggle]');
            if (!btn) return;
            var current = getSavedTheme() || getSystemTheme();
            applyTheme(current === 'dark' ? 'light' : 'dark', true);
        });
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (ev) {
                if (!getSavedTheme()) applyTheme(ev.matches ? 'dark' : 'light', false);
            });
        }
    }

    /* ---------------------------------------------------------------------
       RTL / DIRECTION TOGGLE
    --------------------------------------------------------------------- */
    var DIR_KEY = 'rp-dir';
    function systemPrefersRtl() {
        var lang = (navigator.language || '').split('-')[0];
        return ['ar', 'he', 'fa', 'ur', 'ps', 'sd', 'ckb'].indexOf(lang) !== -1;
    }
    function getSavedDir() {
        try { return localStorage.getItem(DIR_KEY); } catch (e) { return null; }
    }
    function applyDir(dir, persist) {
        var root = document.documentElement;
        if (dir === 'rtl') {
            root.setAttribute('dir', 'rtl');
        } else {
            root.removeAttribute('dir');
        }
        if (persist !== false) {
            try { localStorage.setItem(DIR_KEY, dir); } catch (e) { /* ignore */ }
        }
        updateDirIcons();
    }
    function updateDirIcons() {
        var dir = getSavedDir() || (systemPrefersRtl() ? 'rtl' : 'ltr');
        document.querySelectorAll('[data-dir-toggle] span').forEach(function (el) {
            el.textContent = dir === 'rtl' ? 'EN' : 'ع';
        });
    }
    function initDir() {
        var saved = getSavedDir();
        applyDir(saved === 'rtl' ? 'rtl' : 'ltr', false);
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-dir-toggle]');
            if (!btn) return;
            var current = getSavedDir() || (systemPrefersRtl() ? 'rtl' : 'ltr');
            applyDir(current === 'rtl' ? 'ltr' : 'rtl', true);
        });
    }

    /* ---------------------------------------------------------------------
       NAVBAR MARKUP (identical on every page)
    --------------------------------------------------------------------- */
    var NAV_HTML = '' +
        '<div class="nav-container" id="navContainer">' +
        '  <nav>' +
        '    <div class="nav-wrapper">' +
        '      <a href="' + p('index.html') + '" class="logo-wrap">' +
        '        <img src="' + p('assets/images/logo.png') + '" alt="RoyPainter Logo" class="brand-logo-img">' +
        '        <div class="logo">Roy<span class="logo-accent">Painter</span></div>' +
        '      </a>' +
        '      <ul class="nav-links">' +
        '        <li><a href="' + p('index.html') + '" data-nav="home">Home</a></li>' +
        '        <li><a href="' + p('pages/home-2.html') + '" data-nav="home-2">Home 2</a></li>' +
        '        <li><a href="' + p('pages/about.html') + '" data-nav="about">About</a></li>' +
        '        <li><a href="' + p('pages/services.html') + '" data-nav="services">Services</a></li>' +
        '        <li><a href="' + p('pages/blog.html') + '" data-nav="blog">Blog</a></li>' +
        '        <li><a href="' + p('pages/contact.html') + '" data-nav="contact">Contact</a></li>' +
        '      </ul>' +
        '      <div class="nav-actions">' +
        '        <button class="icon-btn" data-theme-toggle title="Toggle dark / light mode" aria-label="Toggle dark or light mode"><i class="fa-solid fa-moon"></i></button>' +
        '        <button class="icon-btn" data-dir-toggle title="Toggle RTL / LTR direction" aria-label="Toggle right-to-left layout">RTL</button>' +
        '        <a href="tel:+15551234567" class="nav-phone">' +
        '          <i class="fa-solid fa-phone"></i><span>(555) 123-4567</span>' +
        '        </a>' +
        '        <a href="' + p('pages/contact.html') + '" class="cta-nav">' +
        '          <i class="fa-solid fa-calendar-check"></i><span>Get Free Quote</span>' +
        '        </a>' +
        '        <button class="mobile-toggle" data-mobile-toggle aria-label="Open Navigation Menu">' +
        '          <i class="fa-solid fa-bars"></i>' +
        '        </button>' +
        '      </div>' +
        '    </div>' +
        '  </nav>' +
        '</div>' +
        '<div class="mobile-menu" id="mobileMenu">' +
        '  <a href="' + p('index.html') + '" class="mobile-link">Home</a>' +
        '  <a href="' + p('pages/home-2.html') + '" class="mobile-link">Home 2</a>' +
        '  <a href="' + p('pages/about.html') + '" class="mobile-link">About Us</a>' +
        '  <a href="' + p('pages/services.html') + '" class="mobile-link">Our Services</a>' +
        '  <a href="' + p('pages/blog.html') + '" class="mobile-link">Blog & Guides</a>' +
        '  <a href="' + p('pages/contact.html') + '" class="mobile-link">Contact</a>' +
        '  <div class="mobile-toggles">' +
        '    <button class="icon-btn" data-theme-toggle style="flex:1;" aria-label="Toggle dark or light mode"><i class="fa-solid fa-moon"></i><span style="margin-left:0.5rem;font-size:0.85rem;">Theme</span></button>' +
        '    <button class="icon-btn" data-dir-toggle style="flex:1;" aria-label="Toggle right-to-left layout">RTL</button>' +
        '  </div>' +
        '</div>';

    /* ---------------------------------------------------------------------
       FOOTER MARKUP (identical on every page)
    --------------------------------------------------------------------- */
    var FOOTER_HTML = '' +
        '<footer>' +
        '  <div class="footer-wrapper">' +
        '    <div class="footer-content">' +
        '      <div class="footer-section">' +
        '        <a href="' + p('index.html') + '" class="logo-wrap" style="margin-bottom:1.2rem;display:inline-flex;">' +
        '          <img src="' + p('assets/images/logo.png') + '" alt="RoyPainter Logo" class="brand-logo-img">' +
        '          <div class="logo" style="color:#FFFFFF;">Roy<span class="logo-accent">Painter</span></div>' +
        '        </a>' +
        '        <p>Master-grade residential & commercial painting, wall restoration, and bespoke architectural finishes.</p>' +
        
        '        <div class="footer-social">' +
        '          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>' +
        '          <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>' +
        '          <a href="#" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>' +
        '          <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>' +
        '        </div>' +
        '      </div>' +
        '      <div class="footer-section">' +
        '        <h3>Services</h3>' +
        '        <a href="' + p('pages/service-details.html?id=interior-painting') + '">Interior Painting</a>' +
        '        <a href="' + p('pages/service-details.html?id=exterior-painting') + '">Exterior Weatherproofing</a>' +
        '        <a href="' + p('pages/service-details.html?id=wall-restoration') + '">Wall Restoration</a>' +
        '        <a href="' + p('pages/service-details.html?id=designer-finishes') + '">Designer Plaster & Texture</a>' +
        '        <a href="' + p('pages/service-details.html?id=cabinet-staining') + '">Cabinet & Wood Staining</a>' +
        '      </div>' +
        '      <div class="footer-section">' +
        '        <h3>Quick Links</h3>' +
        '        <a href="' + p('index.html') + '">Home</a>' +
        '        <a href="' + p('pages/home-2.html') + '">Home 2</a>' +
        '        <a href="' + p('pages/about.html') + '">About Us</a>' +
        '        <a href="' + p('pages/pricing.html') + '">Pricing & Plans</a>' +
        '        <a href="' + p('pages/blog.html') + '">Blog & Guides</a>' +
        '      </div>' +
        '      <div class="footer-section">' +
        '        <h3>Contact Us</h3>' +
        '        <p><i class="fa-solid fa-phone" style="margin-right:0.5rem;color:var(--active-accent);"></i> +1 (555) 123-4567</p>' +
        '        <p><i class="fa-solid fa-envelope" style="margin-right:0.5rem;color:var(--active-accent);"></i> hello@roypainter.com</p>' +
        '        <p><i class="fa-solid fa-location-dot" style="margin-right:0.5rem;color:var(--active-accent);"></i> 450 Artisan Way, Suite 100, Portland</p>' +
        '        <p><i class="fa-regular fa-clock" style="margin-right:0.5rem;color:var(--active-accent);"></i> Mon–Sat · 8:00 AM – 6:00 PM</p>' +
        '      </div>' +
        '    </div>' +
        '    <div class="footer-bottom">' +
        '      <div class="footer-bottom-links">' +
        '        <a href="' + p('pages/privacy-policy.html') + '">Privacy Policy</a>' +
        '        <a href="' + p('pages/terms-of-service.html') + '">Terms of Service</a>' +
        '        <a href="' + p('pages/faq.html') + '">FAQ</a>' +
        '      </div>' +
        '      <p>&copy; ' + new Date().getFullYear() + ' RoyPainter Studios. All rights reserved. Master Craftsmanship.</p>' +
        '    </div>' +
        '  </div>' +
        '</footer>';

    /* ---------------------------------------------------------------------
       AUTH MODAL MARKUP
    --------------------------------------------------------------------- */
    var AUTH_HTML = '' +
        '<div class="modal-overlay" data-auth-modal>' +
        '  <div class="auth-modal">' +
        '    <button class="modal-close" data-auth-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button>' +
        '    <div class="auth-logo">' +
        '      <img src="' + p('assets/images/logo.png') + '" alt="RoyPainter Logo" class="brand-logo-img" style="width:42px;height:42px;">' +
        '      <div class="logo">Roy<span class="logo-accent">Painter</span></div>' +
        '    </div>' +
        '    <div class="auth-tabs">' +
        '      <button class="auth-tab active" data-auth-tab="login">Sign In</button>' +
        '      <button class="auth-tab" data-auth-tab="signup">Create Account</button>' +
        '    </div>' +
        '    <form class="auth-form active" data-validate data-auth-form="login" novalidate>' +
        '      <div class="form-group">' +
        '        <label for="loginEmail">Email Address</label>' +
        '        <input type="email" id="loginEmail" name="email" placeholder="you@example.com" required data-type="email">' +
        '        <span class="field-error">Please enter a valid email address.</span>' +
        '      </div>' +
        '      <div class="form-group">' +
        '        <label for="loginPassword">Password</label>' +
        '        <input type="password" id="loginPassword" name="password" placeholder="••••••••" required data-min="6">' +
        '        <span class="field-error">Password must be at least 6 characters.</span>' +
        '      </div>' +
        '      <button type="submit" class="cta-button" style="width:100%;justify-content:center;">Sign In</button>' +
        '    </form>' +
        '    <form class="auth-form" data-validate data-auth-form="signup" novalidate>' +
        '      <div class="form-group">' +
        '        <label for="signupName">Full Name</label>' +
        '        <input type="text" id="signupName" name="name" placeholder="Jane Cooper" required>' +
        '        <span class="field-error">Please enter your full name.</span>' +
        '      </div>' +
        '      <div class="form-group">' +
        '        <label for="signupEmail">Email Address</label>' +
        '        <input type="email" id="signupEmail" name="email" placeholder="you@example.com" required data-type="email">' +
        '        <span class="field-error">Please enter a valid email address.</span>' +
        '      </div>' +
        '      <div class="form-group">' +
        '        <label for="signupPhone">Phone (optional)</label>' +
        '        <input type="tel" id="signupPhone" name="phone" placeholder="+1 (555) 000-0000">' +
        '      </div>' +
        '      <button type="submit" class="cta-button" style="width:100%;justify-content:center;">Create Account</button>' +
        '    </form>' +
        '    <div class="auth-alt">or continue with</div>' +
        '    <div class="social-login">' +
        '      <button class="social-btn google"><i class="fa-brands fa-google"></i> Google</button>' +
        '      <button class="social-btn apple"><i class="fa-brands fa-apple"></i> Apple</button>' +
        '    </div>' +
        '    <div class="auth-switch">' +
        '      <span data-auth-switch-label>New to RoyPainter?</span> ' +
        '      <button type="button" data-auth-switch>Create an account</button>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    var BTN_HTML = '<button class="back-top" data-back-top aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>';

    /* ---------------------------------------------------------------------
       INJECT
    --------------------------------------------------------------------- */
    function inject() {
        var navSlot = document.getElementById('siteNavbar');
        var footerSlot = document.getElementById('siteFooter');
        if (navSlot) navSlot.innerHTML = NAV_HTML; else document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
        if (footerSlot) footerSlot.innerHTML = FOOTER_HTML; else document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
        document.body.insertAdjacentHTML('beforeend', BTN_HTML);
        document.body.insertAdjacentHTML('beforeend', AUTH_HTML);
    }

    /* ---------------------------------------------------------------------
       NAV BEHAVIOUR
    --------------------------------------------------------------------- */
    function initNav() {
        var navContainer = document.getElementById('navContainer');
        var mobileMenu = document.getElementById('mobileMenu');

        function onScroll() {
            if (window.scrollY > 40) {
                navContainer.classList.add('scrolled');
            } else {
                navContainer.classList.remove('scrolled');
            }
            var backTop = document.querySelector('[data-back-top]');
            if (backTop) backTop.classList.toggle('show', window.scrollY > 500);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        document.addEventListener('click', function (e) {
            var toggle = e.target.closest('[data-mobile-toggle]');
            if (!toggle) return;
            mobileMenu.classList.toggle('open');
            var icon = toggle.querySelector('i');
            if (mobileMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.mobile-link').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                var icon = document.querySelector('[data-mobile-toggle] i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });

        var backTop = document.querySelector('[data-back-top]');
        if (backTop) {
            backTop.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        document.querySelectorAll('.nav-links a').forEach(function (a) {
            if (isActive(a.getAttribute('href'))) a.classList.add('active');
        });
        document.querySelectorAll('.mobile-link').forEach(function (a) {
            if (isActive(a.getAttribute('href'))) a.classList.add('active');
        });
    }

    /* ---------------------------------------------------------------------
       AUTH MODAL
    --------------------------------------------------------------------- */
    function initAuthModal() {
        var overlay = document.querySelector('[data-auth-modal]');
        if (!overlay) return;
        var forms = overlay.querySelectorAll('.auth-form');

        function switchTab(tab) {
            overlay.querySelectorAll('.auth-tab').forEach(function (t) {
                t.classList.toggle('active', t.getAttribute('data-auth-tab') === tab);
            });
            forms.forEach(function (f) {
                f.classList.toggle('active', f.getAttribute('data-auth-form') === tab);
            });
            var isLogin = tab === 'login';
            overlay.querySelector('[data-auth-switch-label]').textContent =
                isLogin ? 'New to RoyPainter?' : 'Already have an account?';
            overlay.querySelector('[data-auth-switch]').textContent =
                isLogin ? 'Create an account' : 'Sign in instead';
        }

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-auth-open]')) {
                e.preventDefault();
                overlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
            if (e.target.closest('[data-auth-close]') || e.target === overlay) {
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            }
            var tabBtn = e.target.closest('[data-auth-tab]');
            if (tabBtn) switchTab(tabBtn.getAttribute('data-auth-tab'));
            var switchBtn = e.target.closest('[data-auth-switch]');
            if (switchBtn) {
                var active = overlay.querySelector('.auth-form.active');
                var next = active && active.getAttribute('data-auth-form') === 'login' ? 'signup' : 'login';
                switchTab(next);
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('open')) {
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    /* ---------------------------------------------------------------------
       BOOT
    --------------------------------------------------------------------- */
    function boot() {
        inject();
        initTheme();
        initDir();
        initNav();
        initAuthModal();
        if (window.RPForms && window.RPForms.initAll) {
            window.RPForms.initAll();
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                if (window.RPForms && window.RPForms.initAll) window.RPForms.initAll();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
