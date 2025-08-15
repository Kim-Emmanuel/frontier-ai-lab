// Main JS file for site-wide scripts
 // Timezones
    const elLon = document.getElementById('time-lon');
    const elAkl = document.getElementById('time-akl');
    function formatWithOffset(timeZone) {
        try {
            const withOffset = new Intl.DateTimeFormat('en-GB', {
                timeZone, hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'shortOffset'
            }).format(new Date());
            return withOffset.replace(',', '');
        } catch {
            return new Intl.DateTimeFormat('en-GB', {
                timeZone, hour: '2-digit', minute: '2-digit', hour12: false
            }).format(new Date());
        }
    }
    function tick() {
        elLon.textContent = formatWithOffset('Europe/London');
        elAkl.textContent = formatWithOffset('Pacific/Auckland');
    }
    tick(); setInterval(tick, 30_000);

    // Chips interactivity
    function initChips(groupId, outputId) {
        const group = document.getElementById(groupId);
        const out = document.getElementById(outputId);
        group.addEventListener('click', (e) => {
            const btn = e.target.closest('.chip');
            if (!btn) return;
            [...group.querySelectorAll('.chip')].forEach(c => { c.classList.remove('active'); c.setAttribute('aria-selected','false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-selected','true');
            if (out) out.textContent = btn.dataset.value;
        });
    }
    initChips('chips-region', 'regionOut');
    initChips('chips-comm', 'commOut');

    // Reveal on scroll
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));

    // Testimonial rotator
    const quotes = [
        { q: "“They move fast without compromising ethics or craft — the ideal partner for AI in customer experience.”", b: "CX Director, Global Retail" },
        { q: "“Clear strategy, beautiful execution, measurable outcomes. Our support metrics improved in weeks.”", b: "VP Support, Enterprise SaaS" },
        { q: "“A rare mix of technical depth and brand sensibility. The team nailed our voice.”", b: "Head of Product Design, Fintech" }
    ];
    let qi = 0;
    const qEl = document.getElementById('quoteText');
    const bEl = document.getElementById('quoteByline');
    setInterval(() => {
        qi = (qi + 1) % quotes.length;
        qEl.textContent = quotes[qi].q;
        bEl.textContent = quotes[qi].b;
    }, 6000);

    // Contact form validation + feedback
    const form = document.getElementById('contactForm');
    const formHelp = document.getElementById('formHelp');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formHelp.textContent = '';
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const region = form.region.value;
        const message = form.message.value.trim();
        let error = '';
        if (!name) error = 'Please enter your name.';
        else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) error = 'Please enter a valid email address.';
        else if (!message) error = 'Please enter a brief for your project.';
        if (error) {
            formHelp.textContent = error;
            formHelp.style.color = 'var(--accent)';
            return;
        }
        formHelp.textContent = 'Thank you! Your inquiry has been sent. We’ll reply within 2 business days.';
        formHelp.style.color = 'var(--muted)';
        form.reset();
    });

    // Set copyright year
    document.getElementById('year').textContent = new Date().getFullYear();