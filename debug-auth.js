// Teste rápido para verificar o status de autenticação
console.log('=== DEBUG AUTH ===');
console.log('LocalStorage token:', localStorage.getItem('token'));

// Fazer requisição para verificar status
fetch('http://localhost:3333/api/users/badges', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => {
  console.log('API Response:', data);
})
.catch(err => {
  console.log('API Error:', err);
});
