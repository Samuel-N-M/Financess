import { useState, useEffect } from 'react';
import HeaderDashboard from '../components/HeaderDashboard';
import api from '../services/api';

const AddGoal = ({ onNavigate, currentPage }) => {
  // Estados para os dados do formulário
  const [nome, setNome] = useState("");
  const [valorAlvo, setValorAlvo] = useState("");
  const [valorAtual, setValorAtual] = useState("");
  const [dataAlvo, setDataAlvo] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [erro, setErro] = useState("");

  // Estados para o carregamento dinâmico das categorias
  const [categorias, setCategorias] = useState([]);
  const [carregandoCategorias, setCarregandoCategorias] = useState(true);

  // Efeito que vai à API buscar as categorias assim que a página abre
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        // Traz todas as categorias registadas para o utilizador atual
        const response = await api.get('/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        setErro("Não foi possível carregar as categorias. Tente novamente.");
        
        // Se a sessão expirou, devolve para o login
        if (error.response?.status === 401) {
            onNavigate('login');
        }
      } finally {
        setCarregandoCategorias(false);
      }
    };

    fetchCategorias();
  }, [onNavigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      // Prepara os valores para a base de dados (substitui vírgulas por pontos)
      const valorAlvoFormatado = parseFloat(valorAlvo.replace(',', '.'));
      const valorAtualFormatado = valorAtual ? parseFloat(valorAtual.replace(',', '.')) : 0;

      // Objeto com a estrutura esperada pelo backend
      const novaMeta = {
        nome: nome,
        valor_alvo: valorAlvoFormatado,
        valor_atual: valorAtualFormatado,
        data_alvo: dataAlvo,
        categoria_id: categoriaId,
        observacoes: observacoes
      };

      // Envia os dados para a API
      await api.post('/metas', novaMeta);
      
      // Se tiver sucesso, volta para a lista de metas
      onNavigate('metas');
    } catch (err) {
      console.error("Erro ao guardar meta:", err);
      setErro(err.response?.data?.erro || "Erro ao guardar a meta. Verifique os dados preenchidos.");
    }
  };

  return (
    <div className="goal-form-page">
      <HeaderDashboard onNavigate={onNavigate} currentPage={currentPage} />

      <main className="goal-form-container">
        <form onSubmit={handleSubmit} className="goal-form-box">
          
          {/* Mensagem de Erro */}
          {erro && (
            <div style={{ color: '#e74c3c', backgroundColor: 'rgba(231, 76, 60, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '15px', border: '1px solid rgba(231, 76, 60, 0.3)' }}>
                {erro}
            </div>
          )}

          {/* Nome da Meta */}
          <div className="goal-form-group full-width">
            <label>Nome da Meta:</label>
            <input 
              type="text" 
              placeholder="Ex: Viagem dos sonhos, Entrada do Apartamento" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required 
            />
          </div>

          {/* Valor Alvo e Valor Inicial */}
          <div className="goal-form-row">
            <div className="goal-form-group">
              <label>Valor Alvo (R$):</label>
              <input 
                type="text" 
                placeholder="0,00" 
                value={valorAlvo}
                onChange={(e) => setValorAlvo(e.target.value)}
                required 
              />
            </div>

            <div className="goal-form-group">
              <label>Valor Inicial Poupado (R$) (Opcional):</label>
              <input 
                type="text" 
                placeholder="0,00" 
                value={valorAtual}
                onChange={(e) => setValorAtual(e.target.value)}
              />
            </div>
          </div>

          {/* Data Alvo e Categoria Dinâmica */}
          <div className="goal-form-row">
            <div className="goal-form-group">
              <label>Data Alvo:</label>
              <input 
                type="date" 
                value={dataAlvo}
                onChange={(e) => setDataAlvo(e.target.value)}
                required 
              />
            </div>

            <div className="goal-form-group">
              <label>Categoria:</label>
              <div className="select-wrapper">
                <select 
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    required
                    disabled={carregandoCategorias}
                    style={{ backgroundColor: carregandoCategorias ? '#f5f5f5' : '#fff' }}
                >
                  <option value="" disabled>
                    {carregandoCategorias ? "A carregar..." : "Selecione uma categoria"}
                  </option>
                  {/* Mapeamento das categorias vindas da base de dados */}
                  {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                          {cat.nome}
                      </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="goal-form-group full-width">
            <label>Observações (Opcional):</label>
            <textarea 
              placeholder="Alguma nota adicional sobre a meta..." 
              rows="5"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            ></textarea>
          </div>

          {/* Ações: Cancelar e Guardar Meta */}
          <div className="goal-form-actions">
            <span className="goal-btn-cancel" onClick={() => onNavigate('metas')}>
              Cancelar
            </span>
            <button type="submit" className="goal-btn-submit">
              {/* Ícone de fita branca */}
              <svg className="bookmark-svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px', marginRight: '8px' }}>
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
              </svg>
              Guardar Meta
            </button>
          </div>

        </form>
      </main>

      <footer className="footer-dashboard">
        <p>© 2026 Financess. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default AddGoal;