// Função para alternar entre as abas de Login, Cadastro e Recuperação
function openTab(evt, tabName) {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => link.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    evt.currentTarget.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Função para criar uma nova conta
function criarConta(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const accountType = document.getElementById('account-type').value;

    if (username && password) {
        const userData = {
            username: username,
            password: password,
            accountType: accountType
        };

        // Verificar se o usuário já existe
        if (localStorage.getItem(username)) {
            alert('Usuário já existe. Tente um nome diferente.');
        } else {
            // Armazenar os dados do usuário no localStorage
            localStorage.setItem(username, JSON.stringify(userData));
            alert('Conta criada com sucesso! Você já pode fazer login.');
            openTab(event, 'login');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para login
function fazerLogin(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Recuperar os dados do usuário do localStorage
    const storedUserData = localStorage.getItem(username);

    if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        // Verificar se a senha está correta
        if (userData.password === password) {
            // Armazenar o tipo de conta no localStorage
            localStorage.setItem('currentUser', JSON.stringify(userData)); // Armazena o usuário logado

            // Verificar o tipo de conta e redirecionar
            if (userData.accountType === 'user') {
                alert('Login como Usuário Normal: ' + username);
                // Redirecionar para a página do usuário
                window.location.href = 'home.html'; // Ajuste para a página do usuário
            } else if (userData.accountType === 'admin') {
                alert('Login como Administrador: ' + username);
                // Redirecionar para a página do administrador
                window.location.href = 'adm.html'; // Ajuste para a página do administrador
            }
        } else {
            alert('Senha incorreta. Tente novamente.');
        }
    } else {
        alert('Usuário não encontrado. Verifique suas informações ou crie uma conta.');
    }
}


// Adicionando o evento de login
document.getElementById('login-form').addEventListener('submit', fazerLogin);
document.getElementById('signup-form').addEventListener('submit', criarConta);
