
// Função para mostrar a seção selecionada
function showSection(sectionId) {
    // Oculta todas as seções
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => section.classList.remove('active'));

    // Mostra a seção correspondente ao ID
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active');
}

// Funções e eventos já existentes para adicionar, listar e excluir perguntas


function updateQuestionList() {
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = ''; // Limpa a lista antes de atualizar

    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
         li.innerHTML = `
            <span>${q.question}</span>
            <button onclick="deleteQuestion(${index})" class="btn btn-danger btn-sm">Excluir</button>
        `;
        questionsList.appendChild(li);
    });
}
/***********************************************/
// Função para carregar perguntas do Local Storage
function loadQuestions() {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    return questions;
}

// Função para salvar perguntas no Local Storage
function saveQuestions(questions) {
    localStorage.setItem('questions', JSON.stringify(questions));
}

// Função para atualizar a lista de perguntas no menu "Consultar Pergunta"
function updateQuestionList() {
    const questions = loadQuestions();
    const questionListDiv = document.getElementById('questionList');
    questionListDiv.innerHTML = ''; // Limpa a lista atual

    if (questions.length === 0) {
        questionListDiv.innerHTML = '<p>Nenhuma pergunta adicionada ainda.</p>';
        return;
    }

    const ul = document.createElement('ul');
    ul.classList.add('list-group');

    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'mb-3');
        const questionText = `<strong>${index + 1}. ${q.question}</strong>`;

        let optionsList = '<ul class="list-group mt-2">';
        q.options.forEach((option, i) => {
            optionsList += `<li class="list-group-item">${i + 1}. ${option}</li>`;
        });
        optionsList += '</ul>';

        const correctAnswer = `<p class="mt-2"><strong>Resposta correta:</strong> ${q.options[q.correct]}</p>`;

        li.innerHTML = `${questionText}<br>${optionsList}${correctAnswer}`;
        ul.appendChild(li);
    });

    questionListDiv.appendChild(ul);
}

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

// Chama a função para carregar as perguntas ao abrir a página
document.addEventListener('DOMContentLoaded', updateQuestionList);

/************************************************************************ */


// Carregar a lista de perguntas ao abrir a página
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
window.onload = updateQuestionList;

