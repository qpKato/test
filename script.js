const form = document.getElementById('login-form');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  result.style.color = 'gray';
  result.textContent = 'Enviando...';

  try {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      result.style.color = 'green';
      result.textContent = `Login bem-sucedido! Token: ${data.token}`;
    } else {
      result.style.color = 'red';
      result.textContent = data.error || 'Erro no login.';
    }
  } catch (error) {
    result.style.color = 'red';
    result.textContent = 'Erro de conexão.';
  }
});
