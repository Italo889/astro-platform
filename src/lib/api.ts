import axios from 'axios';

// Criamos uma instância do axios com configurações pré-definidas
export const api = axios.create({
  // A URL base da nossa API de back-end.
  // Em desenvolvimento, é o endereço do nosso servidor Fastify.
  baseURL: 'http://localhost:3000', // Certifique-se de que a porta é a mesma do seu back-end

  // Definimos um timeout para as requisições, uma boa prática para evitar esperas infinitas.
  timeout: 10000, // 10 segundos
});

// No futuro, quando tivermos o token JWT, poderemos adicionar um "interceptor" aqui
// para incluir automaticamente o token em todas as requisições, mas por enquanto,
// esta configuração base é perfeita.