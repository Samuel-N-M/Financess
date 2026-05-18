export default function Features() {
    const steps = [
        { n: "1", title: "Cadastre-se Rapidamente", desc: "Crie sua conta em poucos minutos e comece a organizar suas finanças." },
        { n: "2", title: "Conecte Suas Contas", desc: "(Opcional) Importe transações automaticamente de forma segura." },
        { n: "3", title: "Gerencie e Prospere", desc: "Ultize nossas ferramentas para tomar decisões financeiras mais inteligentes." }
    ];

    return (
        <section className="how-it-works">
            <h2>Como <span style={{ color: 'var(--accent)' }}>Financess</span> Funciona?</h2>
            <div className="steps-grid">
                {steps.map((step) => (
                    <div key={step.n} className="step-item">
                        <div className="step-circle">{step.n}</div>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}