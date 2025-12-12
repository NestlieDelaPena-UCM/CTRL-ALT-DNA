// Main JavaScript file for CTRL+ALT+DNA website

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add smooth scroll behavior
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for anchor links on the same page
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('NavBar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        }

        lastScroll = currentScroll;
    });

    // Animate stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });

    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        cardObserver.observe(card);
    });
});

// Animate numbers counting up
function animateValue(element) {
    const text = element.textContent;
    
    // Skip if it's not a number or contains special characters like ∞
    if (text === '∞' || isNaN(parseInt(text.replace('+', '')))) {
        return;
    }

    const endValue = parseInt(text.replace('+', ''));
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const hasPlus = text.includes('+');

    function update() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);
        const currentValue = Math.floor(easeOutQuad * endValue);
        
        element.textContent = hasPlus ? currentValue + '+' : currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = text; // Set to original value at the end
        }
    }
    
    update();
}

// Add parallax effect to background elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.dna-background > *');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.02);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// CTA Button interaction
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Console Easter Egg
console.log('%c🧬 CTRL+ALT+DNA 🧬', 'color: #64ffda; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to the future of biotechnology!', 'color: #b8e0d2; font-size: 14px;');
console.log('%cDecoding GMOs through Science, Health & Politics', 'color: #4facfe; font-size: 12px;');