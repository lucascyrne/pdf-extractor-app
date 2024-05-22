import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BibliotecaDeFaturas from './pages/BibliotecaDeFaturas';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/biblioteca-de-faturas" element={<BibliotecaDeFaturas />} />
      </Routes>
    </Router>
  );
}

export default App;
