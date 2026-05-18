import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
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
    </div>
  );
}

export default App;

