const form = document.getElementById('login-form');
const result = document.getElementById('result');
const userInfo = document.getElementById('user-info');
const nameSpan = document.getElementById('name');
const emailSpan = document.getElementById('user-email');
const avatarImg = document.getElementById('avatar');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  result.textContent = '';
  userInfo.style.display = 'none';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    // 1. GET: Buscar usuários para validar e-mail
    const userRes = await fetch('https://reqres.in/api/users?page=1');
    const userData = await userRes.json();
    const users = userData.data;

    const matchedUser = users.find(user => user.email === email);

    if (!matchedUser) {
      result.style.color = 'red';
      result.textContent = 'E-mail não cadastrado.';
      return;
    }

    // 2. POST: Login com senha
    const loginRes = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      result.style.color = 'red';
      result.textContent = loginData.error || 'Senha incorreta.';
      return;
    }

    // 3. Exibir dados do usuário
    result.style.color = 'green';
    result.textContent = 'Login bem-sucedido!';
    nameSpan.textContent = `${matchedUser.first_name} ${matchedUser.last_name}`;
    emailSpan.textContent = matchedUser.email;
    avatarImg.src = matchedUser.avatar;
    userInfo.style.display = 'block';

  } catch (error) {
    result.style.color = 'red';
    result.textContent = 'Erro na conexão.';
  }
});
