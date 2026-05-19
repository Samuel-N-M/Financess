import HeaderDashboard from "../components/HeaderDashboard";

const TransactionForm = ({onNavigate, type, currentPage}) => {
    const isIncome = type === 'income';

    const handleSubmit = (e) => {
        e.preventDefault();
        onNavigate('dashboard');
    };

    return (
        <div className="transaction-form-page">
            <HeaderDashboard onNavigate={onNavigate} currentPage={currentPage} />

            <main className="form-content-wrapper">
                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        {/* Descrição */}
                        <div className="form-group-row full-width">
                            <label>{isIncome ? 'Descrição da Receita:' : 'Descrição:'}</label>
                            <input type="text" placeholder="Ex: Salário Mensal" required />
                        </div>

                        {/* Linha com Valor e Data */}
                        <div className="form-flex-row">
                            <div className="form-group-row half-width">
                                <label>Valor (R$):</label>
                                <input type="text" placeholder="0,00" required />
                            </div>

                            <div className="form-group-row half-width">
                                <label>{isIncome ? 'Data da Receita:' : 'Data da Despesa:'}</label>
                                <input type="date" required />
                            </div>
                        </div>

                        {/* Linha com Categoria e Conta de Destino */}
                        <div className="form-flex-row">
                            <div className="form-group-row half-width">
                                <label>Categorio:</label>
                                <select defaultValue="">
                                    <option value="" disabled>Selecione uma categoria</option>
                                    {isIncome ? (
                                        <>
                                            <option value="salario">Salário</option>
                                            <option value="freela">Freelance</option>
                                            <option value="investimentos">Incestimentos</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="alimentacao">Alimentação</option>
                                            <option value="moradia">Moradia</option>
                                            <option value="transporte">Transporte</option>
                                            <option value="lazer">Lazer</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            <div className="form-group-row half-width">
                                <label>Conta de Destino:</label>
                                <select defaultValue="">
                                    <option value="" disabled>Selecione uma conta</option>
                                    <option value="carteira">Carteira Principal</option>
                                    <option value="banco">Conta Bancária</option>
                                    <option value="poupana">Poupança</option>
                                </select>
                            </div>
                        </div>

                        {/* Observações */}
                        <div className="form-group-row full-width">
                            <label>Observações (Opcional):</label>
                            <textarea
                                placeholder={isIncome ? "Algumas nota adicional sobre a receita..." : "Algumas nota adicional sobre a despesa..."}
                                rows="5"
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
}

export default TransactionForm;