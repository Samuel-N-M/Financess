import { useState } from 'react';
import HeaderDashboard from '../components/HeaderDashboard';
import api from '../services/api';

const AddGoal = ({ onNavigate, currentPage }) => {
  const [nome, setNome] = useState("");
  const [valorAlvo, setValorAlvo] = useState("");
  const [valorAtual, setValorAtual] = useState("");
  const [dataAlvo, setDataAlvo] = useState("");
  const [erro, setErro] = useState("");

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

      // IMPORTANTE: Agora enviamos os dados com os Nomes exatos que o backend espera!
      const novaMeta = {
        titulo: nome,                  // Era 'nome' no frontend, agora mapeia para 'titulo'
        valor_alvo: valorAlvoFormatado,
        valor_atual: valorAtualFormatado,
        prazo: dataAlvo                // Era 'data_alvo', agora mapeia para 'prazo'
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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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