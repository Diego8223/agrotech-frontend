// src/components/Card.js
import React from 'react';
import './Card.css';

function Card({ title, image, description }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
}

export default Card;
