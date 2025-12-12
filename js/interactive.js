// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Interactive Hub initialized');
    initTabs();
    initComparison();
    initMythBusters();
    initMobileMenu();
    initVideoControls();
    initAnimations();
});

// ==========================================
// TAB NAVIGATION
// ==========================================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length === 0 || tabContents.length === 0) {
        console.error('Tab elements not found');
        return;
    }

    // Function to switch tabs
    function switchTab(tabId) {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        // Add active to clicked
        const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activeContent) {
            activeContent.classList.add('active');
            activeContent.style.display = 'block';
        }
    }

    // Add click event to each tab button
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = btn.dataset.tab;
            if (targetTab) {
                switchTab(targetTab);
                // Add URL hash for bookmarking
                window.history.pushState(null, '', `#${targetTab}`);
            }
        });
    });

    // Check URL hash on load
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchTab(hash);
    }
}

// ==========================================
// COMPARISON SLIDER
// ==========================================
function initComparison() {
    const container = document.getElementById('comparisonContainer');
    const handle = document.getElementById('sliderHandle');
    const afterSide = document.getElementById('afterSide');

    if (!container || !handle || !afterSide) {
        console.error('Comparison elements not found');
        return;
    }

    let isDragging = false;
    let startX = 0;
    let startLeft = 0;

    // Function to update slider position
    function updateSlider(clientX) {
        const rect = container.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;

        handle.style.left = `${percentage}%`;
        afterSide.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        
        // Add visual feedback for dragging
        handle.classList.toggle('dragging', isDragging);
    }

    // Mouse event handlers
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startLeft = parseFloat(handle.style.left) || 50;
        container.style.cursor = 'ew-resize';
        handle.classList.add('dragging');
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            const rect = container.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(startLeft + (deltaX / rect.width) * 100, 100));
            
            handle.style.left = `${percentage}%`;
            afterSide.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            container.style.cursor = '';
            handle.classList.remove('dragging');
        }
    });

    // Touch event handlers for mobile
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startLeft = parseFloat(handle.style.left) || 50;
        container.style.cursor = 'ew-resize';
        handle.classList.add('dragging');
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const deltaX = e.touches[0].clientX - startX;
            const rect = container.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(startLeft + (deltaX / rect.width) * 100, 100));
            
            handle.style.left = `${percentage}%`;
            afterSide.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            e.preventDefault();
        }
    });

    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            container.style.cursor = '';
            handle.classList.remove('dragging');
        }
    });

    // Initialize slider position
    updateSlider(container.getBoundingClientRect().left + (container.offsetWidth / 2));
}

// ==========================================
// MYTH BUSTERS
// ==========================================
function initMythBusters() {
    const mythCards = document.querySelectorAll('.myth-card');
    
    if (mythCards.length === 0) {
        console.warn('No myth cards found');
        return;
    }

    mythCards.forEach(card => {
        // Remove inline onclick and add event listener
        card.onclick = null;
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isActive = this.classList.contains('active');
            
            // Close all other myth cards
            mythCards.forEach(c => {
                if (c !== this) {
                    c.classList.remove('active');
                    const teaser = c.querySelector('.myth-teaser');
                    const reveal = c.querySelector('.myth-reveal');
                    if (teaser) teaser.style.display = 'block';
                    if (reveal) reveal.style.display = 'none';
                }
            });
            
            // Toggle current card
            if (!isActive) {
                this.classList.add('active');
                const teaser = this.querySelector('.myth-teaser');
                const reveal = this.querySelector('.myth-reveal');
                if (teaser) teaser.style.display = 'none';
                if (reveal) {
                    reveal.style.display = 'block';
                    reveal.style.animation = 'fadeIn 0.5s ease';
                }
                
                // Track interaction
                const mythId = this.dataset.mythId;
                if (mythId) {
                    console.log(`Myth revealed: ${mythId}`);
                    // Here you could add analytics tracking
                }
            } else {
                this.classList.remove('active');
                const teaser = this.querySelector('.myth-teaser');
                const reveal = this.querySelector('.myth-reveal');
                if (teaser) teaser.style.display = 'block';
                if (reveal) reveal.style.display = 'none';
            }
        });
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');

    if (!mobileToggle || !nav) {
        console.warn('Mobile menu elements not found');
        return;
    }

    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Toggle aria-expanded for accessibility
        const isExpanded = nav.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ==========================================
// VIDEO CONTROLS
// ==========================================
function initVideoControls() {
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    
    videoWrappers.forEach(wrapper => {
        const iframe = wrapper.querySelector('iframe');
        if (iframe) {
            // Add loading indicator
            const loader = document.createElement('div');
            loader.className = 'video-loader';
            loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Loading video...</span>';
            wrapper.appendChild(loader);
            
            // Remove loader when video loads
            iframe.addEventListener('load', () => {
                loader.style.display = 'none';
            });
            
            // Add error handling
            iframe.addEventListener('error', () => {
                loader.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Video failed to load. Please try again.</span>';
                loader.style.color = '#dc2626';
            });
        }
    });
}

// ==========================================
// ANIMATIONS
// ==========================================
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .success-card, .myth-card, .video-card').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// ENHANCED FEATURES
// ==========================================

// Success Stories with more interactivity
function initSuccessStories() {
    const successCards = document.querySelectorAll('.success-card');
    
    successCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click to expand details
        card.addEventListener('click', () => {
            const details = card.querySelector('.success-details');
            if (details) {
                details.classList.toggle('expanded');
            }
        });
    });
}

// Initialize all interactive features
function initAllFeatures() {
    initTabs();
    initComparison();
    initMythBusters();
    initMobileMenu();
    initVideoControls();
    initSuccessStories();
    initAnimations();
    
    // Add CSS for video loader
    const style = document.createElement('style');
    style.textContent = `
        .video-loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.9);
            padding: 1rem 2rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: var(--color-text-light);
            z-index: 2;
        }
        
        .slider-handle.dragging .slider-button {
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 12px 30px rgba(16, 185, 129, 0.8);
        }
        
        .success-details.expanded {
            max-height: 1000px !important;
            transition: max-height 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}

// Export functions for debugging
window.interactiveHub = {
    initAllFeatures,
    initTabs,
    initComparison,
    initMythBusters
};

// Initialize everything
initAllFeatures();