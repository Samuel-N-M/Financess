import { useState } from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Meta from './pages/Meta';
import Relatorio from './pages/Relatorio';
import Configuracao from './pages/Configuracao';
import AlteraSenha from './pages/AlteraSenha';
import TransactionForm from './pages/TransactionForm';
import AdicionarMetas from './pages/AddGoal';
import ForgotPassword from './pages/RecuperarSenha';
import './App.css';

function App() {
  // Estado Inteligente: Verifica a sessão e a última página visitada
  const [currentPage, setCurrentPage] = useState(() => {
    const token = localStorage.getItem('@Financess:token');
    const savedPage = localStorage.getItem('@Financess:lastPage');

    // Se o utilizador está logado
    if (token) {
      const paginasPrivadas = ['dashboard', 'transactions', 'metas', 'relatorio', 'configuracao', 'altera-senha', 'add-income', 'add-expense', 'add-goal'];
      if (savedPage && paginasPrivadas.includes(savedPage)) {
        return savedPage; // Volta para onde estava antes do F5
      }
      return 'dashboard';
    }
    
    // Se é visitante
    const paginasPublicas = ['home', 'login', 'register', 'forgot-password'];
    if (savedPage && paginasPublicas.includes(savedPage)) {
      return savedPage;
    }
    return 'home';
  });

  // Função central de navegação que memoriza os passos e faz o Logout
  const navigate = (page) => {
    if (page === 'logout') {
      localStorage.removeItem('@Financess:token');
      localStorage.removeItem('@Financess:user');
      localStorage.removeItem('@Financess:lastPage');
      setCurrentPage('login');
      return;
    }
    localStorage.setItem('@Financess:lastPage', page);
    setCurrentPage(page);
  };

  return (
    <div className='App'>
      {currentPage === 'home' && <Home onNavigate={navigate} />}
      {currentPage === 'register' && <Register onNavigate={navigate} />}
      {currentPage === 'login' && <Login onNavigate={navigate} />}
      
      {currentPage === 'dashboard' && <Dashboard onNavigate={navigate} />}
      {currentPage === 'transactions' && <Transactions onNavigate={navigate} />}
      {currentPage === 'metas' && <Meta onNavigate={navigate} currentPage="metas" />}
      {currentPage === 'relatorio' && <Relatorio onNavigate={navigate} />}
      {currentPage === 'configuracao' && <Configuracao onNavigate={navigate} />}
      {currentPage === 'altera-senha' && <AlteraSenha onNavigate={navigate} />}
      
      {currentPage === 'add-income' && <TransactionForm onNavigate={navigate} type="income" currentPage="dashboard" />}
      {currentPage === 'add-expense' && <TransactionForm onNavigate={navigate} type="expense" currentPage="dashboard" />}
      {currentPage === 'add-goal' && <AdicionarMetas onNavigate={navigate} currentPage="metas" />}
      
      {currentPage === 'forgot-password' && <ForgotPassword onNavigate={navigate} />}
    </div>
  );
}

export default App;