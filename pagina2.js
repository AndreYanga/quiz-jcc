// Array de Perguntas e Respostas
const quizData = [
    {
        "question": "Quem construiu a arca durante o dilúvio, segundo a Bíblia?",
        "options": ["Moisés", "Noé", "Abraão", "Davi"],
        "correct": 1
    },
    {
        "question": "Qual é o primeiro livro da Bíblia?",
        "options": ["Gênesis", "Êxodo", "Levítico", "Números"],
        "correct": 0
    },
    {
        "question": "Quantos discípulos Jesus tinha?",
        "options": ["10", "11", "12", "13"],
        "correct": 2
    },
    {
        "question": "Qual é o maior mandamento ensinado por Jesus?",
        "options": ["Amar a Deus sobre todas as coisas", "Não matar", "Guardar o sábado", "Não cobiçar"],
        "correct": 0
    },
    {
        "question": "Quem foi o primeiro homem criado por Deus?",
        "options": ["Moisés", "Abraão", "Adão", "Elias"],
        "correct": 2
    },
    {
        "question": "Quem traiu Jesus por 30 moedas de prata?",
        "options": ["Pedro", "Judas Iscariotes", "João", "Tomé"],
        "correct": 1
    },
    {
        "question": "Qual o nome da mãe de Jesus?",
        "options": ["Maria Madalena", "Marta", "Maria", "Rebeca"],
        "correct": 2
    },
    {
        "question": "Quantos dias Deus levou para criar o mundo, segundo Gênesis?",
        "options": ["5", "6", "7", "8"],
        "correct": 1
    },
    {
        "question": "Qual o nome do apóstolo que era conhecido como 'dúvida' por não acreditar na ressurreição de Jesus?",
        "options": ["Pedro", "Tiago", "Tomé", "Judas"],
        "correct": 2
    },
    {
        "question": "Qual o livro bíblico que narra a criação do mundo?",
        "options": ["Êxodo", "Gênesis", "Salmos", "Apocalipse"],
        "correct": 1
    },
    {
        "question": "Quem foi jogado na cova dos leões e sobreviveu?",
        "options": ["Daniel", "José", "Ezequiel", "Jonas"],
        "correct": 0
    },
    {
        "question": "Qual o nome do mar que se abriu para Moisés e os israelitas atravessarem?",
        "options": ["Mar Mediterrâneo", "Mar Morto", "Mar Vermelho", "Mar Negro"],
        "correct": 2
    },
    {
        "question": "Quem foi engolido por um grande peixe, segundo a Bíblia?",
        "options": ["Jonas", "Pedro", "Paulo", "Elias"],
        "correct": 0
    },
    {
        "question": "Qual é o último livro da Bíblia?",
        "options": ["Mateus", "Apocalipse", "Romanos", "Salmos"],
        "correct": 1
    },
    {
        "question": "Quem foi o primeiro mártir cristão?",
        "options": ["Paulo", "Pedro", "Estevão", "Tiago"],
        "correct": 2
    },
    {
        "question": "Quantos livros tem a Bíblia (versão protestante)?",
        "options": ["66", "73", "39", "27"],
        "correct": 0
    },
    {
        "question": "Quem liderou o povo de Israel na travessia do rio Jordão?",
        "options": ["Moisés", "Josué", "Calebe", "Elias"],
        "correct": 1
    },
    {
        "question": "Qual era o nome original de Paulo antes de sua conversão?",
        "options": ["Simão", "Saulo", "Pedro", "Ezequiel"],
        "correct": 1
    },
    {
        "question": "Quem recebeu os 10 mandamentos de Deus?",
        "options": ["Abraão", "Noé", "Moisés", "Josué"],
        "correct": 2
    },
    {
        "question": "Quem escreveu a maioria das cartas no Novo Testamento?",
        "options": ["Pedro", "João", "Paulo", "Lucas"],
        "correct": 2
    }
];

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

// Variáveis de Controle
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;

// Função para Iniciar o Quiz
document.getElementById('startQuizBtn').addEventListener('click', startQuiz);

function startQuiz() {
    shuffleQuizData();  // Embaralha as perguntas e respostas
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
    loadQuestion();
    startTimer();
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
    const currentQuestion = quizData[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answerBtn');

    if (selected === currentQuestion.correct) {
        score++;
        answerButtons[selected].classList.add('correct');
    } else {
        answerButtons[selected].classList.add('incorrect');
        answerButtons[currentQuestion.correct].classList.add('correct');
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
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1);  // Resposta errada por tempo esgotado
        }
    }, 1000);
}

// Função para Resetar o Timer
function resetTimer() {
    clearInterval(timer);
    timeLeft = 20;
    startTimer();
}

// Função para Mostrar Resultados
function showResults() {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';
    document.getElementById('score').textContent = `Você acertou ${score} de ${quizData.length}`;
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

// Certifique-se de que o botão de reiniciar está aparecendo corretamente após o quiz
function showResults() {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';
    document.getElementById('score').textContent = `Pontuação: ${score}/${quizData.length}`;
    document.getElementById('time').textContent = `Tempo total: ${20 * quizData.length - timeLeft}s`;
    const feedback = score === quizData.length ? "Excelente! És um mestre na programação!" : "Precisas praticar mais um pouco!";
    document.getElementById('feedback').textContent = feedback;

    // Exibe o botão de reiniciar após o quiz
    document.getElementById('restartBtn').style.display = 'block';
}

// Carregar os sons
const correctSound = new Audio('correcto.mp3');
const incorrectSound = new Audio('incorrecto.mp3');

// Função para checar a resposta e tocar o som correspondente
function checkAnswer(selected) {
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

correctSound.volume = 0.5; // Volume de 0 a 1
incorrectSound.volume = 0.5; // Volume de 0 a 1

// Função para Iniciar o Timer
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
