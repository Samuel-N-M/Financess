import { useState, useEffect } from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import api from "../services/api";

const Relatorio = ({ onNavigate }) => {
    const [transacoes, setTransacoes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [resumoGlobal, setResumoGlobal] = useState({ total_receitas: 0, total_despesas: 0, saldo_total: 0 });
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    // Filtros de tempo
    const [periodoFiltro, setPeriodoFiltro] = useState("Todos");

    // ===== BUSCAR DADOS NA API ===== //
    useEffect(() => {
        const fetchRelatorios = async () => {
            try {
                // Dispara as três requisições ao mesmo tempo
                const [resTransacoes, resCategorias, resResumo] = await Promise.all([
                    api.get('/transacoes'),
                    api.get('/categorias'),
                    api.get('/relatorios/resumo') // A rota que acabou de criar no backend
                ]);

                setTransacoes(resTransacoes.data);
                setCategorias(resCategorias.data);
                setResumoGlobal(resResumo.data);
            } catch (err) {
                console.error("Erro ao carregar relatórios:", err);
                setErro("Erro ao carregar os dados dos relatórios.");
                if (err.response?.status === 401) {
                    onNavigate('login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRelatorios();
    }, [onNavigate]);

    // ===== FUNÇÕES AUXILIARES ===== //
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const getCategoriaNome = (id) => {
        const categoria = categorias.find(c => c.id === id);
        return categoria ? categoria.nome : "Sem Categoria";
    };

    // Aplica o filtro de período (simplificado para "Todos" ou "Mês Atual" como exemplo)
    const transacoesFiltradas = transacoes.filter(t => {
        if (periodoFiltro === "Todos") return true;
        
        const dataTransacao = new Date(t.data_ocorrencia);
        const hoje = new Date();
        
        if (periodoFiltro === "Mês Atual") {
            return dataTransacao.getMonth() === hoje.getMonth() && dataTransacao.getFullYear() === hoje.getFullYear();
        }
        return true; // Para "Últimos 3 Meses" etc., bastaria adicionar a lógica de datas aqui
    });

    // ===== LÓGICA DE PROCESSAMENTO DE DADOS ===== //

    // 1. Despesas por Categoria (Somas e Percentagens)
    const despesasPorCategoria = () => {
        const despesas = transacoesFiltradas.filter(t => t.tipo === 'despesa');
        const totalDespesas = despesas.reduce((acc, curr) => acc + curr.valor, 0);
        
        const agrupado = {};
        despesas.forEach(t => {
            const nomeCat = getCategoriaNome(t.categoria_id);
            if (!agrupado[nomeCat]) agrupado[nomeCat] = 0;
            agrupado[nomeCat] += t.valor;
        });

        // Converte o objeto num array ordenado do maior para o menor valor
        return Object.keys(agrupado).map(nome => ({
            nome,
            valor: agrupado[nome],
            percentagem: totalDespesas > 0 ? ((agrupado[nome] / totalDespesas) * 100).toFixed(1) : 0
        })).sort((a, b) => b.valor - a.valor);
    };

    // 2. Receitas vs Despesas (Agrupado por Mês/Ano)
    const receitasVsDespesasPorMes = () => {
        const agrupado = {};
        
        // Vamos inverter o array para que fique por ordem cronológica natural
        [...transacoesFiltradas].reverse().forEach(t => {
            const [ano, mes] = t.data_ocorrencia.split('-');
            const chaveMesAno = `${mes}/${ano}`;
            
            if (!agrupado[chaveMesAno]) {
                agrupado[chaveMesAno] = { receitas: 0, despesas: 0 };
            }
            
            if (t.tipo === 'receita') agrupado[chaveMesAno].receitas += t.valor;
            if (t.tipo === 'despesa') agrupado[chaveMesAno].despesas += t.valor;
        });

        return Object.keys(agrupado).map(mesAno => ({
            mes: mesAno,
            ...agrupado[mesAno],
            saldo: agrupado[mesAno].receitas - agrupado[mesAno].despesas
        }));
    };

    // 3. Evolução do Saldo (Lista cronológica do saldo após cada transação)
    const evolucaoSaldo = () => {
        let saldoAcumulado = 0;
        // Ordenar as transacoes da mais antiga para a mais recente
        const transacoesOrdenadas = [...transacoesFiltradas].sort((a, b) => new Date(a.data_ocorrencia) - new Date(b.data_ocorrencia));
        
        return transacoesOrdenadas.map(t => {
            if (t.tipo === 'receita') saldoAcumulado += t.valor;
            if (t.tipo === 'despesa') saldoAcumulado -= t.valor;
            
            return {
                data: t.data_ocorrencia.split('-').reverse().join('/'),
                saldo: saldoAcumulado
            };
        });
    };

    // 4 e 5. Maiores Receitas e Maiores Despesas Individuais (Top 5)
    const maioresReceitas = transacoesFiltradas
        .filter(t => t.tipo === 'receita')
        .sort((a, b) => b.valor - a.valor)
        .slice(0, 5);

    const maioresDespesas = transacoesFiltradas
        .filter(t => t.tipo === 'despesa')
        .sort((a, b) => b.valor - a.valor)
        .slice(0, 5);


    return (
        <div className="relatorio-page">
            <HeaderDashboard onNavigate={onNavigate} currentPage="relatorio" />

            <main className="relatorio-content">
                <h1 className="page-title">Meus Relatórios Financeiros</h1>

                {erro && (
                    <div style={{ color: '#d9534f', backgroundColor: '#fdf7f7', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                        {erro}
                    </div>
                )}

                {/* 0. Resumo Global Vindo do relatorio_controller.py */}
                <div className="summary-grid" style={{ marginBottom: '20px' }}>
                    <div className="summary-card">
                        <span className="card-label">Saldo Histórico Total</span>
                        <span className={`card-value ${resumoGlobal.saldo_total < 0 ? 'text-expense' : 'value-total'}`}>
                            {formatCurrency(resumoGlobal.saldo_total)}
                        </span>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">Todas as Receitas</span>
                        <span className="card-value value-income">{formatCurrency(resumoGlobal.total_receitas)}</span>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">Todas as Despesas</span>
                        <span className="card-value value-expense">{formatCurrency(resumoGlobal.total_despesas)}</span>
                    </div>
                </div>

                {/* 1. Filtrar Relatórios */} 
                <section className="relatorio-card filter-card-relatorio">
                    <h2 className="card-relatorio-title">Filtrar Detalhes</h2>
                    <div className="filter-relatorio-group" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <label>Período:</label>
                        <select 
                            value={periodoFiltro} 
                            onChange={(e) => setPeriodoFiltro(e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="Todos">Todo o Histórico</option>
                            <option value="Mês Atual">Mês Atual</option>
                        </select>
                    </div>
                </section>

                {loading ? (
                    <p style={{ padding: '20px' }}>A processar os seus relatórios...</p>
                ) : (
                    <>
                        {/* 2. Despesas por Categoria */}
                        <section className="relatorio-card">
                            <h2 className="card-relatorio-title">Despesas por Categoria</h2>
                            <div className="relatorio-data-list">
                                {despesasPorCategoria().length === 0 ? (
                                    <p style={{ color: '#666', padding: '10px 0' }}>Nenhuma despesa registada neste período.</p>
                                ) : (
                                    despesasPorCategoria().map((cat, idx) => (
                                        <div className="report-row-item" key={idx}>
                                            <span>{cat.nome}</span>
                                            <strong className="text-expense">{formatCurrency(cat.valor)} ({cat.percentagem}%)</strong>
                                        </div> 
                                    ))
                                )}
                            </div>
                            <p className="card-relatorio-footer">Distribuição das suas despesas por categoria no período selecionado.</p>
                        </section>

                        {/* 3. Receitas vs. Despesas */}
                        <section className="relatorio-card">
                            <h2 className="card-relatorio-title">Receitas vs. Despesas (Mensal)</h2>
                            <div className="relatorio-table-wrapper">
                                <table className="relatorio-table">
                                    <thead>
                                        <tr>
                                            <th>Mês/Ano</th>
                                            <th>Receitas</th>
                                            <th>Despesas</th>
                                            <th>Saldo do Mês</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {receitasVsDespesasPorMes().length === 0 ? (
                                            <tr><td colSpan="4" style={{textAlign: "center"}}>Sem dados mensais.</td></tr>
                                        ) : (
                                            receitasVsDespesasPorMes().map((mesData, idx) => (
                                                <tr key={idx}>
                                                    <td>{mesData.mes}</td>
                                                    <td className="text-income">{formatCurrency(mesData.receitas)}</td>
                                                    <td className="text-expense">{formatCurrency(mesData.despesas)}</td>
                                                    <td className={mesData.saldo >= 0 ? "text-income" : "text-expense"}>
                                                        {formatCurrency(mesData.saldo)}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <p className="card-relatorio-footer">Comparativo mensal de receitas, despesas e saldo resultante.</p>
                        </section>

                        {/* 4. Evolução do Saldo */}
                        <section className="relatorio-card">
                            <h2 className="card-relatorio-title">Evolução Histórica do Saldo</h2>
                            <div className="relatorio-table-wrapper" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                <table className="relatorio-table">
                                    <thead>
                                        <tr>
                                            <th>Data</th>
                                            <th style={{textAlign: 'right'}}>Saldo Acumulado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {evolucaoSaldo().length === 0 ? (
                                            <tr><td colSpan="2" style={{textAlign: "center"}}>Sem histórico de saldo.</td></tr>
                                        ) : (
                                            evolucaoSaldo().map((evo, idx) => (
                                                <tr key={idx}>
                                                    <td>{evo.data}</td>
                                                    <td className={`style-right ${evo.saldo >= 0 ? 'text-income' : 'text-expense'}`}>
                                                        {formatCurrency(evo.saldo)}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <p className="card-relatorio-footer">Acompanhe a progressão do seu saldo após cada transação.</p>
                        </section>

                        {/* 5. Principais Fontes de Receita */}
                        <section className="relatorio-card">
                            <h2 className="card-relatorio-title">Maiores Fontes de Receita</h2>
                            <div className="relatorio-data-list">
                                {maioresReceitas.length === 0 ? (
                                    <p style={{ color: '#666', padding: '10px 0' }}>Nenhuma receita encontrada.</p>
                                ) : (
                                    maioresReceitas.map((rec, idx) => (
                                        <div className="relatorio-row-item" style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee'}} key={idx}>
                                            <span>{rec.descricao} <small style={{color: '#888'}}>({getCategoriaNome(rec.categoria_id)})</small></span>
                                            <strong className="text-income">{formatCurrency(rec.valor)}</strong>
                                        </div>
                                    ))
                                )}
                            </div>
                            <p className="card-relatorio-footer">As suas 5 maiores receitas individuais.</p>
                        </section> 

                        {/* 6. Maiores Despesas (Detalhado) */}
                        <section className="relatorio-card">
                            <h2 className="card-relatorio-title">Maiores Despesas Individuais</h2>
                            <div className="relatorio-data-list">
                                {maioresDespesas.length === 0 ? (
                                    <p style={{ color: '#666', padding: '10px 0' }}>Nenhuma despesa encontrada.</p>
                                ) : (
                                    maioresDespesas.map((desp, idx) => (
                                        <div className="relatorio-row-item" style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee'}} key={idx}>
                                            <span>{desp.descricao} <small style={{color: '#888'}}>({getCategoriaNome(desp.categoria_id)})</small></span>
                                            <strong className="text-expense">{formatCurrency(desp.valor)}</strong>
                                        </div>
                                    ))
                                )}
                            </div>
                            <p className="card-relatorio-footer">As suas 5 despesas mais significativas.</p>
                        </section>
                    </>
                )}
            </main>

            <footer className="footer-dashboard">
                <p>© 2026 Financess. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Relatorio;