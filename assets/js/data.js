/* ==========================================================================
   RoyPainter — Shared Content Data (data.js)
   Single source of truth for services and blog posts. Service-details and
   blog-details pages render their content from here using ?id= query params.
   ========================================================================== */
window.RPData = (function () {
    'use strict';

    var IMG = {
        interior: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop',
        interior2: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop',
        exterior: 'https://images.unsplash.com/photo-1481066472509-100f4e81b10e?w=1200&h=800&fit=crop',
        restoration: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop',
        designer: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=800&fit=crop',
        prep: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&h=800&fit=crop',
        cabinet: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop',
        commercial: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop',
        consultation: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1200&h=800&fit=crop',
        blog1: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
        blog2: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=800&fit=crop',
        blog3: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&h=800&fit=crop',
        blog4: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=800&fit=crop',
        blog5: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
        blog6: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
        blog7: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=800&fit=crop',
        blog8: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop',
        blog9: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=1200&h=800&fit=crop'
    };

    var AVATARS = {
        a: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
        b: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        c: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        d: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
        e: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop',
        f: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
    };

    /* ==================================================================
       SERVICES
    ================================================================== */
    var SERVICES = [
        {
            id: 'interior-painting',
            num: '01',
            icon: 'fa-solid fa-paint-roller',
            title: 'Interior Painting',
            short: 'Bespoke wall styling, accent walls, and ceiling refinishing customized to your lighting.',
            image: IMG.interior,
            gallery: [IMG.interior, IMG.interior2, IMG.blog1],
            desc: 'Our interior painting service turns every room into a gallery. We begin with a full color-psychology consultation, then layer on premium, low-VOC coatings with surgical cut-in lines and hand-rolled velvet finishes. Every room is prepped, masked, and finished with white-glove cleanup.',
            features: [
                'Laser-leveled cut-in edges for crisp transitions',
                'Spray + roll hybrid for a silky, factory-smooth surface',
                'Eco-friendly, washable low-VOC premium paints',
                'Accent wall and ceiling color-blocking design',
                'Furniture wrapping and HEPA air filtration',
                '10-year workmanship warranty'
            ],
            faqs: [
                { q: 'How long does an interior painting project take?', a: 'A typical 3-bedroom home interior takes 3–5 working days including prep and curing between coats. Large open-plan homes may take up to a week.' },
                { q: 'Do I need to leave my home during the project?', a: 'Most of our finishes are low-VOC and odorless, so you can usually stay home. We simply ask that the rooms being painted are kept clear of fragile items.' },
                { q: 'What paint brands do you use?', a: 'We are certified installers for Benjamin Moore, Sherwin-Williams, Farrow & Ball, Dulux and Behr — your project manager will help you choose the right sheen and grade.' }
            ],
            pricing: [
                { plan: 'Essential Room', price: '$420', unit: 'starting / room', features: ['Single room paint', '2 coats premium paint', 'Cut-in & roller finish', 'Basic surface prep'] },
                { plan: 'Signature Home', price: '$1,890', unit: 'starting / home', features: ['Whole-home interior', 'Spray + roll finish', 'Color consultation', 'Furniture protection', '10-year warranty'] },
                { plan: 'Luxury Makeover', price: '$4,500', unit: 'starting / project', features: ['Full redesign package', 'Designer wall features', 'Ceiling & trim refinish', 'Priority 5-day schedule', 'Premium brand coatings'] }
            ],
            meta: { duration: '3–5 days', coverage: 'Up to 3,000 sq ft', rating: '4.9/5', warranty: '10 years' }
        },
        {
            id: 'exterior-painting',
            num: '02',
            icon: 'fa-solid fa-house-chimney',
            title: 'Exterior Painting',
            short: 'Weatherproof UV-shield coatings that safeguard and elevate curb appeal for decades.',
            image: IMG.exterior,
            gallery: [IMG.exterior, IMG.blog7, IMG.blog3],
            desc: 'Exteriors face brutal sun, rain and temperature swings. We apply advanced elastomeric and UV-shield coatings over fully cleaned and primed surfaces, sealing every seam with professional-grade caulk so your home stays vibrant and moisture-proof for years.',
            features: [
                'Pressure washing & mildew remediation',
                'Elastomeric weatherproof coatings',
                'UV-stable pigmentation that resists fading',
                'Professional caulking & seam sealing',
                'Trim, fascia, soffit & door refinishing',
                'Ladder, scaffold & safety-certified crews'
            ],
            faqs: [
                { q: 'When is the best season for exterior painting?', a: 'We paint year-round, but 55–85°F with low humidity is ideal. We time the job around forecasts so coats cure properly.' },
                { q: 'How often should an exterior be repainted?', a: 'Quality exterior paints last 7–12 years depending on exposure. We recommend a bi-annual inspection to catch peeling early.' },
                { q: 'Do you handle two-storey and hard-to-reach areas?', a: 'Yes — our crews are OSHA-certified for heights and use scaffold or lift systems for safe, even coverage.' }
            ],
            pricing: [
                { plan: 'Facade Refresh', price: '$1,650', unit: 'starting / home', features: ['Full exterior 2 coats', 'Pressure wash & prep', 'Trim repaint', '1-year warranty'] },
                { plan: 'Weather Shield', price: '$3,400', unit: 'starting / home', features: ['Elastomeric coating system', 'Caulking & seam sealing', 'Soffit & fascia repaint', '5-year exterior warranty'] },
                { plan: 'Full Estate', price: '$8,900', unit: 'starting / estate', features: ['Complete exterior system', 'Decorative siding options', 'Door & window detail work', '10-year warranty'] }
            ],
            meta: { duration: '4–8 days', coverage: 'Full exterior', rating: '4.8/5', warranty: '5–10 years' }
        },
        {
            id: 'wall-restoration',
            num: '03',
            icon: 'fa-solid fa-wand-magic-sparkles',
            title: 'Wall Restoration',
            short: 'Flawless drywall repair, crack mending, and surface rejuvenation to virgin-smooth state.',
            image: IMG.restoration,
            gallery: [IMG.restoration, IMG.interior2, IMG.blog8],
            desc: 'From hairline cracks and nail pops to water stains and crumbling plaster, we return walls to virgin-smooth condition. Our restoration crews feather edges, re-texture to match, and prime before your final colour goes on.',
            features: [
                'Drywall crack & hole repair',
                'Plaster lath restoration',
                'Water & smoke damage remediation',
                'Texture matching (orange peel, knockdown, skip)',
                'Mold-resistant primer sealing',
                'Level-5 smooth wall finishing'
            ],
            faqs: [
                { q: 'Can you match existing wall texture?', a: 'Yes. We sample and replicate orange peel, knockdown, skip trowel and custom textures to invisible seams.' },
                { q: 'Will cracks come back?', a: 'We use flexible mesh and crack-bridging compounds designed to move with the house structure, dramatically reducing recurrence.' },
                { q: 'Do you restore old plaster walls?', a: 'Absolutely — plaster is our specialty. We use lime-based materials that bond with historic substrates.' }
            ],
            pricing: [
                { plan: 'Patch & Repair', price: '$180', unit: 'starting / patch', features: ['Cracks, holes & nail pops', 'Spackle & sand to smooth', 'Colour-matched touch-up'] },
                { plan: 'Room Refresh', price: '$690', unit: 'starting / room', features: ['Full-room surface prep', 'Repaint 2 coats', 'Texture repair'] },
                { plan: 'Full Restoration', price: '$2,750', unit: 'starting / project', features: ['Whole-home restoration', 'Level-5 finishing', 'Primer + premium paint'] }
            ],
            meta: { duration: '1–3 days', coverage: 'Per room', rating: '4.9/5', warranty: '5 years' }
        },
        {
            id: 'designer-finishes',
            num: '04',
            icon: 'fa-solid fa-spray-can-sparkles',
            title: 'Designer Finishes',
            short: 'Venetian plaster, lime wash, Roman clay, and tactile textures that create organic depth.',
            image: IMG.designer,
            gallery: [IMG.designer, IMG.blog2, IMG.blog6],
            desc: 'Elevate walls beyond flat paint. Our artisans apply Venetian plaster, lime wash, Roman clay, and custom stencil and foil work — each finish layered by hand to create soft light-play, depth, and museum-grade character.',
            features: [
                'Authentic Venetian & Marmorino plaster',
                'Lime wash & Roman clay textures',
                'Faux marble, concrete & metal finishes',
                'Custom stencils, murals & accent foils',
                'Metallic & pearl glazes',
                'Artisan hand-application, no rollers'
            ],
            faqs: [
                { q: 'How durable are designer plaster finishes?', a: 'Lime and clay plasters are highly breathable and surprisingly durable — with proper sealing they last decades and can even be repaired invisibly.' },
                { q: 'Can you match a magazine photo?', a: 'Yes, we work from reference images and colour chips to recreate the exact texture and tone you love.' },
                { q: 'Are these finishes suitable for bathrooms?', a: 'With the right sealer, lime washes are excellent in humid spaces as they regulate moisture naturally.' }
            ],
            pricing: [
                { plan: 'Texture Feature', price: '$780', unit: 'starting / wall', features: ['Single accent wall texture', 'Premium glaze coat', 'Design consultation'] },
                { plan: 'Venetian Suite', price: '$2,400', unit: 'starting / room', features: ['Full-room Venetian plaster', '3-layer hand troweling', 'Polished wax seal'] },
                { plan: 'Bespoke Artwork', price: '$5,200', unit: 'starting / project', features: ['Custom mural or feature', 'Designer plaster systems', 'Dedicated master artisan'] }
            ],
            meta: { duration: '2–6 days', coverage: 'Per feature', rating: '5.0/5', warranty: '10 years' }
        },
        {
            id: 'surface-preparation',
            num: '05',
            icon: 'fa-solid fa-layer-group',
            title: 'Surface Preparation',
            short: 'Deep priming, power sanding, and anti-mold sealing ensuring maximum paint adhesion.',
            image: IMG.prep,
            gallery: [IMG.prep, IMG.blog9, IMG.blog4],
            desc: 'Great paint lives on great prep. Our crews power-sand, scrape, prime and seal every surface so coatings bond flawlessly — eliminating peeling, bubbles and early failure while extending your paint job’s life by years.',
            features: [
                'Power sanding & dust extraction',
                'Scrape, patch & prime system',
                'Anti-mold and anti-mildew sealing',
                'Deglossing for previously painted walls',
                'Caulking & gap filling',
                'Bonding primers for glossy surfaces'
            ],
            faqs: [
                { q: 'Why is prep so expensive?', a: 'Prep is 60–70% of a lasting paint job. Skipping it is why cheap paint jobs peel within a year. Our prep protects your investment.' },
                { q: 'Do you sand ceilings too?', a: 'Yes, we sand and de-gloss ceilings and repair any texture damage before priming.' },
                { q: 'Can you remove old wallpaper?', a: 'We strip wallpaper and prepare the raw wall underneath to a smooth, paint-ready state.' }
            ],
            pricing: [
                { plan: 'Quick Prep', price: '$350', unit: 'starting / room', features: ['Wash & light sand', 'Patch minor damage', 'Single primer coat'] },
                { plan: 'Full Prep', price: '$980', unit: 'starting / room', features: ['Power sand & repair', 'Mold seal treatment', '2 primer coats'] },
                { plan: 'Strip & Prep', price: '$2,200', unit: 'starting / project', features: ['Wallpaper stripping', 'Full skim repair', 'Bonding primer system'] }
            ],
            meta: { duration: '1–3 days', coverage: 'Per room', rating: '4.8/5', warranty: '5 years' }
        },
        {
            id: 'cabinet-staining',
            num: '06',
            icon: 'fa-solid fa-cabinet-filing',
            title: 'Cabinet & Wood Staining',
            short: 'Factory-grade spray finishes that rejuvenate kitchen cabinets and hardwood trims.',
            image: IMG.cabinet,
            gallery: [IMG.cabinet, IMG.blog6, IMG.interior2],
            desc: 'Renew your kitchen without a full remodel. We spray cabinets and trims with catalyzed, factory-grade finishes in your choice of stain or opaque colour — delivered in a dust-free, sprayed environment that cures to a tough, wipeable shell.',
            features: [
                'Dust-free spray booth finishing',
                'Catalyzed urethane & lacquer systems',
                'Custom stain matching to any tone',
                'Door removal, rework & hardware reinstall',
                'Interior & drawer finishing options',
                '5-year abrasion warranty'
            ],
            faqs: [
                { q: 'Do you remove the cabinet doors?', a: 'Yes — doors and drawers are removed, sprayed in our mobile dust-free booth, and re-hung with new hardware.' },
                { q: 'How long does cabinet spraying take?', a: 'A standard kitchen takes 4–6 days including curing. You can keep using the kitchen throughout.' },
                { q: 'Can you make my dated oak look modern?', a: 'Absolutely — we can spray a modern matte tone or stain down to a contemporary driftwood or walnut finish.' }
            ],
            pricing: [
                { plan: 'Colour Refresh', price: '$2,100', unit: 'starting / kitchen', features: ['All doors & drawer fronts', '2-coat catalyzed finish', 'New hardware install'] },
                { plan: 'Two-Tone', price: '$3,400', unit: 'starting / kitchen', features: ['Upper / lower two-tone', 'Interior + exterior finish', 'Soft-close hardware'] },
                { plan: 'Full Cabinetry', price: '$6,800', unit: 'starting / project', features: ['Cabinets + trim + island', 'Custom color matching', '5-year warranty'] }
            ],
            meta: { duration: '4–6 days', coverage: 'Full kitchen', rating: '4.9/5', warranty: '5 years' }
        },
        {
            id: 'commercial-painting',
            num: '07',
            icon: 'fa-solid fa-building',
            title: 'Commercial Painting',
            short: 'Fast, low-disruption coatings for offices, retail, hospitality and multi-family buildings.',
            image: IMG.commercial,
            gallery: [IMG.commercial, IMG.blog7, IMG.blog5],
            desc: 'Minimal downtime, maximum polish. We paint offices, retail floors, restaurants and multi-family exteriors overnight and on weekends, with full liability coverage, colour branding accuracy, and OSHA-compliant site safety.',
            features: [
                'After-hours & weekend scheduling',
                'Color branding accuracy (PMS matching)',
                'Scaffold & lift certified crews',
                'Full liability & worker’s comp insurance',
                'High-traffic scuff-resistant coatings',
                'Multi-site rollout management'
            ],
            faqs: [
                { q: 'Can you work outside business hours?', a: 'Yes, most of our commercial work happens evenings and weekends to keep your business running.' },
                { q: 'Do you handle multi-location rollouts?', a: 'We manage coordinated multi-site rollouts with dedicated project managers and colour QA on every store.' },
                { q: 'Are you licensed and insured?', a: 'Fully — including general liability, worker’s comp, and performance bonds for larger contracts.' }
            ],
            pricing: [
                { plan: 'Store Refresh', price: '$2,800', unit: 'starting / location', features: ['Walls & ceilings', 'Brand colour matching', 'Weekend schedule'] },
                { plan: 'Office Suite', price: '$6,500', unit: 'starting / suite', features: ['Full fit-out painting', 'After-hours access', 'New-hire ready finish'] },
                { plan: 'Portfolio Rollout', price: '$25,000', unit: 'starting / project', features: ['Multi-site program', 'Dedicated PM', 'Sliding volume pricing'] }
            ],
            meta: { duration: 'Per site', coverage: 'Flexible', rating: '4.8/5', warranty: '3–10 years' }
        },
        {
            id: 'faux-decorative',
            num: '08',
            icon: 'fa-solid fa-palette',
            title: 'Faux & Decorative Painting',
            short: 'Rag rolling, color washing, stenciling, and metallic glazes that add instant character.',
            image: IMG.blog2,
            gallery: [IMG.blog2, IMG.designer, IMG.blog6],
            desc: 'Classic faux techniques meet modern restraint. Rag rolling, colour washing, sponging, stenciling and metallic glazes add depth and texture to bedrooms, dining rooms and feature walls — finished to match your style exactly.',
            features: [
                'Rag rolling & colour washing',
                'Metallic & pearl glaze work',
                'Custom stenciling & borders',
                'Sponging & suede finishes',
                'Ceiling & cove treatments',
                'Protective clear topcoats'
            ],
            faqs: [
                { q: 'Will faux finishes look dated?', a: 'We focus on subtle, contemporary executions. Colour washed walls with soft glazes look current and timeless rather than 90s-heavy.' },
                { q: 'Can I request a trial wall first?', a: 'Yes — we recommend a 4×4 ft sample area so you can live with the finish before we commit the full room.' },
                { q: 'How do I clean textured walls?', a: 'Most finishes receive a clear matte or satin topcoat, making them safe to gently wipe with a damp cloth.' }
            ],
            pricing: [
                { plan: 'Feature Wall', price: '$520', unit: 'starting / wall', features: ['1–2 colour glaze', 'Protective topcoat', 'Sample square included'] },
                { plan: 'Dining Suite', price: '$1,400', unit: 'starting / room', features: ['Full-room glaze', 'Ceiling cove detail', 'Designer consultation'] },
                { plan: 'Grand Décor', price: '$3,600', unit: 'starting / project', features: ['Multi-room program', 'Custom stencil design', 'Master artisan lead'] }
            ],
            meta: { duration: '1–4 days', coverage: 'Per room', rating: '4.9/5', warranty: '10 years' }
        },
        {
            id: 'color-consultation',
            num: '09',
            icon: 'fa-solid fa-magnifying-glass-chart',
            title: 'Color Consultation',
            short: 'Psychology-driven color selection, light mapping, and finish guidance from certified stylists.',
            image: IMG.consultation,
            gallery: [IMG.consultation, IMG.blog1, IMG.interior],
            desc: 'Never guess a colour again. Our certified color stylists map natural and artificial light across your rooms, analyze your furniture and mood goals, then deliver a full specification sheet — including exact paint codes and sheen for every surface.',
            features: [
                'In-home light mapping & orientation study',
                'Personal palette development',
                'Exact paint codes (all major brands)',
                'Sheen & finish selection guidance',
                'Furniture & décor coordination',
                'Virtual preview renders before you buy'
            ],
            faqs: [
                { q: 'Do you come to my home?', a: 'Yes — on-site consultations take 60–90 minutes and cover every room you plan to paint.' },
                { q: 'What if I have digital only access?', a: 'We offer virtual consultations over video call with full light-analysis guidance and swatch boards shipped to you.' },
                { q: 'Do I get the color codes?', a: 'You receive a full spec sheet with exact colour codes across Benjamin Moore, Sherwin-Williams, Dulux, and Behr.' }
            ],
            pricing: [
                { plan: 'Quick Picks', price: '$149', unit: 'single room', features: ['30-min session', '3 colour suggestions', 'Sheen guidance'] },
                { plan: 'Home Palette', price: '$389', unit: 'whole home', features: ['On-site walkthrough', 'Full spec sheet', 'Light mapping report'] },
                { plan: 'Designer Retainer', price: '$950', unit: 'per project', features: ['Virtual previews', 'Furniture coordination', 'Ongoing support'] }
            ],
            meta: { duration: '1–2 hours', coverage: 'Whole home', rating: '5.0/5', warranty: '30-day adjust' }
        }
    ];

    /* ==================================================================
       BLOG POSTS
    ================================================================== */
    function author(name, avatar) {
        return { name: name, role: 'RoyPainter Expert', avatar: AVATARS[avatar] };
    }

    var POSTS = [
        {
            id: 'setup-guide',
            category: 'Guides',
            title: 'The Complete Room Prep Guide Before Painters Arrive',
            excerpt: 'A room-by-room checklist that saves time, protects your furniture and guarantees a flawless finish on day one.',
            image: IMG.blog1,
            author: author('Maya Collins', 'a'),
            date: '2026-08-06',
            readTime: '7 min read',
            tags: ['Preparation', 'Tips', 'DIY'],
            content: [
                { type: 'p', text: 'The difference between a great paint job and an average one is rarely the paint itself — it is almost always the preparation. Walk with us through a room-by-room checklist our crews wish every client knew before we arrive.' },
                { type: 'h2', text: 'Clear the Room, or Clear the Floors' },
                { type: 'p', text: 'Move furniture to the centre and drape it, or push everything into one room. The more working room our painters have, the faster and cleaner your job will be. If a piece cannot move, our HEPA-wrapped protective coverings will still keep it dust-free.' },
                { type: 'list', items: ['Remove wall art, nails, screws and curtain rods', 'Unplug and protect electronics', 'Box up fragile items and shelves', 'Vacuum the room before we start'] },
                { type: 'h2', text: 'Patch and Fill the Small Stuff' },
                { type: 'p', text: 'You do not need to fix every dent yourself — but marking trouble spots saves time. Use painter’s tape to flag cracks, chips and nail pops so our restoration crew can patch them in the first pass.' },
                { type: 'quote', text: 'Preparation is 70% of a lasting paint job. A perfect wall is born in the sanding, not the spraying.' },
                { type: 'h2', text: 'The 48-Hour Window' },
                { type: 'p', text: 'Schedule your paint day for a window with 48 hours of clear weather for exterior work and ventilate interior rooms. Let us know your timeline so we can plan coats and curing around it.' },
                { type: 'callout', title: 'Pro Tip', text: 'Keep a sealed "touch-up" tin of your final colour. Walls get scuffed in real life — a matching tin means five-minute fixes forever after.' },
                { type: 'h2', text: 'When to Skip Prep and Hire Us' },
                { type: 'p', text: 'Level-5 smooth walls, wallpaper removal, and water-damaged plaster are expert territory. Our prep and restoration teams handle them invisibly — usually faster than you would expect.' }
            ]
        },
        {
            id: 'color-trends-2026',
            category: 'Trends',
            title: 'Color Trends 2026: Earthy, Warm & Full of Character',
            excerpt: 'From terracotta to deep botanical greens — the palettes defining modern interiors this year.',
            image: IMG.blog2,
            author: author('Liam Foster', 'b'),
            date: '2026-07-29',
            readTime: '6 min read',
            tags: ['Color', 'Trends', 'Design'],
            content: [
                { type: 'p', text: 'The flat-grey era is officially over. 2026 interiors are warmer, braver and more personal — think sun-baked terracotta, olive and sage greens, moody plums and the return of statement dark rooms.' },
                { type: 'h2', text: 'Terracotta & Burnt Clay' },
                { type: 'p', text: 'Our single most requested palette this year. Terracotta walls read warm in daylight and dramatic at dusk, pairing beautifully with linen, oak and brass. Try a full room in warm clay or just a single feature wall for a softer step.' },
                { type: 'h2', text: 'Deep Botanical Greens' },
                { type: 'p', text: 'Hunter, sage and eucalyptus greens ground a space and make art pop. In low-light studies or bedrooms, deep green feels cocooning and expensive.' },
                { type: 'list', items: ['Sage Serenity for bright kitchens', 'Forest depths for studies', 'Eucalyptus for calm bedrooms'] },
                { type: 'h2', text: 'Moody Slate & Plum' },
                { type: 'p', text: 'Darker rooms are trending hard. Modern slate and velvet plum walls create cosy, focused spaces — especially in media rooms and dining areas where evening lighting does the heavy lifting.' },
                { type: 'quote', text: 'Colour is the cheapest renovation you will ever do. A wall of terracotta is worth more than a room of new furniture.' },
                { type: 'callout', title: 'Try It Risk-Free', text: 'Book our 4×4 sample square service. Live with a colour for a week before committing — we include the sample in every consultation.' }
            ]
        },
        {
            id: 'choosing-sheen',
            category: 'Guides',
            title: 'Flat, Eggshell or Satin? The Honest Sheen Guide',
            excerpt: 'Never guess again — match the right finish to the right room with this practical breakdown.',
            image: IMG.blog3,
            author: author('Sofia Reyes', 'c'),
            date: '2026-07-18',
            readTime: '5 min read',
            tags: ['Sheen', 'Paint', 'Guides'],
            content: [
                { type: 'p', text: 'Sheen is the paint’s reflective gloss level — and it determines both how a wall looks and how well it survives real life. Here is the cheat sheet we hand to every client.' },
                { type: 'h2', text: 'Flat / Matte (0–10% sheen)' },
                { type: 'p', text: 'Velvety, light-absorbing and the best at hiding wall imperfections. Perfect for low-traffic living rooms and ceilings — but not for sticky fingers or kitchen splashes.' },
                { type: 'h2', text: 'Eggshell (10–25% sheen)' },
                { type: 'p', text: 'The modern all-rounder. Slight washability with a soft, low-glare glow. Our default recommendation for most bedrooms and hallways.' },
                { type: 'h2', text: 'Satin / Pearl (25–40% sheen)' },
                { type: 'list', items: ['Kitchens & bathrooms — wipe-clean friendly', 'Doors, trims and moldings', 'High-traffic corridors', 'Kids’ rooms (worth the extra scrubbability)'] },
                { type: 'h2', text: 'Semi-Gloss & Gloss (40%+ sheen)' },
                { type: 'p', text: 'Reserved for doors, trims and cabinetry where durability and drama matter. Semi-gloss cleans like glass and highlights every imperfection — keep it off large walls.' },
                { type: 'quote', text: 'The best sheen is the one that matches the room’s life, not the showroom’s lighting.' }
            ]
        },
        {
            id: 'diy-vs-pro',
            category: 'Insights',
            title: 'DIY vs Pro Painter: The True Cost of a Weekend Project',
            excerpt: 'We crunched the numbers on supplies, time, rework and resale — the results may surprise you.',
            image: IMG.blog4,
            author: author('Derek Holt', 'd'),
            date: '2026-07-05',
            readTime: '8 min read',
            tags: ['Budget', 'Insights'],
            content: [
                { type: 'p', text: 'A can of paint costs $40 and YouTube is free — so why does anyone hire a pro? Because a "weekend project" rarely ends on Sunday. Here is the honest math.' },
                { type: 'h2', text: 'The Hidden Supply Bill' },
                { type: 'list', items: ['Premium paint: $45–$90 per gallon', 'Primer, trays, rollers, tape, drop cloths', 'Sanding blocks, spackle, caulk', 'Ladder, extension poles, cleaning supplies'] },
                { type: 'p', text: 'By the time you buy everything you need for one room, you are often $250+ in — before making your first mistake.' },
                { type: 'h2', text: 'The Time Trap' },
                { type: 'p', text: 'Prep alone eats 60% of a job’s time. Weekend warriors average 12–18 hours per room across multiple weekends. Our teams do the same room to a higher standard in a single day.' },
                { type: 'h2', text: 'The Rework Factor' },
                { type: 'p', text: 'Roller marks, laps and drips send most first-timers back to the store for another coat — and often to a painter anyway. "Cheap" DIY regularly ends up costing more than hiring us from the start.' },
                { type: 'quote', text: 'You are not paying for paint. You are paying for the 200 times we have done it before.' },
                { type: 'callout', title: 'The Verdict', text: 'Small touch-ups? DIY away. A full room, wall repair or exteriors? The numbers and the finish both favour a professional crew.' }
            ]
        },
        {
            id: 'eco-paints-guide',
            category: 'Sustainability',
            title: 'Eco Paint Guide: Low-VOC, Natural and Zero-Chemical Options',
            excerpt: 'Breathable, washable and kind to your air — the truth about eco-friendly paints in 2026.',
            image: IMG.blog5,
            author: author('Maya Collins', 'a'),
            date: '2026-06-22',
            readTime: '6 min read',
            tags: ['Eco', 'Health', 'Guides'],
            content: [
                { type: 'p', text: 'Eco paints have come a long way. Modern low-VOC formulas match conventional paints for durability while keeping indoor air cleaner — important for nurseries, allergy sufferers and tight homes.' },
                { type: 'h2', text: 'Low-VOC vs Zero-VOC' },
                { type: 'p', text: 'Low-VOC means under 50g/L of volatile organic compounds; zero-VOC formulations drop under 5g/L. Either is safe to sleep in the same night when ventilation is decent — but zero-VOC is the gold standard for nurseries.' },
                { type: 'h2', text: 'Natural Paints (Clay, Lime & Mineral)' },
                { type: 'list', items: ['Clay & chalk paints — matte, breathable, textured', 'Lime washes — antibacterial and humidity-regulating', 'Mineral silicate paints — binder-bond to masonry', 'Milk paint — vintage matte, fully biodegradable'] },
                { type: 'h2', text: 'Washability Myth' },
                { type: 'p', text: 'Older eco paints scuffed easily. Current-generation low-VOC acrylics and mineral hybrids scrub like conventional premium lines — we test every product we install.' },
                { type: 'quote', text: 'Healthy walls are made of healthy materials. Breathability is as important as beauty.' },
                { type: 'callout', title: 'Our Promise', text: 'Every RoyPainter job offers an eco upgrade path at no labour premium — we only charge the paint difference.' }
            ]
        },
        {
            id: 'accent-walls',
            category: 'Design',
            title: 'Accent Walls That Actually Work (And 3 to Skip)',
            excerpt: 'The geometry, scale and colour rules designers use to make feature walls feel intentional.',
            image: IMG.blog6,
            author: author('Sofia Reyes', 'c'),
            date: '2026-06-08',
            readTime: '5 min read',
            tags: ['Design', 'Accent Walls'],
            content: [
                { type: 'p', text: 'A feature wall should feel like the room’s centrepiece, not a surprise. Here are the rules of thumb we apply in every accent wall project.' },
                { type: 'h2', text: 'Pick the Right Wall' },
                { type: 'list', items: ['The wall you face from the room’s main seat', 'The wall behind the bed or sofa', 'A wall with architectural features (fireplace, shelving)', 'Long walls that pull the eye through a corridor'] },
                { type: 'h2', text: 'Colour That Earns Its Place' },
                { type: 'p', text: 'Go 2–3 shades darker than the base colour for depth, or fully saturated for drama. Avoid painting a tiny wall a huge colour — scale matters as much as hue.' },
                { type: 'h2', text: 'The Three to Skip' },
                { type: 'p', text: 'The TV wall (screens already anchor the room), a wall behind tall wardrobes you never see, and every wall in a busy pattern room. One feature, not three.' },
                { type: 'quote', text: 'An accent wall is punctuation — one strong mark, not a paragraph.' }
            ]
        },
        {
            id: 'weatherproofing-exterior',
            category: 'Maintenance',
            title: 'Exterior Weatherproofing: Protect Your Home Before Winter',
            excerpt: 'Caulking, elastomeric coatings and moisture checks that stop small cracks becoming big bills.',
            image: IMG.blog7,
            author: author('Derek Holt', 'd'),
            date: '2026-05-27',
            readTime: '7 min read',
            tags: ['Exterior', 'Maintenance'],
            content: [
                { type: 'p', text: 'Every winter, water finds a way in. A missed crack this autumn becomes a peeling wall, rotting fascia or mould patch by spring. Here is our pre-winter checklist.' },
                { type: 'h2', text: 'The Inspection Walk' },
                { type: 'list', items: ['Check siding seams, window and door frames', 'Look for blistering or peeling paint (moisture trapped)', 'Feel for soft, spongy wood', 'Inspect gutters and downspout routing', 'Check caulking around all penetrations'] },
                { type: 'h2', text: 'Seal Everything' },
                { type: 'p', text: 'Professional-grade silicone caulk on every seam beats a cheap tube from the hardware store — it flexes with temperature swings and bonds for a decade, not a season.' },
                { type: 'h2', text: 'Elastomeric Coatings' },
                { type: 'p', text: 'For stucco and masonry, elastomeric paints bridge hairline cracks and shed rain like a jacket. It is the single best investment for moisture-prone exteriors.' },
                { type: 'quote', text: 'Caulk is the cheapest insurance policy your home will ever have.' },
                { type: 'callout', title: 'Free Check', text: 'Book a spring or autumn inspection — we walk the property with you and hand over a photographed condition report, no charge.' }
            ]
        },
        {
            id: 'paint-fails-fix',
            category: 'Tips',
            title: '7 Common Paint Fails and Exactly How to Fix Them',
            excerpt: 'Crazing, peeling, brush marks — the culprits behind ugly walls and the straight-forward cures.',
            image: IMG.blog8,
            author: author('Liam Foster', 'b'),
            date: '2026-05-12',
            readTime: '6 min read',
            tags: ['Tips', 'Repair'],
            content: [
                { type: 'p', text: 'Most paint problems are symptoms of prep, humidity or timing — and most are fixable. Here is how to read the symptoms.' },
                { type: 'h2', text: 'Peeling & Blistering' },
                { type: 'p', text: 'Cause: moisture or painting over a glossy surface. Fix: strip to sound surface, prime with bonding primer, repaint in dry weather.' },
                { type: 'h2', text: 'Brush & Roller Marks' },
                { type: 'list', items: ['Cause: over-brushing or wrong nap length', 'Fix: paint wet-to-wet, use the correct roller cover', 'Level-5 finish if marks are deep'] },
                { type: 'h2', text: 'Crazing (Alligator Skin)' },
                { type: 'p', text: 'Cause: incompatible layers or painting in extreme heat. Fix: sand back to the stable layer, seal, and repaint with matched chemistry.' },
                { type: 'h2', text: 'Efflorescence' },
                { type: 'p', text: 'The white powder on masonry — a moisture issue, not a paint issue. Treat the damp first, then apply a masonry-sealing primer.' },
                { type: 'quote', text: 'Every fail has a root cause. Fix the cause, and the finish finally stays.' }
            ]
        },
        {
            id: 'cost-estimator-guide',
            category: 'Guides',
            title: 'How Much Does Painting Really Cost? Your Estimator Guide',
            excerpt: 'Square footage, prep, sheen and geography — the four variables that move any quote.',
            image: IMG.blog9,
            author: author('Maya Collins', 'a'),
            date: '2026-04-28',
            readTime: '7 min read',
            tags: ['Pricing', 'Guides'],
            content: [
                { type: 'p', text: 'Painting prices swing wildly because four variables dominate the math. Understand them and you will read any quote like a pro.' },
                { type: 'h2', text: '1. Square Footage & Ceilings' },
                { type: 'p', text: 'We price by paintable surface, not floor area. Vaulted ceilings, stairwells and tall walls add labour time you should expect reflected in the quote.' },
                { type: 'h2', text: '2. Condition & Prep' },
                { type: 'list', items: ['Fresh drywall: cheapest, fastest', 'Repaint over matte: quick', 'Glossy, patched or textured: extra prep time', 'Wallpaper stripping: major line item'] },
                { type: 'h2', text: '3. Paint Grade & Sheen' },
                { type: 'p', text: 'Premium brands cost more per gallon but cover better and last longer — often the cheaper choice over a decade.' },
                { type: 'h2', text: '4. Access & Schedule' },
                { type: 'p', text: 'Two-storey exteriors, weekend-only access and rush timelines all add to the labour. Overnight commercial access is its own category.' },
                { type: 'quote', text: 'A quote is a story about your house. Read the details, not just the number.' },
                { type: 'callout', title: 'Estimate It Now', text: 'Use our interactive estimator on the homepage or contact page to get an instant ballpark before you talk to anyone.' }
            ]
        }
    ];

    function getService(id) {
        return SERVICES.find(function (s) { return s.id === id; }) || null;
    }
    function getPost(id) {
        return POSTS.find(function (s) { return s.id === id; }) || null;
    }
    function categories() {
        var seen = {};
        POSTS.forEach(function (p) { seen[p.category] = true; });
        return Object.keys(seen);
    }

    return {
        SERVICES: SERVICES,
        POSTS: POSTS,
        getService: getService,
        getPost: getPost,
        categories: categories
    };
})();
