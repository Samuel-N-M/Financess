const HeaderDashboard = ({onNavigate}) => {
    return (
        <header className="header-dashboard">
            <div className="logo" onClick={() => onNavigate('home')}>Financess</div>
            <nav className="nav-dashboard">
                <span>Transações</span>
                <span>Metas</span>
                <span>Relatórios</span>
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


