let quizData = [];
let quizActive = false; // Controle do estado do quiz
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

// Função para carregar as perguntas tanto do localStorage quanto do arquivo JSON
function loadQuestions() {
    return new Promise((resolve, reject) => {
        // Carregar perguntas do localStorage
        const savedQuestions = localStorage.getItem('questions');
        let localQuestions = [];

        if (savedQuestions) {
            // Se existem perguntas no localStorage, converte de JSON
            localQuestions = JSON.parse(savedQuestions);
        }

        // Buscar perguntas do arquivo JSON
        fetch('questions.json')
            .then(response => response.json())
            .then(data => {
                // Combina as perguntas do arquivo JSON com as do localStorage, evitando duplicatas
                localQuestions.forEach(question => {
                    // Verifica se a pergunta já existe
                    if (!isQuestionDuplicate(question.question)) {
                        quizData.push(question);
                    }
                });

                data.forEach(question => {
                    // Verifica se a pergunta já existe
                    if (!isQuestionDuplicate(question.question)) {
                        quizData.push(question);
                    }
                });

                // Embaralha as perguntas e opções
                shuffleQuizData();

                // Chama resolve para finalizar o carregamento
                resolve();
            })
            .catch(error => {
                console.error('Erro ao carregar perguntas:', error);
                reject(error);  // Chama reject caso haja erro
            });
    });
}


// Função para verificar se a pergunta já existe (evitar duplicatas)
function isQuestionDuplicate(newQuestionText) {
    return quizData.some(question => question.question === newQuestionText);
}

// Função para embaralhar os elementos de um array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
}

// Função para embaralhar as opções de resposta e garantir que a resposta correta seja atualizada
function shuffleOptions(question) {
    const correctAnswer = question.options[question.correct]; // Guarda a resposta correta antes de embaralhar
    shuffleArray(question.options);  // Embaralha as opções
    question.correct = question.options.indexOf(correctAnswer); // Atualiza o índice da resposta correta
}

// Função para embaralhar as perguntas e as opções
function shuffleQuizData() {
    shuffleArray(quizData);  // Embaralha a ordem das perguntas
    quizData.forEach(question => shuffleOptions(question));  // Embaralha as opções de resposta para cada pergunta
}

// Função para Iniciar o Quiz
document.getElementById('startQuizBtn').addEventListener('click', startQuiz);

function startQuiz() {
    loadQuestions().then(() => {
        quizActive = true;  // Ativa o estado do quiz
        shuffleQuizData();  // Embaralha as perguntas e respostas
        document.getElementById('homeScreen').style.display = 'none';
        document.getElementById('quizScreen').style.display = 'block';
        loadQuestion();
        startTimer();
    }).catch(error => {
        console.error("Erro ao carregar as perguntas:", error);
    });
}

// Função para Carregar Pergunta
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    
    document.getElementById('questionText').textContent = currentQuestion.question;
    const answerButtons = document.querySelectorAll('.answerBtn');
    
    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
        button.classList.remove('correct', 'incorrect');
        button.disabled = false;
    });

    document.getElementById('progress').style.width = (currentQuestionIndex / quizData.length) * 100 + '%';
}

// Função para Checar Resposta
function checkAnswer(selected) {
    if (!quizActive) return; // Verifica se o quiz está ativo antes de processar a resposta

    const currentQuestion = quizData[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answerBtn');

    if (selected === currentQuestion.correct) {
        score++;
        answerButtons[selected].classList.add('correct');
        correctSound.play(); // Toca o som de acerto
    } else {
        answerButtons[selected].classList.add('incorrect');
        answerButtons[currentQuestion.correct].classList.add('correct');
        incorrectSound.play(); // Toca o som de erro
    }

    answerButtons.forEach(button => button.disabled = true);

    if (currentQuestionIndex < quizData.length - 1) {
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
            resetTimer();
        }, 1000);
    } else {
        setTimeout(showResults, 1000);
    }
}

// Função para Iniciar o Timer
function startTimer() {
    if (!quizActive) return; // Garante que o timer só seja iniciado se o quiz estiver ativo

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            incorrectSound.play(); // Toca o som de erro quando o tempo esgota
            checkAnswer(-1);  // Resposta errada por tempo esgotado, avançando para a próxima questão
        }
    }, 1000);
}

