document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // SET ACTIVE NAV LINK BASED ON CURRENT PAGE
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });

    // ==========================================
    // START JOURNEY BUTTON
    // ==========================================
    const startJourneyBtn = document.getElementById('startJourneyBtn');
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', function() {
            const scienceSection = document.querySelector('#science');
            if (scienceSection) {
                window.scrollTo({
                    top: scienceSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ==========================================
    // TAKE QUIZ BUTTON
    // ==========================================
    const takeQuizBtn = document.getElementById('takeQuizBtn');
    if (takeQuizBtn) {
        takeQuizBtn.addEventListener('click', function() {
            const quizSection = document.querySelector('#agriculture .quiz-section');
            if (quizSection) {
                window.scrollTo({
                    top: quizSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Show first quiz question
                const firstQuestion = document.getElementById('ag-quiz-1');
                if (firstQuestion) {
                    firstQuestion.classList.remove('hidden');
                }
            }
        });
    }

    // ==========================================
    // READ MORE BUTTONS - OPEN IN NEW TAB
    // ==========================================
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                alert('Source link not available for this content.');
            }
        });
    });

    // ==========================================
    // SCIENCE POLL
    // ==========================================
    const sciencePollSubmit = document.getElementById('science-poll-submit');
    if (sciencePollSubmit) {
        sciencePollSubmit.addEventListener('click', function() {
            const selectedOption = document.querySelector('input[name="science-poll"]:checked');
            const resultsContainer = document.getElementById('science-poll-results');
            
            if (!selectedOption) {
                alert('Please select an option before voting.');
                return;
            }
            
            const value = selectedOption.value;
            let resultText = '';
            
            switch(value) {
                case 'positive':
                    resultText = 'You believe GMO technology is essential for progress. Many scientists share this view, emphasizing the potential benefits for food security and medicine.';
                    break;
                case 'cautious':
                    resultText = 'You are cautiously optimistic about GMOs with proper regulation. This balanced approach considers both potential benefits and risks.';
                    break;
                case 'concerned':
                    resultText = 'You have concerns about GMOs and want more long-term studies. This perspective highlights the importance of thorough safety assessments.';
                    break;
                case 'opposed':
                    resultText = 'You prefer natural methods over genetic modification. This viewpoint emphasizes precaution and alternative approaches to agriculture.';
                    break;
            }
            
            resultsContainer.innerHTML = `
                <h4>Your Perspective: ${selectedOption.nextElementSibling.textContent}</h4>
                <p>${resultText}</p>
                <p class="poll-stats">Based on previous visitors: 42% share your view, 28% are cautiously optimistic, 20% are concerned, and 10% are opposed.</p>
            `;
            resultsContainer.style.display = 'block';
            
            // Disable poll after submission
            document.querySelectorAll('input[name="science-poll"]').forEach(input => {
                input.disabled = true;
            });
            sciencePollSubmit.disabled = true;
            sciencePollSubmit.textContent = 'Vote Submitted';
            sciencePollSubmit.style.opacity = '0.6';
        });
    }

    // ==========================================
    // AGRICULTURE QUIZ
    // ==========================================
    let agQuizScore = 0;
    let currentAgQuestion = 1;
    
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            // Check if this is from the agriculture quiz
            if (this.closest('#ag-quiz-1') || this.closest('#ag-quiz-2')) {
                const isCorrect = this.getAttribute('data-correct') === 'true';
                const allOptions = this.parentElement.querySelectorAll('.quiz-option');
                
                // Mark correct/incorrect answers
                allOptions.forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                    if (opt.getAttribute('data-correct') === 'true') {
                        opt.classList.add('correct');
                    } else if (opt === this && !isCorrect) {
                        opt.classList.add('incorrect');
                    }
                    opt.disabled = true;
                    opt.style.cursor = 'not-allowed';
                });
                
                // Update score
                if (isCorrect) agQuizScore++;
                
                // Show next question or results after delay
                setTimeout(() => {
                    if (currentAgQuestion === 1) {
                        document.getElementById('ag-quiz-1').classList.add('hidden');
                        document.getElementById('ag-quiz-2').classList.remove('hidden');
                        currentAgQuestion = 2;
                    } else {
                        document.getElementById('ag-quiz-2').classList.add('hidden');
                        document.getElementById('ag-quiz-score').textContent = agQuizScore;
                        document.getElementById('ag-quiz-results').classList.remove('hidden');
                    }
                }, 1500);
            }
        });
    });
    
    // Retake Agriculture Quiz
    const retakeAgQuizBtn = document.getElementById('retake-ag-quiz');
    if (retakeAgQuizBtn) {
        retakeAgQuizBtn.addEventListener('click', function() {
            // Reset quiz
            agQuizScore = 0;
            currentAgQuestion = 1;
            
            // Reset all quiz options
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.classList.remove('correct', 'incorrect');
                option.disabled = false;
                option.style.cursor = 'pointer';
            });
            
            // Hide results and show first question
            document.getElementById('ag-quiz-results').classList.add('hidden');
            document.getElementById('ag-quiz-1').classList.remove('hidden');
            document.getElementById('ag-quiz-2').classList.add('hidden');
        });
    }

    // ==========================================
    // MEDICAL COMMENTS
    // ==========================================
    const submitMedicineComment = document.getElementById('submit-medicine-comment');
    if (submitMedicineComment) {
        submitMedicineComment.addEventListener('click', function() {
            const commentText = document.getElementById('medicine-comment').value.trim();
            const username = document.getElementById('medicine-username').value.trim() || 'Anonymous';
            
            if (!commentText) {
                alert('Please enter a comment before posting.');
                return;
            }
            
            const commentsContainer = document.getElementById('medicine-comments');
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            
            const currentDate = new Date();
            const formattedDate = 'Just now';
            
            newComment.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${username}</span>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <div class="comment-content">${commentText}</div>
            `;
            
            // Add fade-in animation
            newComment.style.opacity = '0';
            commentsContainer.prepend(newComment);
            
            setTimeout(() => {
                newComment.style.transition = 'opacity 0.5s';
                newComment.style.opacity = '1';
            }, 10);
            
            // Clear form
            document.getElementById('medicine-comment').value = '';
            document.getElementById('medicine-username').value = '';
            
            // Show success message
            const tempMessage = document.createElement('div');
            tempMessage.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
            `;
            tempMessage.textContent = 'Comment posted successfully!';
            document.body.appendChild(tempMessage);
            
            setTimeout(() => {
                tempMessage.remove();
            }, 3000);
        });
    }

    // ==========================================
    // DECISION SIMULATOR
    // ==========================================
    document.querySelectorAll('.decision-option').forEach(option => {
        option.addEventListener('click', function() {
            const outcome = this.getAttribute('data-outcome');
            const resultContainer = document.getElementById('decision-result');
            const outcomeText = document.getElementById('outcome-text');
            
            let result = '';
            
            switch(outcome) {
                case 'approve':
                    result = 'You approved the drought-resistant corn with conditions for monitoring. Farmers report a 15% increase in yield during dry seasons, but environmental groups raise concerns about gene flow to wild relatives. Overall, the decision is seen as a success with ongoing oversight.';
                    break;
                case 'delay':
                    result = 'You delayed approval for more studies. After 2 years of additional research, the crop is approved, but farmers have lost two growing seasons of potential benefits. Public confidence in the regulatory process increases due to the thorough approach.';
                    break;
                case 'reject':
                    result = 'You rejected the application due to uncertainty. The company develops the crop for other markets. Five years later, a similar crop is approved after more extensive testing, but your country is now behind in agricultural innovation and faces increased food security challenges.';
                    break;
            }
            
            outcomeText.textContent = result;
            resultContainer.classList.remove('hidden');
            
            // Highlight selected option
            document.querySelectorAll('.decision-option').forEach(opt => {
                opt.style.background = '';
                opt.style.borderColor = '';
            });
            
            this.style.background = '#d1fae5';
            this.style.borderColor = '#10b981';
        });
    });

    // ==========================================
    // GLOBAL PERSPECTIVES MAP
    // ==========================================
    document.querySelectorAll('.country').forEach(country => {
        country.addEventListener('click', function() {
            const countryName = this.getAttribute('data-country');
            const status = this.getAttribute('data-status');
            
            let info = '';
            let statusText = status.charAt(0).toUpperCase() + status.slice(1);
            
            switch(countryName) {
                case 'usa':
                    info = 'The United States has embraced GMO technology since the 1990s. The FDA regulates GMOs under the same framework as conventional foods. Major crops include corn, soybeans, cotton, and canola. The US is one of the world\'s largest producers and consumers of GMO crops.';
                    break;
                case 'brazil':
                    info = 'Brazil is one of the largest producers of GMO crops globally, second only to the USA. The country has a science-based regulatory system and grows GMO soybeans, corn, and cotton. Brazilian farmers have widely adopted GMO technology for its economic benefits.';
                    break;
                case 'eu':
                    info = 'The European Union follows the precautionary principle with strict GMO regulations. Approval processes are lengthy and rigorous. Few GMO crops are cultivated in EU countries, though many GMO products are imported for animal feed. Public opinion remains skeptical about GMO food.';
                    break;
                case 'india':
                    info = 'India has approved Bt cotton, which has been widely successful, but has been cautious about food crops. There is significant public debate, particularly around Bt brinjal (eggplant). The regulatory environment is complex with both scientific and political considerations.';
                    break;
                case 'russia':
                    info = 'Russia has banned the cultivation of GMO crops since 2016, though imports of some GMO products for processing are allowed. The policy is based on a desire to promote "organic" agriculture and protect traditional farming. However, some GMO animal feed is still imported.';
                    break;
                case 'china':
                    info = 'China heavily invests in GMO research and development but has been slow to approve commercial cultivation of GMO food crops. The government takes a cautious approach to domestic cultivation while importing significant amounts of GMO soybeans and corn for animal feed.';
                    break;
            }
            
            // Create modal-like alert with better formatting
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 16px;
                box-shadow: 0 20px 25px rgba(0, 0, 0, 0.2);
                max-width: 500px;
                z-index: 10000;
                animation: fadeIn 0.3s ease-out;
            `;
            
            modal.innerHTML = `
                <h3 style="color: #10b981; margin-bottom: 1rem; font-size: 1.5rem;">
                    ${this.textContent}
                </h3>
                <p style="color: #f59e0b; font-weight: 600; margin-bottom: 1rem;">
                    Status: ${statusText}
                </p>
                <p style="line-height: 1.6; color: #4b5563; margin-bottom: 1.5rem;">
                    ${info}
                </p>
                <button id="closeModal" style="
                    background: #10b981;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    width: 100%;
                ">Close</button>
            `;
            
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9999;
            `;
            
            document.body.appendChild(overlay);
            document.body.appendChild(modal);
            
            const closeBtn = document.getElementById('closeModal');
            closeBtn.addEventListener('click', () => {
                modal.remove();
                overlay.remove();
            });
            
            overlay.addEventListener('click', () => {
                modal.remove();
                overlay.remove();
            });
        });
    });

    // ==========================================
    // FINAL POLL
    // ==========================================
    const finalPollSubmit = document.getElementById('final-poll-submit');
    if (finalPollSubmit) {
        finalPollSubmit.addEventListener('click', function() {
            const selectedOption = document.querySelector('input[name="final-poll"]:checked');
            const resultsContainer = document.getElementById('final-poll-results');
            
            if (!selectedOption) {
                alert('Please select an option before submitting.');
                return;
            }
            
            const value = selectedOption.value;
            let resultText = '';
            
            switch(value) {
                case 'yes':
                    resultText = 'Thank you for being open to new perspectives! Many people find that learning about the science behind GMOs helps address concerns and provides a more balanced understanding.';
                    break;
                case 'somewhat':
                    resultText = 'Understanding the complexities is key to making informed decisions. GMOs present both opportunities and challenges that require nuanced consideration from multiple perspectives.';
                    break;
                case 'no':
                    resultText = 'It\'s important to form opinions based on careful consideration. We hope the information provided was helpful in understanding different viewpoints on this complex topic.';
                    break;
                case 'negative':
                    resultText = 'Your concerns are valid and shared by many. Continued research, transparent regulation, and open dialogue are important for addressing these concerns and ensuring safety.';
                    break;
            }
            
            resultsContainer.innerHTML = `
                <h4 style="color: #10b981; margin-bottom: 1rem;">Thank you for sharing!</h4>
                <p style="margin-bottom: 1rem;">${resultText}</p>
                <p style="font-style: italic; color: #6b7280;">We encourage you to continue exploring this complex topic from multiple perspectives and engage in informed discussions.</p>
            `;
            resultsContainer.style.display = 'block';
            
            // Disable poll after submission
            document.querySelectorAll('input[name="final-poll"]').forEach(input => {
                input.disabled = true;
            });
            finalPollSubmit.disabled = true;
            finalPollSubmit.textContent = 'Submitted';
            finalPollSubmit.style.opacity = '0.6';
        });
    }

    // ==========================================
    // ADD FADE-IN ANIMATION
    // ==========================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -48%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initQuiz();
    initScrollAnimations();
});

