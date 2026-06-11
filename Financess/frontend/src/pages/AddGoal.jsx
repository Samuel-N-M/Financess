import { useState, useEffect } from 'react';
import HeaderDashboard from '../components/HeaderDashboard';
import api from '../services/api';

const AddGoal = ({ onNavigate, currentPage }) => {
  const [titulo, setTitulo] = useState("");
  const [valorAlvo, setValorAlvo] = useState("");
  const [valorAtual, setValorAtual] = useState("");
  const [dataAlvo, setDataAlvo] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [observacoes, setObservacoes] = useState("");
  
  const [erro, setErro] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [carregandoCategorias, setCarregandoCategorias] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/categorias');
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
  }, [onNavigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const valorAlvoFormatado = parseFloat(valorAlvo.replace(',', '.'));
      const valorAtualFormatado = valorAtual ? parseFloat(valorAtual.replace(',', '.')) : 0.00;

      if (isNaN(valorAlvoFormatado)) {
          setErro("O valor alvo deve ser numérico.");
          return;
      }

      // Os nomes das chaves agora batem exatamente com o meta_controller.py
      const novaMeta = {
        titulo: titulo,                  
        valor_alvo: valorAlvoFormatado,
        valor_atual: valorAtualFormatado,
        prazo: dataAlvo,
        categoria_id: categoriaId || null,
        observacoes: observacoes
      };

      await api.post('/metas', novaMeta);
      onNavigate('metas');
      
    } catch (err) {
      console.error("Erro ao guardar meta:", err);
      setErro(err.response?.data?.erro || "Erro ao guardar a meta. Verifique os dados.");
    }
  };

  return (
    <div className="goal-form-page">
      <HeaderDashboard onNavigate={onNavigate} currentPage={currentPage} />

      <main className="goal-form-container">
        <form onSubmit={handleSubmit} className="goal-form-box">
          
          {erro && (
            <div style={{ color: '#d9534f', backgroundColor: '#fdf7f7', padding: '10px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #d9534f' }}>
                {erro}
            </div>
          )}

          <div className="goal-form-group full-width">
            <label>Título da Meta:</label>
            <input 
              type="text" 
              placeholder="Ex: Viagem dos sonhos, Entrada do Apartamento" 
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required 
            />
          </div>

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

          <div className="goal-form-row">
            <div className="goal-form-group">
              <label>Data Limite / Prazo:</label>
              <input 
                type="date" 
                value={dataAlvo}
                onChange={(e) => setDataAlvo(e.target.value)}
                required 
              />
            </div>

            <div className="goal-form-group">
              <label>Categoria:</label>
              <select 
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                  disabled={carregandoCategorias}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: carregandoCategorias ? '#f5f5f5' : '#fff' }}
              >
                <option value="">Selecione uma categoria (Opcional)</option>
                {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.nome}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <div className="goal-form-group full-width" style={{ marginTop: '15px' }}>
            <label>Observações (Opcional):</label>
            <textarea 
              placeholder="Alguma nota adicional sobre a meta..." 
              rows="4"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            ></textarea>
          </div>

          <div className="goal-form-actions" style={{ marginTop: '30px' }}>
            <span className="goal-btn-cancel" onClick={() => onNavigate('metas')} style={{ cursor: 'pointer', color: '#666', fontWeight: 'bold' }}>
              Cancelar
            </span>
            <button type="submit" className="goal-btn-submit">
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