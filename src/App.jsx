import React from 'react';
import './App.css';
import Home from './pages/home.jsx';
import ProductsPage from './pages/productos.jsx';
import NosotrosPage from './pages/nosotros.jsx';
import ContactoPage from './pages/contacto.jsx';
import ProductoPage from './pages/productopage.jsx'; // Importar ProductoPage
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/producto/cielo-en-rosa" element={<ProductoPage />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;