// ==========================================
// NAVIGATION SYSTEM
// ==========================================
function initNavigation() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const primaryButtons = document.querySelectorAll('.btn-primary[data-next]');

    // Sidebar navigation
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            navigateToSection(sectionId);
            updateActiveSidebarItem(item);
            scrollToTop();
        });
    });

    // Next button navigation
    primaryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextSection = button.dataset.next;
            navigateToSection(nextSection);
            const nextSidebarItem = document.querySelector(`.sidebar-item[data-section="${nextSection}"]`);
            if (nextSidebarItem) {
                updateActiveSidebarItem(nextSidebarItem);
            }
            scrollToTop();
        });
    });
}

function navigateToSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function updateActiveSidebarItem(activeItem) {
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==========================================
// QUIZ SYSTEM
// ==========================================
function initQuiz() {
    const submitButton = document.getElementById('submit-quiz');
    const nextButton = document.getElementById('next-interactive');

    if (submitButton) {
        submitButton.addEventListener('click', evaluateQuiz);
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            window.location.href = 'interactive.html';
        });
    }
}

function evaluateQuiz() {
    const answers = {
        q1: 'A',
        q2: 'B',
        q3: 'C',
        q4: 'B',
        q5: 'A'
    };

    const explanations = {
        q1: {
            correct: '✓ Correct! GMOs are as safe as their non-GMO counterparts according to major health organizations worldwide.',
            incorrect: '✗ Incorrect. GMOs are as safe as their non-GMO counterparts according to major health organizations worldwide.'
        },
        q2: {
            correct: '✓ Correct! The blight-resistant potato was developed after the potato famine with significant progress in the late 20th and early 21st centuries using both traditional breeding and modern genetic techniques.',
            incorrect: '✗ Incorrect. The blight-resistant potato was developed after the potato famine with significant progress in the late 20th and early 21st centuries using both traditional breeding and modern genetic techniques.'
        },
        q3: {
            correct: '✓ Correct! Herbert Boyer & Stanley Cohen made the first genetically modified organism in 1973. They took a gene from a bacterium that provided resistance to the antibiotic kanamycin, inserted it into a plasmid, and then induced other bacteria to incorporate the plasmid.',
            incorrect: '✗ Incorrect. Herbert Boyer & Stanley Cohen made the first genetically modified organism in 1973. They took a gene from a bacterium that provided resistance to the antibiotic kanamycin, inserted it into a plasmid, and then induced other bacteria to incorporate the plasmid.'
        },
        q4: {
            correct: '✓ Correct! Bt stands for Bacillus thuringiensis, a naturally occurring soil bacterium that produces insecticidal proteins.',
            incorrect: '✗ Incorrect. Bt stands for Bacillus thuringiensis, a naturally occurring soil bacterium that produces insecticidal proteins.'
        },
        q5: {
            correct: '✓ Correct! The four major GMO crops are corn, soybeans, cotton, and canola. Wheat is not widely grown as a GMO crop.',
            incorrect: '✗ Incorrect. Wheat is NOT one of the major GMO crops. The four major ones are corn, soybeans, cotton, and canola.'
        }
    };

    let score = 0;
    const totalQuestions = 5;

    // Evaluate each question
    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = `q${i}`;
        const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        const feedbackDiv = document.getElementById(`feedback${i}`);

        if (!selectedAnswer) {
            feedbackDiv.className = 'feedback incorrect';
            feedbackDiv.textContent = '⚠ Please select an answer.';
            continue;
        }

        const isCorrect = selectedAnswer.value === answers[questionName];
        
        if (isCorrect) {
            score++;
            feedbackDiv.className = 'feedback correct';
            feedbackDiv.textContent = explanations[questionName].correct;
        } else {
            feedbackDiv.className = 'feedback incorrect';
            feedbackDiv.textContent = explanations[questionName].incorrect;
        }
    }

    displayQuizResult(score, totalQuestions);
}

