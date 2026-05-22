import { useState, useEffect } from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import api from "../services/api";

const Transactions = ({ onNavigate }) => {
    // Estados para guardar dados da API
    const [transactions, setTransactions] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    // Estados para os Filtros
    const [displayTransactions, setDisplayTransactions] = useState([]); // Lista que será efetivamente mostrada
    const [filterTipo, setFilterTipo] = useState("Todos");
    const [filterCategoria, setFilterCategoria] = useState("Todos");
    const [filterDataInicio, setFilterDataInicio] = useState("");
    const [filterDataFim, setFilterDataFim] = useState("");

    // Executa a busca de dados quando a página carrega
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Faz as duas requisições ao mesmo tempo (Transações e Categorias)
                const [resTransacoes, resCategorias] = await Promise.all([
                    api.get('/transacoes'),
                    api.get('/categorias')
                ]);

                setTransactions(resTransacoes.data);
                setDisplayTransactions(resTransacoes.data); // Inicialmente mostra todas
                setCategorias(resCategorias.data);
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
                setErro("Erro ao carregar o histórico de transações.");
                if (err.response?.status === 401) {
                    onNavigate('login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [onNavigate]);

    // ===== LÓGICA DE FILTRAGEM ===== //
    const handleApplyFilters = () => {
        let filtradas = transactions;

        // Filtro por Tipo (Receita ou Despesa)
        if (filterTipo !== "Todos") {
            filtradas = filtradas.filter(t => t.tipo.toLowerCase() === filterTipo.toLowerCase());
        }

        // Filtro por Categoria
        if (filterCategoria !== "Todos") {
            // filterCategoria guarda o ID da categoria em formato string
            filtradas = filtradas.filter(t => t.categoria_id.toString() === filterCategoria);
        }

        // Filtro por Data de Início
        if (filterDataInicio) {
            filtradas = filtradas.filter(t => new Date(t.data_ocorrencia) >= new Date(filterDataInicio));
        }

        // Filtro por Data de Fim
        if (filterDataFim) {
            filtradas = filtradas.filter(t => new Date(t.data_ocorrencia) <= new Date(filterDataFim));
        }

        setDisplayTransactions(filtradas);
    };

    // ===== FUNÇÕES DE FORMATAÇÃO E AUXILIARES ===== //
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const [ano, mes, dia] = dateString.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    const getCategoriaNome = (id) => {
        const categoria = categorias.find(c => c.id === id);
        return categoria ? categoria.nome : "Sem Categoria";
    };

    return (
        <div className="transactions-page">
            <HeaderDashboard onNavigate={onNavigate} currentPage="transactions" />

            <main className="transactions-content"> {/* Corrigido de 'transactions-contente' */}
                <h1 className="page-title">Minhas Transações</h1>

                {/* Mensagem de Erro (se houver) */}
                {erro && (
                    <div style={{ color: '#d9534f', backgroundColor: '#fdf7f7', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                        {erro}
                    </div>
                )}

                {/* Seção de Filtros */}
                <section className="filters-grid-section" style={{ marginBottom: '20px' }}>
                    <h2 className="filters-title">Filtrar Transações</h2>

                    <div className="filters-grid">
                        {/* Filtro de Tipo */}
                        <div className="filter-group">
                            <label>Tipo:</label>
                            <select 
                                value={filterTipo} 
                                onChange={(e) => setFilterTipo(e.target.value)}
                            >
                                <option value="Todos">Todos</option>
                                <option value="receita">Receita</option>
                                <option value="despesa">Despesa</option>
                            </select>
                        </div>

                        {/* Filtro de Categoria Dinâmico */}
                        <div className="filter-group">
                            <label>Categoria:</label>
                            <select 
                                value={filterCategoria} 
                                onChange={(e) => setFilterCategoria(e.target.value)}
                            >
                                <option value="Todos">Todas as Categorias</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                                ))}
                            </select>
                        </div>

                        {/* Filtros de Data */}
                        <div className="filter-group">
                            <label>De:</label>
                            <input 
                                type="date" 
                                className="input-date" 
                                value={filterDataInicio}
                                onChange={(e) => setFilterDataInicio(e.target.value)}
                            />
                        </div>

                        <div className="filter-group">
                            <label>Até:</label>
                            <input 
                                type="date" 
                                className="input-date" 
                                value={filterDataFim}
                                onChange={(e) => setFilterDataFim(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="filters-action-row" style={{ marginTop: '15px' }}>
                        <button className="btn-apply-filter" onClick={handleApplyFilters}>
                            <span className="filter-icon">⏳</span> Aplicar Filtro
                        </button>
                    </div>
                </section>

                {/* Tabela de Transações */}
                <div className="transactions-table-wrapper">
                    {loading ? (
                        <p style={{ padding: '20px' }}>A carregar histórico...</p>
                    ) : (
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
                                {displayTransactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                            Nenhuma transação encontrada com os filtros atuais.
                                        </td>
                                    </tr>
                                ) : (
                                    displayTransactions.map((item) => (
                                        <tr key={item.id}>
                                            <td>{formatDate(item.data_ocorrencia)}</td>
                                            <td>{item.descricao}</td>
                                            <td>
                                                {/* Corrigido class name para usar a categoria dinâmica */}
                                                <span className={`tag-categoria`}>{getCategoriaNome(item.categoria_id)}</span>
                                            </td>
                                            <td className={item.tipo === 'receita' ? 'text-income' : 'text-expense'}>
                                                {item.tipo === 'receita' ? '+' : '-'} {formatCurrency(item.valor)}
                                            </td>
                                            <td>
                                                <span className={`tag-type ${item.tipo === 'receita' ? 'badge-income' : 'badge-expense'}`}>
                                                    {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)} {/* Capitaliza a palavra */}
                                                </span>
                                            </td>
                                            <td>
                                                {/* Como não há campo de status na BD atual, fixamos como Concluído */}
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

export default Transactions;