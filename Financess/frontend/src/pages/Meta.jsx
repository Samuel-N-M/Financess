import { useState, useEffect } from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import api from "../services/api";

const Meta = ({ onNavigate, currentPage }) => {
    // Estados para armazenar as metas, controlo de carregamento e erros
    const [metas, setMetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    // Função para ir buscar as metas ao backend
    const fetchMetas = async () => {
        try {
            // Requisita os dados das metas do utilizador logado
            const response = await api.get('/metas');
            setMetas(response.data);
        } catch (error) {
            console.error("Erro ao carregar metas:", error);
            setErro("Não foi possível carregar as suas metas.");
            
            // Se o token expirar, devolve ao login
            if (error.response?.status === 401) {
                onNavigate('login');
            }
        } finally {
            setLoading(false);
        }
    };

    // Executa a busca assim que a página é carregada
    useEffect(() => {
        fetchMetas();
    }, [onNavigate]);

    // ===== FUNÇÕES DE FORMATAÇÃO ===== //
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const [ano, mes, dia] = dateString.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    // Calcula a percentagem da meta atingida
    const calcularProgresso = (atual, alvo) => {
        if (!alvo || alvo === 0) return 0;
        const progresso = (atual / alvo) * 100;
        // Limita a barra a 100% caso o utilizador ultrapasse a meta
        return progresso > 100 ? 100 : progresso.toFixed(1);
    };

    return (
        <div className="dashboard-page">
            <HeaderDashboard onNavigate={onNavigate} currentPage={currentPage || 'goals'} />

            <main className="dashboard-content">
                {/* Cabeçalho da página de Metas */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 className="dashboard-title" style={{ margin: 0 }}>Minhas Metas</h1>
                    <button className="btn-action btn-add-income" onClick={() => onNavigate('add-goal')}>
                        ➕ Nova Meta
                    </button>
                </div>

                {/* Mensagem de Erro */}
                {erro && (
                    <div style={{ color: '#d9534f', backgroundColor: '#fdf7f7', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                        {erro}
                    </div>
                )}

                {/* Área de Conteúdo principal */}
                {loading ? (
                    <p>A carregar as suas metas...</p>
                ) : metas.length === 0 ? (
                    // Estado Vazio (Empty State)
                    <div className="form-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Ainda não tem metas definidas.</h3>
                        <p style={{ color: '#666', marginBottom: '20px' }}>Crie objetivos financeiros para acompanhar a sua poupança.</p>
                        <button className="btn-form-submit" style={{ maxWidth: '200px', margin: '0 auto' }} onClick={() => onNavigate('add-goal')}>
                            Criar a Primeira Meta
                        </button>
                    </div>
                ) : (
                    // Grelha de Metas (aproveitando o estilo dos cards de resumo)
                    <div className="summary-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                        {metas.map((meta) => (
                            <div key={meta.id} className="summary-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                
                                {/* Título e Data */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <span className="card-label" style={{ fontSize: '18px', fontWeight: 'bold', color: '#111' }}>
                                        {meta.nome}
                                    </span>
                                    <span className="tag-category cat-income" style={{ fontSize: '12px' }}>
                                        Alvo: {formatDate(meta.data_alvo)}
                                    </span>
                                </div>
                                
                                {/* Valores */}
                                <div style={{ marginTop: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                                        <span style={{ color: '#666' }}>Guardado: <strong style={{ color: '#333' }}>{formatCurrency(meta.valor_atual)}</strong></span>
                                        <span style={{ color: '#666' }}>Objetivo: <strong style={{ color: '#333' }}>{formatCurrency(meta.valor_alvo)}</strong></span>
                                    </div>
                                    
                                    {/* Barra de Progresso Customizada */}
                                    <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                                        <div 
                                            style={{ 
                                                width: `${calcularProgresso(meta.valor_atual, meta.valor_alvo)}%`, 
                                                backgroundColor: '#2b7a78', // Cor alinhada com o tema
                                                height: '100%',
                                                transition: 'width 0.5s ease-in-out'
                                            }}
                                        ></div>
                                    </div>
                                    
                                    {/* Percentagem Textual */}
                                    <div style={{ textAlign: 'right', fontSize: '12px', marginTop: '6px', fontWeight: 'bold', color: '#2b7a78' }}>
                                        {calcularProgresso(meta.valor_atual, meta.valor_alvo)}% concluído
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className="footer-dashboard">
                <p>© 2026 Financess. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Meta;