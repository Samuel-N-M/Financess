import HeaderDashboard from "../components/HeaderDashboard";

const Transactions = ({onNavigate}) => {
    const transactionsData = [
        { date: '05/05/2024', desc: 'Salário Mensal', category: 'Receita', value: '+ R$ 5.876,00', type: 'Receita', status: 'Concluído', catClass: 'cat-income', typeClass: 'badge-income' },
        { date: '25/05/2024', desc: 'Conta de Luz', category: 'Moradia', value: '- R$ 120,75', type: 'Despesa', status: 'Pendente', catClass: 'cat-home', typeClass: 'badge-expense' },
        { date: '23/05/2024', desc: 'Gasolina Posto Shell', category: 'Transporte', value: '- R$ 150,00', type: 'Despesa', status: 'Concluído', catClass: 'cat-transporte', typeClass: 'badge-expense' },
        { date: '23/05/2024', desc: 'Cinema Ingresso', category: 'Lazer', value: '- R$ 45,00', type: 'Despesa', status: 'Concluído', catClass: 'cat-leisure', typeClass: 'badge-expense' },
        { date: '25/05/2024', desc: 'Freela Design Gráfico', category: 'Freelance', value: '+ R$ 1.200,00', type: 'Receita', status: 'Concluído', catClass: 'cat-freela', typeClass: 'badge-income' },
        { date: '24/05/2024', desc: 'Mensalidade Academia', category: 'Saúde', value: '- R$ 129,90', type: 'Despesa', status: 'Concluído', catClass: 'cat-health', typeClass: 'badge-expense' }    
    ];

    return (
        <div className="transactions-page">
            <HeaderDashboard onNavigate={onNavigate} currentPage="transactions" />

            <main className="transactions-contente">
                <h1 className="page-title">Minha Transações</h1>

                {/* Seção de Filtros */}
                <section className="filters-grid">
                    <h2 className="filters-title">Filtrar Transações</h2>

                    <div className="filters-grid">
                        <div className="filter-group">
                            <label>Tipo:</label>
                            <select defaultValue="Todos">
                                <option value="Todos">Todos</option>
                                <option value="Receita">Receita</option>
                                <option value="Despesa">Despesa</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Categoria:</label>
                            <select defaultValue="Todos">
                                <option value="Todos">Todos</option>
                                <option value="Alimentação">Alimentação</option>
                                <option value="Moradia">Moradia</option>
                                <option value="Transporte">Transporte</option>
                                <option value="Lazer">Lazer</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Saúde">Saúde</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>De:</label>
                            <input type="date" className="input-date" />
                        </div>

                        <div className="filter-group">
                            <label>Até:</label>
                            <input type="date" className="input-date" />
                        </div>
                    </div>

                    <div className="filters-action-row">
                        <button className="btn-apply-filter">
                            <span className="filter-icon">⏳</span> Aplicar Filtro
                        </button>
                    </div>
                </section>

                <div className="transactions-teble-wrapper">
                    <table className="main-transactions-table">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Valor</th>
                                <th>Tipo</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionsData.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.date}</td>
                                    <td>{item.desc}</td>
                                    <td>
                                        <span className={`tag-categoria ${item.catClass}`}>{item.category}</span>
                                    </td>
                                    <td className={item.type === 'Receita' ? 'text-income' : 'text-expense'}>
                                        {item.value}
                                    </td>
                                    <td>
                                        <span className={`tag-type ${item.typeClass}`}>{item.type}</span>
                                    </td>
                                    <td>
                                        <span className={`tag-status ${item-status.toLowerCase()}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <footer className="footer-dashboard">
                <p>© Financess. Todos os Direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Transactions;