// Função para mostrar a seção selecionada
function showSection(sectionId) {
    // Oculta todas as seções
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => section.classList.remove('active'));

    // Mostra a seção correspondente ao ID
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active');
}

  // Exemplo de dados do ranking - será preenchido dinamicamente
  let rankingData = [];

  // Função para simular o término de um jogo e adicionar o vencedor ao ranking
  function addPlayerToRanking(name, score) {
      // Cria um novo objeto com o nome e a pontuação do jogador
      const newPlayer = {
          position: '', // Será calculado depois
          name: name,
          score: score
      };

      // Adiciona o novo jogador ao array de dados de ranking
      rankingData.push(newPlayer);

      // Ordena os jogadores com base na pontuação (do maior para o menor)
      rankingData.sort((a, b) => b.score - a.score);

      // Atualiza as posições de cada jogador após a ordenação
      rankingData = rankingData.map((player, index) => {
          player.position = `${index + 1}º`; // A posição é definida pela ordem no ranking
          return player;
      });

      // Chama a função para atualizar a tabela do ranking
      loadRanking();
  }

  // Função para carregar o ranking na tabela da modal
  function loadRanking() {
      const tbody = document.querySelector('#rankingTable tbody');
      tbody.innerHTML = ''; // Limpar a tabela antes de preencher com novos dados

      // Preencher a tabela com os dados atualizados
      rankingData.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${item.position}</td>
              <td>${item.name}</td>
              <td>${item.score} pontos</td>
          `;
          tbody.appendChild(row);
      });
  }

  // Função para abrir a modal com o ranking
function openRankingModal() {
    // Define o título e conteúdo da modal
    document.getElementById('infoModalLabel').innerText = 'Configurações - Informações do Quiz';
    document.getElementById('modalContent').innerText = 'Veja as regas e objetivo do jogo quiz.';

    // Exibe o conteúdo do ranking
    document.getElementById('rankingContainer').style.display = 'block';

    // Carrega o ranking na tabela (substitua pela função real de carregar o ranking)
    

    // Exibe a modal
    $('#infoModal').modal('show');
}



// Função para carregar a página inicial automaticamente
window.onload = () => {
    showSection('home');  // Exibe a home por padrão
};

/// Carregar perguntas do Local Storage ou do arquivo JSON
async function fetchQuestions() {
    try {
        const questions = JSON.parse(localStorage.getItem('questions'));
        if (questions) {
            return questions; // Retorna perguntas do Local Storage
        } else {
            // Se não houver no Local Storage, carrega do arquivo JSON e salva no Local Storage
            const response = await fetch('questions.json');
            if (!response.ok) throw new Error('Não foi possível carregar as perguntas.');
            const data = await response.json();
            localStorage.setItem('questions', JSON.stringify(data)); // Salva no Local Storage
            return data;
        }
    } catch (error) {
        console.error('Erro ao carregar as perguntas:', error);
    }
}

// Função para atualizar a lista de perguntas
async function updateQuestionList() {
    try {
        const questions = await fetchQuestions();
        const questionListDiv = document.getElementById('questionList');
        questionListDiv.innerHTML = ''; // Limpa o conteúdo existente

        const ul = document.createElement('ul');
        ul.classList.add('list-group');

        questions.forEach((q, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'mb-3');

            const questionText = `<strong>${index + 1}. ${q.question}</strong>`;

            let optionsList = '<ul class="list-group mt-2">';
            q.options.forEach((option, i) => {
                optionsList += `<li class="list-group-item">${i + 1}. ${option}</li>`;
            });
            optionsList += '</ul>';

            const correctAnswer = `<p class="mt-2"><strong>Resposta correta:</strong> ${q.options[q.correct]}</p>`;

            li.innerHTML = `${questionText}<br>${optionsList}${correctAnswer}`;
            ul.appendChild(li);
        });

        questionListDiv.appendChild(ul);
    } catch (error) {
        console.error('Erro ao carregar as perguntas:', error);
    }
}

// Atualiza a lista ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateQuestionList();
    displayQuestionsForEditing();
    displayQuestionsForDeletion();
});

// Função para editar uma pergunta e a resposta correta
async function editQuestion(index) {
    const questions = await fetchQuestions();
    const questionToEdit = questions[index];

    const newQuestion = prompt("Editar pergunta:", questionToEdit.question);
    if (newQuestion !== null) {
        questionToEdit.question = newQuestion;
    }

    const newAnswer = prompt("Editar resposta correta:", questionToEdit.options[questionToEdit.correct]);
    if (newAnswer !== null) {
        questionToEdit.options[questionToEdit.correct] = newAnswer;
    }

    localStorage.setItem('questions', JSON.stringify(questions)); // Salva as mudanças no Local Storage
    alert(`Pergunta ${index + 1} atualizada!`);
    updateQuestionList();
    displayQuestionsForEditing();
    displayQuestionsForDeletion();
}

// Função para excluir uma pergunta
async function deleteQuestion(index) {
    const questions = await fetchQuestions();
    if (confirm(`Tem certeza de que deseja excluir a pergunta ${index + 1}?`)) {
        questions.splice(index, 1); // Remove a pergunta do array
        localStorage.setItem('questions', JSON.stringify(questions)); // Salva as mudanças no Local Storage
        alert(`Pergunta ${index + 1} excluída.`);
        updateQuestionList();
        displayQuestionsForEditing();
        displayQuestionsForDeletion();
    }
}

// Função para exibir perguntas para edição
async function displayQuestionsForEditing() {
    const questions = await fetchQuestions();
    const editListDiv = document.getElementById('editQuestionList');
    editListDiv.innerHTML = '';

    const ul = document.createElement('ul');
    ul.classList.add('list-group');

    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `<strong>${index + 1}. ${q.question}</strong>`;
        
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-sm', 'btn-warning', 'ml-2');
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Editar';
        editBtn.onclick = () => editQuestion(index);

        li.appendChild(editBtn);
        ul.appendChild(li);
    });
    editListDiv.appendChild(ul);
}

// Função para exibir perguntas para exclusão
async function displayQuestionsForDeletion() {
    const questions = await fetchQuestions();
    const deleteListDiv = document.getElementById('deleteQuestionList');
    deleteListDiv.innerHTML = '';

    const ul = document.createElement('ul');
    ul.classList.add('list-group');

    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `<strong>${index + 1}. ${q.question}</strong>`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger', 'ml-2');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Excluir';
        deleteBtn.onclick = () => deleteQuestion(index);

        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
    deleteListDiv.appendChild(ul);
}

