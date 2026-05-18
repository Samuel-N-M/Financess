export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="cta-final" style={{ background: 'var(--accent)', color: '#fff', padding: '60px 20px' }}>
                <h2 style={{ color: '#fff' }}>Pronto para assumir o controle das suas finanças?</h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '24px' }}>Junta-se a milhares de pessoas que estão transformando sua relação com o dinheiro.</p>
                <button style={{
                    background: '#111111',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: '600'
                }}>Crie sua conta gratuita</button>
            </div>

            <div className="footer-links">
                <div className="footer-brand">
                    <h3 style={{ color: 'var(--accent)' }}>Financess</h3>
                    <p>Sua jornada para a liberdade financeira começa aqui.</p>
                </div>

                <div className="footer-col">
                    <h4>Links Rápidos</h4>
                    <a href="#recursos">Recursos</a>
                    <a href="#preços">Preços</a>
                </div>

                <div className="footer-col">
                    <h4>Legal</h4>
                    <a href="#privacidade">Privacidade</a>
                    <a href="#faq">FAQ</a>
                </div>
            </div>
            <div className="copyright">
                &copy; 2026 Financess. Todos os direitos reservados.
            </div>
        </footer>
    );
}

