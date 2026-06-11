import { useState, useEffect } from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import api from "../services/api";

const TransactionForm = ({ onNavigate, type, currentPage }) => {
    const isIncome = type === 'income';

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [dataOcorrencia, setDataOcorrencia] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [observacoes, setObservacoes] = useState("");
    
    const [erro, setErro] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [carregandoCategorias, setCarregandoCategorias] = useState(true);

    // Carrega as categorias do banco de dados
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const tipoBusca = isIncome ? 'receita' : 'despesa';
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

        if (!categoriaId) {
            setErro("Por favor, selecione uma categoria.");
            return;
        }

        try {
            const valorFormatado = parseFloat(valor.replace(',', '.'));
            
            if (isNaN(valorFormatado)) {
                setErro("Por favor, insira um valor numérico válido.");
                return;
            }

            const novaTransacao = {
                descricao: descricao,
                valor: valorFormatado,
                tipo: isIncome ? 'receita' : 'despesa',
                data_ocorrencia: dataOcorrencia, 
                categoria_id: parseInt(categoriaId, 10)
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
                            <div style={{ color: '#d9534f', backgroundColor: '#fdf7f7', padding: '10px', borderRadius: '5px', marginBottom: '15px', border: '1px solid #d9534f' }}>
                                {erro}
                            </div>
                        )}

                        <div className="form-group-row full-width">
                            <label>{isIncome ? 'Descrição da Receita:' : 'Descrição da Despesa:'}</label>
                            <input 
                                type="text" 
                                placeholder="Ex: Salário Mensal" 
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                required 
                            />
                        </div>

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

                        <div className="form-group-row full-width">
                            <label>Categoria:</label>
                            <select 
                                value={categoriaId} 
                                onChange={(e) => setCategoriaId(e.target.value)}
                                required
                                disabled={carregandoCategorias}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                            >
                                <option value="" disabled>
                                    {carregandoCategorias ? "A carregar categorias..." : "Selecione uma categoria"}
                                </option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group-row full-width">
                            <label>Observações (Opcional):</label>
                            <textarea
                                placeholder="Alguma nota adicional..."
                                rows="4"
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                            ></textarea>
                        </div>

                       <div className="form-actions-row">
                            <span className="btn-form-cancel" onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer', color: '#666', fontWeight: 'bold' }}>
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