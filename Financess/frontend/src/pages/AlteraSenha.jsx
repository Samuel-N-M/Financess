import HeaderDashboard from '../components/HeaderDashboard';

const AlteraSenha = ({ onNavigate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('configuracao'); 
  };

  return (
    <div className="configuracao-page">
      <HeaderDashboard onNavigate={onNavigate} currentPage="configuracao" />

      <main className="configuracao-content">
        <div className="configuracao-header">
          <h1 className="configuracao-title">Alterar Senha</h1>
          <p className="configuracao-subtitle">Escolha uma senha forte para manter sua conta protegida.</p>
        </div>

        <section className="configuracao-section">
          <form onSubmit={handleSubmit} className="configuracao-form">
            <div className="configuracao-input-group">
              <label>Senha Atual:</label>
              <input type="password" placeholder="Sua senha atual" required />
            </div>

            <div className="configuracao-input-group">
              <label>Nova Senha:</label>
              <input type="password" placeholder="Mínimo 8 caracteres" required />
            </div>

            <div className="configuracao-input-group">
              <label>Confirmar Nova Senha:</label>
              <input type="password" placeholder="Repita a nova senha" required />
            </div>

            <button type="submit" className="btn-configuracao-save">
              Salvar Nova Senha
            </button>
          </form>
        </section>

        <hr className="configuracao-divider" />

        {/* Link de retorno inferior */}
        <div className="back-to-dashboard-wrapper">
          <span className="back-dashboard-link" onClick={() => onNavigate('configuracao')}>
            Voltar para Configurações
          </span>
        </div>
      </main>

      <footer className="footer-dashboard">
        <p>© 2025 Financess. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default AlteraSenha;