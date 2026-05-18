import Header from "../components/Header";

const Login = ({ onNavigate }) => {
    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();

        // Aqui no futuro você colocará a lógica de autenticação (API)
        onNavigate('dashboard');
    };

    return (
        <div className="login-page">
            <Header onNaigate={onNavigate} />

            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-title">Finaceiras</h1>
                    <p className="login-subtitle">Acesse sua conta para continuar.</p>
                
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>E-mail:</label>
                            <input type="email" placeholder="seuemail@exemplo.com" required />
                        </div>

                        <div className="input-group">
                            <label>Senha:</label>
                            <input type="password" placeholder="Sua senha" required />
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" /> Lembrar-me
                            </label>
                            <a href="#" className="forgot-password">Esqueceu minha senha</a>
                        </div>

                        <button type="submit" className="btn-entra">Entra</button>
                    </form>

                    <p className="signup-text">
                        Não tem uma conta? 
                        <a href="#" className="highlight" onClick={(e) => {
                            e.preventDefault();
                            onNavigate('dashboard');
                        }}>
                            Crie uma conta
                        </a>
                    </p>
                </div>
            </div>

            <footer className="footer-login">
                <p>© 2026 Financess. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default Login;

