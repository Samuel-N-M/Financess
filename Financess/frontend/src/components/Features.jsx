export default function Features() {
    const resources = [
        { title: "Controle de Gastos", desc: "Monitore suas despesas em tempo real e saiba para onde seu dinheiro está indo." },
        { title: "Planejamento e Orçamento", desc: "Crie orçamentos personalizados e planeje seus objetivos financeiros com facilidade." },
        { title: "Relatórios Inteligentes", desc: "Visualize seus dados financeiros com gráficos e relatórios claros e intuitivos." }
    ];

    return (
        <section className="features" id="recursos">
            <h2>Recursos Poderosos para seu Controle Financeiro</h2>
            <div className="features-grid">
                {resources.map((item, index) => (
                    <div key={index} className="feature-card" style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow)',
                        padding: '24px',
                        borderRadius: '8px',
                    }}>
                        <div className="icon-placeholder" style={{ 
                            background: 'var(--accent-bg)', 
                            height: '40px', 
                            width: '40px', 
                            borderRadius: '4px',
                            marginBottom: '16'
                            }}></div>
                        <h3 style={{ color: 'var(--text-h)', marginBottom: '8px' }}>{item.title}</h3>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

