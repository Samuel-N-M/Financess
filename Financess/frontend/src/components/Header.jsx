
const Header = ({ onNaigate }) => (
    <header className="header">
        <div className="logo" onClick={() => onNaigate('home')} style={{cursor: 'pointer'}}>
            Financess
        </div>

        <nav>
            <a href="#recursos" onClick={() => onNaigate('home')}>Recursos</a>
            <a href="#sobre">Sobre nós</a>
            <a href="#contato">Contato</a>
        </nav>
        <button className="btn-login" onClick={() => onNaigate('login')}>Login</button>
    </header>
);

export default Header;

