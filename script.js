document.addEventListener('DOMContentLoaded', () => {

    // Create Spotlight Element
    const spotlight = document.createElement('div');
    spotlight.id = 'spotlight';
    document.body.appendChild(spotlight);

    // Mouse Move Event for Spotlight & Parallax
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Update Spotlight Position
        spotlight.style.setProperty('--mouse-x', `${x}px`);
        spotlight.style.setProperty('--mouse-y', `${y}px`);

        // Parallax Effect for Hero Background
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            const xOffset = (window.innerWidth / 2 - x) / 50;
            const yOffset = (window.innerHeight / 2 - y) / 50;
            heroBg.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1.05)`;
        }

        // Subtle Tilt Effect for Cards
        const cards = document.querySelectorAll('.card, .menu-item, .step-content');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;

            // Only apply if mouse is near the card
            if (Math.abs(x - cardX) < 300 && Math.abs(y - cardY) < 300) {
                const tiltX = (y - cardY) / 20;
                const tiltY = (cardX - x) / 20;
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            }
        });
    });

    // Create Starfield (Subtle)
    const starfield = document.createElement('div');
    starfield.id = 'starfield';
    document.body.prepend(starfield);

    const starCount = 100; // Reduced count
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 2}px`;
        star.style.height = star.style.width;
        star.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        star.style.borderRadius = '50%';
        star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`;
        starfield.appendChild(star);
    }

    // Add Twinkle Keyframes
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
        }
    `;
    document.head.appendChild(styleSheet);

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Keep observing for replay if needed, or unobserve
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .slide-content');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
