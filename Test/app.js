document.addEventListener('DOMContentLoaded', () => {
    const questions = [];


    let currentQuestionIndex = 0; 
    let score = 0;

    const questionEl = document.getElementById('question');
    const questionImageEl = document.getElementById('question-image');
    const answersEl = document.getElementById('answers');
    const textAnswerEl = document.getElementById('text-answer');
    const submitBtn = document.getElementById('submit');
    const resultsEl = document.getElementById('results');
           
    document.getElementById('question-type-selector').addEventListener('change', function() {
        if (this.value === 'multiple-choice') {
            document.getElementById('multiple-choice-answers').style.display = 'block';
        } else {
            document.getElementById('multiple-choice-answers').style.display = 'none';
        }
    });

    document.getElementById('add-question-btn').addEventListener('click', function() {
        let questionText = document.getElementById('new-question-input').value;
        let questionType = document.getElementById('question-type-selector').value;
        let imageUrl = document.getElementById('new-image-url').value;
        let answers, correctAnswer;
        
        if (questionType === 'multiple-choice') {
            answers = [
                document.getElementById('new-answer-a').value,
                document.getElementById('new-answer-b').value,
                document.getElementById('new-answer-c').value,
                document.getElementById('new-answer-d').value
            ];
            let correctAnswerLetter = document.getElementById('new-correct-answer').value.toUpperCase();
            if (!['A', 'B', 'C', 'D'].includes(correctAnswerLetter)) {
                alert('For multiple-choice questions, please specify the correct answer (A, B, C, or D).');
                return;
            }
            correctAnswer = ['A', 'B', 'C', 'D'].indexOf(correctAnswerLetter);
           
            questionType = imageUrl ? 'image-multiple-choice' : 'multiple-choice';
        } else {
           
            correctAnswer = document.getElementById('new-correct-answer').value;
            if (!correctAnswer) {
                alert('For text-input questions, please specify the correct text answer.');
                return;
            }
            questionType = imageUrl ? 'image-text' : 'text';
        }
        
     
        let newQuestion = {
            type: questionType,
            question: questionText,
            correct: correctAnswer,
            answers: answers 
        };
        
       
        if (imageUrl && (questionType === 'image-multiple-choice' || questionType === 'image-text')) {
            newQuestion.imageUrl = imageUrl;
        }
        
        questions.push(newQuestion);
        
        currentQuestionIndex = 0;

        document.getElementById('new-question-input').value = '';
        document.getElementById('new-correct-answer').value = '';
        document.getElementById('new-image-url').value = '';
        document.getElementById('new-answer-a').value = '';
        document.getElementById('new-answer-b').value = '';
        document.getElementById('new-answer-c').value = '';
        document.getElementById('new-answer-d').value = '';
        document.getElementById('multiple-choice-answers').style.display = 'none';
        
        alert('New question added!');

        loadQuestion();
    });
    

    function loadQuestion() {
        // If there are no questions, or we're at an index that doesn't exist, display a message and return
        if (questions.length === 0 || currentQuestionIndex >= questions.length) {
            questionEl.textContent = 'No questions to display. Please add some questions.';
            questionEl.style.display = 'block';
            answersEl.style.display = 'none';
            textAnswerEl.style.display = 'none'; // Ensure the text input is hidden when there are no questions
            submitBtn.style.display = 'none';
            questionImageEl.style.display = 'none';
            return; // Exit the function if there are no questions
        }
    
        // Get the current question
        const currentQuestion = questions[currentQuestionIndex];
    
        // Reset display states
        answersEl.innerHTML = ''; // Clear previous answers
        textAnswerEl.value = '';
        questionImageEl.style.display = 'none';
        questionEl.style.display = 'block';
    
        // Set the question text
        questionEl.textContent = currentQuestion.question;
    
        // Handle different question types
        if (currentQuestion.type === "multiple-choice" || currentQuestion.type === "image-multiple-choice") {
            answersEl.style.display = 'block';
            textAnswerEl.style.display = 'none'; // Hide the text input for multiple-choice questions
            currentQuestion.answers.forEach((answer, index) => {
                const li = document.createElement('li');
                li.textContent = answer;
                li.onclick = () => submitAnswer(index === currentQuestion.correct);
                answersEl.appendChild(li);
            });
        } else if (currentQuestion.type === "text" || currentQuestion.type === "image-text") {
            textAnswerEl.style.display = 'block'; // Show the text input for text and image-text questions
            submitBtn.onclick = () => submitAnswer(textAnswerEl.value.trim().toLowerCase() === currentQuestion.correct.toLowerCase());
        }
    
        // Display the image if there is one
        if (currentQuestion.imageUrl) {
            questionImageEl.src = currentQuestion.imageUrl;
            questionImageEl.style.display = 'block';
            questionImageEl.alt = "Image for question: " + currentQuestion.question;
        }
    
        // Make sure the submit button is always displayed if there is a question
        submitBtn.style.display = 'block';
    }
    
    
    

    function submitAnswer(isCorrect) {
        if (isCorrect) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        questionEl.style.display = 'none';
        answersEl.style.display = 'none';
        textAnswerEl.style.display = 'none';
        submitBtn.style.display = 'none';
        resultsEl.textContent = `Your score: ${score} out of ${questions.length}`;
    }

    loadQuestion();
}); 