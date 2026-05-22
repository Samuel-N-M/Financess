import { useState } from "react";
import Header from "../components/Header";
import api from "../services/api";

const Login = ({ onNavigate }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    // Lógica real de autenticação conectada ao Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            const response = await api.post('/auth/login', { email, senha });
            const { token, usuario } = response.data;
            
            // Salva as credenciais no navegador
            localStorage.setItem('@Financess:token', token);
            localStorage.setItem('@Financess:user', JSON.stringify(usuario));

            onNavigate('dashboard');
        } catch (err) {
            setErro(err.response?.data?.erro || "Erro ao fazer login. Verifique as suas credenciais.");
        }
    };

    return (
        <div className="login-page">
            <Header onNavigate={onNavigate} /> {/* Erro de digitação corrigido aqui */}

            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-title">Financess</h1>
                    <p className="login-subtitle">Acesse sua conta para continuar.</p>
                
                    <form className="login-form" onSubmit={handleSubmit}>
                        {erro && <p style={{color: '#d9534f', backgroundColor: '#fdf7f7', padding: '10px', borderRadius: '5px', marginBottom: '15px'}}>{erro}</p>}

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
                                placeholder="Sua senha" 
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" /> Lembrar-me
                            </label>
                            <a 
                                href="#" 
                                className="forgot-password" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate('forgot-password');
                                }}
                            >Esqueceu minha senha?</a>
                        </div>

                        <button type="submit" className="btn-entra">Entrar</button>
                    </form>

                    <p className="signup-text">
                        Não tem uma conta? 
                        <a href="#" className="highlight" onClick={(e) => {
                            e.preventDefault();
                            onNavigate('register'); // Link corrigido
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