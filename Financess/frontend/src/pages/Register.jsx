import HeaderDashboard from '../components/Header';

const Register = ({ onNavigate }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de registro no backend entraria aqui
    onNavigate('home'); // Redireciona para o início após criar a conta
  };

  return (
    <div className="login-page"> {/* Reaproveita a estrutura base escura do login */}
      <HeaderDashboard onNavigate={onNavigate} />
      
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Finaceiras</h1>
          <p className="login-subtitle">Crie sua conta para começar a gerenciar suas finanças.</p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nome Completo:</label>
              <input type="text" placeholder="Seu nome completo" required />
            </div>

            <div className="input-group">
              <label>E-mail:</label>
              <input type="email" placeholder="seuemail@exemplo.com" required />
            </div>
            
            <div className="input-group">
              <label>Senha:</label>
              <input type="password" placeholder="Mínimo 8 caracteres" required />
            </div>

            <div className="input-group">
              <label>Confirmar Senha:</label>
              <input type="password" placeholder="Repita sua senha" required />
            </div>
            
            <div className="form-options">
              <label className="remember-me" style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'left', lineHeight: '1.3' }}>
                <input type="checkbox" required style={{ marginTop: '3px', marginRight: '8px' }} /> 
                <span>
                  Eu li e concordo com os <a href="#" className="highlight-text">Termos de Serviço</a> e a <a href="#" className="highlight-text">Política de Privacidade</a>
                </span>
              </label>
            </div>
            
            <button type="submit" className="btn-entra" style={{ marginTop: '10px' }}>Criar Conta</button>
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
        <p>© 2025 Financess. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Register;