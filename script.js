const form = document.getElementById('login-form');
const result = document.getElementById('result');
const userInfo = document.getElementById('user-info');
const nameSpan = document.getElementById('name');
const emailSpan = document.getElementById('user-email');
const avatarImg = document.getElementById('avatar');

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Limpa mensagens e oculta informações do usuário ao submeter o formulário
    result.textContent = '';
    userInfo.classList.remove('visible');
    form.classList.remove('shifted');

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const apiKey = 'reqres-free-v1';

    try {
      // Validação: campo senha não pode estar vazio
      if (!password) {
        result.style.color = 'red';
        result.textContent = 'Digite a senha.';
        return;
      }

      // Tenta login (POST) com e-mail e senha fornecidos
      const loginRes = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ email, password })
      });
      const loginData = await loginRes.json();

      // Se login falhar, exibe mensagem de erro e interrompe o fluxo
      if (!loginRes.ok) {
        result.style.color = 'red';
        result.textContent = loginData.error || 'Senha incorreta ou usuário inválido.';
        userInfo.classList.remove('visible');
        form.classList.remove('shifted');
        return;
      }

      // Busca usuário pelo e-mail na API (GET) após login bem-sucedido
      let user = null;
      let usersRes = await fetch('https://reqres.in/api/users?page=1', {
        headers: { 'x-api-key': apiKey }
      });
      let usersData = await usersRes.json();
      user = usersData.data.find(u => u.email === email);

      // Se não encontrar na página 1, tenta na página 2
      if (!user) {
        const usersRes2 = await fetch('https://reqres.in/api/users?page=2', {
          headers: { 'x-api-key': apiKey }
        });
        const usersData2 = await usersRes2.json();
        user = usersData2.data.find(u => u.email === email);
      }

      // Se usuário não encontrado, exibe mensagem de erro
      if (!user) {
        result.style.color = 'red';
        result.textContent = 'Usuário não encontrado.';
        userInfo.classList.remove('visible');
        form.classList.remove('shifted');
        return;
      }

      // Exibe dados do usuário e mensagem de sucesso
      nameSpan.textContent = user.first_name + ' ' + user.last_name;
      emailSpan.textContent = user.email;
      avatarImg.src = user.avatar;
      userInfo.classList.add('visible');
      form.classList.add('shifted');
      result.style.color = 'green';
      result.textContent = `Login bem-sucedido! Token: ${loginData.token}`;
    } catch (error) {
      // Trata erros de conexão ou outros imprevistos
      result.style.color = 'red';
      result.textContent = `Erro na conexão: ${error.message}`;
      userInfo.classList.remove('visible');
    }
  });
});