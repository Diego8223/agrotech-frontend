import React from 'react';
import './Products.css';

function Products() {
  const products = [
    { name: 'Semillas de Trigo', description: 'Alta calidad y rendimiento.', price: 'COP 50,000' },
    { name: 'Abono Orgánico', description: 'Ideal para cultivos sostenibles.', price: 'COP 30,000' },
    { name: 'Tractor', description: 'Máquina eficiente para grandes cultivos.', price: 'COP 5,000,000' },
  ];

  return (
    <main className="products">
      <h1>Productos Destacados</h1>
      <div className="product-cards">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>{product.price}</strong></p>
            <button className="product-button">Agregar al Carrito</button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Products;
