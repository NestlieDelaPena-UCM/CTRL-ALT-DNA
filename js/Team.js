// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Setup event listeners
    setupEventListeners();
});

// Initialize animations
function initAnimations() {
    // Add floating animation to team cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe team cards
    document.querySelectorAll('.team-card').forEach(card => {
        observer.observe(card);
    });
    
    // Animate DNA strands
    animateDNAStrands();
}

// Animate DNA strands
function animateDNAStrands() {
    const dnaStrands = document.querySelectorAll('.dna-strand');
    
    dnaStrands.forEach((strand, index) => {
        // Create additional animation points
        const points = 5;
        for (let i = 0; i < points; i++) {
            const point = document.createElement('div');
            point.className = 'dna-point';
            point.style.position = 'absolute';
            point.style.width = '8px';
            point.style.height = '8px';
            point.style.borderRadius = '50%';
            point.style.background = '#4ecdc4';
            point.style.left = '-3px';
            point.style.top = `${(i + 1) * (100 / (points + 1))}%`;
            point.style.animation = `pulse ${2 + i * 0.5}s infinite ${i * 0.3}s`;
            strand.appendChild(point);
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Facebook link hover effect
    const facebookLinks = document.querySelectorAll('.facebook-link');
    facebookLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(15deg) scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(0) scale(1)';
        });
    });
    
    // Team card interactions
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.team-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.team-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Category badge interactions
    const badges = document.querySelectorAll('.category-badge');
    badges.forEach(badge => {
        badge.addEventListener('click', function() {
            const type = this.classList.contains('science-badge') ? 'Science' : 
                        this.classList.contains('health-badge') ? 'Health' : 'Politics';
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Filter team members (optional - you can implement filtering if needed)
            filterTeamMembers(type);
        });
    });
}

// Filter team members by category (optional functionality)
function filterTeamMembers(category) {
    // This is a placeholder for filtering functionality
    // You can implement this based on your needs
    console.log(`Filtering by ${category} category`);
    
    // Show visual feedback
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.style.opacity = '0.5';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
        }, 300);
    });
}

// Add CSS for animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .animate-in {
        animation: fadeUp 0.8s ease forwards;
    }
    
    .team-card {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .team-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .dna-point {
        opacity: 0.7;
    }
`;
document.head.appendChild(styleSheet);