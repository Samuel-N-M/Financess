import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Meta from './pages/Meta';
import Relatorio from './pages/Relatorio';
import './App.css'
import { useState } from 'react';

function App() {
  // Estado para controlar qual tela mostrar: 'home' ou 'login'
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className='App'>
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'register' && <Register onNavigate={setCurrentPage} />}
      {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
      {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
      {currentPage === 'transactions' && <Transactions onNavigate={setCurrentPage} />}
      {currentPage === 'metas' && <Meta onNavigate={setCurrentPage} />}
      {currentPage === 'relatorio' && <Relatorio onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;