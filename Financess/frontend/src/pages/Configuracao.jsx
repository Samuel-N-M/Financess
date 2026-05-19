import HeaderDashboard from "../components/HeaderDashboard";

const Configuracao = ({onNavigate}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="configuracao-page">
            <HeaderDashboard onNavigate={onNavigate} />

            <main className="configuracao-content">
                <div className="configuracao-header">
                    <h1 className="configuracao-title">Configurações</h1>
                    <p className="configuracao-subtitle">Gerencia suas preferências e informações da conta.</p>
                </div>

                {/* 1. Informações do Perfil */}
                <section className="configuracao-section">
                    <h2 className="section-title">Informações do Perfil</h2>
                    <form onSubmit={handleSubmit} className="configuracao-form">
                        <div className="configuracao-input-group">
                            <label>Nome Completo:</label>
                            <input type="text" placeholder="Ususario exemplo" />
                        </div>
                        <div className="configuracao-input-group">
                            <label>Endereço de E-mail:</label>
                            <input type="email" placeholder="Ususario exemplo" />
                        </div>
                        <button type="submit" className="btn-configuracao-save">Salvar Alteração de Perfil</button>
                    </form>
                </section>

                <hr className="configuracao-divider" />

                {/* 2. Segurança */}
                <section className="configuracao-section">
                    <h2 className="section-title">Segurança</h2>
                    <div className="security-actions">
                        <button className="btn-configuracao-dark">Altera Senha</button>

                        <div className="toggle-wrapper">
                            <span className="toggle-label-title">Autenticação de Dois Fatores (2FA)</span>
                            <div className="toggle-control-row">
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                                <span className="toggle-status-text">Desativada</span>
                            </div>
                            <p className="configuracao-dim-text">Adicione uma camada extra de segurança à sua conta.</p>
                        </div>
                    </div>
                </section>

                <hr className="configuracao-divider" />

                {/* 3. Preferências de Notificação */}
                <section className="configuracao-section">
                    <h2 className="section-title">Preferências de Notificação</h2>
                    <div className="notifications-list">
                        <div className="notification-item">
                            <span>Novas transações e atualizações de saldo</span>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="notification-item">
                            <span>Dicas financeiras e novidades do Financess</span>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <button className="btn-configuracao-save" style={{marginTop: '20px'}}>
                        Salvar Preferencia de Notificação
                    </button>
                </section>
                
                <hr className="configuracao-divider" />

                {/* 4. Gerenciamento da Conta */}
                <section className="configuracao-section">
                    <h2 className="section-title">Gerenciamento da Conta</h2>
                    <button className="btn-configuracao-danger">Excluir Minha Conta</button>
                    <p className="configuracao-dim-text" style={{marginTop: '10px'}}>
                        Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.
                    </p>
                </section>

                <hr className="settings-divider" />

                {/* Link de retorno inferior */}
                <div className="back-to-dashboard-wrapper">
                    <span className="back-dashboard-link" onClick={() => onNavigate('dashboard')}>
                        Voltar para Dashboard
                    </span>
                </div>
            </main>

            <footer className="footer-dashboard">
                <p>© 2026 Financess. Todos os direitos resevados.</p>
            </footer>
        </div>
    );
}

export default Configuracao;