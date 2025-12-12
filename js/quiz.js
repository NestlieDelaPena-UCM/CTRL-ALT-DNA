     const quizData = [
            {
                question: "When was the first genetically modified organism created?",
                options: ["1973", "1990", "2000", "1950"],
                correct: 0,
                explanation: "The first GMO was created in 1973 by Herbert Boyer and Stanley Cohen using recombinant DNA technology, marking the beginning of modern genetic engineering."
            },
            {
                question: "What percentage of pesticide use has been reduced by GMO crops?",
                options: ["10%", "25%", "37%", "50%"],
                correct: 2,
                explanation: "GMO crops have reduced pesticide use by 37% globally, leading to less environmental impact and lower costs for farmers."
            },
            {
                question: "Which was the first GMO food approved for commercial sale?",
                options: ["Golden Rice", "Bt Corn", "Flavr Savr Tomato", "Rainbow Papaya"],
                correct: 2,
                explanation: "The Flavr Savr tomato was approved in 1994, becoming the first genetically modified food available to consumers. It was engineered to have a longer shelf life."
            },
            {
                question: "What is Golden Rice engineered to produce?",
                options: ["Vitamin C", "Beta-carotene (Vitamin A)", "Protein", "Iron"],
                correct: 1,
                explanation: "Golden Rice is engineered to produce beta-carotene, which the body converts to Vitamin A. It was developed to combat vitamin A deficiency in developing countries."
            },
            {
                question: "How many scientific studies have confirmed GMO safety for consumption?",
                options: ["Over 500", "Over 1,000", "Over 3,000", "Over 5,000"],
                correct: 2,
                explanation: "Over 3,000 peer-reviewed scientific studies have confirmed that GMOs are safe for human consumption, with endorsements from WHO, FDA, and other major health organizations."
            },
            {
                question: "What does CRISPR gene-editing technology allow scientists to do?",
                options: ["Make genetic modifications more precise", "Create organisms faster", "Eliminate all diseases", "Clone animals"],
                correct: 0,
                explanation: "CRISPR technology, which gained widespread adoption around 2015, allows for precise gene editing, making genetic modifications more accurate and efficient than previous methods."
            },
            {
                question: "How much has farmer income increased with Bt cotton?",
                options: ["20%", "35%", "50%", "75%"],
                correct: 2,
                explanation: "Farmers growing Bt cotton have seen income increases of approximately 50% due to reduced pest damage and lower pesticide costs."
            },
            {
                question: "Which country grows the most GMO crops?",
                options: ["Brazil", "China", "United States", "India"],
                correct: 2,
                explanation: "The United States grows the most GMO crops, with approximately 75 million hectares dedicated to genetically modified agriculture as of 2024."
            },
            {
                question: "By what percentage have GMO crops increased crop yields?",
                options: ["10%", "22%", "35%", "45%"],
                correct: 1,
                explanation: "GMO crops have increased yields by an average of 22%, helping to address global food security challenges while using less land."
            },
            {
                question: "What percentage of global cropland is used for GMO cultivation?",
                options: ["5%", "10%", "15%", "20%"],
                correct: 1,
                explanation: "GMO crops are grown on approximately 10% of global cropland, representing over 190 million hectares across more than 70 countries worldwide."
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let answers = [];

        function initQuiz() {
            renderQuestion();
            updateProgress();
        }

        function renderQuestion() {
            const container = document.getElementById('questionsContainer');
            container.innerHTML = '';

            const questionData = quizData[currentQuestion];
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card active';
            
            questionCard.innerHTML = `
                <div class="question-text">${questionData.question}</div>
                <div class="answer-options" id="answerOptions">
                    ${questionData.options.map((option, index) => `
                        <div class="answer-option" onclick="selectAnswer(${index})">
                            <div class="option-text">${option}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="explanation" id="explanation">
                    <h4>💡 Explanation:</h4>
                    <p>${questionData.explanation}</p>
                </div>
            `;

            container.appendChild(questionCard);

            // Restore previous answer if exists
            if (answers[currentQuestion] !== undefined) {
                selectAnswer(answers[currentQuestion], true);
            }
        }

        function selectAnswer(index, skipValidation = false) {
            const options = document.querySelectorAll('.answer-option');
            options.forEach(opt => opt.classList.remove('selected'));
            options[index].classList.add('selected');

            answers[currentQuestion] = index;
            document.getElementById('nextBtn').disabled = false;

            if (!skipValidation) {
                // Show if answer is correct/incorrect
                const questionData = quizData[currentQuestion];
                const explanation = document.getElementById('explanation');
                
                if (index === questionData.correct) {
                    options[index].classList.add('correct');
                } else {
                    options[index].classList.add('incorrect');
                    options[questionData.correct].classList.add('correct');
                }
                
                explanation.classList.add('show');
            }
        }

        function nextQuestion() {
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                renderQuestion();
                updateProgress();
                updateButtons();
            } else {
                showResults();
            }
        }

        function previousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                renderQuestion();
                updateProgress();
                updateButtons();
            }
        }

        function updateProgress() {
            const progress = ((currentQuestion + 1) / quizData.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
            document.getElementById('questionCounter').textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
        }

        function updateButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            prevBtn.disabled = currentQuestion === 0;
            nextBtn.disabled = answers[currentQuestion] === undefined;
            
            if (currentQuestion === quizData.length - 1) {
                nextBtn.innerHTML = '<i class="fas fa-check icon"></i>Finish Quiz';
            } else {
                nextBtn.innerHTML = 'Next<i class="fas fa-arrow-right icon"></i>';
            }
        }

        function showResults() {
            // Calculate score
            score = 0;
            answers.forEach((answer, index) => {
                if (answer === quizData[index].correct) {
                    score++;
                }
            });

            const accuracy = Math.round((score / quizData.length) * 100);
            
            // Hide quiz, show results
            document.getElementById('quizSection').style.display = 'none';
            document.getElementById('resultsSection').classList.add('show');

            // Update results
            document.getElementById('scoreNumber').textContent = score;
            document.getElementById('correctCount').textContent = score;
            document.getElementById('incorrectCount').textContent = quizData.length - score;
            document.getElementById('accuracy').textContent = accuracy + '%';

            // Performance message
            let message = '';
            if (score === 10) {
                message = '🌟 Perfect Score! You\'re a GMO Expert!';
            } else if (score >= 8) {
                message = '🎉 Excellent! You know your GMOs!';
            } else if (score >= 6) {
                message = '👍 Good Job! You\'re on the right track!';
            } else if (score >= 4) {
                message = '📚 Not bad! Keep learning!';
            } else {
                message = '💪 Room for improvement! Try again!';
            }
            document.getElementById('performanceMessage').textContent = message;
        }

        function shareScore() {
            const accuracy = Math.round((score / quizData.length) * 100);
            const text = `I scored ${score}/${quizData.length} (${accuracy}%) on the GMO Knowledge Quiz! 🧬 Test your knowledge at CTRL+ALT+DNA!`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'GMO Knowledge Quiz Results',
                    text: text
                });
            } else {
                alert('Share this score: ' + text);
            }
        }

        function restartQuiz() {
            currentQuestion = 0;
            score = 0;
            answers = [];
            
            document.getElementById('quizSection').style.display = 'block';
            document.getElementById('resultsSection').classList.remove('show');
            
            initQuiz();
            updateButtons();
        }

        // Initialize quiz on load
        initQuiz();
