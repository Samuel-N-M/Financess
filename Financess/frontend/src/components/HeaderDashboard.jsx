const HeaderDashboard = ({onNavigate, currentPage}) => {
    return (
        <header className="header-dashboard">
            <div className="logo" onClick={() => onNavigate('home')} style={{cursor: 'pointer'}}>Financess</div>
            <nav className="nav-dashboard">
                <span 
                    className={currentPage === 'dashboard' ? 'active' : ''}
                    onClick={() => onNavigate('dashboard')}
                >
                    Dashboard
                </span>
                <span
                    className={currentPage === 'transactions' ? 'active' : ''}
                    onClick={() => onNavigate('transactions')}
                >
                    Transações
                </span>
                <span 
                    className={currentPage === 'metas' ? 'active' : ''}
                    onClick={() => onNavigate('metas')}
                >
                    Metas
                </span>
                <span
                    className={currentPage === 'relatorio' ? 'active' : ''}
                    onClick={() => onNavigate('relatorio')}
                >
                    Relatórios
                </span>
                <span>Configurações</span>
            </nav>

            <div className="user-profile">
                <span className="profile-icon">👤</span>
                <div className="profile-text">
                    <span className="profile-title">Minha Conta</span>
                    <span className="logout-link" onClick={() => onNavigate('home')}>Sair</span>
                </div>
            </div>
        </header>
    );
};

export default HeaderDashboard;


