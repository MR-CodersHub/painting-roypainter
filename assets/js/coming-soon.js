/* ==========================================================================
   RoyPainter — Coming Soon countdown (coming-soon.js)
   ========================================================================== */
(function () {
    'use strict';

    var target = document.querySelector('[data-countdown-target]');
    if (!target) return;

    var targetTime = new Date(target.getAttribute('data-countdown-target')).getTime();
    var boxes = {
        days: document.querySelector('[data-count="days"]'),
        hours: document.querySelector('[data-count="hours"]'),
        minutes: document.querySelector('[data-count="minutes"]'),
        seconds: document.querySelector('[data-count="seconds"]')
    };

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function tick() {
        var now = Date.now();
        var diff = Math.max(0, targetTime - now);

        var days = Math.floor(diff / 86400000);
        var hours = Math.floor((diff % 86400000) / 3600000);
        var minutes = Math.floor((diff % 3600000) / 60000);
        var seconds = Math.floor((diff % 60000) / 1000);

        if (boxes.days) boxes.days.textContent = pad(days);
        if (boxes.hours) boxes.hours.textContent = pad(hours);
        if (boxes.minutes) boxes.minutes.textContent = pad(minutes);
        if (boxes.seconds) boxes.seconds.textContent = pad(seconds);
    }

    tick();
    setInterval(tick, 1000);
})();
