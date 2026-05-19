import HeaderDashboard from "../components/HeaderDashboard";

const Dashboard = ({ onNavigate }) => {
    const transactions = [
        {date: '23/05/2026', desc: 'Salário Mensal', category: 'Receita', value: '+ R$ 5.876,00', status: 'Concluído', type: 'income', catClass: 'cat-income'},
        {date: '23/05/2026', desc: 'Supermercado XYZ', category: 'Alimentação', value: '- R$ 253,50', status: 'Concluído', type: 'expense', catClass: 'cat-food'},
        {date: '23/05/2026', desc: 'Conta de Luz', category: 'Moradia', value: '- R$ 120,75', status: 'Pendente', type: 'expense', catClass: 'cat-home'},
        {date: '23/05/2026', desc: 'Gasolina Posto Shell', category: 'Transporte', value: '- R$ 150,00', status:'Concluído', type:'expense', catClass: 'cat-transport'},
        {date: '23/05/2026', desc: 'Cinema Ingresso', category: 'Lazer', value: '- R$ 45,00', status: 'Concluído', type: 'expense', catClass: 'cat-leisure'},
    ];

    return (
        <div className="dashboard-page">
            <HeaderDashboard onNavigate={onNavigate} />

            <main className="dashboard-content">
                <h1 className="dashboard-title">Meu Dashboard</h1>

                <div className="summary-grid">
                    <div className="summary-card">
                        <span className="card-label">Saldo Atual</span>
                        <span className="card-value value-total">R$ 12.345,67</span>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">Receitas do Mês</span>
                        <span className="card-value value-income">R$ 5.876,00</span>
                        <span className="card-sub">+15% vs mês anterior</span>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">Despesas do Mês</span>
                        <span className="card-value value-expense">R$ 569,25</span>
                        <span className="card-sub">-5% vs mês anterior</span>
                    </div>
                </div>

                <div className="dashboatd-actions">
                    <button className="btn-action btn-add-income" onClick={() => onNavigate('add-income')}>➕ Adicionar Receita</button>
                    <button className="btn-action btn-add-espense" onClick={() => onNavigate('add-expense')}>➖ Adicionar Despesa</button>
                    <button className="btn-action btn-view-all" onClick={() => onNavigate('transactions')}>👁️ Ver Todas Transações</button>
                </div>

                <div className="months-filter">
                    <span>Janeiro</span>
                    <span>Fevereiro</span>
                    <span>Março</span>
                    <span className="active-month">Abril</span>
                    <span>Maio</span>
                    <span>Junho</span>
                    <span>Julho</span>
                </div>

                <div className="transactions-container">
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Valor</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t, idx) => (
                                <tr key={idx}>
                                    <td>{t.date}</td>
                                    <td>{t.desc}</td>
                                    <td>
                                        <span className={`tag-category ${t.catClass}`}>{t.category}</span>
                                    </td>
                                    <td className={t.type === 'income' ? 'text-income' : 'text-expense'}>{t.value}</td>
                                    <td>
                                        <span className={`tag-status ${t.status.toLowerCase()}`}>{t.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <footer className="footer-dashboard">
                <p>© 2026 Financess. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Dashboard;

