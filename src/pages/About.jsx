import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './About.css';

function About() {
  return (
    <main className="about">
      <h1>Agro Track</h1>
      <p>
       En agro Track ayudamos a nuestros clientes a tener soluciones sostnibles en el campo.
      </p>
      
      {/* Carrusel */}
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        showStatus={false}
        dynamicHeight={true}
      >
        <div>
          <img src="https://via.placeholder.com/800x400?text=Eco-friendly+Practices" alt="Eco Practices" />
          <p className="legend">Eco-friendly Practices</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400?text=Sustainable+Living" alt="Sustainable Living" />
          <p className="legend">Sustainable Living</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400?text=Healthier+Planet" alt="Healthier Planet" />
          <p className="legend">Healthier Planet</p>
        </div>
      </Carousel>
    </main>
  );
}

export default About;
