import { useState } from 'react';
import Header from '../components/Header';
import api from '../services/api';

const Register = ({ onNavigate }) => {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  // Estados para feedback visual (erros ou sucesso)
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // 1. Validação no Frontend: Verificar se as senhas são iguais
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    // 2. Validação de tamanho mínimo da senha
    if (senha.length < 8) {
      setErro('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    try {
      // 3. Enviar os dados para o backend (espera nome, email e senha)
      await api.post('/auth/register', {
        nome: nome,
        email: email,
        senha: senha
      });

      // 4. Feedback de sucesso e redirecionamento
      setSucesso('Conta criada com sucesso! A redirecionar para o login...');
      
      // Aguarda 2 segundos para o utilizador ler a mensagem e depois vai para o login
      setTimeout(() => {
        onNavigate('login');
      }, 2000);

    } catch (error) {
      console.error("Erro ao registar utilizador:", error);
      // Puxa a mensagem de erro que vem do backend (ex: "Este email já está registado.")
      setErro(error.response?.data?.erro || "Ocorreu um erro ao criar a conta. Tente novamente.");
    }
  };

  return (
    <div className="login-page">
      <Header onNavigate={onNavigate} />
      
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Financess</h1>
          <p className="login-subtitle">Crie sua conta para começar a gerenciar suas finanças.</p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            
            {erro && (
              <div style={{ color: '#d9534f', backgroundColor: '#fdf7f7', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px' }}>
                  {erro}
              </div>
            )}
            {sucesso && (
              <div style={{ color: '#4caf50', backgroundColor: '#f0fdf4', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px' }}>
                  {sucesso}
              </div>
            )}

            <div className="input-group">
              <label>Nome Completo:</label>
              <input 
                type="text" 
                placeholder="Seu nome completo" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required 
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
              />
            </div>
            
            <div className="input-group">
              <label>Senha:</label>
              <input 
                type="password" 
                placeholder="Mínimo 8 caracteres" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label>Confirmar Senha:</label>
              <input 
                type="password" 
                placeholder="Repita sua senha" 
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-options">
              <label className="remember-me" style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'left', lineHeight: '1.3' }}>
                <input type="checkbox" required style={{ marginTop: '3px', marginRight: '8px' }} /> 
                <span>
                  Eu li e concordo com os <a href="#" className="highlight-text">Termos de Serviço</a> e a <a href="#" className="highlight-text">Política de Privacidade</a>
                </span>
              </label>
            </div>
            
            <button type="submit" className="btn-entra" style={{ marginTop: '10px' }} disabled={!!sucesso}>
              Criar Conta
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