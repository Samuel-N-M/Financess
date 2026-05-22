import { useState, useEffect } from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import api from "../services/api";

// Array estático com os meses do ano
const MESES = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const Dashboard = ({ onNavigate }) => {
    // Estados para os dados da API
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados para o filtro de Data (Inicia no mês e ano atuais)
    const dataAtual = new Date();
    const [selectedMonth, setSelectedMonth] = useState(dataAtual.getMonth());
    const [selectedYear, setSelectedYear] = useState(dataAtual.getFullYear());

    // Janela de offsets relativos para criar a listagem infinita/circular
    // O 0 representa o mês selecionado, que ficará fixo no centro da estrutura
    const offsetsVisiveis = [-3, -2, -1, 0, 1, 2, 3];

    // Buscar transações ao montar o componente
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/transacoes');
                setTransactions(response.data);
            } catch (error) {
                console.error("Erro ao carregar transações:", error);
                if (error.response?.status === 401) {
                    onNavigate('login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [onNavigate]);

    // Altera o mês de referência de forma circular e gerencia a transição dos anos
    const handleMonthClick = (offset) => {
        let novoMes = selectedMonth + offset;
        let novoAno = selectedYear;

        if (novoMes < 0) {
            novoMes += 12;
            novoAno -= 1;
        } else if (novoMes > 11) {
            novoMes -= 12;
            novoAno += 1;
        }

        setSelectedMonth(novoMes);
        setSelectedYear(novoAno);
    };

    // ===== LÓGICA DE FILTRAGEM E CÁLCULOS ===== //

    // 1. Filtra as transações para mostrar apenas as do mês e ano selecionados
    const transacoesDoMes = transactions.filter(t => {
        if (!t.data_ocorrencia) return false;
        const [ano, mes] = t.data_ocorrencia.split('-');
        return (parseInt(mes, 10) - 1) === selectedMonth && parseInt(ano, 10) === selectedYear;
    });

    // 2. Calcula o Saldo Histórico TOTAL (independente do mês selecionado)
    const saldoTotalHistorico = transactions.reduce((acc, t) => {
        const valor = parseFloat(t.valor);
        return t.tipo === 'receita' ? acc + valor : acc - valor;
    }, 0);

    // 3. Calcula as Receitas e Despesas APENAS do mês selecionado
    const resumoDoMes = transacoesDoMes.reduce((acc, t) => {
        const valor = parseFloat(t.valor);
        if (t.tipo === 'receita') acc.income += valor;
        if (t.tipo === 'despesa') acc.expense += valor;
        return acc;
    }, { income: 0, expense: 0 });

    // ===== FUNÇÕES DE FORMATAÇÃO ===== //
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const [ano, mes, dia] = dateString.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <div className="dashboard-page">
            <HeaderDashboard onNavigate={onNavigate} />

            <main className="dashboard-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 className="dashboard-title">Meu Dashboard</h1>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#666' }}>{selectedYear}</span>
                </div>

                <div className="summary-grid">
                    <div className="summary-card">
                        <span className="card-label">Saldo Atual</span>
                        <span className={`card-value value-total ${saldoTotalHistorico < 0 ? 'text-expense' : ''}`}>
                            {formatCurrency(saldoTotalHistorico)}
                        </span>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">Receitas do Mês</span>
                        <span className="card-value value-income">{formatCurrency(resumoDoMes.income)}</span>
                        <span className="card-sub">{MESES[selectedMonth]}</span>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">Despesas do Mês</span>
                        <span className="card-value value-expense">{formatCurrency(resumoDoMes.expense)}</span>
                        <span className="card-sub">{MESES[selectedMonth]}</span>
                    </div>
                </div>

                <div className="dashboatd-actions">
                    <button className="btn-action btn-add-income" onClick={() => onNavigate('add-income')}>➕ Adicionar Receita</button>
                    <button className="btn-action btn-add-espense" onClick={() => onNavigate('add-expense')}>➖ Adicionar Despesa</button>
                    <button className="btn-action btn-view-all" onClick={() => onNavigate('transactions')}>👁️ Ver Todas Transações</button>
                </div>

                {/* Barra de Filtro de Meses Circular/Infinita com Destaque Inferior Simples */}
                <div 
                    className="months-filter" 
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '25px', 
                        padding: '10px 0',
                        marginBottom: '20px'
                    }}
                >
                    {offsetsVisiveis.map((offset) => {
                        const indiceMes = (selectedMonth + offset + 12) % 12;
                        const isCurrent = offset === 0;

                        return (
                            <span 
                                key={offset}
                                className={isCurrent ? "active-month" : ""}
                                onClick={() => handleMonthClick(offset)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '6px 0',
                                    // Adiciona apenas uma linha sólida sutil embaixo do mês selecionado
                                    borderBottom: isCurrent ? '3px solid #2b7a78' : '3px solid transparent',
                                    color: isCurrent ? '#2b7a78' : '',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                {MESES[indiceMes]}
                            </span>
                        );
                    })}
                </div>

                {/* Container de listagem mantendo os planos de fundo e classes originais intactos */}
                <div className="transactions-container">
                    {loading ? (
                        <p style={{ textAlign: 'center', padding: '20px' }}>A carregar dados...</p>
                    ) : (
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
                                {transacoesDoMes.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '30px 10px' }}>
                                            Nenhuma transação registada para este mês.
                                        </td>
                                    </tr>
                                ) : (
                                    transacoesDoMes.map((t, idx) => (
                                        <tr key={idx}>
                                            <td>{formatDate(t.data_ocorrencia)}</td>
                                            <td>{t.descricao}</td>
                                            <td>
                                                <span className="tag-category">{t.tipo === 'receita' ? 'Receita' : 'Despesa'}</span>
                                            </td>
                                            <td className={t.tipo === 'receita' ? 'text-income' : 'text-expense'}>
                                                {t.tipo === 'receita' ? '+' : '-'} {formatCurrency(t.valor)}
                                            </td>
                                            <td>
                                                <span className="tag-status concluído">Concluído</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>

            <footer className="footer-dashboard">
                <p>© 2026 Financess. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Dashboard;