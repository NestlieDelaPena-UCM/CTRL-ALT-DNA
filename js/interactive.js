// Tab switching functionality
function showTab(tabId) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to clicked button
    event.currentTarget.classList.add('active');
}

// Overview sidebar navigation
function showOverviewSection(sectionId) {
    // Hide all overview sections
    const sections = document.querySelectorAll('.overview-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all sidebar items
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => item.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked sidebar item
    event.currentTarget.classList.add('active');
}

// Comparison slider functionality
const comparisonContainer = document.getElementById('comparisonContainer');
const sliderHandle = document.getElementById('sliderHandle');
const afterImage = document.getElementById('afterImage');
let isDragging = false;

sliderHandle.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);

comparisonContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const rect = comparisonContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    if (percentage >= 0 && percentage <= 100) {
        sliderHandle.style.left = percentage + '%';
        afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
});

// Touch support for mobile
sliderHandle.addEventListener('touchstart', () => isDragging = true);
document.addEventListener('touchend', () => isDragging = false);

comparisonContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const rect = comparisonContainer.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    if (percentage >= 0 && percentage <= 100) {
        sliderHandle.style.left = percentage + '%';
        afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
});

// Myth card toggle
function toggleMyth(card) {
    card.classList.toggle('active');
}