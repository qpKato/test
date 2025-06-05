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

    // Exibir apenas o token de login
    result.style.color = 'green';
    result.textContent = `Login bem-sucedido! Token: ${loginData.token}`;
    userInfo.style.display = 'none';

  } catch (error) {
    result.style.color = 'red';
    result.textContent = `Erro na conexão: ${error.message}`;
  }
});
