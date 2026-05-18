import Header from '../components/Header';

const Home = ({ onNavigate }) => {
    return (
        <div className='landing-page'>
            <Header onNaigate={onNavigate} />

            <section className='hero'>
                <h1>Transforme sua vida financeira com <span className='highlight'>Financess</span>.</h1>
                <p>Organize suas contas, planeje seu futuro e alcance seus objetivos financeiros de forma simples e inteligente.</p>
                <button className='btn-primary'>Começar agora (Grátis!)</button>
                <div className='app-preview'>
                    <p>Visão Geral do App Financess</p>
                </div>
            </section>

            <section id="recursos" className="features">
                <h2>Recursos Poderosos</h2>  
                <div className='feature-grid'>
                    <div className='feature-card'>
                        <h3>Controle de Gastos</h3>
                        <p>Monitore despesas em tempo real.</p>
                    </div>
                </div>  

                <div className='feature-grid'>
                    <div className='feature-card'>
                        <h3>planejamento</h3>
                        <p>Crie orçamentos personalizados.</p>
                    </div>
                </div>

                <div className='feature-grid'>
                    <div className='feature-card'>
                        <h3>Relatórios</h3>
                        <p>Gráficos intuitivos.</p>
                    </div>
                </div>
            </section>    

            <footer className='footer-home'>
                <p>© 2026 Financess. Todos os direitos reservados.</p>
            </footer>        
        </div>
    );
}

export default Home;

