import { useState, useEffect, useRef } from 'react';

const HeaderDashboard = ({ onNavigate, currentPage }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const dropdownRef = useRef(null);

    // Carrega os dados do utilizador salvos no momento do Login
    useEffect(() => {
        const storedUser = localStorage.getItem('@Financess:user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Erro ao ler dados do utilizador:", error);
            }
        }
    }, []);

    // Fecha o menu suspenso se o utilizador clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    // Lógica para desenhar a Inicial e o Primeiro Nome
    const inicial = user?.nome ? user.nome.charAt(0).toUpperCase() : 'U';
    const primeiroNome = user?.nome ? user.nome.split(' ')[0] : 'Conta';

    return (
        <header className="header-dashboard" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 100
        }}>
            {/* Logo - Herda a cor original do tema */}
            <div className="logo" onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer', margin: 0, fontWeight: 'bold' }}>
                Financess
            </div>

            {/* Links de navegação centrais - Utiliza as classes originais */}
            <nav className="nav-dashboard" style={{ display: 'flex', gap: '25px' }}>
                <span className={currentPage === 'dashboard' ? 'active' : ''} onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer' }}>Dashboard</span>
                <span className={currentPage === 'transactions' ? 'active' : ''} onClick={() => onNavigate('transactions')} style={{ cursor: 'pointer' }}>Transações</span>
                <span className={currentPage === 'metas' ? 'active' : ''} onClick={() => onNavigate('metas')} style={{ cursor: 'pointer' }}>Metas</span>
                <span className={currentPage === 'relatorio' ? 'active' : ''} onClick={() => onNavigate('relatorio')} style={{ cursor: 'pointer' }}>Relatórios</span>
            </nav>

            {/* Área de Perfil do Utilizador com o Dropdown Integrado */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
                <div 
                    onClick={toggleDropdown} 
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px', 
                        cursor: 'pointer', 
                        padding: '6px 12px', 
                        borderRadius: '30px',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    {/* Círculo do Avatar */}
                    <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        backgroundColor: '#2b7a78', 
                        color: '#fff', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}>
                        {inicial}
                    </div>

                    {/* Nome e Indicador Visual */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: '600' }}>{primeiroNome}</span>
                        <svg 
                            width="14" 
                            height="14" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            style={{ 
                                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                                transition: 'transform 0.3s ease' 
                            }}
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>

                {/* Menu Suspenso adaptado para temas escuros com contraste */}
                {dropdownOpen && (
                    <div style={{ 
                        position: 'absolute', 
                        top: '115%', 
                        right: '0', 
                        backgroundColor: '#1a252f', 
                        boxShadow: '0 10px 25px rgba(0,0,0,0.4)', 
                        borderRadius: '12px', 
                        minWidth: '220px', 
                        overflow: 'hidden', 
                        border: '1px solid #2c3e50',
                        color: '#ffffff'
                    }}>
                        {/* Identificação interna do menu */}
                        <div style={{ padding: '15px', borderBottom: '1px solid #2c3e50', backgroundColor: '#111a24' }}>
                            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '15px' }}>{user?.nome || 'Utilizador'}</p>
                            <p style={{ margin: 0, fontSize: '13px', color: '#95a5a6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email || ''}</p>
                        </div>
                        
                        {/* Ações do Menu */}
                        <div style={{ padding: '8px' }}>
                            <div 
                                onClick={() => { setDropdownOpen(false); onNavigate('configuracao'); }} 
                                style={{ padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', transition: 'background-color 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2c3e50'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <span>⚙️</span> Minha Conta
                            </div>
                            
                            <div 
                                onClick={() => { setDropdownOpen(false); onNavigate('logout'); }} 
                                style={{ padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: '#e74c3c', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', marginTop: '4px', transition: 'background-color 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3c1f1f'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <span>🚪</span> Sair da Conta
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default HeaderDashboard;