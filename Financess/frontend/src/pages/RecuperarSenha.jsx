import React from "react";
import Header from "../components/Header";

const RecuperarSenha = ({ onNavigate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('login');
  };

  return (
    <div className="recovery-page-global">
      <Header onNavigate={onNavigate} />

      <div className="recovery-view-container">
        <div className="recovery-box-card">
          <h1 className="recovery-brand-title">Financess</h1>
          
          <h2 className="recovery-main-heading">
            Esqueceu sua senha?
          </h2>
          
          <p className="recovery-instruction-text">
            Não se preocupe! Insira seu e-mail abaixo e enviaremos um link para você criar uma nova senha.
          </p>

          <form className="recovery-form-element" onSubmit={handleSubmit}>
            <div className="recovery-input-wrapper">
              <label className="recovery-field-label">E-mail:</label>
              <input 
                type="email" 
                className="recovery-input-field" 
                placeholder="seuemail@exemplo.com" 
                required 
              />
            </div>

            <button type="submit" className="recovery-submit-button">
              Enviar Link de recuperação
            </button>
          </form>

          <div className="recovery-footer-links">
            <p className="recovery-link-paragraph">
              Lembrou da senha?{' '}
              <a
                href="#"
                className="recovery-accent-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('login');
                }}
              >
                Voltar para o Login  
              </a>
            </p>

            <p className="recovery-link-paragraph">
              Não tem uma conta?{' '}
              <a
                href="#"
                className="recovery-accent-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('register');
                }}
              >
                Crie uma conta
              </a>
            </p>
          </div>
        </div>
      </div>

      <footer className="recovery-footer-global">
        <p>© 2026 Financess. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default RecuperarSenha;