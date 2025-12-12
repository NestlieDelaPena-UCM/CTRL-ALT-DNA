// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initAnimations();
    initParallax();
    initStats();
    consoleEasterEgg();
});

// ==========================================
// SCROLL EFFECTS
// ==========================================
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(255, 255, 255, 0.8)';
        }

        lastScroll = currentScroll;
    });
}

// ==========================================
// INTERSECTION OBSERVER ANIMATIONS
// ==========================================
function initAnimations() {
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

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe CTA section
    const ctaContainer = document.querySelector('.cta-container');
    if (ctaContainer) {
        ctaContainer.style.opacity = '0';
        ctaContainer.style.transform = 'scale(0.95)';
        ctaContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(ctaContainer);
    }
}

// ==========================================
// PARALLAX EFFECT
// ==========================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const blobs = document.querySelectorAll('.blob');
        const floatingIcons = document.querySelectorAll('.floating-icon');
        const molecules = document.querySelectorAll('.molecule');
        const dnaStrands = document.querySelectorAll('.floating-dna');
        
        // Parallax for blobs
        blobs.forEach((blob, index) => {
            const speed = 0.2 + (index * 0.1);
            blob.style.transform = `translate(${scrolled * speed * 0.5}px, ${scrolled * speed}px)`;
        });

        // Parallax for floating icons
        floatingIcons.forEach((icon, index) => {
            const speed = 0.15 + (index * 0.05);
            icon.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Parallax for molecules
        molecules.forEach((molecule, index) => {
            const speed = 0.3 + (index * 0.1);
            const rotation = scrolled * 0.1;
            molecule.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
        });

        // Parallax for DNA strands
        dnaStrands.forEach((dna, index) => {
            const speed = 0.25 + (index * 0.08);
            dna.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==========================================
// INTERACTIVE FLOATING ELEMENTS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Make floating icons interactive on hover
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });

    // Random movement for molecules
    const molecules = document.querySelectorAll('.molecule');
    
    molecules.forEach((molecule, index) => {
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            const currentTransform = molecule.style.transform || '';
            
            if (!currentTransform.includes('translate(')) {
                molecule.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            }
        }, 3000 + index * 1000);
    });
});

// ==========================================
// ANIMATED STATS COUNTER
// ==========================================
function initStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });
}

function animateNumber(element) {
    const text = element.textContent;
    
    // Skip if it's not a number or contains special characters like ∞
    if (text === '∞' || isNaN(parseInt(text))) {
        return;
    }

    const endValue = parseInt(text);
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    function update() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);
        const currentValue = Math.floor(easeOutQuad * endValue);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = text;
        }
    }
    
    update();
}

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation CSS
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ==========================================
// CARD TILT EFFECT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .stat-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
function consoleEasterEgg() {
    const styles = {
        title: 'color: #10b981; font-size: 20px; font-weight: bold;',
        subtitle: 'color: #6b7280; font-size: 14px;',
        message: 'color: #3b82f6; font-size: 12px;'
    };

    console.log('%c🧬 CTRL+ALT+DNA 🧬', styles.title);
    console.log('%cWelcome to the future of biotechnology!', styles.subtitle);
    console.log('%cDecoding GMOs through Science, Health & Politics', styles.message);
    console.log('%c\n💡 Tip: Try hovering over the floating molecules and icons!', 'color: #f59e0b; font-size: 11px;');
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll-based updates can go here
}, 10));