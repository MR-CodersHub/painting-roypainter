/* ==========================================================================
   RoyPainter — Generic FAQ accordion (faq.js)
   Toggles every .faq-item on a page with smooth max-height animation.
   ========================================================================== */
(function () {
    'use strict';

    function init() {
        var items = document.querySelectorAll('.faq-item');
        items.forEach(function (item) {
            if (item.getAttribute('data-bound')) return;
            item.setAttribute('data-bound', '1');
            var question = item.querySelector('.faq-question');
            if (!question) return;
            question.addEventListener('click', function () {
                var isOpen = item.classList.contains('open');
                items.forEach(function (other) {
                    if (other === item) return;
                    other.classList.remove('open');
                    var otherAnswer = other.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });
                var answer = item.querySelector('.faq-answer');
                if (!isOpen) {
                    item.classList.add('open');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    item.classList.remove('open');
                    if (answer) answer.style.maxHeight = null;
                }
            });
        });
    }

    /* ---------- Live FAQ search ---------- */
    var searchInput = document.getElementById('faqSearch');
    if (searchInput) {
        var groups = document.querySelectorAll('[data-faq-group]');
        var debounce;
        searchInput.addEventListener('input', function () {
            clearTimeout(debounce);
            debounce = setTimeout(function () {
                var q = searchInput.value.trim().toLowerCase();
                document.querySelectorAll('.faq-item').forEach(function (item) {
                    var text = (item.textContent || '').toLowerCase();
                    item.style.display = (!q || text.indexOf(q) !== -1) ? '' : 'none';
                });
                groups.forEach(function (group) {
                    var any = Array.prototype.some.call(group.querySelectorAll('.faq-item'), function (item) {
                        return item.style.display !== 'none';
                    });
                    group.style.display = any ? '' : 'none';
                });
            }, 200);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
