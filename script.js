document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. SECTION REVEAL ON SCROLL
       ========================================================= */
    const sections = document.querySelectorAll('section');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    sections.forEach(section => revealObserver.observe(section));


    /* =========================================================
       2. STAGGERED REVEAL FOR SKILLS / PROJECT CARDS
       Adds a small incremental delay to each child so they
       cascade in rather than popping in all at once.
       ========================================================= */
    const staggerGroups = document.querySelectorAll('.skills-grid, .projects-grid');

    staggerGroups.forEach(group => {
        const items = group.children;
        Array.from(items).forEach((item, i) => {
            item.style.transitionDelay = `${i * 0.08}s`;
            item.classList.add('stagger-item');
        });
    });

    // Re-use the same observer logic so stagger-items fade in with their parent section
    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('stagger-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stagger-item').forEach(item => staggerObserver.observe(item));


    /* =========================================================
       3. NAVBAR: shrink + shadow on scroll
       ========================================================= */
    const navbar = document.getElementById('navbar');

    const handleNavbarScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });


    /* =========================================================
       4. ACTIVE NAV LINK ON SCROLL
       ========================================================= */
    const navLinks = document.querySelectorAll('.nav-menu a');

    const linkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const matchingLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
            if (!matchingLink) return;

            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                matchingLink.classList.add('active-link');
            }
        });
    }, { threshold: 0.4, rootMargin: "-80px 0px -40% 0px" });

    sections.forEach(section => {
        if (section.id) linkObserver.observe(section);
    });


    /* =========================================================
       5. MOBILE HAMBURGER MENU
       ========================================================= */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburger.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close the menu once a link is tapped
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }


    /* =========================================================
       6. BACK TO TOP BUTTON
       ========================================================= */
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        const toggleBackToTop = () => {
            backToTop.classList.toggle('show', window.scrollY > 500);
        };
        toggleBackToTop();
        window.addEventListener('scroll', toggleBackToTop, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* =========================================================
       7. TILT EFFECT ON PROJECT CARDS
       Subtle mouse-follow tilt for a more premium feel.
       ========================================================= */
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `translateY(-10px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
