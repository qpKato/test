const form = document.getElementById('login-form');
const result = document.getElementById('result');
const userInfo = document.getElementById('user-info');
const nameSpan = document.getElementById('name');
const emailSpan = document.getElementById('user-email');
const avatarImg = document.getElementById('avatar');

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    result.textContent = '';
    userInfo.classList.remove('visible');
    form.classList.remove('shifted');

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const apiKey = 'reqres-free-v1'; // Chave de API fornecida pela Reqres

    try {
      // Log para depuração
      console.log('Enviando login:', { email, password });
      const loginRes = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ email, password })
      });

      const loginData = await loginRes.json();
      console.log('Resposta da API:', loginRes.status, loginData);

      if (!loginRes.ok) {
        result.style.color = 'red';
        result.textContent = loginData.error || 'Erro no login.';
        return;
      }

      // Buscar dados do usuário pelo e-mail
      const usersRes = await fetch('https://reqres.in/api/users?page=1', {
        headers: { 'x-api-key': apiKey }
      });
      const usersData = await usersRes.json();
      let user = usersData.data.find(u => u.email === email);
      if (!user) {
        // Tenta na página 2
        const usersRes2 = await fetch('https://reqres.in/api/users?page=2', {
          headers: { 'x-api-key': apiKey }
        });
        const usersData2 = await usersRes2.json();
        user = usersData2.data.find(u => u.email === email);
      }

      if (user) {
        nameSpan.textContent = user.first_name + ' ' + user.last_name;
        emailSpan.textContent = user.email;
        avatarImg.src = user.avatar;
        userInfo.classList.add('visible');
        form.classList.add('shifted');
        result.style.color = 'green';
        result.textContent = `Login bem-sucedido! Token: ${loginData.token}`;
      } else {
        result.style.color = 'green';
        result.textContent = `Login bem-sucedido! Token: ${loginData.token} (Usuário não encontrado para exibir dados)`;
        userInfo.classList.remove('visible');
        form.classList.remove('shifted');
      }

    } catch (error) {
      result.style.color = 'red';
      result.textContent = `Erro na conexão: ${error.message}`;
      userInfo.classList.remove('visible');
    }
  });
});