// Função para Resetar o Timer
function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    startTimer();
}

/***************************************************** */

// Função para Mostrar Resultados
function showResults() {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';
    document.getElementById('score').textContent = `Você acertou ${score} de ${quizData.length}`;
    const feedback = score === quizData.length ? "Excelente! És um mestre na programação!" : "Precisas praticar mais um pouco!";
    document.getElementById('feedback').textContent = feedback;

    // Exibe o botão de reiniciar após o quiz
    document.getElementById('restartBtn').style.display = 'block';
}

// Função para reiniciar o quiz
document.getElementById('restartBtn').addEventListener('click', restartQuiz);

function restartQuiz() {
    // Resetando variáveis de controle
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 20;

    // Escondendo a tela de resultados e mostrando a tela inicial novamente
    document.getElementById('resultsScreen').style.display = 'none';
    document.getElementById('homeScreen').style.display = 'block';

    // Reseta a tela do quiz
    clearInterval(timer);
    document.getElementById('quizScreen').style.display = 'none';

    // Reseta o timer e a pontuação, e começa o quiz novamente
    document.getElementById('progress').style.width = '0%';
    document.getElementById('score').textContent = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('time').textContent = '';
    resetTimer();
}

// Carregar os sons
const correctSound = new Audio('correcto.mp3');
const incorrectSound = new Audio('incorrecto.mp3');

// Ajustando volume
correctSound.volume = 0.5; // Volume de 0 a 1
incorrectSound.volume = 0.5; // Volume de 0 a 1

/***************************************************** */
/*Função para Iniciar o Timer*/
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            incorrectSound.play(); // Toca o som de erro quando o tempo esgota
            checkAnswer(-1);  // Resposta errada por tempo esgotado
        }
    }, 1000);
}

// Função para Checar Resposta
function checkAnswer(selected) {
    const currentQuestion = quizData[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answerBtn');

    if (selected === currentQuestion.correct) {
        score++;
        answerButtons[selected].classList.add('correct');
        correctSound.play(); // Toca o som de acerto
    } else {
        if (selected !== -1) { // Só adiciona a classe 'incorrect' se uma opção tiver sido selecionada
            answerButtons[selected].classList.add('incorrect');
        }
        answerButtons[currentQuestion.correct].classList.add('correct');
        incorrectSound.play(); // Toca o som de erro
    }

    answerButtons.forEach(button => button.disabled = true);

    if (currentQuestionIndex < quizData.length - 1) {
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
            resetTimer();
        }, 1000);
    } else {
        setTimeout(showResults, 1000);
    }
}

/********************************************************* */

// Função para adicionar uma nova pergunta
document.getElementById('addQuestionBtn').addEventListener('click', function() {
    const newQuestion = document.getElementById('newQuestion').value;
    const option1 = document.getElementById('newOption1').value;
    const option2 = document.getElementById('newOption2').value;
    const option3 = document.getElementById('newOption3').value;
    const option4 = document.getElementById('newOption4').value;
    const correctOption = parseInt(document.getElementById('correctOption').value);

    if (!newQuestion || !option1 || !option2 || !option3 || !option4 || isNaN(correctOption) || correctOption < 1 || correctOption > 4) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Cria a nova pergunta
    const newQ = {
        question: newQuestion,
        options: [option1, option2, option3, option4],
        correct: correctOption - 1
    };

    // Carrega as perguntas existentes, adiciona a nova pergunta e salva novamente
    const questions = loadQuestions();
    questions.push(newQ);
    saveQuestions(questions);

    alert("Pergunta adicionada com sucesso!");

    // Limpa o formulário
    document.getElementById('newQuestion').value = '';
    document.getElementById('newOption1').value = '';
    document.getElementById('newOption2').value = '';
    document.getElementById('newOption3').value = '';
    document.getElementById('newOption4').value = '';
    document.getElementById('correctOption').value = '';

    // Atualiza a lista no menu "Consultar Pergunta"
    updateQuestionList();
    displayQuestionsForEditing();
    displayQuestionsForDeletion();
});





