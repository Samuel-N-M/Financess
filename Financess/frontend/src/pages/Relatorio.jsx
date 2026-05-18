import HeaderDashboard from "../components/HeaderDashboard";

const Relatorio = ({onNavigate}) => {
    return (
        <div className="relatorio-page">
            <HeaderDashboard onNavigate={onNavigate} currentPage="relatorio" />

            <main className="relatorio-content">
                <h1 className="page-title">Meus Relatórios Financeiros</h1>

                {/* 1. Filtrar Relatórios */} 
                <section className="relatorio-card filter-card-relatorio">
                    <h2 className="card-relatorio-title">Filtrar Relatórios</h2>
                    <div className="filter-relatorio-group">
                        <label>Período:</label>
                        <select defaultValue="Mês Atual">
                            <option value="Mês Atual">Mês Atual</option>
                            <option value="Últimos 3 Meses">Últimos 3 Meses</option>
                            <option value="Últimos Atual">Últimos 6 Meses</option>
                            <option value="Mês Atual">Ano Atual</option>
                        </select>
                    </div>
                    <div className="filter-relatorio-action">
                        <button className="btn-generate-relatorio">📄 Gerar Relatórios</button>
                    </div>
                </section>

                {/* 2. Despesas por Categoria */}
                <section className="relatorio-card">
                    <h2 className="card-relatorio-title">Despesas por Categoria</h2>
                    <div className="relatorio-data-list">
                        <div className="report-row-item"><span>Alimentação</span><strong>R$ 750,50 (35%)</strong></div>       
                        <div className="report-row-item"><span>Transporte</span><strong>R$ 420,00 (20%)</strong></div>
                        <div className="report-row-item"><span>Moradia</span><strong>R$ 630,75 (30%)</strong></div>
                        <div className="report-row-item"><span>Lazer</span><strong>R$ 210,25 (10%)</strong></div>
                        <div className="report-row-item"><span>Outros</span><strong>R$ 105,50 (5%)</strong></div>             
                    </div>
                    <p className="card-relatorio-footer">Distribuição das suas despesas por categoria no período selecionado.</p>
                </section>

                {/* 3. Receitas vs. Despesas */}
                <section className="relatorio-card">
                    <h2 className="card-relatorio-title">Receitas vs. Despesas</h2>
                    <div className="relatorio-table-wrapper">
                        <table className="relatorio-table">
                            <thead>
                                <tr>
                                    <th>Mês</th>
                                    <th>Receitas</th>
                                    <th>Despesas</th>
                                    <th>Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Março 2025</td>
                                    <td className="text-income">R$ 5.200,00</td>
                                    <td className="text-expense">R$ 3.100,00</td>
                                    <td className="text-income">R$ 2.100,00</td>
                                </tr>
                                <tr>
                                    <td>Abril 2025</td>
                                    <td className="text-income">R$ 5.350,00</td>
                                    <td className="text-expense">R$ 3.300,00</td>
                                    <td className="text-income">R$ 2.050,00</td>
                                </tr>
                                <tr>
                                    <td>Maio 2025</td>
                                    <td className="text-income">R$ 5.500,00</td>
                                    <td className="text-expense">R$ 2.950,00</td>
                                    <td className="text-income">R$ 2.550,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="card-relatorio-footer">Comparativo mensal de receitas, despesas e saldo resultante.</p>
                </section>

                {/* 4. Evolução do Saldo */}
                <section className="relatorio-card">
                    <h2 className="card-relatorio-title">Evolução do Saldo</h2>
                    <div className="relatorio-table-wrapper">
                        <table className="relatorio-table">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th style={{textAlign: 'right'}}>Saldo Acumulado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>01/03/2025</td><td className="text-income style-right">R$ 10.500,00</td></tr>
                                <tr><td>01/04/2025</td><td className="text-income style-right">R$ 12.600,00</td></tr>
                                <tr><td>01/05/2025</td><td className="text-income style-right">R$ 14.850,00</td></tr>
                                <tr><td>27/05/2025</td><td className="text-income style-right">R$ 17.200,00</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="card-relatorio-footer">Acompanhe a progressão do seu saldo total ao longo do tempo.</p>
                </section>

                {/* 5. Principais Fontes de Receita */}
                <section className="relatorio-card">
                    <h2 className="card-relatorio-title">Principais Fontes de Receita</h2>
                    <div className="relatorio-data-list">
                        <div className="relatorio-row-item"><span>Salário</span><strong>R$ 5.500,00</strong></div>
                        <div className="relatorio-row-item"><span>Freelance</span><strong className="text-income">R$ 1.200,00</strong></div>
                        <div className="relatotio-row-item"><span>Rendimento de Investimentos</span><strong className="text-income">R$ 350,00</strong></div>
                    </div>
                    <p className="card-relatorio-footer">Identifique de onde vêm as suas maiores receitas no período.</p>
                </section> 

                {/* 6. Maiores Despesas (Detalhado) */}
                <section className="relatorio-card">
                    <h2 className="card-relatorio-title">Maiores Despesas (Detalhado)</h2>
                    <div className="relatorio-data-list">
                        <div className="relatorio-row-item"><span>Aluguel de Condomínio</span><strong className="text-income">R$ 1.800,00</strong></div>
                        <div className="relatorio-row-item"><span>Supermercado XYZ</span><strong className="text-income">R$ 700,00</strong></div>
                        <div className="relatorio-row-item"><span>Prestação Carro</span><strong className="text-income">R$ 600,00</strong></div>
                    </div>
                    <p className="card-relatorio-footer">Veja as suas despesas individuais mais significativas.</p>
                </section>
            </main>

            <footer className="footer-dashboard">
                <p>© 2026 Financess. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};
export default Relatorio;