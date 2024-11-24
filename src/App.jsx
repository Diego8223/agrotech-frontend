import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Blockchain from './pages/Blockchain';  // Importar Blockchain
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blockchain" element={<Blockchain />} />  {/* Agregar ruta para Blockchain */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
