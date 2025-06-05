const form = document.getElementById('login-form');
const result = document.getElementById('result');
const userInfo = document.getElementById('user-info');
const nameSpan = document.getElementById('name');
const emailSpan = document.getElementById('user-email');
const avatarImg = document.getElementById('avatar');

// Senhas simuladas associadas aos e-mails
const validUsers = {
  'george.bluth@reqres.in': { password: '123456', id: 1 },
  'janet.weaver@reqres.in': { password: 'abc123', id: 2 },
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  result.textContent = '';
  userInfo.style.display = 'none';

  const user = validUsers[email];

  if (!user || user.password !== password) {
    result.style.color = 'red';
    result.textContent = 'E-mail ou senha incorretos.';
    return;
  }

  // Buscar dados do usuário na API (GET)
  const response = await fetch(`https://reqres.in/api/users/${user.id}`);
  const data = await response.json();

  if (response.ok) {
    const userData = data.data;
    nameSpan.textContent = `${userData.first_name} ${userData.last_name}`;
    emailSpan.textContent = userData.email;
    avatarImg.src = userData.avatar;

    userInfo.style.display = 'block';
    result.style.color = 'green';
    result.textContent = 'Login bem-sucedido!';
  } else {
    result.style.color = 'red';
    result.textContent = 'Erro ao buscar dados do usuário.';
  }
});
