import React from 'react';
import './Products.css';

function Products() {
  const products = [
    { name: 'Café Pergamino', description: 'Grano Mas Natural y Economico.', price: 'COP 53,000 25 KG' },
    { name: 'Café Excelso', description: 'Café de Alta Calidad Premium.', price: 'COP 54,000 25 KG' },
    { name: 'Café en Grano', description: 'Café Tostado listo para ser Molido.', price: 'COP 100000 50 KG' },
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
