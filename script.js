document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.querySelectorAll('.nav-item.dropdown').forEach(item => item.classList.remove('show'));
        });
    });

    // Mobile dropdown toggles
    if (dropdownToggles.length) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const parent = toggle.closest('.nav-item.dropdown');
                if (window.innerWidth <= 768 && parent) {
                    e.preventDefault();
                    const alreadyOpen = parent.classList.contains('show');
                    document.querySelectorAll('.nav-item.dropdown').forEach(item => item.classList.remove('show'));
                    if (!alreadyOpen) {
                        parent.classList.add('show');
                    }
                }
            });
        });
    }

    // Close mobile nav when selecting dropdown links
    if (dropdownLinks.length) {
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    hamburger?.classList.remove('active');
                    navMenu?.classList.remove('active');
                    document.querySelectorAll('.nav-item.dropdown').forEach(item => item.classList.remove('show'));
                }
            });
        });
    }

// Smooth scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70; // Height of fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            if (navbar) navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else if (navbar) {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            alert(`Thank you for your message, ${name}! We'll get back to you soon at ${email}.`);
            contactForm.reset();
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all service cards and other elements
    document.querySelectorAll('.service-card, .contact-item, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Add active state to navigation links based on scroll position (keep bright)
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.style.color = '#cbd5e1';
                });
                if (navLink) {
                    navLink.style.color = '#00ffff';
                }
            }
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });

// Counter animation for stats
    const animateCounter = (element, target) => {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };

// Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = document.querySelectorAll('.stat h4');
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Interactive timeline cards
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineItems.length) {
        timelineItems.forEach(item => {
            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                timelineItems.forEach(entry => entry.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                    item.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
                }
            });
        });
    }

    // Hero video play on click with overlay
    const heroVideo = document.getElementById('h2r-video');
    const heroWrapper = document.querySelector('.hero-video-wrapper');
    const heroOverlay = document.querySelector('.hero-video-overlay');
    if (heroVideo) {
        const hideOverlay = () => heroOverlay?.classList.add('hidden');
        const showOverlay = () => heroOverlay?.classList.remove('hidden');
        const ensurePlay = () => {
            hideOverlay();
            try {
                heroVideo.play().catch(() => {
                    showOverlay();
                });
            } catch (e) {
                console.warn('Video play failed', e);
                showOverlay();
            }
        };
        heroWrapper?.addEventListener('click', ensurePlay);
        heroOverlay?.addEventListener('click', ensurePlay);
        heroVideo.addEventListener('click', ensurePlay);
        heroVideo.addEventListener('play', hideOverlay);
        heroVideo.addEventListener('pause', showOverlay);
        heroVideo.addEventListener('ended', showOverlay);
        heroVideo.addEventListener('loadedmetadata', () => {
            heroVideo.setAttribute('controls', 'controls');
            showOverlay();
        });
    }

    // Hyperconnection glow following the cursor
    const hyperBg = document.createElement('div');
    hyperBg.className = 'hyper-bg';
    document.body.prepend(hyperBg);
    const updateGlow = (e) => {
        document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
        document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', updateGlow);
    // Initialize center
    document.documentElement.style.setProperty('--mx', '50%');
    document.documentElement.style.setProperty('--my', '50%');

    // Floating info button (not in menu) — hide on info page itself
    const isInfoPage = window.location.pathname.endsWith('info.html');
    if (!isInfoPage) {
        const infoBtn = document.createElement('a');
        infoBtn.href = 'info.html';
        infoBtn.className = 'info-fab';
        infoBtn.setAttribute('aria-label', 'Information');
        infoBtn.textContent = '𝐢';
        document.body.appendChild(infoBtn);
    }

    // Highlight reference target when linked with #ref
    if (isInfoPage && window.location.hash.startsWith('#ref')) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.classList.add('ref-highlight');
            setTimeout(() => target.classList.remove('ref-highlight'), 3000);
        }
    }

    // Swap card (Isothiourea/Thiourea) toggle
    const swapCard = document.querySelector('.swap-card');
    const swapToggle = document.querySelector('.swap-toggle');

    if (swapCard && swapToggle) {
        const triggerLaser = () => {
            swapCard.classList.add('laser');
            setTimeout(() => swapCard.classList.remove('laser'), 600);
        };

        swapToggle.addEventListener('click', () => {
            swapCard.classList.toggle('alt');
            triggerLaser();
        });
    }

    console.log('Website loaded successfully! 🚀');
});

