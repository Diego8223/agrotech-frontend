import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Blockchain from './pages/Blockchain';
import Analiticadatos from './pages/Analiticadatos';
import GeolocalizacionQR from './pages/GeolocalizacionQR';
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
          <Route path="/geolocalizacion" element={<GeolocalizacionQR />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/analiticadatos" element={<Analiticadatos />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
