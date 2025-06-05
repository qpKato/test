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
    // Buscar usuários página 1 e 2
    const res1 = await fetch('https://reqres.in/api/users?page=1');
    const data1 = await res1.json();

    const res2 = await fetch('https://reqres.in/api/users?page=2');
    const data2 = await res2.json();

    const allUsers = [...data1.data, ...data2.data];

    const matchedUser = allUsers.find(user => user.email === email);

    if (!matchedUser) {
      result.style.color = 'red';
      result.textContent = 'E-mail não cadastrado.';
      return;
    }

    // Tentar login (POST)
    const loginRes = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      result.style.color = 'red';
      result.textContent = loginData.error || 'Erro no login.';
      return;
    }

    // Exibir dados do usuário e foto
    result.style.color = 'green';
    result.textContent = `Login bem-sucedido! Token: ${loginData.token}`;
    nameSpan.textContent = `${matchedUser.first_name} ${matchedUser.last_name}`;
    emailSpan.textContent = matchedUser.email;
    avatarImg.src = matchedUser.avatar;
    userInfo.style.display = 'block';

  } catch (error) {
    result.style.color = 'red';
    result.textContent = `Erro na conexão: ${error.message}`;
  }
});
