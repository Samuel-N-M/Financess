import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// Interceptor de Pedido: Adiciona o token se ele existir
api.interceptors.request.use(async config => {
  const token = localStorage.getItem('@Financess:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de Resposta: Deteta quando a sessão caducou
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o backend devolver erro 401 (Não Autorizado / Token Inválido)
    if (error.response && error.response.status === 401) {
      // Limpamos o localStorage para não entrar num loop infinito de erros
      localStorage.removeItem('@Financess:token');
      localStorage.removeItem('@Financess:user');
      localStorage.removeItem('@Financess:lastPage');
      
      // Opcional: força o reload da página para o React limpar a memória e cair no 'login'
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;