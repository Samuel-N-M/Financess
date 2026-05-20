import React from 'react';
import HeaderDashboard from '../components/HeaderDashboard';

const AddGoal = ({ onNavigate, currentPage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('goals');
  };

  return (
    <div className="goal-form-page">
      <HeaderDashboard onNavigate={onNavigate} currentPage={currentPage} />

      <main className="goal-form-container">
        <form onSubmit={handleSubmit} className="goal-form-box">
          
          {/* Nome da Meta */}
          <div className="goal-form-group full-width">
            <label>Nome da Meta:</label>
            <input 
              type="text" 
              placeholder="Ex: Viagem dos sonhos, Entrada do Compartamento" 
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
                required 
              />
            </div>

            <div className="goal-form-group">
              <label>Valor Inicial Poupado (R$) (Opcional):</label>
              <input 
                type="text" 
                placeholder="0,00" 
              />
            </div>
          </div>

          {/* Calendário e Categoria */}
          <div className="goal-form-row">
            <div className="goal-form-group">
              <label>Categoria:</label>
              <input 
                type="date" 
                required 
              />
            </div>

            <div className="goal-form-group">
              <label>Categoria:</label>
              <div className="select-wrapper">
                <select defaultValue="">
                  <option value="" disabled>Selecione uma categoria</option>
                  <option value="viagem">Viagem</option>
                  <option value="bens">Bens Eletrônicos</option>
                  <option value="reserva">Reserva de Emergência</option>
                </select>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="goal-form-group full-width">
            <label>Observações (Opcional):</label>
            <textarea 
              placeholder="Algumas nota adicional sobre a receita..." 
              rows="6"
            ></textarea>
          </div>

          {/* Ações: Cancelar e Guarda Meta */}
          <div className="goal-form-actions">
            <span className="goal-btn-cancel" onClick={() => onNavigate('goals')}>
              Cancelar
            </span>
            <button type="submit" className="goal-btn-submit">
              {/* Ícone de fita branca estilizado via SVG para fidelidade máxima com a imagem */}
              <svg className="bookmark-svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
              </svg>
              Guarda Meta
            </button>
          </div>

        </form>
      </main>

      <footer className="footer-dashboard">
        <p>© 2025 Financess. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default AddGoal;