import HeaderDashboard from "../components/HeaderDashboard";

const Meta = ({onNavigate}) => {
    const metasData = [
        {
            title: 'Viagem para Europa',
            target: '',
            saved: 'R$ 12.500,00',
            date: 'Dezembro 2027',
            completed: false
        },
        {
            title: 'Novo Portátil',
            target: '',
            saved: 'R$ 6.000,00',
            date: 'Agosto 2026',
            completed: false
        },
        {
            title: 'Curso de Fotografia',
            target: '',
            saved: 'R$ 1.500,00',
            date: 'Dezembro 2026',
            completed: true,
            progressText: '100 % Atingido'
        },
        {
            title: 'Fundo de Emergência',
            target: '',
            saved: 'R$ 500,00',
            date: 'Contínuo',
            completed: false
        }
    ];

    return (
        <div className="metas-page">
            <HeaderDashboard onNavigate={onNavigate} />

            <main className="metas-content">
                <div className="metas-header-row">
                    <h1 className="metas-title">Minhas Metas Financeiras</h1>
                    <button className="btn-add-goal" onClick={() => onNavigate('add-goal')}>
                        <span className="plus-icon">➕</span> Adicionar Nova Meta
                    </button>
                </div>

                <div className="goals-grid">
                    {metasData.map((meta, idx) => (
                        <div key={idx} className={`meta-card ${meta.completed ? 'meta-completed-card' : ''}`}>
                            <div className="meta-card-header">
                                <h3 className="meta-card-title">{meta.title}</h3>
                                <div className="meta-card-actions">
                                    <span className="icon-edit" title="Editar">📝</span>
                                    <span className="icon-delete" title="Excluir">🗑️</span>
                                </div>
                            </div>

                            <div className="meta-card-body">
                                <p><span className="label-dim">Alvo:</span> {meta.target} </p>
                                <p>
                                    <span className="label-dim">Poupado:</span>{' '}
                                    <span className="text-green">{meta.saved}</span>
                                </p>
                                <p><span className="label-dim">Data Alvo:</span> {meta.date} </p>
                            </div>

                            <div className="meta-card-footer">
                                {meta.completed ? (
                                    <div className="progress-container">
                                        <div className="progress-bar-bg">
                                            <div className="progress-bar-fill" style={{width: '100%'}}>
                                                {meta.progressText}
                                            </div>
                                        </div>
                                        <button className="btn-meta-done" disabled>Meta Concluída</button>
                                    </div>
                                ) : (
                                    <button className="btn-add-contribution">Adicionar Contribuição</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="footer-dashboard">
                <p>© 2026 Financess. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default Meta;