function displayQuizResult(score, total) {
    const resultDiv = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-interactive');
    
    let emoji = '';
    let message = '';
    let description = '';

    if (score === 5) {
        emoji = '🏆';
        message = 'Perfect Score!';
        description = "You're a GMO expert! You've mastered all the concepts.";
    } else if (score === 4) {
        emoji = '🌟';
        message = 'Excellent Work!';
        description = "You really know your GMOs! Just one question away from perfection.";
    } else if (score === 3) {
        emoji = '👍';
        message = 'Good Job!';
        description = "You're on the right track! Review the material to strengthen your knowledge.";
    } else if (score === 2) {
        emoji = '📚';
        message = 'Keep Learning!';
        description = "You've got the basics down. Review the content to improve your understanding.";
    } else {
        emoji = '💪';
        message = 'Room to Grow!';
        description = "GMOs are complex but fascinating! Take another look at the material.";
    }

    resultDiv.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">${emoji}</div>
        <h2 style="font-size: 2rem; font-weight: 800; color: var(--color-text); margin-bottom: 0.5rem;">${message}</h2>
        <p style="font-size: 1.125rem; color: var(--color-text-light); margin-bottom: 1.5rem;">${description}</p>
        <div style="font-size: 1.75rem; font-weight: 700; color: var(--color-primary);">
            Score: ${score} / ${total}
        </div>
    `;

    resultDiv.classList.add('show');
    nextButton.style.display = 'inline-flex';

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
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

    // Observe cards
    const animatedElements = document.querySelectorAll(`
        .objective-card,
        .perspective-card,
        .org-card,
        .company-card,
        .agency-item,
        .trade-card,
        .question-block
    `);

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(element);
    });
}

// ==========================================
// SMOOTH HOVER EFFECTS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
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
// CARD TILT EFFECT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.perspective-card, .org-card, .company-card');

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
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// ==========================================
// PARALLAX EFFECT FOR BLOBS
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.blob');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const molecules = document.querySelectorAll('.molecule');
    const dnaStrands = document.querySelectorAll('.floating-dna');
    
    blobs.forEach((blob, index) => {
        const speed = 0.2 + (index * 0.1);
        blob.style.transform = `translate(${scrolled * speed * 0.5}px, ${scrolled * speed}px)`;
    });

    // Parallax for floating icons
    floatingIcons.forEach((icon, index) => {
        const speed = 0.15 + (index * 0.05);
        const currentTransform = window.getComputedStyle(icon).transform;
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
            
            if (!currentTransform.includes('translate')) {
                molecule.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            }
        }, 3000 + index * 1000);
    });
});