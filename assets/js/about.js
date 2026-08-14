/* ==========================================================================
   RoyPainter — Interactive Milestones & Journey Storyboard (about.js)
   Renders the interactive chronological journey with smooth scrubber & stage.
   ========================================================================== */
(function () {
    'use strict';

    var CHAPTERS = [
        {
            year: '2016',
            era: 'The Inception Era',
            title: 'The First Brush & The Lasagna Story',
            desc: 'In 2016, founder Roy Ellison painted his neighbour’s nursery in exchange for a warm home-cooked lasagna. The surgical cut-in lines and velvet finish were so flawless that three more homes on that street booked him before the weekend was over.',
            quote: 'A great wall is not painted with haste — it is born in the preparation and finished with reverence.',
            highlight: 'Street Origin · 3 Word-of-Mouth Bookings',
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1000&h=750&fit=crop',
            icon: 'fa-solid fa-paintbrush'
        },
        {
            year: '2018',
            era: 'Craftsmanship Evolution',
            title: 'First Dedicated Crew & Fine Spray Systems',
            desc: 'As demand surged, Roy carefully vetted and trained four master painters in traditional European brush techniques while investing in industrial-grade HVLP sprayers for factory-smooth kitchen cabinets and trims.',
            quote: 'Tools evolve, but the artisan’s eye for straight lines and uniform sheen never changes.',
            highlight: '4 Master Craftsmen · Fine-Finish Spraying',
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&h=750&fit=crop',
            icon: 'fa-solid fa-users-gear'
        },
        {
            year: '2020',
            era: 'Health & Precision Standards',
            title: 'The 100% Eco & Zero-Dust Guarantee',
            desc: 'We made an uncompromising studio commitment: 100% low-VOC, odorless waterborne coatings from top paint houses, paired with multi-stage HEPA air scrubbers so families can sleep in their homes on paint night.',
            quote: 'Your home is your sanctuary. We leave only rich colour and clean air — zero dust, zero drama.',
            highlight: 'Zero Toxic Odor · Medical-Grade HEPA Scrubbing',
            image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1000&h=750&fit=crop',
            icon: 'fa-solid fa-leaf'
        },
        {
            year: '2022',
            era: 'Architectural Scale',
            title: 'Commercial Division & Luxury Lofts',
            desc: 'A dedicated commercial wing was launched to handle high-profile residential developments, boutique hotels, creative tech lofts, and multi-family restorations with rapid-turnaround night crews.',
            quote: 'Scale without compromising a single millimetre of cut-in precision.',
            highlight: 'Commercial Division · Multi-Unit Excellence',
            image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&h=750&fit=crop',
            icon: 'fa-solid fa-building-user'
        },
        {
            year: '2023',
            era: 'Colour Theory & Design',
            title: 'The In-House Architectural Colour Studio',
            desc: 'We brought certified colour stylists on board to introduce scientific light-mapping and deliver 4×4 velvet hand-painted swatch samples to homeowners’ doorsteps before a single can was opened.',
            quote: 'Colour is shaped by the angle of sunlight and the tone of your floors. We take the guesswork away.',
            highlight: 'Light-Mapped Palettes · 4×4 Velvet Swatch Boards',
            image: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1000&h=750&fit=crop',
            icon: 'fa-solid fa-palette'
        },
        {
            year: '2024',
            era: 'Client Trust & Milestones',
            title: 'Celebrating 1,000 Homes & 99.4% Approval',
            desc: 'RoyPainter officially crossed 1,000 residential transformations. A verified 99.4% client satisfaction and word-of-mouth referral rate established our reputation as the region’s premier painting studio.',
            quote: 'Every single one of the 1,000 homes was treated like our very first nursery in 2016.',
            highlight: '1,000th Home Completed · 99.4% 5-Star Rating',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000&h=750&fit=crop',
            icon: 'fa-solid fa-trophy'
        },
        {
            year: '2025',
            era: 'Studio Mastery',
            title: '40 Certified Artisans Across 2 States',
            desc: 'Growing to 40 fully licensed painters, background-checked craftsmen, and project managers, we expanded our footprint across the Pacific Northwest while preserving our white-glove warranty standards.',
            quote: 'Mastery is not accidental; it is trained, refined, and respected every morning on site.',
            highlight: '40 Licensed Artisans · 10-Year Workmanship Warranty',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&h=750&fit=crop',
            icon: 'fa-solid fa-award'
        },
        {
            year: '2026',
            era: 'The Future of Living',
            title: 'Interactive 3D Visuals & Digital Client Portal',
            desc: 'Launching our next-generation digital studio: real-time room colour previewers, AI daylight angle simulators, and seamless white-glove daily photo updates for every active project.',
            quote: 'Honouring old-world hand craftsmanship with cutting-edge 21st-century visualization.',
            highlight: '3D Room Previews · Live Client Handover Portal',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&h=750&fit=crop',
            icon: 'fa-solid fa-wand-magic-sparkles'
        }
    ];

    var currentIndex = 0;
    var trackEl = document.getElementById('journeyTrack');
    var stageEl = document.getElementById('journeyStage');
    var progressFill = document.getElementById('journeyProgressFill');
    var prevBtn = document.getElementById('journeyPrev');
    var nextBtn = document.getElementById('journeyNext');
    var counterEl = document.getElementById('journeyCounter');

    if (!trackEl || !stageEl) return;

    function renderTrack() {
        trackEl.innerHTML = CHAPTERS.map(function (c, i) {
            return '' +
                '<button class="journey-node-btn' + (i === currentIndex ? ' active' : '') + '" data-index="' + i + '" aria-label="Go to chapter ' + c.year + '">' +
                '  <div class="journey-node-dot"><i class="' + c.icon + '"></i></div>' +
                '  <span class="journey-node-year">' + c.year + '</span>' +
                '  <span class="journey-node-label">' + c.era + '</span>' +
                '</button>';
        }).join('');

        trackEl.querySelectorAll('.journey-node-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(this.getAttribute('data-index'), 10);
                if (!isNaN(idx) && idx !== currentIndex) {
                    setChapter(idx);
                }
            });
        });
    }

    function renderStage() {
        var c = CHAPTERS[currentIndex];
        var progressPercent = ((currentIndex) / (CHAPTERS.length - 1)) * 100;
        if (progressFill) {
            progressFill.style.width = progressPercent + '%';
        }

        // Update active class on track nodes
        trackEl.querySelectorAll('.journey-node-btn').forEach(function (btn, i) {
            if (i === currentIndex) {
                btn.classList.add('active');
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                btn.classList.remove('active');
            }
        });

        if (counterEl) {
            counterEl.textContent = 'Chapter 0' + (currentIndex + 1) + ' of 0' + CHAPTERS.length;
        }

        stageEl.classList.remove('fade-in');
        void stageEl.offsetWidth; // trigger reflow
        stageEl.classList.add('fade-in');

        stageEl.innerHTML = '' +
            '<div class="journey-stage-card">' +
            '  <div class="journey-watermark">' + c.year + '</div>' +
            '  <div class="journey-stage-left">' +
            '    <div class="journey-tag-row">' +
            '      <span class="chip chip-accent"><i class="' + c.icon + '"></i> ' + c.year + ' · ' + c.era + '</span>' +
            '    </div>' +
            '    <h3 class="journey-stage-title">' + c.title + '</h3>' +
            '    <p class="journey-stage-desc">' + c.desc + '</p>' +
            '    <div class="journey-quote-box">' +
            '      <i class="fa-solid fa-quote-left journey-quote-glyph"></i>' +
            '      <p class="journey-quote-text">“' + c.quote + '”</p>' +
            '    </div>' +
            '    <div class="journey-highlight-badge">' +
            '      <i class="fa-solid fa-certificate"></i>' +
            '      <span>' + c.highlight + '</span>' +
            '    </div>' +
            '  </div>' +
            '  <div class="journey-stage-right">' +
            '    <div class="journey-stage-img-wrap">' +
            '      <img src="' + c.image + '" alt="' + c.title + '" class="journey-stage-img">' +
            '      <div class="journey-img-overlay"></div>' +
            '      <div class="journey-floating-year">' +
            '        <span class="yr">' + c.year + '</span>' +
            '        <span class="st">Milestone Achieved</span>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        if (prevBtn) prevBtn.disabled = (currentIndex === 0);
        if (nextBtn) nextBtn.disabled = (currentIndex === CHAPTERS.length - 1);
    }

    function setChapter(index) {
        if (index < 0 || index >= CHAPTERS.length) return;
        currentIndex = index;
        renderStage();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            if (currentIndex > 0) setChapter(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            if (currentIndex < CHAPTERS.length - 1) setChapter(currentIndex + 1);
        });
    }

    // Keyboard Arrow Navigation
    document.addEventListener('keydown', function (e) {
        var journeySec = document.getElementById('journeySection');
        if (!journeySec) return;
        var rect = journeySec.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (e.key === 'ArrowRight' && currentIndex < CHAPTERS.length - 1) {
                setChapter(currentIndex + 1);
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                setChapter(currentIndex - 1);
            }
        }
    });

    renderTrack();
    renderStage();
})();
