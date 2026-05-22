import { useState } from 'react';
import api from '../services/api';

const Register = ({ onNavigate }) => {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  // Estados para feedback visual
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // 1. Validação no Frontend
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      // 2. Enviar os dados para o backend (auth_controller.py)
      await api.post('/auth/register', {
        nome: nome,
        email: email,
        senha: senha
      });

      // 3. Feedback de sucesso e redirecionamento seguro
      setSucesso('Conta criada com sucesso! A redirecionar para o login...');
      
      setTimeout(() => {
        onNavigate('login');
      }, 2000);

    } catch (error) {
      console.error("Erro ao registar utilizador:", error);
      setErro(error.response?.data?.erro || error.response?.data?.detalhes || "Ocorreu um erro ao criar a conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Cabeçalho minimalista para a página de registo */}
      <header style={{ padding: '20px 30px', backgroundColor: 'transparent' }}>
          <h2 onClick={() => onNavigate('home')} style={{ margin: 0, color: '#2b7a78', fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' }}>Financess</h2>
      </header>
      
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Criar Conta</h1>
          <p className="login-subtitle">Comece a gerir as suas finanças hoje mesmo.</p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            
            {/* Mensagens de Erro ou Sucesso */}
            {erro && (
              <div style={{ color: '#d9534f', backgroundColor: '#fdf7f7', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px', border: '1px solid #d9534f' }}>
                  {erro}
              </div>
            )}
            {sucesso && (
              <div style={{ color: '#4caf50', backgroundColor: '#f0fdf4', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px', border: '1px solid #4caf50' }}>
                  {sucesso}
              </div>
            )}

            <div className="input-group">
              <label>Nome Completo:</label>
              <input 
                type="text" 
                placeholder="O seu nome completo" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required 
                disabled={loading || sucesso}
              />
            </div>

            <div className="input-group">
              <label>E-mail:</label>
              <input 
                type="email" 
                placeholder="seuemail@exemplo.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={loading || sucesso}
              />
            </div>
            
            <div className="input-group">
              <label>Senha:</label>
              <input 
                type="password" 
                placeholder="Mínimo 6 caracteres" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required 
                disabled={loading || sucesso}
              />
            </div>

            <div className="input-group">
              <label>Confirmar Senha:</label>
              <input 
                type="password" 
                placeholder="Repita a sua senha" 
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required 
                disabled={loading || sucesso}
              />
            </div>
            
            <button type="submit" className="btn-entra" style={{ marginTop: '20px' }} disabled={loading || sucesso}>
              {loading ? 'A criar conta...' : 'Criar Conta'}
            </button>
          </form>
          
          <p className="signup-text">
            Já tem uma conta?{' '}
            <a 
              href="#" 
              className="highlight-text" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate('login');
              }}
            >
              Faça Login
            </a>
          </p>
        </div>
      </div>
      
      <footer className="footer-login">
        <p>© 2026 Financess. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Register;