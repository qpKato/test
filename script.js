try {
  const userRes = await fetch('https://reqres.in/api/users?page=1');

  if (!userRes.ok) {
    throw new Error(`Erro no GET /users: ${userRes.status}`);
  }

  const userData = await userRes.json();
  const users = userData.data;

  const matchedUser = users.find(user => user.email === email);

  if (!matchedUser) {
    result.style.color = 'red';
    result.textContent = 'E-mail não cadastrado.';
    return;
  }

  const loginRes = await fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!loginRes.ok) {
    const loginData = await loginRes.json();
    result.style.color = 'red';
    result.textContent = loginData.error || 'Erro no login.';
    return;
  }

  const loginData = await loginRes.json();

  result.style.color = 'green';
  result.textContent = 'Login bem-sucedido!';
  nameSpan.textContent = `${matchedUser.first_name} ${matchedUser.last_name}`;
  emailSpan.textContent = matchedUser.email;
  avatarImg.src = matchedUser.avatar;
  userInfo.style.display = 'block';

} catch (error) {
  result.style.color = 'red';
  result.textContent = `Erro na conexão: ${error.message}`;
}
