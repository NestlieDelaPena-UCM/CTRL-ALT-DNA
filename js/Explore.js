function showContent(sectionId) {
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.add('hidden'));
            
            const sidebarItems = document.querySelectorAll('.sidebar-item');
            sidebarItems.forEach(item => item.classList.remove('active'));
            
            document.getElementById(sectionId).classList.remove('hidden');
            event.target.classList.add('active');
        }

        function checkAnswers() {
            const answers = {
                q1: 'A', // FTrue
                q2: 'B', // Potatoes
                q3: 'C', // Herbert Boyer & Stanley Cohen
                q4: 'B', // Bacillus thuringiensisE
                q5: 'A'  // Wheat (not a major GMO crop)
            };

            const explanations = {
                q1: {
                    correct: '✓ Correct! GMOs are as safe as their non-GMO counterparts',
                    incorrect: '✗ Incorrect. GMOs are as safe as their non-GMO counterparts'
                },
                q2: {
                    correct: '✓ Correct! The blight resistant potato was developed after the potato famine with significant progress in the late 20th and early 21st centuries using both traditional breeding and modern genetic techniques to make potatoes resilient to the Phytophthora infestans pathogen that caused the famine.',
                    incorrect: '✗ Incorrect. the blight resistant potato was developed after the potato famine with significant progress in the late 20th and early 21st centuries using both traditional breeding and modern genetic techniques to make potatoes resilient to the Phytophthora infestans pathogen that caused the famine.'
                },
                q3: {
                    correct: '✓ Correct! Herbert Boyer & Stanley Cohen____ made the first genetically modified organism in 1973.They took a gene from a bacterium that provided resistance to the antibiotic kanamycin, inserted it into a plasmid and then induced other bacteria to incorporate the plasmid',
                    incorrect: '✗ Incorrect. Herbert Boyer & Stanley Cohen____ made the first genetically modified organism in 1973.They took a gene from a bacterium that provided resistance to the antibiotic kanamycin, inserted it into a plasmid and then induced other bacteria to incorporate the plasmid'
                },
                q4: {
                    correct: '✓ Correct! Bt stands for Bacillus thuringiensis, a bacterium that produces insecticidal proteins.',
                    incorrect: '✗ Incorrect. Bt stands for Bacillus thuringiensis, a naturally occurring soil bacterium.'
                },
                q5: {
                    correct: '✓ Correct! The four major GMO crops are corn, soybeans, cotton, and canola. Wheat is not widely grown as GMO.',
                    incorrect: '✗ Incorrect. Wheat is NOT one of the major GMO crops. The four major ones are corn, soybeans, cotton, and canola.'
                }
            };

            let score = 0;
            let totalQuestions = 5;

            for (let i = 1; i <= totalQuestions; i++) {
                const questionName = 'q' + i;
                const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
                const feedbackDiv = document.getElementById(`feedback${i}`);

                if (!selectedAnswer) {
                    feedbackDiv.className = 'feedback incorrect';
                    feedbackDiv.textContent = '⚠ Please select an answer.';
                    continue;
                }

                if (selectedAnswer.value === answers[questionName]) {
                    score++;
                    feedbackDiv.className = 'feedback correct';
                    feedbackDiv.textContent = explanations[questionName].correct;
                } else {
                    feedbackDiv.className = 'feedback incorrect';
                    feedbackDiv.textContent = explanations[questionName].incorrect;
                }
            }

            const resultMessage = document.getElementById('result-message');
            resultMessage.className = 'show';
            
            let message = '';
            let emoji = '';
            
            if (score === 5) {
                emoji = '🏆';
                message = 'Perfect Score! You\'re a GMO expert!';
            } else if (score >= 4) {
                emoji = '🌟';
                message = 'Great job! You really know your GMOs!';
            } else if (score >= 3) {
                emoji = '👍';
                message = 'Good work! You\'re on the right track!';
            } else if (score >= 2) {
                emoji = '📚';
                message = 'Not bad! Review the content to improve!';
            } else {
                emoji = '💪';
                message = 'Keep learning! GMOs are complex but fascinating!';
            }

            
            resultMessage.innerHTML = `${emoji} ${message}<br><strong>Your Score: ${score} out of ${totalQuestions}</strong>`;
            
            // Show the "Next: Interactive Hub" button
            document.getElementById('next-to-interactive').style.display = 'inline-block';
            
            // Scroll to results
            resultMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function goToInteractive() {
            window.location.href = 'interactive.html';
        }