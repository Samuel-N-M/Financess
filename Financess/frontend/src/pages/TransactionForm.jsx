import { useState, useEffect } from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import api from "../services/api";

const TransactionForm = ({ onNavigate, type, currentPage }) => {
    const isIncome = type === 'income';

    // Estados do formulário
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [dataOcorrencia, setDataOcorrencia] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [contaDestino, setContaDestino] = useState(""); // Mantido visualmente
    const [observacoes, setObservacoes] = useState("");
    const [erro, setErro] = useState("");

    // Estados das categorias
    const [categorias, setCategorias] = useState([]);
    const [carregandoCategorias, setCarregandoCategorias] = useState(true);

    // Carregar as categorias filtradas (Receita ou Despesa) do banco de dados
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const tipoBusca = isIncome ? 'receita' : 'despesa';
                // O seu controlador suporta o filtro '?tipo=' nativamente!
                const response = await api.get(`/categorias?tipo=${tipoBusca}`);
                setCategorias(response.data);
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
                setErro("Não foi possível carregar as categorias.");
                if (error.response?.status === 401) onNavigate('login');
            } finally {
                setCarregandoCategorias(false);
            }
        };

        fetchCategorias();
    }, [isIncome, onNavigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            // Formatar valor (troca vírgula por ponto para o backend aceitar)
            const valorFormatado = parseFloat(valor.replace(',', '.'));

            const novaTransacao = {
                descricao: descricao,
                valor: valorFormatado,
                tipo: isIncome ? 'receita' : 'despesa',
                data_ocorrencia: dataOcorrencia, 
                categoria_id: categoriaId 
            };

            await api.post('/transacoes', novaTransacao);
            onNavigate('dashboard');
        } catch (err) {
            console.error("Erro ao criar transação", err);
            setErro(err.response?.data?.erro || "Erro ao guardar a transação.");
        }
    };

    return (
        <div className="transaction-form-page">
            <HeaderDashboard onNavigate={onNavigate} currentPage={currentPage} />

            <main className="form-content-wrapper">
                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        
                        {erro && (
                            <div style={{ color: '#d9534f', backgroundColor: '#fdf7f7', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                                {erro}
                            </div>
                        )}

                        {/* Descrição */}
                        <div className="form-group-row full-width">
                            <label>{isIncome ? 'Descrição da Receita:' : 'Descrição:'}</label>
                            <input 
                                type="text" 
                                placeholder="Ex: Salário Mensal" 
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                required 
                            />
                        </div>

                        {/* Linha com Valor e Data */}
                        <div className="form-flex-row">
                            <div className="form-group-row half-width">
                                <label>Valor (R$):</label>
                                <input 
                                    type="text" 
                                    placeholder="0,00" 
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="form-group-row half-width">
                                <label>{isIncome ? 'Data da Receita:' : 'Data da Despesa:'}</label>
                                <input 
                                    type="date" 
                                    value={dataOcorrencia}
                                    onChange={(e) => setDataOcorrencia(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Linha com Categoria e Conta de Destino */}
                        <div className="form-flex-row">
                            <div className="form-group-row half-width">
                                <label>Categoria:</label>
                                <select 
                                    value={categoriaId} 
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                    required
                                    disabled={carregandoCategorias}
                                >
                                    <option value="" disabled>
                                        {carregandoCategorias ? "A carregar..." : "Selecione uma categoria"}
                                    </option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group-row half-width">
                                <label>Conta de Destino:</label>
                                <select 
                                    value={contaDestino}
                                    onChange={(e) => setContaDestino(e.target.value)}
                                >
                                    <option value="" disabled>Selecione uma conta</option>
                                    <option value="carteira">Carteira Principal</option>
                                    <option value="banco">Conta Bancária</option>
                                    <option value="poupanca">Poupança</option>
                                </select>
                            </div>
                        </div>

                        {/* Observações */}
                        <div className="form-group-row full-width">
                            <label>Observações (Opcional):</label>
                            <textarea
                                placeholder={isIncome ? "Alguma nota adicional sobre a receita..." : "Alguma nota adicional sobre a despesa..."}
                                rows="5"
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                            ></textarea>
                        </div>

                       {/* Ações Inferiores (Cancelar e Adicionar) */} 
                       <div className="form-actions-row">
                            <span className="btn-form-cancel" onClick={() => onNavigate('dashboard')}>
                                Cancelar
                            </span>
                            <button type="submit" className="btn-form-submit">
                                {isIncome ? '➕ Adicionar Receita' : '➕ Adicionar Despesa'}
                            </button>
                       </div>

                    </form>
                </div>
            </main>

            <footer className="footer-dashboard">
                <p>© 2026 Financess. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default TransactionForm;